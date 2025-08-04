// models/parcel.model.js
const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  
  parcelSize: { type: String, enum: ["small", "medium", "large"], required: true },
  parcelType: { type: String, enum: ["document", "box", "fragile", "other"], default: "other" },
  
  paymentType: { type: String, enum: ["COD", "prepaid"], required: true },
  amount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["Pending", "Assigned", "Picked Up", "In Transit", "Delivered", "Failed"],
    default: "Pending"
  },

  isDelivered: { type: Boolean, default: false },
  trackingCode: { type: String, unique: true },
  qrCodeUrl: { type: String }, // Optional for QR image path
  barcode: { type: String },    // Optional barcode content

  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },

  timestamps: {
    bookedAt: { type: Date, default: Date.now },
    pickedUpAt: { type: Date },
    deliveredAt: { type: Date }
  }
});

module.exports = mongoose.model("Parcel", parcelSchema);
