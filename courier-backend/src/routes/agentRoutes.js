// routes/agent.js
const express = require("express");
const router = express.Router();
const { getIO } = require("../socket");

// Dummy parcel DB for status check
const parcels = {
  "123456": {
    status: "Out for Delivery",
    customerId: "customerUser123",
  }
};

router.post("/location", async (req, res) => {
  const { agentId, parcelId, lat, lng } = req.body;

  if (!agentId || !parcelId || !lat || !lng) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const parcel = parcels[parcelId];
  if (!parcel) return res.status(404).json({ success: false, message: "Parcel not found" });

  if (parcel.status !== "Out for Delivery") {
    return res.status(403).json({ success: false, message: "Live tracking not allowed yet" });
  }

  const io = getIO();
  io.to(`customer:${parcelId}`).emit("locationUpdate", {
    lat,
    lng,
    timestamp: Date.now(),
    agentId
  });

  return res.json({ success: true, message: "Location broadcasted to customer" });
});

module.exports = router;
