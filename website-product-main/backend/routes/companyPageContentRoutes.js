const express = require("express");
const router = express.Router();
const companyPageContentController = require("../controllers/companyPageContentController");
const { protect, authorize } = require("../controllers/authController");

// Public routes
router.get("/", companyPageContentController.getCompanyPageContent);

// Admin-only routes
router.put(
  "/",
  protect,
  authorize("admin"),
  companyPageContentController.updateCompanyPageContent
);

// Core Values management
router.post(
  "/values",
  protect,
  authorize("admin"),
  companyPageContentController.addCoreValue
);
router.put(
  "/values/:valueId",
  protect,
  authorize("admin"),
  companyPageContentController.updateCoreValue
);
router.delete(
  "/values/:valueId",
  protect,
  authorize("admin"),
  companyPageContentController.deleteCoreValue
);

// Achievements management
router.post(
  "/achievements",
  protect,
  authorize("admin"),
  companyPageContentController.addAchievement
);
router.put(
  "/achievements/:achievementId",
  protect,
  authorize("admin"),
  companyPageContentController.updateAchievement
);
router.delete(
  "/achievements/:achievementId",
  protect,
  authorize("admin"),
  companyPageContentController.deleteAchievement
);

module.exports = router;
