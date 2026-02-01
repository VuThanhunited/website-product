const mongoose = require("mongoose");

const sloganSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    textEn: {
      type: String,
      default: "",
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

module.exports = mongoose.model("Slogan", sloganSchema);
