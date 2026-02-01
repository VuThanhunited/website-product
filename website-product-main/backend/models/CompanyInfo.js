const mongoose = require("mongoose");

const companyInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    aboutImages: [
      {
        type: String,
      },
    ],
    aboutVideos: [
      {
        type: String,
      },
    ],
    socialLinks: {
      zalo: { type: String, default: "" },
      youtube: { type: String, default: "" },
      instagram: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
    },
    partners: [
      {
        name: String,
        logo: String,
        website: String,
      },
    ],
    topSectionBg: {
      type: String,
      default: "",
    },
    topSectionBgColor: {
      type: String,
      default: "#ffffff",
    },
    headerBgColor: {
      type: String,
      default: "#ffffff",
    },
    headerBgImage: {
      type: String,
      default: "",
    },
    companyPageBgColor: {
      type: String,
      default: "#f8f9fa",
    },
    companyPageBgImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompanyInfo", companyInfoSchema);
