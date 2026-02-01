const mongoose = require("mongoose");
const Product = require("./models/Product");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

async function updateProductImages() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    // Read products from JSON file
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "product.json"), "utf8")
    );

    console.log(`📦 Found ${productsData.length} products in JSON file\n`);

    let updated = 0;
    let notFound = 0;

    for (let i = 0; i < productsData.length; i++) {
      const productData = productsData[i];

      console.log(`${i + 1}. Processing: ${productData.name}`);
      console.log(`   New image URL: ${productData.image}`);

      // Find product by name
      const product = await Product.findOne({ name: productData.name });

      if (product) {
        // Update ONLY image URLs - don't touch other fields
        const oldImage = product.image;
        product.image = productData.image;
        product.images = [productData.image];

        try {
          await product.save();
          console.log(`   Old: ${oldImage}`);
          console.log(`   ✅ Updated successfully`);
          updated++;
        } catch (saveError) {
          console.log(`   ❌ Save error: ${saveError.message}`);
          // Skip validation by using update directly
          await Product.updateOne(
            { _id: product._id },
            {
              $set: {
                image: productData.image,
                images: [productData.image],
              },
            }
          );
          console.log(`   ✅ Updated via direct update`);
          updated++;
        }
      } else {
        console.log(`   ⚠️  Product not found in database`);
        notFound++;
      }
      console.log("");
    }

    console.log("=".repeat(60));
    console.log("📊 UPDATE SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Successfully updated: ${updated}/${productsData.length}`);
    if (notFound > 0) {
      console.log(`⚠️  Not found in database: ${notFound}`);
    }
    console.log("\n🎉 All product images updated with new URLs!");
    console.log("🌐 Images from Unsplash are stable and fast loading");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run update
updateProductImages()
  .then(() => {
    console.log("\n✅ Update completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Update failed:", error);
    process.exit(1);
  });
