// filepath: ibrback/src/repositories/interfaces/ICmsContentRepository.js
class ICmsContentRepository {
  async findAll(filters = {}) {
    throw new Error("Not implemented");
  }

  async findByKey(key) {
    throw new Error("Not implemented");
  }

  async findByCategory(category) {
    throw new Error("Not implemented");
  }

  async upsert(data) {
    throw new Error("Not implemented");
  }

  async updateByKey(key, data) {
    throw new Error("Not implemented");
  }

  async deleteByKey(key) {
    throw new Error("Not implemented");
  }

  async deleteMany(keys) {
    throw new Error("Not implemented");
  }
}

module.exports = ICmsContentRepository;
