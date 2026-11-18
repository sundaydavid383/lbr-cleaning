// filepath: ibrfront/src/pages/dashboard/components/Overview.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./overview.css";
import CustomAlert from "../../../component/customAlert/CustomAlert";
import { useAuth } from "../../../context/AuthContext";
import { apiUrl } from "../../../utils/apiUrl";
import Txt from "../../../component/editable/Txt";

const Overview = () => {
  const { user, token, isAuthenticated } = useAuth();
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
  const [stats, setStats] = useState({
    totalBookings: 0,
    servicesCompleted: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
  });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user?.email) {
        setLoading(false);
        return;
      }

      try {
        const ordersRes = await fetch(apiUrl("/api/orders"), authHeaders);
        const ordersData = await ordersRes.json();

        if (ordersRes.ok && ordersData.success) {
          const orders = ordersData.orders || [];
          const completed = orders.filter((o) => o.status === "COMPLETED").length;
          const totalSpent = orders
            .filter((o) => o.paymentStatus === "PAID")
            .reduce((sum, o) => sum + Number(o.amount || 0), 0);

          setStats({
            totalBookings: orders.length,
            servicesCompleted: completed,
            totalSpent,
            loyaltyPoints: Math.floor(totalSpent / 1000),
          });

          const upcoming = orders
            .filter((o) => ["PENDING", "CONFIRMED"].includes(o.status))
            .slice(0, 3)
            .map((o) => ({
              id: o.id,
              service: o.service,
              date: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-NG") : "—",
              time: o.createdAt ? new Date(o.createdAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—",
              status: o.status?.toLowerCase(),
            }));
          setUpcomingBookings(upcoming);

          const activity = orders.slice(0, 5).map((o) => ({
            id: o.id,
            action: o.status === "COMPLETED" ? "Service completed" : o.status === "CONFIRMED" ? "Booking confirmed" : "Booking created",
            detail: o.service,
            time: o.createdAt ? getRelativeTime(o.createdAt) : "Recently",
            icon: o.status === "COMPLETED" ? "fa-solid fa-check-circle" : o.status === "CONFIRMED" ? "fa-solid fa-clock" : "fa-solid fa-calendar-plus",
            color: o.status === "COMPLETED" ? "green" : o.status === "CONFIRMED" ? "blue" : "gold",
          }));
          setRecentActivity(activity);
        }
      } catch (error) {
        console.error("Failed to fetch overview data:", error);
        setAlertData({ message: "Failed to load dashboard data", type: "danger" });
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

  const getRelativeTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-NG");
  };

  const formatNGN = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(Number(amount || 0));

  if (loading) {
    return (
      <div className="overview">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "3rem" }}>
          <div className="spinner" style={{ margin: "0 auto 1rem" }}></div>
          <p style={{ color: "var(--text-color-muted)" }}><Txt k="dashboard.overview.loading_your_dashboard" d={"Loading your dashboard..."} /></p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="overview">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "3rem" }}>
          <i className="fa-solid fa-lock" style={{ fontSize: "2rem", color: "var(--text-color-muted)", marginBottom: "1rem" }}></i>
          <p style={{ color: "var(--text-color-muted)", marginBottom: "1.5rem" }}><Txt k="dashboard.overview.please_log_in_to_view_your_dashboard" d={"Please log in to view your dashboard."} /></p>
          <Link to="/login" className="dashboard-btn dashboard-btn-primary"><Txt k="dashboard.overview.log_in" d={"Log In"} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overview">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon green">
            <i className="fa-solid fa-calendar-check" />
          </div>
          <div className="dashboard-stat-value">{stats.totalBookings}</div>
          <div className="dashboard-stat-label"><Txt k="dashboard.overview.total_bookings" d={"Total Bookings"} /></div>
          <div className="dashboard-card-change positive"><Txt k="dashboard.overview.lifetime" d={"Lifetime"} /></div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon green">
            <i className="fa-solid fa-circle-check" />
          </div>
          <div className="dashboard-stat-value">{stats.servicesCompleted}</div>
          <div className="dashboard-stat-label"><Txt k="dashboard.overview.services_completed" d={"Services Completed"} /></div>
          <div className="dashboard-card-change positive"><Txt k="dashboard.overview.great_track_record" d={"Great track record"} /></div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon blue">
            <i className="fa-solid fa-naira-sign" />
          </div>
          <div className="dashboard-stat-value">{formatNGN(stats.totalSpent)}</div>
          <div className="dashboard-stat-label"><Txt k="dashboard.overview.total_spent" d={"Total Spent"} /></div>
          <div className="dashboard-card-change neutral"><Txt k="dashboard.overview.loyal_customer" d={"Loyal customer"} /></div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon purple">
            <i className="fa-solid fa-star" />
          </div>
          <div className="dashboard-stat-value">{stats.loyaltyPoints.toLocaleString()}</div>
          <div className="dashboard-stat-label"><Txt k="dashboard.overview.loyalty_points" d={"Loyalty Points"} /></div>
          <div className="dashboard-card-change neutral"><Txt k="dashboard.overview.earned_from_spending" d={"Earned from spending"} /></div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="dashboard-section-title">
            <i className="fa-solid fa-calendar" /> <Txt k="dashboard.overview.upcoming_title" d="Upcoming Bookings" label="Section title" />
          </h3>
          {upcomingBookings.length > 0 ? (
            <div className="overview-bookings">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="overview-booking-item">
                  <div>
                    <p className="overview-booking-service">{booking.service}</p>
                    <p className="overview-booking-date">
                      <i className="fa-regular fa-clock" /> {booking.date} at {booking.time}
                    </p>
                  </div>
                  <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                </div>
              ))}
              <Link to="/dashboard/bookings" className="dashboard-btn dashboard-btn-secondary dashboard-btn-sm" style={{ marginTop: "1rem", width: "100%" }}>
                View All Bookings <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          ) : (
            <div className="dashboard-empty">
              <i className="fa-regular fa-calendar-xmark" />
              <h3><Txt k="dashboard.overview.no_upcoming_bookings" d={"No upcoming bookings"} /></h3>
              <p><Txt k="dashboard.overview.you_don_t_have_any_upcoming_cleaning_app" d={"You don't have any upcoming cleaning appointments."} /></p>
              <Link to="/apply" className="dashboard-btn dashboard-btn-primary"><Txt k="dashboard.overview.book_a_cleaning" d={"Book a Cleaning"} /></Link>
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-section-title">
            <i className="fa-solid fa-clock-rotate-left" /> <Txt k="dashboard.overview.activity_title" d="Recent Activity" label="Section title" />
          </h3>
          <div className="overview-activity">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="overview-activity-item">
                  <div className={`overview-activity-icon ${activity.color}`}>
                    <i className={activity.icon} />
                  </div>
                  <div>
                    <p className="overview-activity-action">{activity.action}</p>
                    <p className="overview-activity-detail">{activity.detail}</p>
                    <p className="overview-activity-time">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="dashboard-empty" style={{ padding: "1.5rem" }}>
                <p style={{ color: "var(--text-color-muted)" }}><Txt k="dashboard.overview.no_activity_yet_book_a_service_to_get_st" d={"No activity yet. Book a service to get started!"} /></p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: "1.5rem" }}>
        <h3 className="dashboard-section-title">
          <i className="fa-solid fa-bolt" /> <Txt k="dashboard.overview.actions_title" d="Quick Actions" label="Section title" />
        </h3>
        <div className="overview-quick-actions">
          <Link to="/apply" className="overview-quick-action">
            <i className="fa-solid fa-plus-circle" />
            <span><Txt k="dashboard.overview.book_new_cleaning" d={"Book New Cleaning"} /></span>
          </Link>
          <Link to="/dashboard/bookings" className="overview-quick-action">
            <i className="fa-solid fa-calendar-check" />
            <span><Txt k="dashboard.overview.view_bookings" d={"View Bookings"} /></span>
          </Link>
          <Link to="/dashboard/favorites" className="overview-quick-action">
            <i className="fa-solid fa-heart" />
            <span><Txt k="dashboard.overview.favorite_services" d={"Favorite Services"} /></span>
          </Link>
          <Link to="/dashboard/rewards" className="overview-quick-action">
            <i className="fa-solid fa-trophy" />
            <span><Txt k="dashboard.overview.redeem_rewards" d={"Redeem Rewards"} /></span>
          </Link>
          <Link to="/dashboard/support" className="overview-quick-action">
            <i className="fa-solid fa-headset" />
            <span><Txt k="dashboard.overview.get_support" d={"Get Support"} /></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
