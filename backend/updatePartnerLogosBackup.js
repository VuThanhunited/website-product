const mongoose = require("mongoose");
const CompanyInfo = require("./models/CompanyInfo");

const MONGODB_URI =
  "mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty";

async function updatePartnerLogosWithBackup() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Dùng logo từ các nguồn reliable hơn
    const partners = [
      {
        name: "Shopee",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/512px-Shopee_logo.svg.png",
        website: "https://shopee.vn",
      },
      {
        name: "Lazada",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Lazada_2023.svg/512px-Lazada_2023.svg.png",
        website: "https://lazada.vn",
      },
      {
        name: "Tiki",
        logo: "https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png",
        website: "https://tiki.vn",
      },
    ];

    const result = await CompanyInfo.findOneAndUpdate(
      {},
      { partners: partners },
      { new: true, upsert: true }
    );

    console.log("✅ Partner logos updated with backup URLs!");
    console.log("Partners:", result.partners);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
}

updatePartnerLogosWithBackup();
