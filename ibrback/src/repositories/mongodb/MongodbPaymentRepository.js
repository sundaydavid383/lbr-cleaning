const IPaymentRepository = require("../interfaces/IPaymentRepository");
const Payment = require("../../models/mongodb/Payment");

class MongodbPaymentRepository extends IPaymentRepository {
  async create(data) {
    const created = new Payment({
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency || "NGN",
      paymentMethod: data.paymentMethod || "CARD",
      paymentGateway: data.paymentGateway || "PAYSTACK",
      gatewayTransactionId: data.gatewayTransactionId || null,
      status: data.status || "PENDING",
      paymentDate: data.paymentDate || null,
      metadata: data.metadata || {},
    });
    return created.save();
  }

  async findById(id) {
    return Payment.findById(id).populate("order").lean();
  }

  async findByTransactionId(transactionId) {
    return Payment.findOne({ gatewayTransactionId: transactionId }).populate("order").lean();
  }

  async findAll(options = {}) {
    const { where = {}, orderBy = { createdAt: "desc" }, skip = 0, take = 50 } = options;
    return Payment.find(where).sort(orderBy).skip(skip).limit(take).populate("order").lean();
  }

  async findByOrderId(orderId) {
    return Payment.find({ orderId }).sort({ createdAt: -1 }).populate("order").lean();
  }

  async findByStatus(status) {
    return Payment.find({ status }).sort({ createdAt: -1 }).populate("order").lean();
  }

  async update(id, data) {
    return Payment.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true }).populate("order").lean();
  }

  async updateStatus(id, status, transactionId = null) {
    const updateData = { status, updatedAt: new Date() };
    if (transactionId) updateData.gatewayTransactionId = transactionId;
    if (status === "PAID") updateData.paymentDate = new Date();

    return Payment.findByIdAndUpdate(id, updateData, { new: true }).populate("order").lean();
  }

  async delete(id) {
    return Payment.findByIdAndDelete(id).lean();
  }

  async count(where = {}) {
    return Payment.countDocuments(where);
  }
}

module.exports = MongodbPaymentRepository;
