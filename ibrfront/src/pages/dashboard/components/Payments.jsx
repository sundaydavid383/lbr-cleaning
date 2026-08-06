// filepath: ibrfront/src/pages/dashboard/components/Payments.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./payments.css";
import CustomAlert from "../../../component/customAlert/CustomAlert";
import { useAuth } from "../../../context/AuthContext";

const formatNGN = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(amount || 0));

const Payments = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user?.email) {
        setLoading(false);
        return;
      }

      try {
        const ordersRes = await fetch(`${import.meta.env.VITE_API_URL}api/orders?email=${encodeURIComponent(user.email)}`);
        const ordersData = await ordersRes.json();

        if (ordersRes.ok && ordersData.success) {
          const userOrders = ordersData.orders || [];
          setOrders(userOrders);

          const paymentPromises = userOrders
            .filter((o) => o.id)
            .map((o) =>
              fetch(`${import.meta.env.VITE_API_URL}api/payment/order/${o.id}`).then((r) => r.json())
            );

          const paymentResults = await Promise.all(paymentPromises);
          const allPayments = paymentResults.flatMap((result, index) =>
            result.success ? (result.payments || []) : []
          );

          setPayments(allPayments);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
        setAlertData({ message: "Failed to load payment history", type: "danger" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user?.email]);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 6000);
  };

  const handleDownloadReceipt = async (paymentId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/payment/${paymentId}/receipt`);
      if (!res.ok) throw new Error("Failed to fetch receipt");
      const html = await res.text();
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(html);
        newWindow.document.close();
      } else {
        showAlert("Please allow popups to download receipts", "warning");
      }
    } catch (error) {
      showAlert("Failed to load receipt", "danger");
    }
  };

  const completedPayments = payments.filter((p) => p.status === "PAID");
  const pendingPayments = payments.filter((p) => p.status === "PENDING" || p.status === "FAILED");

  const totalSpent = completedPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const getStatusClass = (status) => {
    switch (status) {
      case "PAID":
        return "completed";
      case "PENDING":
        return "pending";
      case "FAILED":
        return "cancelled";
      default:
        return "pending";
    }
  };

  if (loading) {
    return (
      <div className="payments">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "3rem" }}>
          <div className="spinner" style={{ margin: "0 auto 1rem" }}></div>
          <p style={{ color: "var(--text-color-muted)" }}>Loading your payment history...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="payments">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "3rem" }}>
          <i className="fa-solid fa-lock" style={{ fontSize: "2rem", color: "var(--text-color-muted)", marginBottom: "1rem" }}></i>
          <p style={{ color: "var(--text-color-muted)", marginBottom: "1.5rem" }}>Please log in to view your payment history.</p>
          <Link to="/login" className="btn-primary">Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payments">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      <div className="payments-summary">
        <div className="dashboard-card payments-summary-card">
          <div className="dashboard-card-title">Total Spent</div>
          <div className="payments-total">{formatNGN(totalSpent)}</div>
          <p className="payments-summary-text">Across {completedPayments.length} completed transaction{completedPayments.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="dashboard-card payments-summary-card">
          <div className="dashboard-card-title">Pending Payments</div>
          <div className="payments-total pending">{formatNGN(pendingAmount)}</div>
          <p className="payments-summary-text">{pendingPayments.length} payment{pendingPayments.length !== 1 ? "s" : ""} awaiting</p>
        </div>
        <div className="dashboard-card payments-summary-card">
          <div className="dashboard-card-title">Total Transactions</div>
          <div className="payments-total">{payments.length}</div>
          <p className="payments-summary-text">Since joining LBR Cleaning</p>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: "1.5rem" }}>
        <h3 className="dashboard-section-title">
          <i className="fa-solid fa-receipt" /> Payment History
        </h3>
        {payments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-color-muted)" }}>
            <i className="fa-solid fa-receipt" style={{ fontSize: "2.5rem", opacity: 0.3, marginBottom: "1rem", display: "block" }}></i>
            <p>No payments yet.</p>
            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Your payment history will appear here after your first booking.</p>
            <Link to="/apply" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>Book a Service</Link>
          </div>
        ) : (
          <div className="payments-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((txn) => {
                  const order = orders.find((o) => o.id === txn.orderId || o.paymentId === txn.gatewayTransactionId);
                  return (
                    <tr key={txn.id}>
                      <td><strong>{txn.gatewayTransactionId || txn.id}</strong></td>
                      <td>{txn.paymentDate ? new Date(txn.paymentDate).toLocaleDateString("en-NG") : "—"}</td>
                      <td>{order?.service || "Cleaning Service"}</td>
                      <td><strong>{formatNGN(txn.amount)}</strong></td>
                      <td>{txn.paymentMethod || "Card"}</td>
                      <td><span className={`status-badge ${getStatusClass(txn.status)}`}>{txn.status}</span></td>
                      <td>
                        <button
                          className="dashboard-btn dashboard-btn-secondary dashboard-btn-sm"
                          onClick={() => handleDownloadReceipt(txn.id)}
                        >
                          <i className="fa-solid fa-download" /> Receipt
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
