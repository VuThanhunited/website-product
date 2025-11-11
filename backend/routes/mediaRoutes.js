const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");

// Media Slides routes
router.get("/slides", mediaController.getMediaSlides);
router.post("/slides", mediaController.createMediaSlide);
router.put("/slides/:id", mediaController.updateMediaSlide);
router.delete("/slides/:id", mediaController.deleteMediaSlide);

// Slogans routes
router.get("/slogans", mediaController.getSlogans);
router.post("/slogans", mediaController.createSlogan);
router.put("/slogans/:id", mediaController.updateSlogan);
router.delete("/slogans/:id", mediaController.deleteSlogan);

module.exports = router;
