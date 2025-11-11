const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// GET route
router.get("/", companyController.getCompanyInfo);

// PUT route
router.put("/", companyController.updateCompanyInfo);

module.exports = router;
