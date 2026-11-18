require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { init: initDatabase, disconnect: disconnectDatabase, provider } = require("./src/repositories");

const authRoutes = require("./src/routes/auth");
const contactRoutes = require("./src/routes/contact");
const notifyRoutes = require("./src/routes/notify");
const paymentRoutes = require("./src/routes/payment");
const subscribeRoutes = require("./src/routes/subscribe");
const bookingRoutes = require("./src/routes/booking");
const ordersRoutes = require("./src/routes/orders");
const cmsRoutes = require("./src/routes/cms");
const uploadsRoutes = require("./src/routes/uploads");

const app = express();

// Render sits in front of the app as a proxy; needed so rate limits see the
// visitor's real IP address instead of Render's.
app.set("trust proxy", 1);
app.disable("x-powered-by");
// Standard security headers. This server only returns JSON (and printable
// receipts), so cross-origin resource loading must stay allowed.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const allowedOrigins = (process.env.CORS_ORIGIN || "*").split(",").map(origin => origin.trim()).filter(Boolean);
console.log("Allowed origins:", allowedOrigins);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      // Allow all if wildcard is set
      if (allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } 
      // In production, be more lenient for known deployment patterns
      if (process.env.NODE_ENV === 'production') {
        // Allow vercel.app and onrender.com domains
        if (origin.includes('.vercel.app') || origin.includes('.onrender.com')) {
          return callback(null, true);
        }
      }
      return callback(null, true); // Be lenient to avoid blocking in production
    },
    credentials: true,
  })
);
// Raw body for payment webhooks — the signature is checked against the exact
// bytes, so this MUST run before express.json() parses the body.
app.use("/api/payment/webhook", express.raw({ type: "*/*", limit: "1mb" }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limits: stop password guessing and form spam.
const limiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message },
  });
const loginLimiter = limiter(15, 20, "Too many sign-in attempts. Please wait 15 minutes and try again.");
const formLimiter = limiter(15, 30, "Too many requests. Please wait a few minutes and try again.");
const strictLimiter = limiter(60, 5, "Too many attempts. Please try again later.");

app.use(["/api/admin/login", "/api/admin-login", "/api/auth/login"], loginLimiter);
app.use(["/api/auth/signup", "/api/contact", "/api/book", "/appointments/book", "/api/subscribe", "/api/uploads/avatar", "/api/payment/initialize"], formLimiter);
app.use("/api/admin/recover", strictLimiter);
app.use("/api", limiter(1, 300, "Too many requests. Please slow down."));

// Health check endpoint for Render
app.get("/", (req, res) => {
  res.status(200).json({ message: "LBR Cleaning API", status: "ok", databaseProvider: provider });
});

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
app.use("/api/uploads", uploadsRoutes);

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
