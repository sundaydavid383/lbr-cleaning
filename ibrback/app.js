require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { init: initDatabase, disconnect: disconnectDatabase, provider } = require("./src/repositories");

const authRoutes = require("./src/routes/auth");
const contactRoutes = require("./src/routes/contact");
const notifyRoutes = require("./src/routes/notify");
const paymentRoutes = require("./src/routes/payment");
const subscribeRoutes = require("./src/routes/subscribe");
const bookingRoutes = require("./src/routes/booking");
const ordersRoutes = require("./src/routes/orders");
const cmsRoutes = require("./src/routes/cms");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

// Raw body parser for webhooks — needed for signature verification.
// Only enable for the specific webhook path so normal JSON routes keep working.
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", (req, res) => {
  res.status(200).json({ message: "Welcome to LBR Cleaning API", databaseProvider: provider });
});

app.use("/api", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", notifyRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", subscribeRoutes);
app.use("/api", bookingRoutes);
app.use("/appointments", bookingRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/cms", cmsRoutes);

// Generic error handler — keeps a single place to log/format unexpected errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5100;

const start = async () => {
  try {
    await initDatabase();

    const { ensureCmsPopulated } = require("./src/scripts/autoSeedCms");
    await ensureCmsPopulated();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (DATABASE_PROVIDER=${provider})`);
    });

    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

module.exports = app;
