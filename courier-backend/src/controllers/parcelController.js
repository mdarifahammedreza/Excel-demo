const { geocodeAddress } = require("../utils/geocoder");
const redisClient = require("../utils/redisClient");
const {getOptimizedRoute} = require("../utils/routeOptimizer");
const Parcel = require("../models/parcel.model");
const { parcelSchema } = require("../validators/parcelSchema.zod");
const crypto = require("crypto");
const User = require("../models/user.model");
const CACHE_EXPIRY = 7200;
// Helper to generate unique tracking code
async function generateUniqueTrackingCode() {
  let code;
  let exists = true;
  while (exists) {
    code = crypto.randomBytes(4).toString("hex").toUpperCase();
    const parcel = await Parcel.findOne({ trackingCode: code });
    if (!parcel) exists = false;
  }
  return code;
}

// POST /api/parcels - Customer: Book a parcel
exports.bookParcel = async (req, res) => {
  try {
    const validated = parcelSchema.parse(req.body);
    const trackingCode = await generateUniqueTrackingCode();

    const parcel = await Parcel.create({
      customerId: req.user._id,
      pickupAddress: validated.pickupAddress,
      deliveryAddress: validated.deliveryAddress,
      parcelSize: validated.parcelSize,
      parcelType: validated.parcelType,
      paymentType: validated.paymentType,
      amount: validated.amount,
      trackingCode,
      status: "Pending",
      isDelivered: false,
      timestamps: { bookedAt: new Date() },
    });

    res.status(201).json({ success: true, parcel });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/parcels - Role-based listing
exports.getParcels = async (req, res) => {
  try {
    let parcels;
    console.log(req.user.role)
    if (req.user.role === "admin") {
      parcels = await Parcel.find().populate("customerId agentId", "-password");
    } else if (req.user.role === "agent") {
      parcels = await Parcel.find({ agentId: req.user._id }).populate("customerId", "-password");
    } else if (req.user.role === "customer") {
      parcels = await Parcel.find({ customerId: req.user._id }).populate("agentId", "-password");
    } else {
      return res.status(403).json({ success: false, message: "Invalid role" });
    }

    res.status(200).json({ success: true, parcels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// GET /api/parcels/tracking/:trackingCode - Get parcel details by trackingCode (Role-based)
exports.getParcelByTrackingCode = async (req, res) => {
  
  try {
    const parcel = await Parcel.findOne({ trackingCode: req.params.trackingCode }).populate("customerId agentId", "-password");
    console.log(req.params)
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }

    // Authorization check
    if (
      req.user.role === "admin" ||
      (req.user.role === "agent" && parcel.agentId?.equals(req.user._id)) ||
      (req.user.role === "customer" && parcel.customerId.equals(req.user._id))
    ) {
      return res.status(200).json({ success: true, parcel});
    }

    return res.status(403).json({ success: false, message: "Access denied" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET /api/parcels/:id - Get parcel details (Role-based)
exports.getParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id).populate("customerId agentId", "-password");
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }

    // Authorization check
    if (
      req.user.role === "admin" ||
      (req.user.role === "agent" && parcel.agentId?.equals(req.user._id)) ||
      (req.user.role === "customer" && parcel.customerId.equals(req.user._id))
    ) {
      return res.status(200).json({ success: true, parcel });
    }

    return res.status(403).json({ success: false, message: "Access denied" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/parcels/:id - Update parcel (Admin only)
exports.updateParcel = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Only admin can update parcels" });
  }

  try {
    const updates = req.body;
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }

    res.status(200).json({ success: true, parcel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/parcels/:id - Delete parcel (Admin only)
exports.deleteParcel = async (req, res) => {
  console.log(`api hitted,${req.user.role}`)
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Only admin can delete parcels" });
  }

  try {
    const parcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }

    res.status(200).json({ success: true, message: "Parcel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH /api/parcels/:id/status - Update status (Agent only)
exports.updateParcelStatus = async (req, res) => {
  if (req.user.role !== "agent") {
    return res.status(403).json({ success: false, message: "Only agent can update status" });
  }

  const { status } = req.body;
  const allowedStatuses = ["Picked Up", "In Transit", "Delivered", "Failed"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const parcel = await Parcel.findOne({ _id: req.params.id, agentId: req.user._id });
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found or not assigned" });
    }

    parcel.status = status;
    if (status === "Delivered") {
      parcel.isDelivered = true;
      parcel.timestamps.deliveredAt = new Date();
    } else if (status === "Picked Up") {
      parcel.timestamps.pickedUpAt = new Date();
    }

    await parcel.save();

    res.status(200).json({ success: true, parcel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/parcels/:id/location - Update current location (Agent only)
exports.updateParcelLocation = async (req, res) => {
  if (req.user.role !== "agent") {
    return res.status(403).json({ success: false, message: "Only agent can update location" });
  }

  const { lat, lng } = req.body;
  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ success: false, message: "Invalid location coordinates" });
  }

  try {
    const parcel = await Parcel.findOne({ _id: req.params.id, agentId: req.user._id });
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found or not assigned" });
    }

    parcel.currentLocation = { lat, lng };
    await parcel.save();

    res.status(200).json({ success: true, parcel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH /api/parcels/:id/assign-agent) (Admin only)
exports.assignAgent = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Only admin can assign agents" });
  }

  const parcelId = req.params.id;
  const { agentId } = req.body;

  if (!agentId) {
    return res.status(400).json({ success: false, message: "agentId is required" });
  }

  try {
    // Check if agent exists and is actually an agent
    const agent = await User.findById(agentId);
    if (!agent || agent.role !== "agent") {
      return res.status(400).json({ success: false, message: "Invalid agentId" });
    }

    // Find the parcel
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }

    // Assign agent and update status to 'Assigned'
    parcel.agentId = agentId;
    parcel.status = "Assigned";

    await parcel.save();

    res.status(200).json({
      success: true,
      message: "Agent assigned successfully",
      parcel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// parcel controller with geo optimize location api
exports.getAgentOptimizedRoute = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "agent") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    if (!redisClient?.get || typeof redisClient.get !== "function") {
      return res.status(500).json({ success: false, message: "Redis client not available" });
    }

    const parcels = await Parcel.find({ agentId: req.user._id });
    const points = [];

    for (const parcel of parcels) {
      const pickupCacheKey = `geo:pickup:${parcel._id}`;
      const deliveryCacheKey = `geo:delivery:${parcel._id}`;

      let pickupGeo = await redisClient.get(pickupCacheKey);
      let deliveryGeo = await redisClient.get(deliveryCacheKey);

      // Geocode pickup if not cached
      if (!pickupGeo) {
        const geo = await geocodeAddress(parcel.pickupAddress, process.env.OPENCAGE_API_KEY);
        if (geo?.lat && geo?.lng) {
          pickupGeo = JSON.stringify({ id: parcel._id, type: "pickup", ...geo });
          await redisClient.setEx(pickupCacheKey, CACHE_EXPIRY, pickupGeo);
        }
      }

      // Geocode delivery if not cached
      if (!deliveryGeo) {
        const geo = await geocodeAddress(parcel.deliveryAddress, process.env.OPENCAGE_API_KEY);
        if (geo?.lat && geo?.lng) {
          deliveryGeo = JSON.stringify({ id: parcel._id, type: "delivery", ...geo });
          await redisClient.setEx(deliveryCacheKey, CACHE_EXPIRY, deliveryGeo);
        }
      }

      // Add to route points
      try {
        if (pickupGeo) points.push(JSON.parse(pickupGeo));
        if (deliveryGeo) points.push(JSON.parse(deliveryGeo));
      } catch (parseError) {
        console.warn(`Error parsing geo data for parcel ${parcel._id}`, parseError);
      }
    }

    if (!points.length) {
      return res.status(404).json({ success: false, message: "No valid geolocation data found" });
    }

    const optimizedRoute = getOptimizedRoute(points); // Ensure this doesn't throw

    res.status(200).json({ success: true, optimizedRoute });
  } catch (error) {
    console.error("getAgentOptimizedRoute error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};