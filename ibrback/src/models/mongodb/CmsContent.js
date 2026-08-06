const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "text",
        "rich_text",
        "array",
        "object",
        "image",
        "boolean",
        "number",
        "json",
      ],
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    label: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    updatedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "cms_content",
  }
);

contentSchema.index({ category: 1, key: 1 });

module.exports = mongoose.model("CmsContent", contentSchema);
