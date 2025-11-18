const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Company info routes
router.get("/", companyController.getCompanyInfo);
router.put("/", companyController.updateCompanyInfo);

// Partners routes
router.get("/partners", companyController.getPartners);
router.post("/partners", companyController.createPartner);
router.put("/partners/:id", companyController.updatePartner);
router.delete("/partners/:id", companyController.deletePartner);

module.exports = router;
