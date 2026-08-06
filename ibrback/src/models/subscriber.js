const prisma = require("../config/database");

/**
 * Subscriber data access - PostgreSQL/Prisma.
 * Implements the same method surface as ISubscriberRepository so it can be
 * used directly as `subscriberRepository` when DATABASE_PROVIDER=postgres.
 */
const Subscriber = {
  async create(data) {
    return prisma.subscriber.create({
      data: {
        email: data.email,
        subscribedAt: data.subscribedAt || new Date(),
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  },

  async findByEmail(email) {
    return prisma.subscriber.findUnique({ where: { email } });
  },

  async findById(id) {
    return prisma.subscriber.findUnique({ where: { id: Number(id) } });
  },

  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    return prisma.subscriber.findMany({
      where: where || {},
      orderBy: orderBy || { subscribedAt: "desc" },
      skip: skip || 0,
      take: take || 100,
    });
  },

  async findActive() {
    return prisma.subscriber.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: "desc" },
    });
  },

  async update(id, data) {
    return prisma.subscriber.update({
      where: { id: Number(id) },
      data: { ...data, updatedAt: new Date() },
    });
  },

  async unsubscribe(id) {
    return prisma.subscriber.update({
      where: { id: Number(id) },
      data: { isActive: false, unsubscribedAt: new Date(), updatedAt: new Date() },
    });
  },

  async unsubscribeByEmail(email) {
    return prisma.subscriber.update({
      where: { email },
      data: { isActive: false, unsubscribedAt: new Date(), updatedAt: new Date() },
    });
  },

  async delete(id) {
    return prisma.subscriber.delete({ where: { id: Number(id) } });
  },

  async deleteAll() {
    const result = await prisma.subscriber.deleteMany({});
    return { count: result.count };
  },

  async count(where = {}) {
    return prisma.subscriber.count({ where });
  },
};

module.exports = Subscriber;
