const express = require("express");
const router = express.Router();
const { authenticate, requireAdmin } = require("../middleware/auth");
const {
  subscribe,
  getAllSubscribers,
  sendMessage,
  unSubscribe,
  deleteAllSubscribers,
} = require("../controllers/subscriberController");

// Public
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unSubscribe);

// Admin-only — must send "Authorization: Bearer <token>" from /api/admin-login
router.get("/subscribe", authenticate, requireAdmin, getAllSubscribers);
router.delete("/delete/subscribe", authenticate, requireAdmin, deleteAllSubscribers);
router.post("/send-message", authenticate, requireAdmin, sendMessage);

module.exports = router;
