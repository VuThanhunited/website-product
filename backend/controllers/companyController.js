const CompanyInfo = require("../models/CompanyInfo");

// Get company info
exports.getCompanyInfo = async (req, res) => {
  try {
    let companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      companyInfo = new CompanyInfo({
        companyName: "Your Company Name",
        address: "Your Address",
        phone: "Your Phone",
      });
      await companyInfo.save();
    }
    res.json(companyInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update company info
exports.updateCompanyInfo = async (req, res) => {
  try {
    let companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      companyInfo = new CompanyInfo(req.body);
    } else {
      Object.assign(companyInfo, req.body);
    }
    await companyInfo.save();
    res.json(companyInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
