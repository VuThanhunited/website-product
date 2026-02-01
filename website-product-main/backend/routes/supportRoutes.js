const express = require("express");
const router = express.Router();
const supportController = require("../controllers/supportController");

// GET routes
router.get("/", supportController.getAllArticles);
router.get("/admin/all", supportController.getAllArticlesAdmin);
router.get("/:slug", supportController.getArticleBySlug);

// POST routes
router.post("/", supportController.createArticle);

// PUT routes
router.put("/:id", supportController.updateArticle);

// DELETE routes
router.delete("/:id", supportController.deleteArticle);

module.exports = router;
