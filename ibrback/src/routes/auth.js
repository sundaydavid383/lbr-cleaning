const express = require("express");
const router = express.Router();
const { adminLogin, signup, login, updateProfile, createAdmin } = require("../controllers/authController");
const { authenticate, requireAdmin } = require("../middleware/auth");

router.post("/admin-login", adminLogin);
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.put("/auth/profile", authenticate, updateProfile);

// Admin-only: an existing admin creates another admin account.
// There is no public admin signup route — this is the only path.
router.post("/admin/create", authenticate, requireAdmin, createAdmin);

module.exports = router;