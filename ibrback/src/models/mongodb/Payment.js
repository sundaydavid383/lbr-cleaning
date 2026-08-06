const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: {
      type: String,
      enum: ["NGN", "USD", "EUR"],
      default: "NGN",
    },
    paymentMethod: {
      type: String,
      enum: ["CARD", "BANK_TRANSFER", "CASH", "WALLET"],
      default: "CARD",
    },
    paymentGateway: {
      type: String,
      enum: ["STRIPE", "PAYSTACK", "FLUTTERWAVE", "MANUAL"],
      default: "PAYSTACK",
    },
    gatewayTransactionId: { type: String, default: null },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    paymentDate: { type: Date, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    collection: "payments",
  }
);

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ paymentGateway: 1 });
paymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Payment", paymentSchema);
