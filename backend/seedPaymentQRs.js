const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PaymentQR = require("./models/PaymentQR");

dotenv.config();

const sampleQRs = [
  {
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    accountName: "CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ỨNG DỤNG EFT",
    qrCodeImage:
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=VCB-1234567890",
    translations: {
      vi: {
        bankName: "Ngân hàng Ngoại Thương Việt Nam",
        accountName: "CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ỨNG DỤNG EFT",
        instructions:
          "Vui lòng quét mã QR hoặc chuyển khoản theo thông tin bên dưới. Ghi rõ nội dung chuyển khoản để được xử lý nhanh hơn.",
      },
      en: {
        bankName: "Vietcombank",
        accountName: "EFT TECHNOLOGY APPLICATION DEVELOPMENT CO., LTD",
        instructions:
          "Please scan QR code or transfer according to the information below. Write clear transfer content for faster processing.",
      },
    },
    isActive: true,
    displayOrder: 1,
  },
  {
    bankName: "Techcombank",
    accountNumber: "9876543210",
    accountName: "CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ỨNG DỤNG EFT",
    qrCodeImage:
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TCB-9876543210",
    translations: {
      vi: {
        bankName: "Ngân hàng Kỹ Thương Việt Nam",
        accountName: "CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ỨNG DỤNG EFT",
        instructions:
          "Quét mã QR để thanh toán nhanh chóng. Đơn hàng sẽ được xử lý trong 1-2 giờ sau khi xác nhận.",
      },
      en: {
        bankName: "Techcombank",
        accountName: "EFT TECHNOLOGY APPLICATION DEVELOPMENT CO., LTD",
        instructions:
          "Scan QR code for quick payment. Orders will be processed within 1-2 hours after confirmation.",
      },
    },
    isActive: true,
    displayOrder: 2,
  },
];

const seedPaymentQRs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Clear existing QRs
    await PaymentQR.deleteMany({});
    console.log("🗑️  Cleared existing payment QRs");

    // Insert sample QRs
    await PaymentQR.insertMany(sampleQRs);
    console.log("✅ Seeded sample payment QR codes");

    console.log("\n📋 Payment QR codes seeded:");
    sampleQRs.forEach((qr, index) => {
      console.log(`  ${index + 1}. ${qr.bankName} - ${qr.accountNumber}`);
    });

    mongoose.connection.close();
    console.log("\n✅ Done!");
  } catch (error) {
    console.error("❌ Error seeding payment QRs:", error);
    process.exit(1);
  }
};

seedPaymentQRs();
