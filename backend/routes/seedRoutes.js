const express = require("express");
const router = express.Router();
const seedController = require("../controllers/seedController");
const { protect, authorize } = require("../controllers/authController");

// Admin-only seed route
router.post("/tech-articles", protect, authorize("admin"), seedController.seedTechArticles);

module.exports = router;
