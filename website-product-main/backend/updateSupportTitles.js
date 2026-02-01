const mongoose = require("mongoose");
const SupportArticle = require("./models/SupportArticle");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("✅ Connected"))
  .catch((err) => console.error("❌ Error:", err));

async function updateTitles() {
  try {
    await SupportArticle.updateOne(
      { title: "Phương Thức Thanh Toán" },
      { titleEn: "Payment Methods" }
    );
    console.log("✅ Updated: Payment Methods");

    await SupportArticle.updateOne(
      { title: "Chính Sách Đổi Trả" },
      { titleEn: "Return Policy" }
    );
    console.log("✅ Updated: Return Policy");

    await SupportArticle.updateOne(
      { title: "Hướng Dẫn Đặt Hàng" },
      { titleEn: "Order Guide" }
    );
    console.log("✅ Updated: Order Guide");

    await SupportArticle.updateOne(
      { title: "Thông Tin Vận Chuyển" },
      { titleEn: "Shipping Information" }
    );
    console.log("✅ Updated: Shipping Information");

    console.log("\n✅ All titles updated!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

setTimeout(updateTitles, 2000);
