const express = require("express");
const router = express.Router();
const paymentQRController = require("../controllers/paymentQRController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

console.log("🔴 PaymentQR Routes Loading...");
console.log("🔴 Controller loaded:", paymentQRController);
console.log("🔴 getAllPaymentQRs type:", typeof paymentQRController.getAllPaymentQRs);
console.log("🔴 Available functions:", Object.keys(paymentQRController));
console.log("🔴 verifyToken type:", typeof verifyToken);
console.log("🔴 verifyAdmin type:", typeof verifyAdmin);

// Public routes (for frontend checkout)
router.get("/active", paymentQRController.getActivePaymentQRs);

// Admin routes (protected)
router.get("/", verifyToken, verifyAdmin, paymentQRController.getAllPaymentQRs);
router.get("/:id", verifyToken, verifyAdmin, paymentQRController.getPaymentQRById);
router.post("/", verifyToken, verifyAdmin, paymentQRController.createPaymentQR);
router.put("/:id", verifyToken, verifyAdmin, paymentQRController.updatePaymentQR);
router.delete("/:id", verifyToken, verifyAdmin, paymentQRController.deletePaymentQR);
router.patch("/:id/toggle-active", verifyToken, verifyAdmin, paymentQRController.toggleActiveStatus);

module.exports = router;
