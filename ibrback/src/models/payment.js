// filepath: ibrback/src/models/payment.js
const prisma = require('../config/database');

/**
 * Payment Model - PostgreSQL/Prisma
 * Replaces Mongoose model for Payments
 */

const Payment = {
  /**
   * Create a new payment
   * @param {Object} data - Payment data
   * @returns {Promise<Object>} Created payment
   */
  async create(data) {
    return prisma.payment.create({
      data: {
        orderId: data.orderId,
        amount: data.amount,
        currency: data.currency || 'NGN',
        paymentMethod: data.paymentMethod || 'CARD',
        paymentGateway: data.paymentGateway || 'PAYSTACK',
        gatewayTransactionId: data.gatewayTransactionId || null,
        status: data.status || 'PENDING',
        paymentDate: data.paymentDate || null,
        metadata: data.metadata || {},
      },
    });
  },

  /**
   * Find payment by ID
   * @param {number} id - Payment ID
   * @returns {Promise<Object|null>} Payment or null
   */
  async findById(id) {
    return prisma.payment.findUnique({
      where: { id: Number(id) },
      include: {
        order: true,
      },
    });
  },

  /**
   * Find payment by transaction ID
   * @param {string} transactionId - Gateway transaction ID
   * @returns {Promise<Object|null>} Payment or null
   */
  async findByTransactionId(transactionId) {
    return prisma.payment.findFirst({
      where: { gatewayTransactionId: transactionId },
      include: {
        order: true,
      },
    });
  },

  /**
   * Get all payments with pagination
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of payments
   */
  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    
    return prisma.payment.findMany({
      where: where || {},
      orderBy: orderBy || { createdAt: 'desc' },
      skip: skip || 0,
      take: take || 50,
      include: {
        order: true,
      },
    });
  },

  /**
   * Find payments by order ID
   * @param {number} orderId - Order ID
   * @returns {Promise<Array>} Payments
   */
  async findByOrderId(orderId) {
    return prisma.payment.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { createdAt: 'desc' },
      include: {
        order: true,
      },
    });
  },

  /**
   * Find payments by status
   * @param {string} status - Payment status
   * @returns {Promise<Array>} Payments
   */
  async findByStatus(status) {
    return prisma.payment.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Update payment
   * @param {number} id - Payment ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated payment
   */
  async update(id, data) {
    return prisma.payment.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Update payment status
   * @param {number} id - Payment ID
   * @param {string} status - New status
   * @param {string} transactionId - Gateway transaction ID
   * @returns {Promise<Object>} Updated payment
   */
  async updateStatus(id, status, transactionId = null) {
    const updateData = {
      status,
      updatedAt: new Date(),
    };
    
    if (transactionId) {
      updateData.gatewayTransactionId = transactionId;
    }
    
    if (status === 'COMPLETED' || status === 'PAID') {
      updateData.paymentDate = new Date();
    }
    
    return prisma.payment.update({
      where: { id: Number(id) },
      data: updateData,
    });
  },

  /**
   * Delete payment
   * @param {number} id - Payment ID
   * @returns {Promise<Object>} Deleted payment
   */
  async delete(id) {
    return prisma.payment.delete({
      where: { id: Number(id) },
    });
  },

  /**
   * Count payments
   * @param {Object} where - Where clause
   * @returns {Promise<number>} Count
   */
  async count(where = {}) {
    return prisma.payment.count({ where });
  },
};

module.exports = Payment;