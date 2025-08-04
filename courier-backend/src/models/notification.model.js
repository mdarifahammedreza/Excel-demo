// models/notification.model.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User or Agent
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who triggered the notification (optional)
  message: { type: String, required: true },

  type: {
    type: String,
    enum: ["email", "sms", "inApp"],
    default: "inApp"
  },

  category: {
    type: String,
    enum: ["general", "parcelUpdate", "assignment", "alert", "system"],
    default: "general"
  },

  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
