const mongoose = require("mongoose");
const Slogan = require("./models/Slogan");
require("dotenv").config();

// Bản dịch cho slogans
const sloganTranslations = {
  "Sản Phẩm Chất Lượng Với Giá Cả Phải Chăng":
    "Quality Products at Affordable Prices",
  "Giao Hàng Nhanh Toàn Quốc": "Fast Shipping Nationwide",
  "Giao Hàng Nhanh Chóng Toàn Quốc": "Fast Shipping Nationwide",
  "Cam Kết Hài Lòng Khách Hàng": "Customer Satisfaction Guaranteed",
  "Đảm Bảo Sự Hài Lòng Của Khách Hàng": "Customer Satisfaction Guaranteed",
  "Quality Products at Affordable Prices":
    "Quality Products at Affordable Prices",
  "Fast Shipping Worldwide": "Fast Shipping Nationwide",
  "Customer Satisfaction Guaranteed": "Customer Satisfaction Guaranteed",
};

async function updateSloganTranslations() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");

    // Lấy tất cả slogans
    const slogans = await Slogan.find();
    console.log(`Found ${slogans.length} slogans to update`);

    let updatedCount = 0;

    for (const slogan of slogans) {
      const textEn = sloganTranslations[slogan.text];

      if (textEn) {
        slogan.textEn = textEn;
        await slogan.save();
        updatedCount++;
        console.log(`✓ Updated: ${slogan.text} → ${textEn}`);
      } else {
        console.log(`✗ No translation found for: ${slogan.text}`);
      }
    }

    console.log(
      `\n✅ Updated ${updatedCount} out of ${slogans.length} slogans`
    );
    console.log("Slogan translation update completed!");

    process.exit(0);
  } catch (error) {
    console.error("Error updating slogan translations:", error);
    process.exit(1);
  }
}

// Chạy script
updateSloganTranslations();
