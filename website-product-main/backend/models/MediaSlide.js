const mongoose = require("mongoose");

const mediaSlideSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    linkToProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MediaSlide", mediaSlideSchema);
