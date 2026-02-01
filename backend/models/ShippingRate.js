const mongoose = require("mongoose");

const shippingRateSchema = new mongoose.Schema(
  {
    province: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    estimatedDays: {
      type: String,
      default: "2-3 ngày",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShippingRate", shippingRateSchema);
