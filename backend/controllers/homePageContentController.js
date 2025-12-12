const HomePageContent = require("../models/HomePageContent");

// Get home page content
exports.getHomePageContent = async (req, res) => {
  try {
    let content = await HomePageContent.findOne();

    // If no content exists, create default content
    if (!content) {
      content = await HomePageContent.create({});
    }

    // Disable caching for dynamic content
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.json(content);
  } catch (error) {
    console.error("Error fetching home page content:", error);
    res.status(500).json({
      message: "Lỗi khi tải nội dung trang chủ",
      error: error.message,
    });
  }
};

// Update home page content (admin only)
exports.updateHomePageContent = async (req, res) => {
  try {
    let content = await HomePageContent.findOne();

    if (!content) {
      // Create new content if doesn't exist
      content = await HomePageContent.create(req.body);
    } else {
      // Update existing content
      Object.assign(content, req.body);
      await content.save();
    }

    res.json({ message: "Cập nhật nội dung trang chủ thành công", content });
  } catch (error) {
    console.error("Error updating home page content:", error);
    res.status(500).json({
      message: "Lỗi khi cập nhật nội dung trang chủ",
      error: error.message,
    });
  }
};

// Add a feature item
exports.addFeature = async (req, res) => {
  try {
    const content = await HomePageContent.findOne();
    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang chủ" });
    }

    content.features.push(req.body);
    await content.save();

    res.json({ message: "Thêm tính năng thành công", content });
  } catch (error) {
    console.error("Error adding feature:", error);
    res.status(500).json({ message: "Lỗi khi thêm tính năng", error: error.message });
  }
};

// Update a feature item
exports.updateFeature = async (req, res) => {
  try {
    const { featureId } = req.params;
    const content = await HomePageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang chủ" });
    }

    const feature = content.features.id(featureId);
    if (!feature) {
      return res.status(404).json({ message: "Không tìm thấy tính năng" });
    }

    Object.assign(feature, req.body);
    await content.save();

    res.json({ message: "Cập nhật tính năng thành công", content });
  } catch (error) {
    console.error("Error updating feature:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật tính năng", error: error.message });
  }
};

// Delete a feature item
exports.deleteFeature = async (req, res) => {
  try {
    const { featureId } = req.params;
    const content = await HomePageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang chủ" });
    }

    content.features.pull(featureId);
    await content.save();

    res.json({ message: "Xóa tính năng thành công", content });
  } catch (error) {
    console.error("Error deleting feature:", error);
    res.status(500).json({ message: "Lỗi khi xóa tính năng", error: error.message });
  }
};

// Add a "Why Choose Us" item
exports.addWhyChooseUsItem = async (req, res) => {
  try {
    const content = await HomePageContent.findOne();
    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang chủ" });
    }

    content.whyChooseUs.items.push(req.body);
    await content.save();

    res.json({ message: "Thêm mục thành công", content });
  } catch (error) {
    console.error("Error adding why choose us item:", error);
    res.status(500).json({ message: "Lỗi khi thêm mục", error: error.message });
  }
};

// Update a "Why Choose Us" item
exports.updateWhyChooseUsItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const content = await HomePageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang chủ" });
    }

    const item = content.whyChooseUs.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Không tìm thấy mục" });
    }

    Object.assign(item, req.body);
    await content.save();

    res.json({ message: "Cập nhật mục thành công", content });
  } catch (error) {
    console.error("Error updating why choose us item:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật mục", error: error.message });
  }
};

// Delete a "Why Choose Us" item
exports.deleteWhyChooseUsItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const content = await HomePageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang chủ" });
    }

    content.whyChooseUs.items.pull(itemId);
    await content.save();

    res.json({ message: "Xóa mục thành công", content });
  } catch (error) {
    console.error("Error deleting why choose us item:", error);
    res.status(500).json({ message: "Lỗi khi xóa mục", error: error.message });
  }
};
