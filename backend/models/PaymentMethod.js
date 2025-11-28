const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      enum: ["cod", "bank_transfer"],
    },
    description: {
      type: String,
      default: "",
    },
    descriptionEn: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "💳",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    // Payment gateway configuration
    config: {
      // For bank transfer
      bankName: String,
      accountNumber: String,
      accountName: String,
      qrCode: String,

      // For e-wallets and payment gateways
      apiKey: String,
      secretKey: String,
      merchantId: String,
      returnUrl: String,
      notifyUrl: String,
    },
    // Fee configuration
    fee: {
      type: {
        type: String,
        enum: ["fixed", "percentage"],
        default: "fixed",
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    minAmount: {
      type: Number,
      default: 0,
    },
    maxAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);
