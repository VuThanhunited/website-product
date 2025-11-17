const mongoose = require("mongoose");
const CompanyInfo = require("./models/CompanyInfo");
require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

async function updateCompanyLogo() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    // Find or create company info
    let company = await CompanyInfo.findOne();

    if (!company) {
      console.log("📝 Creating new company info...");
      company = new CompanyInfo({
        companyName: "EFT Technology",
        logo: "/uploads/company/logo.svg",
        address: "123 Tech Street, District 1, Ho Chi Minh City",
        phone: "0123-456-789",
        email: "contact@eft-tech.com",
        about:
          "EFT Technology - Công ty chuyên cung cấp các sản phẩm chăm sóc ô tô chất lượng cao",
        partnerLogos: [],
      });
    } else {
      console.log("📝 Updating existing company info...");
      company.logo = "https://ui-avatars.com/api/?name=EFT+Technology&size=200&background=1976D2&color=fff&bold=true&font-size=0.4";
      company.companyName = company.companyName || "EFT Technology";
    }

    await company.save();
    console.log("✅ Company logo updated successfully!");
    console.log("   Logo path:", company.logo);
    console.log("   Company name:", company.companyName);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

updateCompanyLogo();
