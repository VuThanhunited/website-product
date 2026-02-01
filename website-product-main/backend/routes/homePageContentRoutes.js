const express = require("express");
const router = express.Router();
const homePageContentController = require("../controllers/homePageContentController");
const { protect, authorize } = require("../controllers/authController");

// Public routes
router.get("/", homePageContentController.getHomePageContent);

// Admin-only routes
router.put(
  "/",
  protect,
  authorize("admin"),
  homePageContentController.updateHomePageContent
);

// Feature management
router.post(
  "/features",
  protect,
  authorize("admin"),
  homePageContentController.addFeature
);
router.put(
  "/features/:featureId",
  protect,
  authorize("admin"),
  homePageContentController.updateFeature
);
router.delete(
  "/features/:featureId",
  protect,
  authorize("admin"),
  homePageContentController.deleteFeature
);

// Why Choose Us management
router.post(
  "/why-choose-us",
  protect,
  authorize("admin"),
  homePageContentController.addWhyChooseUsItem
);
router.put(
  "/why-choose-us/:itemId",
  protect,
  authorize("admin"),
  homePageContentController.updateWhyChooseUsItem
);
router.delete(
  "/why-choose-us/:itemId",
  protect,
  authorize("admin"),
  homePageContentController.deleteWhyChooseUsItem
);

module.exports = router;
