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
    // Disable caching for dynamic content
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
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

// Get all partners
exports.getPartners = async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      return res.json([]);
    }
    // Return partners with _id for each item
    const partners = companyInfo.partners.map((partner) => ({
      _id: partner._id,
      name: partner.name,
      logo: partner.logo,
      link: partner.website,
    }));
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new partner
exports.createPartner = async (req, res) => {
  try {
    let companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      companyInfo = new CompanyInfo({
        companyName: "Company",
        partners: [],
      });
    }
    const newPartner = {
      name: req.body.name,
      logo: req.body.logo || req.body.logoUrl,
      website: req.body.link,
    };
    companyInfo.partners.push(newPartner);
    await companyInfo.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a partner
exports.updatePartner = async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      return res.status(404).json({ error: "Company info not found" });
    }
    const partner = companyInfo.partners.id(req.params.id);
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    partner.name = req.body.name || partner.name;
    partner.logo = req.body.logo || req.body.logoUrl || partner.logo;
    partner.website = req.body.link || partner.website;
    await companyInfo.save();
    res.json(partner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a partner
exports.deletePartner = async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      return res.status(404).json({ error: "Company info not found" });
    }
    companyInfo.partners.pull(req.params.id);
    await companyInfo.save();
    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
