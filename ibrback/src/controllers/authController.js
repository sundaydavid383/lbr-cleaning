const authService = require("../services/authService");
const { authenticate } = require("../middleware/auth");

/**
 * Update current user's profile.
 * Requires Bearer token.
 * body: { name, phone, address, city, propertyType, referralSource, avatar }
 */
exports.updateProfile = async (req, res) => {
  const userId = Number(req.user.sub);
  const { name, phone, address, city, propertyType, referralSource, avatar } = req.body;

  try {
    const updated = await authService.updateUser(userId, {
      name: name !== undefined ? name : undefined,
      phone: phone !== undefined ? phone : undefined,
      address: address !== undefined ? address : undefined,
      city: city !== undefined ? city : undefined,
      propertyType: propertyType !== undefined ? propertyType : undefined,
      referralSource: referralSource !== undefined ? referralSource : undefined,
      avatar: avatar !== undefined ? avatar : undefined,
    });

    return res.status(200).json({ success: true, user: updated });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};
/**
 * Create another admin account. Only callable by an already-authenticated
 * admin (enforced by authenticate + requireAdmin in the route, not here).
 * This is intentionally the ONLY way to create an admin after the very
 * first one — which still comes from scripts/seedAdmin.js. There is no
 * public "admin signup" endpoint, on purpose.
 */
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const admin = await authService.createUser({
      name,
      email,
      password,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    if (error.message === "A user with that email already exists") {
      return res.status(409).json({ success: false, message: error.message });
    }
    console.error("Create admin error:", error);
    return res.status(500).json({ success: false, message: "Failed to create admin account" });
  }
};
/**
 * Admin login — used by AdminMessagePage.jsx.
 * Response shape matches what that page already expects:
 * { success, token } on success, { success:false, message, inputDisable } on lockout.
 */
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const { token, user } = await authService.login({ email, password, requiredRole: "admin" });
    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    const status = error.status || 500;
    if (status === 500) console.error("Admin login error:", error);
    return res.status(status).json({
      success: false,
      message: error.message || "Login failed",
      ...(error.locked ? { inputDisable: true } : {}),
    });
  }
};

/**
 * Regular user signup — POST /api/auth/signup
 * body: { name, email, phone, password, address, city, propertyType, referralSource, avatar }
 */
exports.signup = async (req, res) => {
  const { name, email, phone, password, address, city, propertyType, referralSource, avatar } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const user = await authService.createUser({ name, email, phone, password, role: "user", address, city, propertyType, referralSource, avatar });
    // Log the new user straight in, same as the old fake frontend flow did
    const { token, user: loggedInUser } = await authService.login({ email, password });
    return res.status(201).json({ success: true, token, user: loggedInUser });
  } catch (error) {
    if (error.message === "A user with that email already exists") {
      return res.status(409).json({ success: false, message: error.message });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Failed to create account" });
  }
};

/**
 * Regular user login — POST /api/auth/login
 * body: { email, password }
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const { token, user } = await authService.login({ email, password });
    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    const status = error.status || 500;
    if (status === 500) console.error("Login error:", error);
    return res.status(status).json({ success: false, message: error.message || "Login failed" });
  }
};
