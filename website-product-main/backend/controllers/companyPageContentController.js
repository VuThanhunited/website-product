const CompanyPageContent = require("../models/CompanyPageContent");

// Get company page content
exports.getCompanyPageContent = async (req, res) => {
  try {
    let content = await CompanyPageContent.findOne();

    // If no content exists, create default content
    if (!content) {
      content = await CompanyPageContent.create({});
    }

    // Disable caching for dynamic content
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.json(content);
  } catch (error) {
    console.error("Error fetching company page content:", error);
    res.status(500).json({
      message: "Lỗi khi tải nội dung trang công ty",
      error: error.message,
    });
  }
};

// Update company page content (admin only)
exports.updateCompanyPageContent = async (req, res) => {
  try {
    let content = await CompanyPageContent.findOne();

    if (!content) {
      // Create new content if doesn't exist
      content = await CompanyPageContent.create(req.body);
    } else {
      // Update existing content
      Object.assign(content, req.body);
      await content.save();
    }

    res.json({
      message: "Cập nhật nội dung trang công ty thành công",
      content,
    });
  } catch (error) {
    console.error("Error updating company page content:", error);
    res.status(500).json({
      message: "Lỗi khi cập nhật nội dung trang công ty",
      error: error.message,
    });
  }
};

// Add a core value item
exports.addCoreValue = async (req, res) => {
  try {
    const content = await CompanyPageContent.findOne();
    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang công ty" });
    }

    content.values.items.push(req.body);
    await content.save();

    res.json({ message: "Thêm giá trị cốt lõi thành công", content });
  } catch (error) {
    console.error("Error adding core value:", error);
    res.status(500).json({ message: "Lỗi khi thêm giá trị cốt lõi", error: error.message });
  }
};

// Update a core value item
exports.updateCoreValue = async (req, res) => {
  try {
    const { valueId } = req.params;
    const content = await CompanyPageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang công ty" });
    }

    const value = content.values.items.id(valueId);
    if (!value) {
      return res.status(404).json({ message: "Không tìm thấy giá trị" });
    }

    Object.assign(value, req.body);
    await content.save();

    res.json({ message: "Cập nhật giá trị cốt lõi thành công", content });
  } catch (error) {
    console.error("Error updating core value:", error);
    res.status(500).json({
      message: "Lỗi khi cập nhật giá trị cốt lõi",
      error: error.message,
    });
  }
};

// Delete a core value item
exports.deleteCoreValue = async (req, res) => {
  try {
    const { valueId } = req.params;
    const content = await CompanyPageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang công ty" });
    }

    content.values.items.pull(valueId);
    await content.save();

    res.json({ message: "Xóa giá trị cốt lõi thành công", content });
  } catch (error) {
    console.error("Error deleting core value:", error);
    res.status(500).json({ message: "Lỗi khi xóa giá trị cốt lõi", error: error.message });
  }
};

// Add an achievement item
exports.addAchievement = async (req, res) => {
  try {
    const content = await CompanyPageContent.findOne();
    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang công ty" });
    }

    content.achievements.items.push(req.body);
    await content.save();

    res.json({ message: "Thêm thành tựu thành công", content });
  } catch (error) {
    console.error("Error adding achievement:", error);
    res.status(500).json({ message: "Lỗi khi thêm thành tựu", error: error.message });
  }
};

// Update an achievement item
exports.updateAchievement = async (req, res) => {
  try {
    const { achievementId } = req.params;
    const content = await CompanyPageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang công ty" });
    }

    const achievement = content.achievements.items.id(achievementId);
    if (!achievement) {
      return res.status(404).json({ message: "Không tìm thấy thành tựu" });
    }

    Object.assign(achievement, req.body);
    await content.save();

    res.json({ message: "Cập nhật thành tựu thành công", content });
  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật thành tựu", error: error.message });
  }
};

// Delete an achievement item
exports.deleteAchievement = async (req, res) => {
  try {
    const { achievementId } = req.params;
    const content = await CompanyPageContent.findOne();

    if (!content) {
      return res.status(404).json({ message: "Không tìm thấy nội dung trang công ty" });
    }

    content.achievements.items.pull(achievementId);
    await content.save();

    res.json({ message: "Xóa thành tựu thành công", content });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({ message: "Lỗi khi xóa thành tựu", error: error.message });
  }
};
