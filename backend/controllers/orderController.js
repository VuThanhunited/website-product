const Order = require("../models/Order");
const Product = require("../models/Product");

// ============================================
// EMAIL SERVICE CONFIGURATION - BREVO
// ============================================
// Sử dụng Brevo (Sendinblue) vì:
// - Free tier: 300 emails/ngày
// - KHÔNG cần verify domain
// - API đơn giản, reliable
// ============================================
const emailService = require("../services/emailServiceBrevo");
console.log("✅ Email Service: Brevo initialized");

const { sendOrderConfirmationEmail: sendCustomerEmail } = emailService;

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    console.log("📦 Received order data:", JSON.stringify(req.body, null, 2));

    const { customerInfo, items, subtotal, shippingFee, total, paymentMethod, status, language } = req.body;

    // Validate required fields
    if (
      !customerInfo ||
      !items ||
      items.length === 0 ||
      !subtotal ||
      shippingFee === undefined ||
      !total ||
      !paymentMethod
    ) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        received: {
          hasCustomerInfo: !!customerInfo,
          hasItems: !!items,
          itemsLength: items?.length,
          hasSubtotal: !!subtotal,
          hasShippingFee: shippingFee !== undefined,
          hasTotal: !!total,
          hasPaymentMethod: !!paymentMethod,
        },
      });
    }

    // Validate customer info
    if (
      !customerInfo.fullName ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.address ||
      !customerInfo.city
    ) {
      console.log("❌ Missing customer information:", customerInfo);
      return res.status(400).json({
        success: false,
        message: "Missing customer information",
        missingFields: {
          fullName: !customerInfo.fullName,
          email: !customerInfo.email,
          phone: !customerInfo.phone,
          address: !customerInfo.address,
          city: !customerInfo.city,
        },
      });
    }

    // Validate items
    for (const item of items) {
      if (!item.productId || !item.productName || !item.quantity || !item.price) {
        return res.status(400).json({
          success: false,
          message: "Invalid item data",
        });
      }

      // Optional: Check if product exists (skip if invalid ObjectId)
      try {
        const product = await Product.findById(item.productId);
        if (!product) {
          console.log(`⚠️  Product ${item.productName} not found in database, but order will proceed`);
        }
      } catch (err) {
        // Invalid ObjectId format, skip validation
        console.log(`⚠️  Invalid product ID format for ${item.productName}, but order will proceed`);
      }
    }

    // Generate unique order number
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      return `ORD${timestamp}${random}`;
    };

    const orderNumber = generateOrderNumber();

    // Create order
    const order = new Order({
      orderNumber,
      customerInfo,
      items,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      status: status || "pending",
    });

    await order.save();
    console.log("✅ Order saved to database:", order._id);

    // Gửi email xác nhận cho khách hàng qua Brevo
    console.log("📧 Sending customer confirmation email via Brevo...");
    console.log("   To:", order.customerInfo.email);
    sendCustomerEmail(order, language || "vi")
      .then((result) => {
        if (result.success) {
          console.log("✅ Customer email sent successfully to:", order.customerInfo.email);
          console.log("   Message ID:", result.messageId);
        } else {
          console.log("⚠️ Failed to send customer email:", result.error);
        }
      })
      .catch((err) => {
        console.error("❌ Customer email error:", err.message || err);
      });

    console.log("📦 Sending response to client...");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      ...order.toObject(),
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      ...order.toObject(),
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get order",
      error: error.message,
    });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .populate("items.productId")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalOrders: count,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paidStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (status) {
      order.status = status;
    }

    if (paidStatus !== undefined) {
      order.paidStatus = paidStatus;
    }

    await order.save();

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

// Get order by order number
exports.getOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber }).populate("items.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      ...order.toObject(),
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get order",
      error: error.message,
    });
  }
};
