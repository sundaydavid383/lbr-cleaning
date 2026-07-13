// filepath: ibrback/src/routes/subscribe.js
const express = require("express");
const router = express.Router();
const {
  subscribe,
  getAllSubscribers,
  adminLogin,
  sendMessage,
  unSubscribe,
  deleteAllSubscribers,
} = require("../controllers/subscriberController");

router.post('/subscribe', subscribe);
router.get('/subscribe', getAllSubscribers);
router.delete('/delete/subscribe', deleteAllSubscribers); // For deleting all subscribers (admin use)
router.post('/admin-login', adminLogin);
router.post('/send-message', sendMessage);
router.post('/unsubscribe', unSubscribe);

module.exports = router;