const mongoose = require("mongoose");
require("dotenv").config();

async function checkHomeContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce");
    console.log("✅ Connected to MongoDB");

    const HomeContent = mongoose.model("HomeContent", new mongoose.Schema({}, { strict: false }));

    const homeContent = await HomeContent.findOne();

    if (!homeContent) {
      console.log("❌ No home content found!");
    } else {
      console.log("✅ Home content found!");
      console.log("\n📊 Tech Articles Count:", homeContent.techArticles?.length || 0);
      console.log("\n📝 Tech Articles Title:");
      console.log("  - Vietnamese:", homeContent.techArticlesTitle?.title || "Not set");
      console.log("  - English:", homeContent.techArticlesTitle?.titleEn || "Not set");

      if (homeContent.techArticles && homeContent.techArticles.length > 0) {
        console.log("\n📋 Articles List:");
        homeContent.techArticles.forEach((article, index) => {
          console.log(`\n${index + 1}. ${article.title}`);
          console.log(`   - English: ${article.titleEn}`);
          console.log(`   - Thumbnail: ${article.thumbnail ? "✓" : "✗"}`);
          console.log(`   - Link: ${article.link || "No link"}`);
        });
      }
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkHomeContent();
