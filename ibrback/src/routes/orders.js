// filepath: ibrback/src/routes/orders.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticate } = require("../middleware/auth");

// Customers must be logged in and only see their own bookings.
router.get("/", authenticate, orderController.getOrdersByEmail);
router.get("/:id", authenticate, orderController.getOrderById);

module.exports = router;
