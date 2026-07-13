// filepath: ibrback/src/routes/payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Initialize payment
router.post('/initialize', paymentController.initializePayment);

// Verify payment (webhook/callback)
router.post('/verify', paymentController.verifyPayment);

// Get payment status
router.get('/:paymentId/status', paymentController.getPaymentStatus);

// Get payments for an order
router.get('/order/:orderId', paymentController.getOrderPayments);

module.exports = router;