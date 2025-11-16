const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Public routes
router.post("/", orderController.createOrder);
router.get("/:id", orderController.getOrderById);
router.get("/number/:orderNumber", orderController.getOrderByNumber);

// Admin routes (should be protected with auth middleware)
router.get("/", orderController.getAllOrders);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
