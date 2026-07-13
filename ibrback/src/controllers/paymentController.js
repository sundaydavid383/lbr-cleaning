// filepath: ibrback/src/controllers/paymentController.js
const Payment = require('../models/payment');
const Order = require('../models/order');

/**
 * Initialize payment (for pay-before option)
 */
exports.initializePayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, paymentGateway } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ success: false, message: 'Order ID and amount are required' });
    }

    // Verify order exists and is eligible for payment
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.paymentOption !== 'PAY_BEFORE') {
      return res.status(400).json({ success: false, message: 'Payment not required for this order' });
    }

    if (order.paymentStatus === 'PAID') {
      return res.status(400).json({ success: false, message: 'Payment already completed' });
    }

    // Create payment record
    const payment = await Payment.create({
      orderId: Number(orderId),
      amount: Number(amount),
      paymentMethod: paymentMethod || 'CARD',
      paymentGateway: paymentGateway || 'PAYSTACK',
      status: 'PENDING',
    });

    // Here you would integrate with actual payment gateway (Paystack, Stripe, etc.)
    // For now, we'll simulate a payment initialization

    res.status(200).json({
      success: true,
      message: 'Payment initialized successfully',
      payment: {
        id: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        status: payment.status,
        gateway: payment.paymentGateway,
      },
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ success: false, message: 'Failed to initialize payment' });
  }
};

/**
 * Verify payment (webhook or callback from payment gateway)
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, transactionId, status } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Map string status to enum
    const statusMap = {
      'completed': 'COMPLETED',
      'pending': 'PENDING',
      'failed': 'FAILED',
      'cancelled': 'CANCELLED',
    };
    const mappedStatus = statusMap[status?.toLowerCase()] || status;

    // Update payment status
    await Payment.updateStatus(payment.id, mappedStatus, transactionId);

    // Update order payment status
    const order = await Order.findById(payment.orderId);
    if (order) {
      const orderPaymentStatus = mappedStatus === 'COMPLETED' ? 'PAID' : mappedStatus.toLowerCase();
      await Order.updatePaymentStatus(order.id, orderPaymentStatus);
      
      if (mappedStatus === 'COMPLETED') {
        await Order.updateStatus(order.id, 'CONFIRMED');
      }
    }

    const updatedPayment = await Payment.findById(paymentId);

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment: updatedPayment,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify payment' });
  }
};

/**
 * Get payment status
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
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
    console.error('Get payment status error:', error);
    res.status(500).json({ success: false, message: 'Failed to get payment status' });
  }
};

/**
 * Get payments for an order
 */
exports.getOrderPayments = async (req, res) => {
  try {
    const { orderId } = req.params;

    const payments = await Payment.findByOrderId(orderId);

    res.status(200).json({
      success: true,
      payments: payments,
    });
  } catch (error) {
    console.error('Get order payments error:', error);
    res.status(500).json({ success: false, message: 'Failed to get order payments' });
  }
};