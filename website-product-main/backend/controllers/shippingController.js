const ShippingRate = require("../models/ShippingRate");

// @desc    Get all shipping rates
// @route   GET /api/shipping
// @access  Public
exports.getShippingRates = async (req, res) => {
  try {
    const shippingRates = await ShippingRate.find({ isActive: true }).sort({
      province: 1,
    });
    res.json({ success: true, data: shippingRates });
  } catch (error) {
    console.error("Error fetching shipping rates:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Get shipping rate by province
// @route   GET /api/shipping/:province
// @access  Public
exports.getShippingRateByProvince = async (req, res) => {
  try {
    const { province } = req.params;
    const shippingRate = await ShippingRate.findOne({
      province: { $regex: new RegExp(province, "i") },
      isActive: true,
    });

    if (!shippingRate) {
      return res.json({
        success: true,
        data: { rate: 30000, estimatedDays: "2-3 ngày" }, // Default rate
      });
    }

    res.json({ success: true, data: shippingRate });
  } catch (error) {
    console.error("Error fetching shipping rate:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Create or update shipping rate
// @route   POST /api/shipping
// @access  Private/Admin
exports.createShippingRate = async (req, res) => {
  try {
    const { province, rate, estimatedDays, isActive } = req.body;

    if (!province || rate === undefined) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    // Check if province already exists
    let shippingRate = await ShippingRate.findOne({ province });

    if (shippingRate) {
      // Update existing
      shippingRate.rate = rate;
      shippingRate.estimatedDays = estimatedDays || shippingRate.estimatedDays;
      shippingRate.isActive =
        isActive !== undefined ? isActive : shippingRate.isActive;
      await shippingRate.save();
    } else {
      // Create new
      shippingRate = await ShippingRate.create({
        province,
        rate,
        estimatedDays,
        isActive,
      });
    }

    res.status(201).json({ success: true, data: shippingRate });
  } catch (error) {
    console.error("Error creating shipping rate:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Update shipping rate
// @route   PUT /api/shipping/:id
// @access  Private/Admin
exports.updateShippingRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { province, rate, estimatedDays, isActive } = req.body;

    const shippingRate = await ShippingRate.findById(id);

    if (!shippingRate) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phí vận chuyển",
      });
    }

    shippingRate.province = province || shippingRate.province;
    shippingRate.rate = rate !== undefined ? rate : shippingRate.rate;
    shippingRate.estimatedDays = estimatedDays || shippingRate.estimatedDays;
    shippingRate.isActive =
      isActive !== undefined ? isActive : shippingRate.isActive;

    await shippingRate.save();

    res.json({ success: true, data: shippingRate });
  } catch (error) {
    console.error("Error updating shipping rate:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// @desc    Delete shipping rate
// @route   DELETE /api/shipping/:id
// @access  Private/Admin
exports.deleteShippingRate = async (req, res) => {
  try {
    const { id } = req.params;

    const shippingRate = await ShippingRate.findById(id);

    if (!shippingRate) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phí vận chuyển",
      });
    }

    await shippingRate.deleteOne();

    res.json({ success: true, message: "Đã xóa phí vận chuyển" });
  } catch (error) {
    console.error("Error deleting shipping rate:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
