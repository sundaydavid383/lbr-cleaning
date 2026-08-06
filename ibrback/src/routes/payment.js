// filepath: ibrback/src/routes/payment.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const receiptController = require("../controllers/receiptController");

router.post("/initialize", paymentController.initializePayment);
router.get("/verify", paymentController.verifyPayment);
router.post("/webhook", paymentController.handleWebhook);
router.get("/:paymentId/status", paymentController.getPaymentStatus);
router.get("/:paymentId/receipt", receiptController.getReceipt);
router.get("/order/:orderId", paymentController.getOrderPayments);

module.exports = router;
