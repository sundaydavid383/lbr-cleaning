const prisma = require("../config/database");

/**
 * User data access - PostgreSQL/Prisma. Same method surface as
 * IUserRepository so it can be used directly as `userRepository`.
 */
const User = {
  async create(data) {
    return prisma.user.create({
      data: {
        name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        passwordHash: data.passwordHash,
        role: data.role || "user",
        isActive: data.isActive !== undefined ? data.isActive : true,
        address: data.address || null,
        city: data.city || null,
        propertyType: data.propertyType || null,
        referralSource: data.referralSource || null,
        avatar: data.avatar || null,
      },
    });
  },

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findById(id) {
    return prisma.user.findUnique({ where: { id: Number(id) } });
  },

  async findAll(options = {}) {
    const { where, orderBy, skip, take } = options;
    return prisma.user.findMany({
      where: where || {},
      orderBy: orderBy || { createdAt: "desc" },
      skip: skip || 0,
      take: take || 100,
    });
  },

  async update(id, data) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: { ...data, updatedAt: new Date() },
    });
  },

  async delete(id) {
    return prisma.user.delete({ where: { id: Number(id) } });
  },

  async count(where = {}) {
    return prisma.user.count({ where });
  },
};

module.exports = User;
