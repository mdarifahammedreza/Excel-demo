const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["daily", "custom"], default: "daily" },
  format: { type: String, enum: ["csv", "pdf"], required: true },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);