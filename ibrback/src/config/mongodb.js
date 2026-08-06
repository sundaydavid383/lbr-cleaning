const mongoose = require("mongoose");
const dns = require("dns");

// Some Windows setups ignore the adapter DNS you configure (especially with
// a VPN or virtual adapter also installed) and Node's resolver falls back to
// one that can't do SRV lookups. Forcing known-good DNS servers here fixes
// "querySrv ECONNREFUSED _mongodb._tcp...." without touching Windows settings.
dns.setServers(["8.8.8.8", "1.1.1.1"]);
let isConnected = false;

const connect = async () => {
  if (isConnected) return mongoose.connection;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in the environment");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    // Mongoose 7+ no longer needs useNewUrlParser/useUnifiedTopology,
    // but maxPoolSize matters once you have real traffic.
    maxPoolSize: Number(process.env.MONGODB_POOL_SIZE) || 10,
  });

  isConnected = true;
  console.log("✅ MongoDB connected");

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  MongoDB disconnected");
    isConnected = false;
  });

  return mongoose.connection;
};

const disconnect = async () => {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  console.log("MongoDB disconnected");
};

module.exports = { connect, disconnect };
