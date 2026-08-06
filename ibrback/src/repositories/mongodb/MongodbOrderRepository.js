const IOrderRepository = require("../interfaces/IOrderRepository");
const Order = require("../../models/mongodb/Order");

class MongodbOrderRepository extends IOrderRepository {
  async create(data) {
    const created = new Order({
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
    });
    return created.save();
  }

  async findById(id) {
    return Order.findById(id).lean();
  }

  async findByPaymentId(paymentId) {
    return Order.findOne({ paymentId }).lean();
  }

  async findAll(options = {}) {
    const { where = {}, orderBy = { createdAt: "desc" }, skip = 0, take = 50 } = options;
    return Order.find(where).sort(orderBy).skip(skip).limit(take).lean();
  }

  async findByEmail(email) {
    return Order.find({ email }).sort({ createdAt: -1 }).lean();
  }

  async findByStatus(status) {
    return Order.find({ status }).sort({ createdAt: -1 }).lean();
  }

  async update(id, data) {
    return Order.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true }).lean();
  }

  async updateStatus(id, status) {
    return Order.findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true }).lean();
  }

  async updatePaymentStatus(id, paymentStatus) {
    return Order.findByIdAndUpdate(id, { paymentStatus, updatedAt: new Date() }, { new: true }).lean();
  }

  async delete(id) {
    return Order.findByIdAndDelete(id).lean();
  }

  async count(where = {}) {
    return Order.countDocuments(where);
  }
}

module.exports = MongodbOrderRepository;
