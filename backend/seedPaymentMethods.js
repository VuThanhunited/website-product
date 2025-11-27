const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PaymentMethod = require("./models/PaymentMethod");

dotenv.config();

const paymentMethods = [
  {
    name: "Thanh toán khi nhận hàng (COD)",
    nameEn: "Cash on Delivery (COD)",
    code: "cod",
    description:
      "Thanh toán bằng tiền mặt khi nhận hàng. Khách hàng kiểm tra hàng trước khi thanh toán.",
    descriptionEn:
      "Pay with cash upon delivery. Check products before payment.",
    icon: "💵",
    isActive: true,
    order: 1,
    fee: {
      type: "fixed",
      amount: 0,
    },
    minAmount: 0,
    maxAmount: 20000000,
  },
  {
    name: "Chuyển khoản ngân hàng",
    nameEn: "Bank Transfer",
    code: "bank_transfer",
    description:
      "Chuyển khoản qua ngân hàng. Vui lòng chuyển khoản và gửi mã giao dịch để xác nhận.",
    descriptionEn:
      "Transfer via bank account. Please send transaction code for confirmation.",
    icon: "🏦",
    isActive: true,
    order: 2,
    config: {
      bankName: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "CONG TY TNHH PHAT TRIEN CONG NGHE UNG DUNG EFT",
    },
    fee: {
      type: "fixed",
      amount: 0,
    },
    minAmount: 0,
    maxAmount: 0,
  },
  {
    name: "Ví điện tử MoMo",
    nameEn: "MoMo E-Wallet",
    code: "momo",
    description:
      "Thanh toán nhanh chóng và an toàn qua ví MoMo. Quét mã QR hoặc nhập số điện thoại.",
    descriptionEn:
      "Fast and secure payment via MoMo wallet. Scan QR code or enter phone number.",
    icon: "📱",
    isActive: true,
    order: 3,
    fee: {
      type: "percentage",
      amount: 1.5,
    },
    minAmount: 10000,
    maxAmount: 50000000,
  },
  {
    name: "Cổng thanh toán VNPay",
    nameEn: "VNPay Payment Gateway",
    code: "vnpay",
    description:
      "Thanh toán qua thẻ ATM, tài khoản ngân hàng hoặc thẻ quốc tế qua VNPay.",
    descriptionEn:
      "Pay with ATM card, bank account or international card via VNPay.",
    icon: "💳",
    isActive: true,
    order: 4,
    fee: {
      type: "percentage",
      amount: 1.1,
    },
    minAmount: 10000,
    maxAmount: 0,
  },
  {
    name: "Ví điện tử ZaloPay",
    nameEn: "ZaloPay E-Wallet",
    code: "zalopay",
    description:
      "Thanh toán dễ dàng qua ví ZaloPay. Hỗ trợ nhiều ưu đãi và hoàn tiền.",
    descriptionEn:
      "Easy payment via ZaloPay wallet. Supports many promotions and cashback.",
    icon: "🔵",
    isActive: true,
    order: 5,
    fee: {
      type: "percentage",
      amount: 1.5,
    },
    minAmount: 10000,
    maxAmount: 50000000,
  },
  {
    name: "Thẻ tín dụng/ghi nợ quốc tế",
    nameEn: "International Credit/Debit Card",
    code: "credit_card",
    description: "Thanh toán bằng thẻ Visa, MasterCard, JCB, American Express.",
    descriptionEn: "Pay with Visa, MasterCard, JCB, American Express cards.",
    icon: "💳",
    isActive: true,
    order: 6,
    fee: {
      type: "percentage",
      amount: 2.5,
    },
    minAmount: 10000,
    maxAmount: 0,
  },
  {
    name: "Thẻ ATM nội địa",
    nameEn: "Domestic ATM Card",
    code: "atm_card",
    description:
      "Thanh toán bằng thẻ ATM các ngân hàng trong nước qua cổng thanh toán.",
    descriptionEn: "Pay with domestic ATM cards via payment gateway.",
    icon: "🏧",
    isActive: true,
    order: 7,
    fee: {
      type: "fixed",
      amount: 3300,
    },
    minAmount: 10000,
    maxAmount: 50000000,
  },
];

const seedPaymentMethods = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing payment methods
    await PaymentMethod.deleteMany({});
    console.log("Cleared existing payment methods");

    // Insert new payment methods
    await PaymentMethod.insertMany(paymentMethods);
    console.log(
      `✅ Successfully seeded ${paymentMethods.length} payment methods`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding payment methods:", error);
    process.exit(1);
  }
};

seedPaymentMethods();
