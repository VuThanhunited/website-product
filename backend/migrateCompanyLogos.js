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

const CompanyInfo = require("./models/CompanyInfo");

// Create uploads directory
const uploadsDir = path.join(__dirname, "uploads", "company");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads/company directory");
}

// Download image
async function downloadImage(url, filename) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const filepath = path.join(uploadsDir, filename);
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(filepath));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`❌ Failed to download ${url}:`, error.message);
    return null;
  }
}

async function migrateCompanyLogos() {
  try {
    console.log("🚀 Starting company logo migration...\n");

    const companyInfo = await CompanyInfo.findOne({});

    if (!companyInfo) {
      console.log("⚠️ No company info found");
      process.exit(0);
    }

    console.log(`📦 Processing company: ${companyInfo.name}\n`);

    // Migrate main logo
    if (companyInfo.logo && companyInfo.logo.startsWith("http")) {
      console.log(`📥 Downloading logo: ${companyInfo.logo}`);
      const filename = `logo_${Date.now()}.png`;
      const filepath = await downloadImage(companyInfo.logo, filename);

      if (filepath) {
        companyInfo.logo = `/uploads/company/${filename}`;
        console.log(`✅ Logo saved: ${companyInfo.logo}`);
      }
    }

    // Migrate partner logos
    if (companyInfo.partners && companyInfo.partners.length > 0) {
      for (let i = 0; i < companyInfo.partners.length; i++) {
        const partner = companyInfo.partners[i];

        if (partner.logo && partner.logo.startsWith("http")) {
          console.log(`📥 Downloading partner logo: ${partner.name}`);
          const filename = `partner_${partner.name.replace(
            /\s/g,
            "_"
          )}_${Date.now()}.png`;
          const filepath = await downloadImage(partner.logo, filename);

          if (filepath) {
            partner.logo = `/uploads/company/${filename}`;
            console.log(`✅ Partner logo saved: ${partner.logo}`);
          }

          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    // Save to database
    await companyInfo.save();
    console.log("\n💾 Database updated!");
    console.log("🎉 Company logo migration completed!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration error:", error);
    process.exit(1);
  }
}

migrateCompanyLogos();
