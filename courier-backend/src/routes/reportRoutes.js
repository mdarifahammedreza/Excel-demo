const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const auth = require("../middlewares/auth.middleware");

router.get("/dashboard/metrics", auth.protect, auth.restrictTo("admin"), reportController.getMetrics);

router.get("/export", auth.protect, auth.restrictTo("admin"), reportController.exportReport);

module.exports = router;
