const prisma = require("../config/database");

/**
 * Payment data access - PostgreSQL/Prisma.
 * Implements the same method surface as IPaymentRepository so it can be
 * used directly as `paymentRepository` when DATABASE_PROVIDER=postgres.
 */
const Payment = {
  async create(data) {
    return prisma.payment.create({
      data: {
        orderId: Number(data.orderId),
        amount: data.amount,
        currency: data.currency || "NGN",
        paymentMethod: data.paymentMethod || "CARD",
        paymentGateway: data.paymentGateway || "PAYSTACK",
        gatewayTransactionId: data.gatewayTransactionId || null,
        status: data.status || "PENDING",
        paymentDate: data.paymentDate || null,
        metadata: data.metadata || {},
      },
    });
  },

  async findById(id) {
    return prisma.payment.findUnique({ where: { id: Number(id) }, include: { order: true } });
  },

  async findByTransactionId(transactionId) {
    return prisma.payment.findFirst({ where: { gatewayTransactionId: transactionId }, include: { order: true } });
  },

  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    return prisma.payment.findMany({
      where: where || {},
      orderBy: orderBy || { createdAt: "desc" },
      skip: skip || 0,
      take: take || 50,
      include: { order: true },
    });
  },

  async findByOrderId(orderId) {
    return prisma.payment.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { createdAt: "desc" },
      include: { order: true },
    });
  },

  async findByStatus(status) {
    return prisma.payment.findMany({ where: { status }, orderBy: { createdAt: "desc" } });
  },

  async update(id, data) {
    return prisma.payment.update({ where: { id: Number(id) }, data: { ...data, updatedAt: new Date() } });
  },

  async updateStatus(id, status, transactionId = null) {
    const updateData = { status, updatedAt: new Date() };
    if (transactionId) updateData.gatewayTransactionId = transactionId;
    if (status === "PAID") updateData.paymentDate = new Date();

    return prisma.payment.update({ where: { id: Number(id) }, data: updateData });
  },

  async delete(id) {
    return prisma.payment.delete({ where: { id: Number(id) } });
  },

  async count(where = {}) {
    return prisma.payment.count({ where });
  },
};

module.exports = Payment;
