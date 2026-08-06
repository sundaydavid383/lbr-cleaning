class IPaymentRepository {
  async create(data) { throw new Error("Method not implemented."); }
  async findById(id) { throw new Error("Method not implemented."); }
  async findByTransactionId(transactionId) { throw new Error("Method not implemented."); }
  async findAll(options = {}) { throw new Error("Method not implemented."); }
  async findByOrderId(orderId) { throw new Error("Method not implemented."); }
  async findByStatus(status) { throw new Error("Method not implemented."); }
  async update(id, data) { throw new Error("Method not implemented."); }
  async updateStatus(id, status, transactionId = null) { throw new Error("Method not implemented."); }
  async delete(id) { throw new Error("Method not implemented."); }
  async count(where = {}) { throw new Error("Method not implemented."); }
}

module.exports = IPaymentRepository;
