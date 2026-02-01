const express = require("express");
const router = express.Router();
const {
  getShippingRates,
  getShippingRateByProvince,
  createShippingRate,
  updateShippingRate,
  deleteShippingRate,
} = require("../controllers/shippingController");
const { protect, authorize } = require("../controllers/authController");

// Public routes
router.get("/", getShippingRates);
router.get("/:province", getShippingRateByProvince);

// Admin routes
router.post("/", protect, authorize("admin"), createShippingRate);
router.put("/:id", protect, authorize("admin"), updateShippingRate);
router.delete("/:id", protect, authorize("admin"), deleteShippingRate);

module.exports = router;
