const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const { protect, authorize } = require("../controllers/authController");

// Media Slides routes
router.get("/slides", mediaController.getMediaSlides);
router.post("/slides", protect, authorize("admin"), mediaController.createMediaSlide);
router.put("/slides/:id", protect, authorize("admin"), mediaController.updateMediaSlide);
router.delete("/slides/:id", protect, authorize("admin"), mediaController.deleteMediaSlide);

// Slogans routes
router.get("/slogans", mediaController.getSlogans);
router.post("/slogans", mediaController.createSlogan);
router.put("/slogans/:id", mediaController.updateSlogan);
router.delete("/slogans/:id", mediaController.deleteSlogan);

module.exports = router;
