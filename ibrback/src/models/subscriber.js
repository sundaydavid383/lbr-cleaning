// filepath: ibrback/src/models/subscriber.js
const prisma = require('../config/database');

/**
 * Subscriber Model - PostgreSQL/Prisma
 * Replaces Mongoose model for Subscribers
 */

const Subscriber = {
  /**
   * Create a new subscriber
   * @param {Object} data - Subscriber data
   * @returns {Promise<Object>} Created subscriber
   */
  async create(data) {
    return prisma.subscriber.create({
      data: {
        email: data.email,
        subscribedAt: data.subscribedAt || new Date(),
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  },

  /**
   * Find subscriber by email
   * @param {string} email - Subscriber email
   * @returns {Promise<Object|null>} Subscriber or null
   */
  async findByEmail(email) {
    return prisma.subscriber.findUnique({
      where: { email },
    });
  },

  /**
   * Find subscriber by ID
   * @param {number} id - Subscriber ID
   * @returns {Promise<Object|null>} Subscriber or null
   */
  async findById(id) {
    return prisma.subscriber.findUnique({
      where: { id: Number(id) },
    });
  },

  /**
   * Get all subscribers
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of subscribers
   */
  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    
    return prisma.subscriber.findMany({
      where: where || {},
      orderBy: orderBy || { subscribedAt: 'desc' },
      skip: skip || 0,
      take: take || 100,
    });
  },

  /**
   * Get all active subscribers
   * @returns {Promise<Array>} Active subscribers
   */
  async findActive() {
    return prisma.subscriber.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: 'desc' },
    });
  },

  /**
   * Update subscriber
   * @param {number} id - Subscriber ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated subscriber
   */
  async update(id, data) {
    return prisma.subscriber.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Unsubscribe (soft delete)
   * @param {number} id - Subscriber ID
   * @returns {Promise<Object>} Updated subscriber
   */
  async unsubscribe(id) {
    return prisma.subscriber.update({
      where: { id: Number(id) },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Unsubscribe by email
   * @param {string} email - Subscriber email
   * @returns {Promise<Object>} Updated subscriber
   */
  async unsubscribeByEmail(email) {
    return prisma.subscriber.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Delete subscriber (hard delete)
   * @param {number} id - Subscriber ID
   * @returns {Promise<Object>} Deleted subscriber
   */
  async delete(id) {
    return prisma.subscriber.delete({
      where: { id: Number(id) },
    });
  },

  /**
   * Delete all subscribers
   * @returns {Promise<number>} Number of deleted records
   */
  async deleteAll() {
    return prisma.subscriber.deleteMany({});
  },

  /**
   * Count subscribers
   * @param {Object} where - Where clause
   * @returns {Promise<number>} Count
   */
  async count(where = {}) {
    return prisma.subscriber.count({ where });
  },
};

module.exports = Subscriber;