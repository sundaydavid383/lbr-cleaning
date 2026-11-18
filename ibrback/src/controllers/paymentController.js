// filepath: ibrback/src/controllers/paymentController.js
const { repositories } = require("../repositories");
const { paymentRepository, orderRepository } = repositories;
const { initializePayment: gatewayInitialize, verifyPayment: gatewayVerify, verifyWebhookSignature, parseWebhookEvent, frontendUrl } = require("../services/paymentService");
const { canAccessOrder } = require("../middleware/auth");

// A payment only counts as PAID if the customer paid at least what we asked for.
const checkPaidAmount = (status, paidAmount, expectedAmount, reference) => {
  if (status !== "PAID") return status;
  if (Number(paidAmount) + 0.01 < Number(expectedAmount)) {
    console.warn(`[payment] ${reference}: paid ${paidAmount} but expected ${expectedAmount} - marking FAILED`);
    return "FAILED";
  }
  return status;
};

/**
 * Initialize a payment via the configured gateway (Paystack/Flutterwave).
 * Public — used by the frontend after booking for PAY_BEFORE orders.
 */
exports.initializePayment = async (req, res) => {
  try {
    const { orderId, currency = "NGN" } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "orderId is required" });
    }

    const order = await orderRepository.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // The price always comes from the booking itself (set by the server from
    // the CMS price list), never from the browser, which could be edited.
    const amount = Number(order.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "This booking has no price set. Please contact us." });
    }

    if (order.paymentOption !== "PAY_BEFORE") {
      return res.status(400).json({ success: false, message: "Payment not required for this order" });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({ success: false, message: "Payment already completed" });
    }

    const gatewayResult = await gatewayInitialize({
      email: order.email,
      amount,
      currency,
      customerName: order.customerName,
      phone: order.phone,
      orderId: order.id,
      service: order.service,
    });

    await paymentRepository.create({
      orderId: order.id,
      amount: Number(amount),
      currency: gatewayResult.currency,
      paymentMethod: "CARD",
      paymentGateway: gatewayResult.provider.toUpperCase(),
      gatewayTransactionId: gatewayResult.reference,
      status: "PENDING",
      metadata: gatewayResult.metadata || {},
    });

    res.status(200).json({
      success: true,
      message: "Payment initialized successfully",
      payment: {
        id: gatewayResult.reference,
        orderId: order.id,
        amount: Number(amount),
        currency: gatewayResult.currency,
        status: "PENDING",
        gateway: gatewayResult.provider,
        authorizationUrl: gatewayResult.authorizationUrl,
        accessCode: gatewayResult.accessCode,
      },
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to initialize payment" });
  }
};

/**
 * Payment callback (user redirected back from gateway).
 * Verifies payment status by reference and updates order/payment.
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { reference, trxref, orderId } = req.query;
    const gatewayReference = reference || trxref;

    if (!gatewayReference) {
      return res.status(400).json({ success: false, message: "Payment reference is required" });
    }

    // A customer's browser landing here straight from the payment page (older
    // callback setting): send them to the website, which confirms the payment.
    if (req.accepts(["json", "html"]) === "html") {
      const known = await paymentRepository.findByTransactionId(gatewayReference);
      const target = `${frontendUrl()}/payment?reference=${encodeURIComponent(gatewayReference)}&orderId=${encodeURIComponent(known?.orderId || orderId || "")}`;
      return res.redirect(302, target);
    }

    const verification = await gatewayVerify(gatewayReference);

    const payment = await paymentRepository.findByTransactionId(gatewayReference);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment record not found" });
    }

    const status = checkPaidAmount(verification.status, verification.amount, payment.amount, gatewayReference);
    await paymentRepository.updateStatus(payment.id, status, verification.transactionId);

    const order = await orderRepository.findById(payment.orderId);
    if (order) {
      await orderRepository.updatePaymentStatus(order.id, status);

      if (status === "PAID") {
        await orderRepository.updateStatus(order.id, "CONFIRMED");
      } else if (status === "FAILED") {
        await orderRepository.updateStatus(order.id, "CANCELLED");
      }
    }

    const updatedPayment = await paymentRepository.findById(payment.id);

    res.status(200).json({
      success: true,
      message: status === "PAID" ? "Payment successful!" : "Payment verification completed",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to verify payment" });
  }
};

/**
 * Payment webhook (gateway posts here asynchronously).
 * Verifies signature, updates status, sends notification email.
 */
exports.handleWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"] || req.headers["x-flutterwave-signature"];
    const rawBody = req.body;
    const provider = process.env.PAYMENT_PROVIDER || "paystack";

    // Every webhook must be signed by the payment provider, otherwise anyone
    // could post a fake "paid" message.
    if (!signature || !Buffer.isBuffer(rawBody) || !verifyWebhookSignature(provider, rawBody, signature)) {
      console.warn("Rejected webhook: missing or invalid signature");
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }

    const body = JSON.parse(rawBody.toString("utf8"));
    const event = parseWebhookEvent(provider, body);

    if (!event.reference) {
      return res.status(400).json({ success: false, message: "Missing reference in webhook" });
    }

    const payment = await paymentRepository.findByTransactionId(event.reference);
    if (!payment) {
      console.warn(`Webhook: payment not found for reference ${event.reference}`);
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const status = checkPaidAmount(event.status, event.amount, payment.amount, event.reference);
    await paymentRepository.updateStatus(payment.id, status, event.reference);

    const order = await orderRepository.findById(payment.orderId);
    if (order) {
      await orderRepository.updatePaymentStatus(order.id, status);

      if (status === "PAID") {
        await orderRepository.updateStatus(order.id, "CONFIRMED");
      } else if (status === "FAILED") {
        await orderRepository.updateStatus(order.id, "CANCELLED");
      }
    }

    console.log(`Webhook processed: ${event.event} for reference ${event.reference} -> ${status}`);
    res.status(200).json({ success: true, received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
};

/**
 * Get payment status by payment ID.
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await paymentRepository.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    const order = await orderRepository.findById(payment.orderId);
    if (!canAccessOrder(req, order)) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        status: payment.status,
        paymentDate: payment.paymentDate,
        gateway: payment.paymentGateway,
      },
    });
  } catch (error) {
    console.error("Get payment status error:", error);
    res.status(500).json({ success: false, message: "Failed to get payment status" });
  }
};

/**
 * Get all payments for a specific order.
 */
exports.getOrderPayments = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderRepository.findById(orderId);
    if (!canAccessOrder(req, order)) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const payments = await paymentRepository.findByOrderId(orderId);

    res.status(200).json({
      success: true,
      payments: payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        paymentDate: p.paymentDate,
        gateway: p.paymentGateway,
        transactionId: p.gatewayTransactionId,
      })),
    });
  } catch (error) {
    console.error("Get order payments error:", error);
    res.status(500).json({ success: false, message: "Failed to get order payments" });
  }
};
