const mongoose = require("mongoose");
const CompanyInfo = require("./models/CompanyInfo");
require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

// SVG logo as data URL - no external dependency
const logoSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60' width='200' height='60'%3E%3Crect width='200' height='60' fill='%231976D2' rx='4'/%3E%3Ctext x='20' y='40' font-family='Arial,sans-serif' font-size='32' font-weight='bold' fill='%23FFFFFF'%3EEFT%3C/text%3E%3Ctext x='85' y='40' font-family='Arial,sans-serif' font-size='16' fill='%23FFD700'%3ETechnology%3C/text%3E%3Ccircle cx='170' cy='30' r='12' fill='none' stroke='%23FFD700' stroke-width='2'/%3E%3Ccircle cx='170' cy='30' r='6' fill='%23FFD700'/%3E%3C/svg%3E`;

async function updateCompanyLogo() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    let company = await CompanyInfo.findOne();

    if (!company) {
      console.log("📝 Creating new company info...");
      company = new CompanyInfo({
        companyName: "EFT Technology",
        logo: logoSvg,
        address: "123 Đường Kinh Doanh, Thành Phố, Quốc Gia",
        phone: "+84 234 567 890",
        email: "contact@eft-tech.com",
        about: "EFT Technology - Công ty chuyên cung cấp các sản phẩm chăm sóc ô tô chất lượng cao",
        partnerLogos: [],
      });
    } else {
      console.log("📝 Updating existing company info...");
      company.logo = logoSvg;
    }

    await company.save();
    console.log("✅ Company logo updated successfully!");
    console.log("   Logo type: SVG Data URL (inline)");
    console.log("   Company name:", company.companyName);
    console.log("\n💡 Logo is now embedded as SVG data URL");
    console.log("   ✓ No external dependencies");
    console.log("   ✓ Works immediately without network requests");
    console.log("   ✓ No CORS issues");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

updateCompanyLogo()
  .then(() => {
    console.log("\n✅ Update completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Update failed:", error);
    process.exit(1);
  });
