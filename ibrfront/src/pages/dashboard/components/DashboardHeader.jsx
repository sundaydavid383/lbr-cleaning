// filepath: ibrfront/src/pages/dashboard/components/DashboardHeader.jsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./dashboardHeader.css";

const DashboardHeader = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.includes("bookings")) return "My Bookings";
    if (path.includes("payments")) return "Payments";
    if (path.includes("settings")) return "Settings";
    if (path.includes("favorites")) return "Favorites";
    if (path.includes("rewards")) return "Rewards";
    if (path.includes("support")) return "Support";
    return "Dashboard";
  };

  const notifications = [
    { id: 1, text: "Your cleaning is scheduled for tomorrow", time: "2h ago", unread: true },
    { id: 2, text: "Payment received for Booking #1234", time: "1d ago", unread: true },
    { id: 3, text: "New discount available for you!", time: "3d ago", unread: false },
  ];

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <button className="dashboard-sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <i className="fa-solid fa-bars" />
        </button>
        <div>
          <h1>{getPageTitle()}</h1>
          <p>Welcome back, {user?.name?.split(" ")[0] || "there"}</p>
        </div>
      </div>
      <div className="dashboard-header-actions">
        <div className="dashboard-notif" ref={(el) => { /* notification dropdown logic */ }}>
          <button className="dashboard-header-btn" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
            <i className="fa-solid fa-bell" />
            {notifications.some(n => n.unread) && <span className="dashboard-header-badge" />}
          </button>
          {notifOpen && (
            <div className="dashboard-notif-dropdown">
              <div className="dashboard-notif-header">
                <h4>Notifications</h4>
                <span className="dashboard-notif-count">{notifications.filter(n => n.unread).length} new</span>
              </div>
              {notifications.map((notif) => (
                <div key={notif.id} className={`dashboard-notif-item ${notif.unread ? "unread" : ""}`}>
                  <p>{notif.text}</p>
                  <span>{notif.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link to="/apply" className="dashboard-btn dashboard-btn-primary dashboard-btn-sm">
          <i className="fa-solid fa-plus" /> New Booking
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
