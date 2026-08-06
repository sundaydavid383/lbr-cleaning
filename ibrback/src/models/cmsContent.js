// filepath: ibrback/src/models/cmsContent.js
const prisma = require("../config/database");

class CmsContentModel {
  async findAll(filters = {}) {
    const { category, isPublic, limit = 500, skip = 0 } = filters;
    const where = {};

    if (category) where.category = category;
    if (isPublic !== undefined) where.isPublic = isPublic;

    const items = await prisma.cmsContent.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ category: "asc" }, { key: "asc" }],
    });

    return items.map((item) => ({
      ...item,
      value: item.value,
    }));
  }

  async findByKey(key) {
    const item = await prisma.cmsContent.findUnique({
      where: { key },
    });

    if (!item) return null;
    return { ...item, value: item.value };
  }

  async findByCategory(category) {
    const items = await prisma.cmsContent.findMany({
      where: { category, isPublic: true },
      orderBy: { key: "asc" },
    });

    return items.map((item) => ({
      ...item,
      value: item.value,
    }));
  }

  async upsert(data) {
    const { key, ...rest } = data;
    if (!key) throw new Error("Key is required for upsert");

    const item = await prisma.cmsContent.upsert({
      where: { key },
      update: { ...rest, updatedAt: new Date() },
      create: { key, ...rest },
    });

    return { ...item, value: item.value };
  }

  async updateByKey(key, data) {
    const item = await prisma.cmsContent.update({
      where: { key },
      data: { ...data, updatedAt: new Date() },
    });

    return { ...item, value: item.value };
  }

  async deleteByKey(key) {
    return prisma.cmsContent.delete({
      where: { key },
    });
  }

  async deleteMany(keys) {
    return prisma.cmsContent.deleteMany({
      where: { key: { in: keys } },
    });
  }
}

module.exports = new CmsContentModel();
