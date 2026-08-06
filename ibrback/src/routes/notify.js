const express = require("express");
const router = express.Router();
const { authenticate, requireAdmin } = require("../middleware/auth");
const { SendNotification } = require("../controllers/notifyController");

router.post("/notify-subscribers", authenticate, requireAdmin, SendNotification);

module.exports = router;
