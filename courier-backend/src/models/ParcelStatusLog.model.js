// models/ParcelStatusLog.js
const mongoose = require("mongoose");

const parcelStatusLogSchema = new mongoose.Schema({
  parcelId: { type: mongoose.Schema.Types.ObjectId, ref: "Parcel", required: true },
  status: {
    type: String,
    enum: ["Picked Up", "In Transit", "Delivered","Out for Delivery", "Failed"],
    required: true
  },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    lat: Number,
    lng: Number
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ParcelStatusLog", parcelStatusLogSchema);
