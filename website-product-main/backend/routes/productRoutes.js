const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET routes
router.get("/", productController.getAllProducts);
router.get("/featured", productController.getFeaturedProducts);
router.get("/id/:id", productController.getProductById);
router.get("/:slug", productController.getProductBySlug);

// POST routes
router.post("/", productController.createProduct);

// PUT routes
router.put("/:id", productController.updateProduct);

// DELETE routes
router.delete("/:id", productController.deleteProduct);

module.exports = router;
