const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

// Bản dịch cho categories
const categoryTranslations = {
  "Dung dịch làm bóng": "Shine Solutions",
  "Dung dịch làm sạch": "Cleaning Solutions",
  "Nước làm mát động cơ": "Engine Coolant",
  "Nước rửa xe & kính": "Car & Glass Wash",
};

async function updateCategoryTranslations() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");

    // Lấy tất cả categories
    const categories = await Category.find();
    console.log(`Found ${categories.length} categories to update`);

    let updatedCount = 0;

    for (const category of categories) {
      const nameEn = categoryTranslations[category.name];

      if (nameEn) {
        category.nameEn = nameEn;
        await category.save();
        updatedCount++;
        console.log(`✓ Updated: ${category.name} → ${nameEn}`);
      } else {
        console.log(`✗ No translation found for: ${category.name}`);
      }
    }

    console.log(
      `\n✅ Updated ${updatedCount} out of ${categories.length} categories`
    );
    console.log("Category translation update completed!");

    process.exit(0);
  } catch (error) {
    console.error("Error updating category translations:", error);
    process.exit(1);
  }
}

// Chạy script
updateCategoryTranslations();
