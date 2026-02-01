const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// GET routes
router.get("/", categoryController.getAllCategories);
router.get("/:slug", categoryController.getCategoryBySlug);

// POST routes
router.post("/", categoryController.createCategory);

// PUT routes
router.put("/:id", categoryController.updateCategory);

// DELETE routes
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
