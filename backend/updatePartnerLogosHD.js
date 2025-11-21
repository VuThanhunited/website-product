const mongoose = require("mongoose");
const CompanyInfo = require("./models/CompanyInfo");

const MONGODB_URI =
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

async function updatePartnerLogos() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Logo chất lượng cao từ CDN
    const partners = [
      {
        name: "Shopee",
        logo: "https://down-vn.img.susercontent.com/file/vn-50009109-1ff7ae938e67ec03dfc597b5e18d5340",
        link: "https://shopee.vn",
      },
      {
        name: "Lazada",
        logo: "https://laz-img-cdn.alicdn.com/images/ims-web/TB1T7._db_1gK0jSZFqXXcpaXXa.png",
        link: "https://lazada.vn",
      },
      {
        name: "Tiki",
        logo: "https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a08.png",
        link: "https://tiki.vn",
      },
    ];

    await CompanyInfo.updateOne({}, { partners });

    console.log("✅ Đã cập nhật logo đối tác HD thành công!");
    console.log("Danh sách đối tác:", partners.map((p) => p.name).join(", "));

    // Verify update
    const companyInfo = await CompanyInfo.findOne();
    console.log("\n📋 Partners trong database:");
    companyInfo.partners.forEach((p) => {
      console.log(`- ${p.name}: ${p.logo}`);
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

updatePartnerLogos();
