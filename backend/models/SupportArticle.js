const mongoose = require("mongoose");

const supportArticleSchema = new mongoose.Schema(
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
    attachments: [
      {
        filename: String,
        filepath: String,
        filesize: Number,
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

module.exports = mongoose.model("SupportArticle", supportArticleSchema);
