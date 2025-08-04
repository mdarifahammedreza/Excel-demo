const Parcel = require("../models/parcel.model");
const json2csv = require("json2csv").parse;
const PDFDocument = require("pdfkit");
const stream = require("stream");

// Helper to get date range filter
function getDateRangeFilter(startDate, endDate) {
  if (!startDate && !endDate) return {};
  let filter = {};
  if (startDate) filter.$gte = new Date(startDate);
  if (endDate) filter.$lte = new Date(endDate);
  return { bookedAt: filter };
}

// GET /api/dashboard/metrics
exports.getMetrics = async (req, res) => {
  try {
    // Get today's date start
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Daily bookings count
    const dailyBookings = await Parcel.countDocuments({
      "timestamps.bookedAt": { $gte: todayStart },
    });

    // Failed deliveries today
    const failedDeliveries = await Parcel.countDocuments({
      status: "Failed",
      "timestamps.bookedAt": { $gte: todayStart },
    });

    // Total COD amount (pending + delivered)
    const codParcels = await Parcel.aggregate([
      { $match: { paymentType: "COD" } },
      {
        $group: {
          _id: null,
          totalCODAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        dailyBookings,
        failedDeliveries,
        totalCODAmount: codParcels[0]?.totalCODAmount || 0,
        totalCODCount: codParcels[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/reports/export?format=csv|pdf&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.exportReport = async (req, res) => {
  const { format = "csv", startDate, endDate } = req.query;

  try {
    // Fetch parcels filtered by date range
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter["timestamps.bookedAt"] = {};
      if (startDate) dateFilter["timestamps.bookedAt"].$gte = new Date(startDate);
      if (endDate) dateFilter["timestamps.bookedAt"].$lte = new Date(endDate);
    }

    const parcels = await Parcel.find(dateFilter)
      .populate("customerId agentId", "name email")
      .lean();

    if (parcels.length === 0) {
      return res.status(404).json({ success: false, message: "No data found for the given date range" });
    }

    if (format === "csv") {
      // Prepare CSV fields
      const fields = [
        { label: "Tracking Code", value: "trackingCode" },
        { label: "Customer", value: "customerId.name" },
        { label: "Agent", value: "agentId.name" },
        { label: "Pickup Address", value: "pickupAddress" },
        { label: "Delivery Address", value: "deliveryAddress" },
        { label: "Parcel Size", value: "parcelSize" },
        { label: "Parcel Type", value: "parcelType" },
        { label: "Payment Type", value: "paymentType" },
        { label: "Amount", value: "amount" },
        { label: "Status", value: "status" },
        { label: "Booked At", value: (row) => new Date(row.timestamps.bookedAt).toLocaleString() },
      ];

      const csv = json2csv(parcels, { fields });

      res.header("Content-Type", "text/csv");
      res.attachment(`parcel_report_${Date.now()}.csv`);
      return res.send(csv);
    } else if (format === "pdf") {
      // Create PDF document
      const doc = new PDFDocument();
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        res
          .writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment;filename=parcel_report_${Date.now()}.pdf`,
            "Content-Length": pdfData.length,
          })
          .end(pdfData);
      });

      doc.fontSize(18).text("Parcel Report", { align: "center" });
      doc.moveDown();

      parcels.forEach((p, i) => {
        doc.fontSize(12).text(`${i + 1}. Tracking Code: ${p.trackingCode}`);
        doc.text(`   Customer: ${p.customerId?.name || "N/A"} (${p.customerId?.email || ""})`);
        doc.text(`   Agent: ${p.agentId?.name || "N/A"} (${p.agentId?.email || ""})`);
        doc.text(`   Pickup: ${p.pickupAddress}`);
        doc.text(`   Delivery: ${p.deliveryAddress}`);
        doc.text(`   Size/Type: ${p.parcelSize} / ${p.parcelType}`);
        doc.text(`   Payment: ${p.paymentType} (Amount: ${p.amount})`);
        doc.text(`   Status: ${p.status}`);
        doc.text(`   Booked At: ${new Date(p.timestamps.bookedAt).toLocaleString()}`);
        doc.moveDown();
      });

      doc.end();
    } else {
      return res.status(400).json({ success: false, message: "Invalid format. Use csv or pdf." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
