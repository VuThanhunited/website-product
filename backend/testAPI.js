const axios = require("axios");

async function testAPI() {
  try {
    const API_URL = "http://127.0.0.1:5000/api";

    console.log("🔍 Testing API endpoint...\n");
    const response = await axios.get(`${API_URL}/home-content`);

    console.log("✅ API Response Status:", response.status);
    console.log("\n📊 Content Keys:", Object.keys(response.data));
    console.log("\n📝 Tech Articles:");
    console.log("  - Count:", response.data.techArticles?.length || 0);
    console.log("  - Title (VI):", response.data.techArticlesTitle?.title || "Not set");
    console.log("  - Title (EN):", response.data.techArticlesTitle?.titleEn || "Not set");

    if (response.data.techArticles && response.data.techArticles.length > 0) {
      console.log("\n📋 Articles:");
      response.data.techArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. ${article.title}`);
      });
    } else {
      console.log("\n⚠️  No tech articles found in API response!");
      console.log("\n🔧 Full response data:");
      console.log(JSON.stringify(response.data, null, 2));
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

testAPI();
