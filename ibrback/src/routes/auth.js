const express = require("express");
const router = express.Router();
const { adminLogin, signup, login, updateProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

router.post("/admin-login", adminLogin);
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.put("/auth/profile", authenticate, updateProfile);

module.exports = router;
