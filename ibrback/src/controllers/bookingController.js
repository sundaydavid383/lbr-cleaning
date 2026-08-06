// filepath: ibrback/src/controllers/bookingController.js
const { repositories } = require("../repositories");
const { orderRepository } = repositories;
const { initializePayment } = require("../services/paymentService");

/**
 * Create a booking/order from the public apply form.
 * Optionally initializes payment if paymentOption is PAY_BEFORE.
 */
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, message, paymentOption = "PAY_AFTER" } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({ success: false, message: "Name, email, phone, and service are required" });
    }

    const order = await orderRepository.create({
      customerName: name,
      email,
      phone,
      service,
      status: "PENDING",
      paymentOption,
      paymentStatus: paymentOption === "PAY_BEFORE" ? "PENDING" : "PENDING",
      notes: message || null,
      amount: null,
    });

    let payment = null;

    if (paymentOption === "PAY_BEFORE") {
      const servicePricing = {
        "Residential Cleaning": 15000,
        "Office Cleaning": 25000,
        "Carpet Cleaning": 18000,
        "Window Cleaning": 12000,
        "Move In/Out Cleaning": 35000,
        "Deep Cleaning": 30000,
        "Sanitization Service": 20000,
        "Post-Construction Cleaning": 45000,
      };

      const amount = servicePricing[service] || 20000;

      await orderRepository.update(order.id, { amount });

      try {
        const paymentResult = await initializePayment({
          email,
          amount,
          currency: "NGN",
          customerName: name,
          phone,
          orderId: order.id,
          service,
        });

        payment = await orderRepository.update(order.id, {
          paymentId: paymentResult.reference,
        });

        return res.status(201).json({
          success: true,
          message: "Booking created. Proceed to payment.",
          order,
          payment: {
            id: paymentResult.reference,
            amount: paymentResult.amount,
            currency: paymentResult.currency,
            provider: paymentResult.provider,
            authorizationUrl: paymentResult.authorizationUrl,
          },
        });
      } catch (paymentError) {
        console.error("Payment initialization failed:", paymentError);
        return res.status(201).json({
          success: true,
          message: "Booking created, but payment initialization failed. We'll contact you to arrange payment.",
          order,
          paymentError: paymentError.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Booking received successfully! We'll contact you within 24 hours.",
      order,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ success: false, message: "Failed to create booking" });
  }
};
