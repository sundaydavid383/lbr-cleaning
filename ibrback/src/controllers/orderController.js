// filepath: ibrback/src/controllers/orderController.js
const { repositories } = require("../repositories");
const { orderRepository } = repositories;

/**
 * Get orders for a specific email (used by dashboard to load user's bookings).
 */
exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const orders = await orderRepository.findByEmail(email);

    res.status(200).json({
      success: true,
      orders: orders.map((o) => ({
        id: o.id,
        customerName: o.customerName,
        email: o.email,
        phone: o.phone,
        service: o.service,
        status: o.status,
        paymentOption: o.paymentOption,
        paymentStatus: o.paymentStatus,
        paymentId: o.paymentId,
        amount: o.amount,
        notes: o.notes,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get orders by email error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

/**
 * Get a single order by ID.
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderRepository.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        service: order.service,
        status: order.status,
        paymentOption: order.paymentOption,
        paymentStatus: order.paymentStatus,
        paymentId: order.paymentId,
        amount: order.amount,
        notes: order.notes,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get order by id error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};
