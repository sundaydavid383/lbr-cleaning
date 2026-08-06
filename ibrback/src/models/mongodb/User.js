const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: null },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true, default: null },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    address: { type: String, trim: true, default: null },
    city: { type: String, trim: true, default: null },
    propertyType: { type: String, trim: true, default: null },
    referralSource: { type: String, trim: true, default: null },
    avatar: { type: String, trim: true, default: null },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
