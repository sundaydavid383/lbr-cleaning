const IUserRepository = require("../interfaces/IUserRepository");
const User = require("../../models/mongodb/User");

class MongodbUserRepository extends IUserRepository {
  async create(data) {
    const created = new User({
      name: data.name || null,
      email: data.email,
      phone: data.phone || null,
      passwordHash: data.passwordHash,
      role: data.role || "user",
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
    return created.save();
  }

  async findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() }).lean();
  }

  async findById(id) {
    return User.findById(id).lean();
  }

  async findAll(options = {}) {
    const { where = {}, orderBy = { createdAt: "desc" }, skip = 0, take = 100 } = options;
    return User.find(where).sort(orderBy).skip(skip).limit(take).lean();
  }

  async update(id, data) {
    return User.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true }).lean();
  }

  async delete(id) {
    return User.findByIdAndDelete(id).lean();
  }

  async count(where = {}) {
    return User.countDocuments(where);
  }
}

module.exports = MongodbUserRepository;
