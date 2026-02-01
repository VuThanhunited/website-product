const mongoose = require("mongoose");

const techArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleEn: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    contentEn: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TechArticle", techArticleSchema);
