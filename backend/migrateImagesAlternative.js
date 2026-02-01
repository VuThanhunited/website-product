// Alternative: Download images directly from product.json without MongoDB
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "uploads", "products");

// Create uploads directory
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Created uploads directory");
}

// Read products from JSON
const products = require("./product.json");

// Download image from URL with retry
async function downloadImageWithRetry(url, filename, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${maxRetries}: ${filename}`);

      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
        timeout: 60000,
        maxRedirects: 5,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.ppp.vn/",
          Connection: "keep-alive",
        },
      });

      const filepath = path.join(uploadsDir, filename);
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
        setTimeout(() => {
          writer.close();
          reject(new Error("Write timeout"));
        }, 60000);
      });

      console.log(`  ✅ Success: ${filename}`);
      return filepath;
    } catch (error) {
      console.log(`  ❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        const delay = attempt * 3000; // 3s, 6s, 9s
        console.log(`  ⏳ Waiting ${delay / 1000}s before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  console.log(`  ⚠️ All attempts failed for ${filename}`);
  return null;
}

// Get filename from URL
function getFilenameFromUrl(url) {
  const urlPath = url.split("?")[0];
  let filename = urlPath.split("/").pop();
  filename = filename.replace(/[^a-z0-9._-]/gi, "_");
  return filename;
}

// Main migration function
async function migrateImages() {
  console.log("🚀 Starting image migration (Alternative Method)...\n");

  const results = {
    total: 0,
    success: 0,
    failed: 0,
    skipped: 0,
    failedUrls: [],
  };

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(
      `\n📦 Product ${i + 1}/${products.length}: ${product.name || "Unknown"}`
    );

    if (!product.image) {
      console.log("  ⏭️ No image URL, skipping...");
      results.skipped++;
      continue;
    }

    const imageUrl = product.image;

    // Skip if already local path
    if (!imageUrl.startsWith("http")) {
      console.log("  ⏭️ Already local path, skipping...");
      results.skipped++;
      continue;
    }

    results.total++;
    console.log(`  🔗 URL: ${imageUrl}`);

    const originalFilename = getFilenameFromUrl(imageUrl);
    const timestamp = Date.now();
    const filename = `product_${i}_${timestamp}_${originalFilename}`;

    const downloaded = await downloadImageWithRetry(imageUrl, filename);

    if (downloaded) {
      results.success++;
      // Save mapping for later database update
      console.log(`  💾 Local path: /uploads/products/${filename}`);
    } else {
      results.failed++;
      results.failedUrls.push({ product: product.name, url: imageUrl });
    }

    // Delay between products
    if (i < products.length - 1) {
      console.log("  ⏳ Waiting 2s before next product...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 MIGRATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total images processed: ${results.total}`);
  console.log(`✅ Successfully downloaded: ${results.success}`);
  console.log(`❌ Failed downloads: ${results.failed}`);
  console.log(`⏭️ Skipped (already local): ${results.skipped}`);

  if (results.failedUrls.length > 0) {
    console.log("\n❌ Failed URLs:");
    results.failedUrls.forEach((item) => {
      console.log(`  - ${item.product}: ${item.url}`);
    });
  }

  console.log("\n✅ Image files downloaded to:", uploadsDir);
  console.log("\n⚠️ NEXT STEPS:");
  console.log("1. Check the uploads/products/ folder for downloaded images");
  console.log(
    '2. Commit and push to git: git add uploads/ && git commit -m "Add product images" && git push'
  );
  console.log("3. Deploy to Render to make images available");
  console.log(
    "4. Run the database update script to change image paths in MongoDB"
  );
}

// Run migration
migrateImages()
  .then(() => {
    console.log("\n✅ Migration completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  });
