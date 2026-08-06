// filepath: ibrback/src/controllers/receiptController.js
const { repositories } = require("../repositories");
const { paymentRepository, orderRepository } = repositories;

/**
 * Generate an HTML receipt for a payment.
 */
exports.getReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await paymentRepository.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const order = await orderRepository.findById(payment.orderId);

    const formatCurrency = (amount, currency = "NGN") => {
      if (currency === "NGN") {
        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
        }).format(Number(amount || 0));
      }
      return `${currency} ${Number(amount || 0).toFixed(2)}`;
    };

    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const statusColors = {
      PAID: "#16a34a",
      PENDING: "#d97706",
      FAILED: "#dc2626",
      REFUNDED: "#6b7280",
    };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Receipt - LBR Cleaning</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .receipt {
      background: white;
      max-width: 600px;
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .receipt-header {
      background: linear-gradient(135deg, #166534, #15803d);
      color: white;
      padding: 2rem;
      text-align: center;
    }
    .receipt-header h1 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }
    .receipt-header p {
      opacity: 0.9;
      font-size: 0.9rem;
    }
    .receipt-body {
      padding: 2rem;
    }
    .receipt-section {
      margin-bottom: 1.5rem;
    }
    .receipt-section h3 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #6b7280;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .receipt-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 0.95rem;
    }
    .receipt-row span:first-child {
      color: #6b7280;
    }
    .receipt-row span:last-child {
      font-weight: 600;
      color: #1f2937;
    }
    .receipt-total {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 0.5rem;
    }
    .receipt-total .receipt-row span:last-child {
      font-size: 1.25rem;
      color: #166534;
    }
    .receipt-status {
      display: inline-block;
      padding: 0.35rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: ${statusColors[payment.status] || "#6b7280"}20;
      color: ${statusColors[payment.status] || "#6b7280"};
    }
    .receipt-footer {
      padding: 1.5rem 2rem;
      background: #f9fafb;
      text-align: center;
      font-size: 0.85rem;
      color: #6b7280;
    }
    .receipt-footer a {
      color: #166534;
      text-decoration: none;
      font-weight: 600;
    }
    @media print {
      body { background: white; padding: 0; }
      .receipt { box-shadow: none; border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="receipt-header">
      <h1>LBR Cleaning</h1>
      <p>Payment Receipt</p>
    </div>
    <div class="receipt-body">
      <div class="receipt-section">
        <h3>Payment Details</h3>
        <div class="receipt-row">
          <span>Transaction ID</span>
          <span>${payment.gatewayTransactionId || payment.id}</span>
        </div>
        <div class="receipt-row">
          <span>Date</span>
          <span>${formatDate(payment.paymentDate || payment.createdAt)}</span>
        </div>
        <div class="receipt-row">
          <span>Payment Method</span>
          <span>${payment.paymentMethod || "Card"}</span>
        </div>
        <div class="receipt-row">
          <span>Gateway</span>
          <span>${payment.paymentGateway || "N/A"}</span>
        </div>
        <div class="receipt-row">
          <span>Status</span>
          <span class="receipt-status">${payment.status}</span>
        </div>
      </div>

      ${order ? `
      <div class="receipt-section">
        <h3>Service Information</h3>
        <div class="receipt-row">
          <span>Service</span>
          <span>${order.service}</span>
        </div>
        <div class="receipt-row">
          <span>Customer</span>
          <span>${order.customerName}</span>
        </div>
        <div class="receipt-row">
          <span>Email</span>
          <span>${order.email}</span>
        </div>
        <div class="receipt-row">
          <span>Phone</span>
          <span>${order.phone}</span>
        </div>
      </div>
      ` : ""}

      <div class="receipt-section">
        <h3>Amount</h3>
        <div class="receipt-total">
          <div class="receipt-row">
            <span>Total Paid</span>
            <span>${formatCurrency(payment.amount, payment.currency)}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="receipt-footer">
      <p>Thank you for choosing LBR Cleaning!</p>
      <p style="margin-top: 0.5rem; font-size: 0.8rem;">
        Need help? Contact us at support@lbrcleaning.com
      </p>
      <p style="margin-top: 1rem;">
        <a href="#" onclick="window.print(); return false;">Print Receipt</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error("Receipt generation error:", error);
    res.status(500).json({ success: false, message: "Failed to generate receipt" });
  }
};
