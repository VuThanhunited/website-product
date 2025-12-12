const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { protect, authorize } = require("../controllers/authController");

// Company info routes
router.get("/", companyController.getCompanyInfo);
router.put("/", protect, authorize("admin"), companyController.updateCompanyInfo);

// Partners routes
router.get("/partners", companyController.getPartners);
router.post("/partners", protect, authorize("admin"), companyController.createPartner);
router.put("/partners/:id", protect, authorize("admin"), companyController.updatePartner);
router.delete("/partners/:id", protect, authorize("admin"), companyController.deletePartner);

module.exports = router;
