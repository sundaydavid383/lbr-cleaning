const express = require("express");
const router = express.Router();
const {SendNotification} = require("../controllers/notifyController");

router.post("/api/notify-subscribers", SendNotification)

module.exports = router;