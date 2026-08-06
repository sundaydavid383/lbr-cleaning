class IOrderRepository {
  async create(data) { throw new Error("Method not implemented."); }
  async findById(id) { throw new Error("Method not implemented."); }
  async findByPaymentId(paymentId) { throw new Error("Method not implemented."); }
  async findAll(options = {}) { throw new Error("Method not implemented."); }
  async findByEmail(email) { throw new Error("Method not implemented."); }
  async findByStatus(status) { throw new Error("Method not implemented."); }
  async update(id, data) { throw new Error("Method not implemented."); }
  async updateStatus(id, status) { throw new Error("Method not implemented."); }
  async updatePaymentStatus(id, paymentStatus) { throw new Error("Method not implemented."); }
  async delete(id) { throw new Error("Method not implemented."); }
  async count(where = {}) { throw new Error("Method not implemented."); }
}

module.exports = IOrderRepository;
