const MediaSlide = require("../models/MediaSlide");
const Slogan = require("../models/Slogan");

// Get all active media slides
exports.getMediaSlides = async (req, res) => {
  try {
    const slides = await MediaSlide.find({ active: true })
      .populate("linkToProduct")
      .sort({ order: 1 })
      .limit(6);
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create media slide
exports.createMediaSlide = async (req, res) => {
  try {
    const slide = new MediaSlide(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update media slide
exports.updateMediaSlide = async (req, res) => {
  try {
    const slide = await MediaSlide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }
    res.json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete media slide
exports.deleteMediaSlide = async (req, res) => {
  try {
    const slide = await MediaSlide.findByIdAndDelete(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }
    res.json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all active slogans
exports.getSlogans = async (req, res) => {
  try {
    const slogans = await Slogan.find({ active: true }).sort({ order: 1 });
    res.json(slogans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create slogan
exports.createSlogan = async (req, res) => {
  try {
    const slogan = new Slogan(req.body);
    await slogan.save();
    res.status(201).json(slogan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update slogan
exports.updateSlogan = async (req, res) => {
  try {
    const slogan = await Slogan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!slogan) {
      return res.status(404).json({ error: "Slogan not found" });
    }
    res.json(slogan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete slogan
exports.deleteSlogan = async (req, res) => {
  try {
    const slogan = await Slogan.findByIdAndDelete(req.params.id);
    if (!slogan) {
      return res.status(404).json({ error: "Slogan not found" });
    }
    res.json({ message: "Slogan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
