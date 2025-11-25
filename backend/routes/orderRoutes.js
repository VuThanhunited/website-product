const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/auth");

// Protected user routes
router.post("/", protect, orderController.createOrder);
router.get("/:id", protect, orderController.getOrderById);
router.get("/number/:orderNumber", protect, orderController.getOrderByNumber);

// Admin routes
router.get("/", protect, authorize("admin"), orderController.getAllOrders);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  orderController.updateOrderStatus
);
router.delete("/:id", protect, authorize("admin"), orderController.deleteOrder);

module.exports = router;
