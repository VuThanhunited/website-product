const TechArticle = require("../models/TechArticle");

// Get all tech articles
exports.getTechArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = { published: true };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { titleEn: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const articles = await TechArticle.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const count = await TechArticle.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error("Error fetching tech articles:", error);
    res.status(500).json({ message: "Error fetching tech articles" });
  }
};

// Get single tech article by slug
exports.getTechArticleBySlug = async (req, res) => {
  try {
    const article = await TechArticle.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!article) {
      return res.status(404).json({ message: "Tech article not found" });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    console.error("Error fetching tech article:", error);
    res.status(500).json({ message: "Error fetching tech article" });
  }
};

// Get tech article by ID
exports.getTechArticleById = async (req, res) => {
  try {
    const article = await TechArticle.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Tech article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching tech article:", error);
    res.status(500).json({ message: "Error fetching tech article" });
  }
};

// Create tech article (admin only)
exports.createTechArticle = async (req, res) => {
  try {
    const article = new TechArticle(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error("Error creating tech article:", error);
    res.status(500).json({ message: "Error creating tech article" });
  }
};

// Update tech article (admin only)
exports.updateTechArticle = async (req, res) => {
  try {
    const article = await TechArticle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!article) {
      return res.status(404).json({ message: "Tech article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error updating tech article:", error);
    res.status(500).json({ message: "Error updating tech article" });
  }
};

// Delete tech article (admin only)
exports.deleteTechArticle = async (req, res) => {
  try {
    const article = await TechArticle.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Tech article not found" });
    }

    res.json({ message: "Tech article deleted successfully" });
  } catch (error) {
    console.error("Error deleting tech article:", error);
    res.status(500).json({ message: "Error deleting tech article" });
  }
};
