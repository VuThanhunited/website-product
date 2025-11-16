const mongoose = require("mongoose");
require("dotenv").config();
const Category = require("./models/Category");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const updateCategories = async () => {
  try {
    const categoryTranslations = {
      "Chăm sóc lốp và cao su": {
        nameEn: "Tire & Rubber Care",
        descriptionEn: "Tire & Rubber Care products",
      },
      "Vệ sinh và làm sạch": {
        nameEn: "Cleaning & Washing",
        descriptionEn: "Cleaning & Washing products",
      },
      "Nước làm mát động cơ": {
        nameEn: "Engine Coolant",
        descriptionEn: "Engine Coolant products",
      },
    };

    const categories = await Category.find();
    console.log(`Found ${categories.length} categories to update`);

    for (const category of categories) {
      if (categoryTranslations[category.name]) {
        category.nameEn = categoryTranslations[category.name].nameEn;
        category.descriptionEn =
          categoryTranslations[category.name].descriptionEn;
        await category.save();
        console.log(
          `✓ Updated category: ${category.name} -> ${category.nameEn}`
        );
      }
    }

    console.log("\n✅ All categories updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

updateCategories();
