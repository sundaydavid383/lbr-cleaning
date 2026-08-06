const { connect: connectMongo, disconnect: disconnectMongo } = require("../config/mongodb");

const provider = (process.env.DATABASE_PROVIDER || "mongodb").toLowerCase();

const VALID_PROVIDERS = ["mongodb", "postgres"];
if (!VALID_PROVIDERS.includes(provider)) {
  throw new Error(`Unsupported DATABASE_PROVIDER: "${provider}". Use "mongodb" or "postgres".`);
}

/**
 * Connect to whichever database is active. Call once at startup, before
 * the server starts accepting requests.
 */
const init = async () => {
  if (provider === "mongodb") {
    await connectMongo();
    console.log("📦 Database provider: MongoDB");
  } else {
    // Prisma connects lazily on first query, so there's nothing to await here,
    // but we still surface which provider is active.
    console.log("🐘 Database provider: PostgreSQL (Prisma)");
  }
};

const disconnect = async () => {
  if (provider === "mongodb") {
    await disconnectMongo();
  } else {
    const prisma = require("../config/database");
    if (prisma) await prisma.$disconnect();
  }
};

/**
 * Build the repository set for the active provider. Both providers expose
 * the exact same method names (see src/repositories/interfaces/), so nothing
 * outside this file needs to know or care which database is live.
 */
const createRepositories = () => {
  if (provider === "mongodb") {
    const MongodbSubscriberRepository = require("./mongodb/MongodbSubscriberRepository");
    const MongodbOrderRepository = require("./mongodb/MongodbOrderRepository");
    const MongodbPaymentRepository = require("./mongodb/MongodbPaymentRepository");
    const MongodbUserRepository = require("./mongodb/MongodbUserRepository");
    const MongodbCmsContentRepository = require("./mongodb/MongodbCmsContentRepository");

    return {
      subscriberRepository: new MongodbSubscriberRepository(),
      orderRepository: new MongodbOrderRepository(),
      paymentRepository: new MongodbPaymentRepository(),
      userRepository: new MongodbUserRepository(),
      cmsContentRepository: new MongodbCmsContentRepository(),
    };
  }

  const subscriberRepository = require("../models/subscriber");
  const orderRepository = require("../models/order");
  const paymentRepository = require("../models/payment");
  const userRepository = require("../models/user");
  const cmsContentRepository = require("../models/cmsContent");

  return { subscriberRepository, orderRepository, paymentRepository, userRepository, cmsContentRepository };
};

const repositories = createRepositories();

module.exports = {
  init,
  disconnect,
  provider,
  repositories,
};
