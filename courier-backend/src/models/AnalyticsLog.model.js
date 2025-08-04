const mongoose = require("mongoose");

const analyticsLogSchema = new mongoose.Schema({
  eventType: { type: String }, // e.g., "BOOKING_CREATED", "DELIVERY_FAILED"
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  metadata: { type: mongoose.Schema.Types.Mixed }, // flexible field
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AnalyticsLog", analyticsLogSchema);