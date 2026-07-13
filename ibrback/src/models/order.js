// filepath: ibrback/src/models/order.js
const prisma = require('../config/database');

/**
 * Order Model - PostgreSQL/Prisma
 * Replaces Mongoose model for Orders
 */

const Order = {
  /**
   * Create a new order
   * @param {Object} data - Order data
   * @returns {Promise<Object>} Created order
   */
  async create(data) {
    return prisma.order.create({
      data: {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        paymentOption: data.paymentOption || 'PAY_AFTER',
        status: data.status || 'PENDING',
        paymentStatus: data.paymentStatus || 'PENDING',
        paymentId: data.paymentId || null,
        amount: data.amount || null,
        notes: data.notes || null,
      },
    });
  },

  /**
   * Find order by ID
   * @param {number} id - Order ID
   * @returns {Promise<Object|null>} Order or null
   */
  async findById(id) {
    return prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        payments: true,
      },
    });
  },

  /**
   * Find order by payment ID
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object|null>} Order or null
   */
  async findByPaymentId(paymentId) {
    return prisma.order.findFirst({
      where: { paymentId },
    });
  },

  /**
   * Get all orders with pagination
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of orders
   */
  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    
    return prisma.order.findMany({
      where: where || {},
      orderBy: orderBy || { createdAt: 'desc' },
      skip: skip || 0,
      take: take || 50,
      include: {
        payments: true,
      },
    });
  },

  /**
   * Find orders by email
   * @param {string} email - Customer email
   * @returns {Promise<Array>} Orders
   */
  async findByEmail(email) {
    return prisma.order.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
      include: {
        payments: true,
      },
    });
  },

  /**
   * Find orders by status
   * @param {string} status - Order status
   * @returns {Promise<Array>} Orders
   */
  async findByStatus(status) {
    return prisma.order.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Update order
   * @param {number} id - Order ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated order
   */
  async update(id, data) {
    return prisma.order.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Update order status
   * @param {number} id - Order ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated order
   */
  async updateStatus(id, status) {
    return prisma.order.update({
      where: { id: Number(id) },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Update payment status
   * @param {number} id - Order ID
   * @param {string} paymentStatus - New payment status
   * @returns {Promise<Object>} Updated order
   */
  async updatePaymentStatus(id, paymentStatus) {
    return prisma.order.update({
      where: { id: Number(id) },
      data: {
        paymentStatus,
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Delete order
   * @param {number} id - Order ID
   * @returns {Promise<Object>} Deleted order
   */
  async delete(id) {
    return prisma.order.delete({
      where: { id: Number(id) },
    });
  },

  /**
   * Count orders
   * @param {Object} where - Where clause
   * @returns {Promise<number>} Count
   */
  async count(where = {}) {
    return prisma.order.count({ where });
  },
};

module.exports = Order;