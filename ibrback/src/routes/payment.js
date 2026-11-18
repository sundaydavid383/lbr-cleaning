// filepath: ibrback/src/routes/payment.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const receiptController = require("../controllers/receiptController");
const { authenticate } = require("../middleware/auth");

// Public: start a payment for a booking (price comes from the booking) and
// confirm it afterwards (checked directly with the payment provider).
router.post("/initialize", paymentController.initializePayment);
router.get("/verify", paymentController.verifyPayment);
// Signed by the payment provider; the body arrives raw (see app.js).
router.post("/webhook", paymentController.handleWebhook);

// Private: only the customer who booked (or an admin).
router.get("/:paymentId/status", authenticate, paymentController.getPaymentStatus);
router.get("/:paymentId/receipt", authenticate, receiptController.getReceipt);
router.get("/order/:orderId", authenticate, paymentController.getOrderPayments);

module.exports = router;
