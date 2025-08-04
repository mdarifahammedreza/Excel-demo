const express = require("express");
const router = express.Router();
const parcelController = require("../controllers/parcelController");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth.protect, auth.restrictTo("customer"), parcelController.bookParcel);

router.get("/", auth.protect, parcelController.getParcels);

router.get("/optimize-route-with-geo", auth.protect, parcelController.getAgentOptimizedRoute);
router.get("/:id", auth.protect, parcelController.getParcelById);
router.get('/tracking/:trackingCode', auth.protect, parcelController.getParcelByTrackingCode);

router.put("/:id", auth.protect, auth.restrictTo("admin"), parcelController.updateParcel);

router.delete("/:id", auth.protect, auth.restrictTo("admin"), parcelController.deleteParcel);

router.patch("/:id/status", auth.protect, auth.restrictTo("agent"), parcelController.updateParcelStatus);

router.post("/:id/location", auth.protect, auth.restrictTo("agent"), parcelController.updateParcelLocation);

router.patch(
  "/:id/assign-agent",
  auth.protect,
  auth.restrictTo("admin"),
  parcelController.assignAgent
);

module.exports = router;
