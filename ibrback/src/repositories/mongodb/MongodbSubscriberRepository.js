const ISubscriberRepository = require("../interfaces/ISubscriberRepository");
const Subscriber = require("../../models/mongodb/Subscriber");

class MongodbSubscriberRepository extends ISubscriberRepository {
  async create(data) {
    const created = new Subscriber({
      email: data.email,
      subscribedAt: data.subscribedAt || new Date(),
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
    return created.save();
  }

  async findByEmail(email) {
    return Subscriber.findOne({ email: email.toLowerCase() }).lean();
  }

  async findById(id) {
    return Subscriber.findById(id).lean();
  }

  async findAll(options = {}) {
    const { where = {}, orderBy = { subscribedAt: "desc" }, skip = 0, take = 100 } = options;
    return Subscriber.find(where).sort(orderBy).skip(skip).limit(take).lean();
  }

  async findActive() {
    return Subscriber.find({ isActive: true }).sort({ subscribedAt: -1 }).lean();
  }

  async update(id, data) {
    return Subscriber.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { returnDocument: "after" }).lean();
  }

  async unsubscribe(id) {
    return Subscriber.findByIdAndUpdate(
      id,
      { isActive: false, unsubscribedAt: new Date(), updatedAt: new Date() },
      { returnDocument: "after" }
    ).lean();
  }

  async unsubscribeByEmail(email) {
    return Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isActive: false, unsubscribedAt: new Date(), updatedAt: new Date() },
      { returnDocument: "after" }
    ).lean();
  }

  async delete(id) {
    return Subscriber.findByIdAndDelete(id).lean();
  }

  async deleteAll() {
    const result = await Subscriber.deleteMany({});
    return { count: result.deletedCount };
  }

  async count(where = {}) {
    return Subscriber.countDocuments(where);
  }
}

module.exports = MongodbSubscriberRepository;
