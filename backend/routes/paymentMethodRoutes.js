const express = require("express");
const router = express.Router();
const {
  getPaymentMethods,
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  reorderPaymentMethods,
} = require("../controllers/paymentMethodController");
const { protect, authorize } = require("../controllers/authController");

// Public routes
router.get("/", getPaymentMethods);
router.get("/:id", getPaymentMethodById);

// Admin routes
router.get("/admin/all", protect, authorize("admin"), getAllPaymentMethods);
router.post("/", protect, authorize("admin"), createPaymentMethod);
router.put("/reorder", protect, authorize("admin"), reorderPaymentMethods);
router.put("/:id", protect, authorize("admin"), updatePaymentMethod);
router.delete("/:id", protect, authorize("admin"), deletePaymentMethod);

module.exports = router;
