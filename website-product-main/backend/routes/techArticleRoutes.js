const express = require("express");
const router = express.Router();
const techArticleController = require("../controllers/techArticleController");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/", techArticleController.getTechArticles);
router.get("/slug/:slug", techArticleController.getTechArticleBySlug);
router.get("/:id", techArticleController.getTechArticleById);

// Admin routes (protected)
router.post("/", protect, techArticleController.createTechArticle);
router.put("/:id", protect, techArticleController.updateTechArticle);
router.delete("/:id", protect, techArticleController.deleteTechArticle);

module.exports = router;
