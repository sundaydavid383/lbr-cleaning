const prisma = require("../config/database");

/**
 * Order data access - PostgreSQL/Prisma.
 * Implements the same method surface as IOrderRepository so it can be used
 * directly as `orderRepository` when DATABASE_PROVIDER=postgres.
 */
const Order = {
  async create(data) {
    return prisma.order.create({
      data: {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        paymentOption: data.paymentOption || "PAY_AFTER",
        status: data.status || "PENDING",
        paymentStatus: data.paymentStatus || "PENDING",
        paymentId: data.paymentId || null,
        amount: data.amount || null,
        notes: data.notes || null,
      },
    });
  },

  async findById(id) {
    return prisma.order.findUnique({
      where: { id: Number(id) },
      include: { payments: true },
    });
  },

  async findByPaymentId(paymentId) {
    return prisma.order.findFirst({ where: { paymentId } });
  },

  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    return prisma.order.findMany({
      where: where || {},
      orderBy: orderBy || { createdAt: "desc" },
      skip: skip || 0,
      take: take || 50,
      include: { payments: true },
    });
  },

  async findByEmail(email) {
    return prisma.order.findMany({
      where: { email },
      orderBy: { createdAt: "desc" },
      include: { payments: true },
    });
  },

  async findByStatus(status) {
    return prisma.order.findMany({ where: { status }, orderBy: { createdAt: "desc" } });
  },

  async update(id, data) {
    return prisma.order.update({
      where: { id: Number(id) },
      data: { ...data, updatedAt: new Date() },
    });
  },

  async updateStatus(id, status) {
    return prisma.order.update({
      where: { id: Number(id) },
      data: { status, updatedAt: new Date() },
    });
  },

  async updatePaymentStatus(id, paymentStatus) {
    return prisma.order.update({
      where: { id: Number(id) },
      data: { paymentStatus, updatedAt: new Date() },
    });
  },

  async delete(id) {
    return prisma.order.delete({ where: { id: Number(id) } });
  },

  async count(where = {}) {
    return prisma.order.count({ where });
  },
};

module.exports = Order;
