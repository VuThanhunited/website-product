const HomePageContent = require("../models/HomePageContent");
const fs = require("fs");
const path = require("path");

// Load data from JSON file
const techArticlesData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "techArticles.json"), "utf8"));

exports.seedTechArticles = async (req, res) => {
  try {
    let homeContent = await HomePageContent.findOne();

    if (!homeContent) {
      homeContent = new HomePageContent({
        techArticles: techArticlesData,
        techArticlesTitle: {
          title: "Thông tin công nghệ kỹ thuật",
          titleEn: "Technical Information",
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

    res.json({
      message: "Tech articles seeded successfully!",
      count: techArticlesData.length,
    });
  } catch (error) {
    console.error("Error seeding tech articles:", error);
    res.status(500).json({
      message: "Error seeding tech articles",
      error: error.message,
    });
  }
};
