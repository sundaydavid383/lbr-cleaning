// filepath: ibrback/src/controllers/paymentController.js
const { repositories } = require("../repositories");
const { paymentRepository, orderRepository } = repositories;
const { initializePayment: gatewayInitialize, verifyPayment: gatewayVerify, verifyWebhookSignature, parseWebhookEvent } = require("../services/paymentService");

/**
 * Initialize a payment via the configured gateway (Paystack/Flutterwave).
 * Public — used by the frontend after booking for PAY_BEFORE orders.
 */
exports.initializePayment = async (req, res) => {
  try {
    const { orderId, email, amount, currency = "NGN", customerName, phone, service } = req.body;

    if (!orderId || !email || !amount) {
      return res.status(400).json({ success: false, message: "orderId, email, and amount are required" });
    }

    const order = await orderRepository.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.paymentOption !== "PAY_BEFORE") {
      return res.status(400).json({ success: false, message: "Payment not required for this order" });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({ success: false, message: "Payment already completed" });
    }

    const gatewayResult = await gatewayInitialize({
      email,
      amount: Number(amount),
      currency,
      customerName: customerName || order.customerName,
      phone: phone || order.phone,
      orderId: order.id,
      service: service || order.service,
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

    const verification = await gatewayVerify(gatewayReference);

    const payment = await paymentRepository.findByTransactionId(gatewayReference);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment record not found" });
    }

    await paymentRepository.updateStatus(payment.id, verification.status, verification.transactionId);

    const order = await orderRepository.findById(payment.orderId);
    if (order) {
      await orderRepository.updatePaymentStatus(order.id, verification.status);

      if (verification.status === "PAID") {
        await orderRepository.updateStatus(order.id, "CONFIRMED");
      } else if (verification.status === "FAILED") {
        await orderRepository.updateStatus(order.id, "CANCELLED");
      }
    }

    const updatedPayment = await paymentRepository.findById(payment.id);

    res.status(200).json({
      success: true,
      message: verification.status === "PAID" ? "Payment successful!" : "Payment verification completed",
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

    if (signature && !verifyWebhookSignature(provider, rawBody, signature)) {
      console.warn("Invalid webhook signature");
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }

    const body = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;
    const event = parseWebhookEvent(provider, body);

    if (!event.reference) {
      return res.status(400).json({ success: false, message: "Missing reference in webhook" });
    }

    const payment = await paymentRepository.findByTransactionId(event.reference);
    if (!payment) {
      console.warn(`Webhook: payment not found for reference ${event.reference}`);
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    await paymentRepository.updateStatus(payment.id, event.status, event.reference);

    const order = await orderRepository.findById(payment.orderId);
    if (order) {
      await orderRepository.updatePaymentStatus(order.id, event.status);

      if (event.status === "PAID") {
        await orderRepository.updateStatus(order.id, "CONFIRMED");
      } else if (event.status === "FAILED") {
        await orderRepository.updateStatus(order.id, "CANCELLED");
      }
    }

    console.log(`Webhook processed: ${event.event} for reference ${event.reference} -> ${event.status}`);
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
