const { verifyToken } = require("../services/authService");

/**
 * Reads "Authorization: Bearer <token>", verifies it, and attaches
 * the decoded payload to req.user. Responds 401 if missing/invalid.
 */
const authenticate = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ success: false, message: "Missing or malformed Authorization header" });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * Use after `authenticate`. Blocks anyone whose token role isn't "admin".
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
};

/**
 * True when the logged-in user may see this order: admins see everything,
 * customers only orders booked with their own email.
 */
const canAccessOrder = (req, order) => {
  if (!order || !req.user) return false;
  if (req.user.role === "admin") return true;
  const mine = String(req.user.email || "").trim().toLowerCase();
  return !!mine && String(order.email || "").trim().toLowerCase() === mine;
};

module.exports = { authenticate, requireAdmin, canAccessOrder };
