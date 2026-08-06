class ISubscriberRepository {
  async create(data) { throw new Error("Method not implemented."); }
  async findByEmail(email) { throw new Error("Method not implemented."); }
  async findById(id) { throw new Error("Method not implemented."); }
  async findAll(options = {}) { throw new Error("Method not implemented."); }
  async findActive() { throw new Error("Method not implemented."); }
  async update(id, data) { throw new Error("Method not implemented."); }
  async unsubscribe(id) { throw new Error("Method not implemented."); }
  async unsubscribeByEmail(email) { throw new Error("Method not implemented."); }
  async delete(id) { throw new Error("Method not implemented."); }
  async deleteAll() { throw new Error("Method not implemented."); }
  async count(where = {}) { throw new Error("Method not implemented."); }
}

module.exports = ISubscriberRepository;
