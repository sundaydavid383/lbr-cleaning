const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "subscribers",
  }
);

subscriberSchema.index({ isActive: 1 });
subscriberSchema.index({ subscribedAt: -1 });

module.exports = mongoose.model("Subscriber", subscriberSchema);
