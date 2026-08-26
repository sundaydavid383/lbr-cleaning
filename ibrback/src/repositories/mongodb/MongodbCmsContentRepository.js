const ICmsContentRepository = require("../interfaces/ICmsContentRepository");
const CmsContent = require("../../models/mongodb/CmsContent");

class MongodbCmsContentRepository extends ICmsContentRepository {
  async findAll(filters = {}) {
    const { category, isPublic, limit = 500, skip = 0 } = filters;
    const query = {};

    if (category) query.category = category;
    if (isPublic !== undefined) query.isPublic = isPublic;

    console.log(`[CMS-REPO] findAll | query=${JSON.stringify(query)} | limit=${limit} skip=${skip}`);

    const items = await CmsContent.find(query)
      .sort({ category: 1, key: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    console.log(`[CMS-REPO] findAll returned ${items.length} items`);
    return items;
  }

  async findByKey(key) {
    console.log(`[CMS-REPO] findByKey: ${key}`);
    const item = await CmsContent.findOne({ key }).lean();
    console.log(`[CMS-REPO] findByKey ${key} | found=${!!item}`);
    return item;
  }

  async findByCategory(category) {
    console.log(`[CMS-REPO] findByCategory: ${category}`);
    const items = await CmsContent.find({ category, isPublic: true })
      .sort({ key: 1 })
      .lean();
    console.log(`[CMS-REPO] findByCategory ${category} returned ${items.length} items`);
    return items;
  }

  async upsert(data) {
    const { key, ...rest } = data;
    if (!key) throw new Error("Key is required for upsert");

    console.log(`[CMS-REPO] upsert: ${key} | type=${rest.type} | category=${rest.category}`);

    const item = await CmsContent.findOneAndUpdate(
      { key },
      { $set: { key, ...rest, updatedAt: new Date() } },
      { returnDocument: "after", upsert: true }
    ).lean();

    console.log(`[CMS-REPO] upsert success: ${key}`);
    return item;
  }

  async updateByKey(key, data) {
    console.log(`[CMS-REPO] updateByKey: ${key}`);
    const item = await CmsContent.findOneAndUpdate(
      { key },
      { $set: { key, ...data, updatedAt: new Date() } },
      { returnDocument: "after" }
    ).lean();
    console.log(`[CMS-REPO] updateByKey ${key} | updated=${!!item}`);
    return item;
  }

  async deleteByKey(key) {
    console.log(`[CMS-REPO] deleteByKey: ${key}`);
    const result = await CmsContent.findOneAndDelete({ key }).lean();
    console.log(`[CMS-REPO] deleteByKey ${key} | deleted=${!!result}`);
    return result;
  }

  async deleteMany(keys) {
    console.log(`[CMS-REPO] deleteMany: ${keys.length} keys`);
    const result = await CmsContent.deleteMany({ key: { $in: keys } });
    console.log(`[CMS-REPO] deleteMany result:`, result);
    return result;
  }
}

module.exports = MongodbCmsContentRepository;
