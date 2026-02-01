const express = require("express");
const router = express.Router();
const multer = require("multer");
const companyController = require("../controllers/companyController");
const { protect, authorize } = require("../controllers/authController");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Company info routes
router.get("/", companyController.getCompanyInfo);
router.put("/", protect, authorize("admin"), companyController.updateCompanyInfo);

// Partners routes
router.get("/partners", companyController.getPartners);
router.post("/partners", protect, authorize("admin"), upload.single("logo"), companyController.createPartner);
router.put("/partners/:id", protect, authorize("admin"), upload.single("logo"), companyController.updatePartner);
router.delete("/partners/:id", protect, authorize("admin"), companyController.deletePartner);

module.exports = router;
