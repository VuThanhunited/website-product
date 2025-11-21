const SupportArticle = require("../models/SupportArticle");

// Get all support articles (for public - only published)
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await SupportArticle.find({ published: true }).sort({
      createdAt: -1,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all support articles for admin (including unpublished)
exports.getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await SupportArticle.find().sort({
      createdAt: -1,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await SupportArticle.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create article
exports.createArticle = async (req, res) => {
  try {
    const article = new SupportArticle(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const article = await SupportArticle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await SupportArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    res.json({ message: "Đã xóa bài viết thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
