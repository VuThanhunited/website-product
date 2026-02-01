const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// MongoDB connection
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://vtu21102000@cluster0.7t35nab.mongodb.net/lisse_beauty";

// Product type placeholders from placeholder services
const productPlaceholders = {
  "car-care":
    "https://placehold.co/400x400/2196F3/FFFFFF/png?text=Car+Care+Product",
  "tire-shine":
    "https://placehold.co/400x400/FF9800/FFFFFF/png?text=Tire+Shine",
  "surface-cleaner":
    "https://placehold.co/400x400/4CAF50/FFFFFF/png?text=Surface+Cleaner",
  "wheel-cleaner":
    "https://placehold.co/400x400/E91E63/FFFFFF/png?text=Wheel+Cleaner",
  "coolant-purple":
    "https://placehold.co/400x400/9C27B0/FFFFFF/png?text=Coolant+GW12",
  "coolant-green":
    "https://placehold.co/400x400/4CAF50/FFFFFF/png?text=Coolant+GW11",
  "glass-cleaner":
    "https://placehold.co/400x400/00BCD4/FFFFFF/png?text=Glass+Cleaner",
  "car-wash":
    "https://placehold.co/400x400/3F51B5/FFFFFF/png?text=Car+Wash+Foam",
};

async function updateProductImages() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products\n`);

    let updated = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. ${product.name}`);

      let placeholderType = "car-care"; // default

      // Determine product type from name
      const name = product.name.toLowerCase();
      if (name.includes("tyre shine") || name.includes("bóng lốp")) {
        placeholderType = "tire-shine";
      } else if (
        name.includes("surface cleaner") ||
        name.includes("làm sạch bề mặt")
      ) {
        placeholderType = "surface-cleaner";
      } else if (
        name.includes("wheel cleaner") ||
        name.includes("vệ sinh vành")
      ) {
        placeholderType = "wheel-cleaner";
      } else if (name.includes("gw12") || name.includes("tím")) {
        placeholderType = "coolant-purple";
      } else if (name.includes("gw11") || name.includes("xanh")) {
        placeholderType = "coolant-green";
      } else if (name.includes("rửa kính") || name.includes("clear view")) {
        placeholderType = "glass-cleaner";
      } else if (name.includes("rửa xe") || name.includes("car wash")) {
        placeholderType = "car-wash";
      }

      const newImage = productPlaceholders[placeholderType];

      // Update only if current image is from www.ppp.vn
      if (product.image && product.image.includes("www.ppp.vn")) {
        product.image = newImage;
        product.images = [newImage];
        await product.save();
        console.log(`   ✅ Updated with ${placeholderType} placeholder`);
        updated++;
      } else {
        console.log(`   ⏭️ Skipped (already updated)`);
      }
    }

    console.log(`\n✅ Updated ${updated}/${products.length} products`);
    console.log("\n⚠️ These are temporary placeholder images");
    console.log("📝 You can replace them later with real images");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

updateProductImages();
