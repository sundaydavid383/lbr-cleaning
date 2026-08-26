const express = require("express");
const router = express.Router();
const { adminLogin, signup, login, updateProfile, createAdmin } = require("../controllers/authController");
const { authenticate, requireAdmin } = require("../middleware/auth");
const authService = require("../services/authService");
const bcrypt = require("bcryptjs");
const { repositories } = require("../repositories");
const { userRepository } = repositories;

router.post("/admin/login", adminLogin);
router.post("/admin-login", adminLogin);
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.put("/auth/profile", authenticate, updateProfile);

// Admin-only: an existing admin creates another admin account.
// There is no public admin signup route — this is the only path.
router.post("/admin/create", authenticate, requireAdmin, createAdmin);

// Recovery route: create/reset an admin when credentials are lost.
// Protected by ADMIN_RECOVERY_KEY env var (never expose this in production frontend).
router.post("/admin/recover", async (req, res) => {
  try {
    const { recoveryKey, name, email, password } = req.body;

    if (!recoveryKey || !email || !password) {
      return res.status(400).json({ success: false, message: "Recovery key, email, and password are required" });
    }

    const expectedKey = process.env.ADMIN_RECOVERY_KEY;
    if (!expectedKey || recoveryKey !== expectedKey) {
      return res.status(403).json({ success: false, message: "Invalid recovery key" });
    }

    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const passwordHash = await bcrypt.hash(password, 12);
      await userRepository.update(existing._id, {
        passwordHash,
        name: name || existing.name,
        role: "admin",
        isActive: true,
        failedLoginAttempts: 0,
        lockUntil: null,
      });
      return res.status(200).json({
        success: true,
        message: "Admin account recovered successfully",
        user: { id: existing._id, name, email, role: "admin" },
      });
    }

    const user = await authService.createUser({
      name: name || "Recovered Admin",
      email,
      password,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin account recovered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Admin recover error:", error);
    return res.status(500).json({ success: false, message: "Failed to recover admin account" });
  }
});

module.exports = router;