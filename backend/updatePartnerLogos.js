const mongoose = require("mongoose");
const CompanyInfo = require("./models/CompanyInfo");

const MONGODB_URI =
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

async function updatePartnerLogos() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Sử dụng Google favicon service và CDN đáng tin cậy
    const partners = [
      {
        name: "Shopee",
        logo: "https://www.google.com/s2/favicons?domain=shopee.vn&sz=128",
        website: "https://shopee.vn",
      },
      {
        name: "Lazada",
        logo: "https://www.google.com/s2/favicons?domain=lazada.vn&sz=128",
        website: "https://lazada.vn",
      },
      {
        name: "Tiki",
        logo: "https://www.google.com/s2/favicons?domain=tiki.vn&sz=128",
        website: "https://tiki.vn",
      },
    ];

    await CompanyInfo.updateOne({}, { partners });

    console.log("✅ Đã cập nhật logo đối tác thành công!");
    console.log("Danh sách đối tác:", partners.map((p) => p.name).join(", "));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

updatePartnerLogos();
