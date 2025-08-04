// validators/statusUpdateSchema.js
const { z } = require("zod");

const statusUpdateSchema = z.object({
  status: z.enum(["Picked Up", "In Transit", "Delivered","Out for Delivery", "Failed"]),
  lat: z.number().optional(),
  lng: z.number().optional()
});

module.exports = { statusUpdateSchema };
