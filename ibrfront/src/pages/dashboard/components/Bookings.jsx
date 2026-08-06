// filepath: ibrfront/src/pages/dashboard/components/Bookings.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bookings.css";
import CustomAlert from "../../../component/customAlert/CustomAlert";
import { useAuth } from "../../../context/AuthContext";

const Bookings = () => {
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthenticated || !user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}api/orders?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();

        if (res.ok && data.success) {
          const mapped = (data.orders || []).map((o) => ({
            id: o.id,
            service: o.service,
            date: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-NG") : "—",
            time: o.createdAt ? new Date(o.createdAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—",
            status: o.status,
            amount: o.amount ? `₦${Number(o.amount).toLocaleString()}` : "₦0",
            cleaner: "To be assigned",
          }));
          setBookings(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setAlertData({ message: "Failed to load bookings", type: "danger" });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, user?.email]);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 6000);
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status.toLowerCase() === filter.toLowerCase());

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "completed";
      case "confirmed":
        return "upcoming";
      case "pending":
        return "pending";
      case "cancelled":
        return "cancelled";
      case "in_progress":
        return "upcoming";
      default:
        return "pending";
    }
  };

  if (loading) {
    return (
      <div className="bookings">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "3rem" }}>
          <div className="spinner" style={{ margin: "0 auto 1rem" }}></div>
          <p style={{ color: "var(--text-color-muted)" }}>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bookings">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "3rem" }}>
          <i className="fa-solid fa-lock" style={{ fontSize: "2rem", color: "var(--text-color-muted)", marginBottom: "1rem" }}></i>
          <p style={{ color: "var(--text-color-muted)", marginBottom: "1.5rem" }}>Please log in to view your bookings.</p>
          <Link to="/login" className="dashboard-btn dashboard-btn-primary">Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      <div className="bookings-filters">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            className={`bookings-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="dashboard-card">
        {filtered.length > 0 ? (
          <div className="bookings-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Cleaner</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id}>
                    <td><strong>#{booking.id.slice(-6)}</strong></td>
                    <td>{booking.service}</td>
                    <td>{booking.date}<br /><small style={{ color: "var(--text-color-muted)" }}>{booking.time}</small></td>
                    <td>{booking.cleaner}</td>
                    <td><strong>{booking.amount}</strong></td>
                    <td><span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status?.toLowerCase() || "pending"}</span></td>
                    <td>
                      <div className="bookings-actions">
                        {booking.status === "PENDING" && (
                          <>
                            <button className="dashboard-btn dashboard-btn-secondary dashboard-btn-sm">Reschedule</button>
                            <button className="dashboard-btn dashboard-btn-danger dashboard-btn-sm">Cancel</button>
                          </>
                        )}
                        {booking.status === "CONFIRMED" && (
                          <button className="dashboard-btn dashboard-btn-secondary dashboard-btn-sm">View Details</button>
                        )}
                        {booking.status === "COMPLETED" && (
                          <button className="dashboard-btn dashboard-btn-secondary dashboard-btn-sm">View Details</button>
                        )}
                        {booking.status === "CANCELLED" && (
                          <Link to="/apply" className="dashboard-btn dashboard-btn-primary dashboard-btn-sm">Book Again</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="dashboard-empty">
            <i className="fa-regular fa-calendar-xmark" />
            <h3>No {filter} bookings</h3>
            <p>You don't have any {filter} bookings at the moment.</p>
            <Link to="/apply" className="dashboard-btn dashboard-btn-primary">Book a Cleaning</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
