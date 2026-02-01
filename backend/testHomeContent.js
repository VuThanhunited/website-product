const axios = require("axios");

async function testHomeContent() {
  try {
    console.log("Testing /api/home-content endpoint...\n");

    const response = await axios.get("http://localhost:5000/api/home-content");

    console.log("✅ Response Status:", response.status);
    console.log("\n📊 Home Content Data:");
    console.log("- Features:", response.data.features?.length || 0, "items");
    console.log("- Features Title:", response.data.featuresTitle?.title);
    console.log("- Tech Articles:", response.data.techArticles?.length || 0, "articles");
    console.log("- Tech Articles Title:", response.data.techArticlesTitle?.title);
    console.log("- Why Choose Us items:", response.data.whyChooseUs?.items?.length || 0);

    if (response.data.techArticles && response.data.techArticles.length > 0) {
      console.log("\n📝 First Tech Article:");
      console.log("  - Title:", response.data.techArticles[0].title);
      console.log("  - Title EN:", response.data.techArticles[0].titleEn);
      console.log("  - Has thumbnail:", !!response.data.techArticles[0].thumbnail);
      console.log("  - Has link:", !!response.data.techArticles[0].link);
    }

    console.log("\n✅ API is working correctly!");
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

testHomeContent();
