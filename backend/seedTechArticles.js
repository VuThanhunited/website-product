const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Load data from JSON file
const techArticlesData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "techArticles.json"), "utf8"));

async function seedTechArticles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce");
    console.log("✅ Connected to MongoDB");

    // Find or create homeContent
    const HomeContent = mongoose.model("HomeContent", new mongoose.Schema({}, { strict: false }));

    let homeContent = await HomeContent.findOne();

    if (!homeContent) {
      homeContent = new HomeContent({
        techArticles: techArticlesData,
        techArticlesTitle: {
          title: "Thông tin công nghệ kỹ thuật",
          titleEn: "Technical Information",
        },
        features: [],
        whyChooseUs: { title: "", titleEn: "", items: [] },
        cta: {
          title: "",
          titleEn: "",
          description: "",
          descriptionEn: "",
          primaryButtonText: "",
          primaryButtonTextEn: "",
          primaryButtonLink: "",
          secondaryButtonText: "",
          secondaryButtonTextEn: "",
          secondaryButtonLink: "",
        },
      });
    } else {
      homeContent.techArticles = techArticlesData;
      if (!homeContent.techArticlesTitle) {
        homeContent.techArticlesTitle = {
          title: "Thông tin công nghệ kỹ thuật",
          titleEn: "Technical Information",
        };
      }
    }

    await homeContent.save();
    console.log("✅ Tech articles seeded successfully!");
    console.log(`📝 Added ${techArticlesData.length} tech articles`);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding tech articles:", error);
    process.exit(1);
  }
}

seedTechArticles();
