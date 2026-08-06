// filepath: ibrback/src/routes/orders.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getOrdersByEmail);
router.get("/:id", orderController.getOrderById);

module.exports = router;
