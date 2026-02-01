const mongoose = require("mongoose");
const CompanyInfo = require("./models/CompanyInfo");

const MONGODB_URI =
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

async function fixPartnerLogos() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Sử dụng logo CDN đáng tin cậy cho các partner
    const partners = [
      {
        name: "Shopee",
        logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png",
        website: "https://shopee.vn",
      },
      {
        name: "Lazada",
        logo: "https://lzd-img-global.slatic.net/g/p/3bf8a934b074cc6f3b255f1a71b26645.png",
        website: "https://lazada.vn",
      },
      {
        name: "Tiki",
        logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Tiki.png",
        website: "https://tiki.vn",
      },
    ];

    const result = await CompanyInfo.findOneAndUpdate(
      {},
      { partners: partners },
      { new: true, upsert: true }
    );

    console.log("✅ Partner logos updated successfully!");
    console.log("Partners:", result.partners);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
}

fixPartnerLogos();
