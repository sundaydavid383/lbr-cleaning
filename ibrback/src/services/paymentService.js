// filepath: ibrback/src/services/paymentService.js
const crypto = require("crypto");

const PAYMENT_PROVIDER = (process.env.PAYMENT_PROVIDER || "paystack").toLowerCase();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;
const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL || "https://api.paystack.co";

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const FLUTTERWAVE_PUBLIC_KEY = process.env.FLUTTERWAVE_PUBLIC_KEY;
const FLUTTERWAVE_BASE_URL = process.env.FLUTTERWAVE_BASE_URL || "https://api.flutterwave.com/v3";

const SUPPORTED_PROVIDERS = ["paystack", "flutterwave"];
if (!SUPPORTED_PROVIDERS.includes(PAYMENT_PROVIDER)) {
  throw new Error(`Unsupported PAYMENT_PROVIDER: "${PAYMENT_PROVIDER}". Use "paystack" or "flutterwave".`);
}

const buildPaystackHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
});

const buildFlutterwaveHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
});

const generateReference = (prefix = "LBR") =>
  `${prefix}_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;

/**
 * Initialize a payment with the configured gateway.
 * Returns { provider, reference, authorization_url, access_code, amount, currency, metadata }
 */
const initializePayment = async ({ email, amount, currency = "NGN", customerName, phone, orderId, service }) => {
  const amountKobo = Math.round(Number(amount) * 100);
  const reference = generateReference();

  if (PAYMENT_PROVIDER === "paystack") {
    if (!PAYSTACK_SECRET_KEY) throw new Error("PAYSTACK_SECRET_KEY is not set");

    const payload = {
      email,
      amount: amountKobo,
      currency,
      reference,
      metadata: {
        orderId,
        service,
        customerName,
        phone,
      },
      callback_url: process.env.PAYMENT_CALLBACK_URL || `${process.env.VITE_API_URL || "http://localhost:5100"}/api/payment/verify`,
    };

    const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: buildPaystackHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.status) {
      throw new Error(data.message || "Failed to initialize payment with Paystack");
    }

    return {
      provider: "paystack",
      reference: data.data.reference,
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      amount: Number(amount),
      currency,
      metadata: payload.metadata,
    };
  }

  if (PAYMENT_PROVIDER === "flutterwave") {
    if (!FLUTTERWAVE_SECRET_KEY) throw new Error("FLUTTERWAVE_SECRET_KEY is not set");

    const payload = {
      tx_ref: reference,
      amount: Number(amount).toFixed(2),
      currency,
      redirect_url: process.env.PAYMENT_CALLBACK_URL || `${process.env.VITE_API_URL || "http://localhost:5100"}/api/payment/verify`,
      customer: {
        email,
        name: customerName,
        phonenumber: phone,
      },
      meta: {
        orderId,
        service,
      },
      payment_options: ["card", "banktransfer", "mobilemoney", "ussd"],
    };

    const res = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
      method: "POST",
      headers: buildFlutterwaveHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data.status || data.message !== "success") {
      throw new Error(data.message || "Failed to initialize payment with Flutterwave");
    }

    return {
      provider: "flutterwave",
      reference: data.data.tx_ref,
      authorizationUrl: data.data.link,
      accessCode: data.data.flw_ref,
      amount: Number(amount),
      currency,
      metadata: payload.meta,
    };
  }

  throw new Error(`Unsupported payment provider: ${PAYMENT_PROVIDER}`);
};

/**
 * Verify a payment by reference / transaction ID.
 * Returns { status, transactionId, amount, currency, provider, raw }
 */
const verifyPayment = async (reference) => {
  if (PAYMENT_PROVIDER === "paystack") {
    if (!PAYSTACK_SECRET_KEY) throw new Error("PAYSTACK_SECRET_KEY is not set");

    const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: buildPaystackHeaders(),
    });

    const data = await res.json();
    if (!res.ok || !data.status) {
      throw new Error(data.message || "Failed to verify Paystack payment");
    }

    const txn = data.data;
    const statusMap = {
      success: "PAID",
      completed: "PAID",
      paid: "PAID",
      pending: "PENDING",
      processing: "PENDING",
      failed: "FAILED",
      cancelled: "FAILED",
      refunded: "REFUNDED",
    };

    return {
      status: statusMap[txn.status?.toLowerCase()] || "PENDING",
      transactionId: txn.id || txn.reference,
      amount: txn.amount / 100,
      currency: txn.currency,
      provider: "paystack",
      raw: txn,
    };
  }

  if (PAYMENT_PROVIDER === "flutterwave") {
    if (!FLUTTERWAVE_SECRET_KEY) throw new Error("FLUTTERWAVE_SECRET_KEY is not set");

    const res = await fetch(`${FLUTTERWAVE_BASE_URL}/transactions/${encodeURIComponent(reference)}/verify`, {
      headers: buildFlutterwaveHeaders(),
    });

    const data = await res.json();
    if (!data.status || data.message !== "success") {
      throw new Error(data.message || "Failed to verify Flutterwave payment");
    }

    const txn = data.data;
    const statusMap = {
      successful: "PAID",
      success: "PAID",
      completed: "PAID",
      pending: "PENDING",
      failed: "FAILED",
      cancelled: "FAILED",
      refunded: "REFUNDED",
    };

    return {
      status: statusMap[txn.status?.toLowerCase()] || "PENDING",
      transactionId: txn.id || txn.tx_ref,
      amount: Number(txn.amount),
      currency: txn.currency,
      provider: "flutterwave",
      raw: txn,
    };
  }

  throw new Error(`Unsupported payment provider: ${PAYMENT_PROVIDER}`);
};

/**
 * Verify webhook payload signature.
 * Returns true if the webhook is authentic, false otherwise.
 */
const verifyWebhookSignature = (provider, rawBody, signature) => {
  if (provider === "paystack") {
    if (!PAYSTACK_SECRET_KEY) return false;
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(rawBody).digest("hex");
    return hash === signature;
  }

  if (provider === "flutterwave") {
    if (!FLUTTERWAVE_SECRET_KEY) return false;
    const hash = crypto.createHmac("sha256", FLUTTERWAVE_SECRET_KEY).update(rawBody).digest("hex");
    return hash === signature;
  }

  return false;
};

/**
 * Parse webhook body into a normalized shape.
 * Returns { event, reference, status, amount, currency, provider, raw }
 */
const parseWebhookEvent = (provider, body) => {
  if (provider === "paystack") {
    const event = body.event || "unknown";
    const txn = body.data || {};
    const statusMap = {
      "charge.success": "PAID",
      "charge.failed": "FAILED",
      "charge.refunded": "REFUNDED",
      "transfer.success": "PAID",
      "transfer.failed": "FAILED",
    };

    return {
      event,
      reference: txn.reference,
      status: statusMap[event] || "PENDING",
      amount: txn.amount / 100,
      currency: txn.currency || "NGN",
      provider: "paystack",
      raw: body,
    };
  }

  if (provider === "flutterwave") {
    const event = body.event || "unknown";
    const txn = body.data || {};
    const statusMap = {
      "charge.completed": "PAID",
      "charge.failed": "FAILED",
      "charge.refunded": "REFUNDED",
      "transfer.completed": "PAID",
      "transfer.failed": "FAILED",
    };

    return {
      event,
      reference: txn.tx_ref || txn.id,
      status: statusMap[event] || "PENDING",
      amount: Number(txn.amount),
      currency: txn.currency || "NGN",
      provider: "flutterwave",
      raw: body,
    };
  }

  throw new Error(`Unsupported payment provider: ${provider}`);
};

module.exports = {
  PAYMENT_PROVIDER,
  initializePayment,
  verifyPayment,
  verifyWebhookSignature,
  parseWebhookEvent,
  generateReference,
};
