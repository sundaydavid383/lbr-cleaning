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

module.exports = { authenticate, requireAdmin };
