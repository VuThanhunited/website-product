const PaymentMethod = require("../models/PaymentMethod");

// @desc    Get all payment methods
// @route   GET /api/payment-methods
// @access  Public
exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ isActive: true }).sort({
      order: 1,
    });
    res.json({ success: true, data: paymentMethods });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Get all payment methods (Admin)
// @route   GET /api/payment-methods/admin
// @access  Private/Admin
exports.getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find().sort({ order: 1 });
    res.json({ success: true, data: paymentMethods });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Get payment method by ID
// @route   GET /api/payment-methods/:id
// @access  Public
exports.getPaymentMethodById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findById(id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phương thức thanh toán",
      });
    }

    res.json({ success: true, data: paymentMethod });
  } catch (error) {
    console.error("Error fetching payment method:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Create payment method
// @route   POST /api/payment-methods
// @access  Private/Admin
exports.createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.create(req.body);
    res.status(201).json({ success: true, data: paymentMethod });
  } catch (error) {
    console.error("Error creating payment method:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi server",
    });
  }
};

// @desc    Update payment method
// @route   PUT /api/payment-methods/:id
// @access  Private/Admin
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phương thức thanh toán",
      });
    }

    res.json({ success: true, data: paymentMethod });
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi server",
    });
  }
};

// @desc    Delete payment method
// @route   DELETE /api/payment-methods/:id
// @access  Private/Admin
exports.deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMethod = await PaymentMethod.findByIdAndDelete(id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phương thức thanh toán",
      });
    }

    res.json({
      success: true,
      message: "Đã xóa phương thức thanh toán",
    });
  } catch (error) {
    console.error("Error deleting payment method:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Update payment method order
// @route   PUT /api/payment-methods/reorder
// @access  Private/Admin
exports.reorderPaymentMethods = async (req, res) => {
  try {
    const { items } = req.body; // Array of {id, order}

    const updatePromises = items.map((item) =>
      PaymentMethod.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: "Đã cập nhật thứ tự phương thức thanh toán",
    });
  } catch (error) {
    console.error("Error reordering payment methods:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
