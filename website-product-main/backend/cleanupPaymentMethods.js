const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PaymentMethod = require("./models/PaymentMethod");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const cleanupPaymentMethods = async () => {
  try {
    // Xóa các phương thức thanh toán không cần thiết
    const codesToRemove = [
      "momo",
      "vnpay",
      "zalopay",
      "credit_card",
      "atm_card",
    ];

    const result = await PaymentMethod.deleteMany({
      code: { $in: codesToRemove },
    });

    console.log(
      `✅ Đã xóa ${result.deletedCount} phương thức thanh toán không cần thiết`
    );

    // Kiểm tra các phương thức còn lại
    const remainingMethods = await PaymentMethod.find();
    console.log("\n📋 Các phương thức thanh toán còn lại:");
    remainingMethods.forEach((method) => {
      console.log(`  - ${method.name} (${method.code})`);
    });

    // Nếu chưa có COD hoặc Bank Transfer, tạo mới
    const codExists = await PaymentMethod.findOne({ code: "cod" });
    const bankTransferExists = await PaymentMethod.findOne({
      code: "bank_transfer",
    });

    if (!codExists) {
      await PaymentMethod.create({
        name: "Thanh toán khi nhận hàng (COD)",
        nameEn: "Cash on Delivery (COD)",
        code: "cod",
        description: "Thanh toán bằng tiền mặt khi nhận hàng",
        descriptionEn: "Pay with cash upon delivery",
        icon: "💵",
        isActive: true,
        order: 1,
      });
      console.log("\n✅ Đã tạo phương thức COD");
    }

    if (!bankTransferExists) {
      await PaymentMethod.create({
        name: "Chuyển khoản ngân hàng",
        nameEn: "Bank Transfer",
        code: "bank_transfer",
        description: "Chuyển khoản qua ngân hàng",
        descriptionEn: "Transfer via bank",
        icon: "🏦",
        isActive: true,
        order: 2,
        config: {
          bankName:
            "Ngân hàng Thương mại Cổ phần Ngoại Thương Việt Nam (Vietcombank)",
          accountNumber: "1234567890",
          accountName: "CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ỨNG DỤNG EFT",
          branch: "Chi nhánh TP. Hồ Chí Minh",
          swiftCode: "BFTVVNVX",
        },
      });
      console.log("✅ Đã tạo phương thức Chuyển khoản ngân hàng");
    }

    console.log("\n✅ Hoàn tất cập nhật phương thức thanh toán");
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
};

cleanupPaymentMethods();
