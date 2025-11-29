const mongoose = require("mongoose");

const paymentQRSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    qrCodeImage: {
      type: String,
      required: true,
    },
    translations: {
      vi: {
        bankName: String,
        accountName: String,
        instructions: String,
      },
      en: {
        bankName: String,
        accountName: String,
        instructions: String,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentQR", paymentQRSchema);
