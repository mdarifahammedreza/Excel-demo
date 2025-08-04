// validators/parcelSchema.js
const { z } = require("zod");

const parcelSchema = z.object({
  pickupAddress: z.string().min(5),
  deliveryAddress: z.string().min(5),
  parcelSize: z.enum(["small", "medium", "large"]),
  parcelType: z.enum(["document", "box", "fragile", "other"]),
  paymentType: z.enum(["COD", "prepaid"]),
  amount: z.number().positive()
});

module.exports = { parcelSchema };
