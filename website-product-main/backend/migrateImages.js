const axios = require("axios");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const Product = require("./models/Product");

// Create uploads directory if not exists
const uploadsDir = path.join(__dirname, "uploads", "products");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads/products directory");
}

// Wait for MongoDB connection
async function waitForConnection() {
  return new Promise((resolve) => {
    if (mongoose.connection.readyState === 1) {
      resolve();
    } else {
      mongoose.connection.once("open", resolve);
    }
  });
}

// Download image from URL
async function downloadImage(url, filename) {
  try {
    console.log(`    🔄 Attempting download...`);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 60000, // Increase timeout to 60 seconds
      maxRedirects: 5,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://www.ppp.vn/",
        Connection: "keep-alive",
      },
    });

    const filepath = path.join(uploadsDir, filename);
    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        console.log(`    ✅ Download complete`);
        resolve(filepath);
      });
      writer.on("error", (error) => {
        console.log(`    ❌ Write error: ${error.message}`);
        reject(error);
      });

      // Timeout for writing
      setTimeout(() => {
        writer.close();
        reject(new Error("Write timeout"));
      }, 60000);
    });
  } catch (error) {
    console.error(`    ❌ Download failed: ${error.message}`);
    return null;
  }
}

// Generate filename from URL
function getFilenameFromUrl(url) {
  const urlPath = new URL(url).pathname;
  const filename = path.basename(urlPath);
  // Clean filename
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function migrateImages() {
  try {
    // Wait for MongoDB connection
    await waitForConnection();
    console.log("✅ MongoDB Ready\n");

    console.log("🚀 Starting image migration...\n");

    // Get all products
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`[${i + 1}/${products.length}] Processing: ${product.name}`);

      const updatedImages = [];

      for (const imageUrl of product.images) {
        // Skip if already local path
        if (!imageUrl.startsWith("http")) {
          updatedImages.push(imageUrl);
          continue;
        }

        console.log(`  📥 Downloading: ${imageUrl}`);

        // Generate unique filename
        const originalFilename = getFilenameFromUrl(imageUrl);
        const timestamp = Date.now();
        const filename = `${product._id}_${timestamp}_${originalFilename}`;

        // Download image
        const filepath = await downloadImage(imageUrl, filename);

        if (filepath) {
          // Save relative path for database
          const relativePath = `/uploads/products/${filename}`;
          updatedImages.push(relativePath);
          console.log(`  ✅ Saved: ${relativePath}`);
          successCount++;
        } else {
          // Keep original URL if download failed
          updatedImages.push(imageUrl);
          failCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Increase delay to 2 seconds
      }

      // Update product in database
      if (updatedImages.length > 0) {
        product.images = updatedImages;
        await product.save();
        console.log(`  💾 Updated database\n`);
      }
    }

    console.log("\n🎉 Migration completed!");
    console.log(`✅ Success: ${successCount} images`);
    console.log(`❌ Failed: ${failCount} images`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration error:", error);
    process.exit(1);
  }
}

// Run migration
migrateImages();
