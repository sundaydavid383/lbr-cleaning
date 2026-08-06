// filepath: ibrfront/src/pages/dashboard/components/DashboardSidebar.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./dashboardSidebar.css";

const DashboardSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const mainLinks = [
    { to: "/dashboard", label: "Overview", icon: "fa-solid fa-grid-2", end: true },
    { to: "/dashboard/bookings", label: "My Bookings", icon: "fa-solid fa-calendar-check" },
    { to: "/dashboard/payments", label: "Payments", icon: "fa-solid fa-credit-card" },
    { to: "/dashboard/favorites", label: "Favorites", icon: "fa-solid fa-heart" },
    { to: "/dashboard/rewards", label: "Rewards", icon: "fa-solid fa-trophy" },
  ];

  const bottomLinks = [
    { to: "/dashboard/settings", label: "Settings", icon: "fa-solid fa-gear" },
    { to: "/dashboard/support", label: "Support", icon: "fa-solid fa-headset" },
  ];

  const isActive = (path, end = false) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  return (
    <aside className={`dashboard-sidebar ${isOpen ? "mobile-open" : ""}`}>
      <div className="dashboard-sidebar-logo">
        <img src="/house-cleaning.png" alt="" aria-hidden="true" />
        <span>LBR</span>
      </div>

      <div className="dashboard-sidebar-section">Main Menu</div>
      {mainLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive: active }) =>
            `dashboard-sidebar-link ${active ? "active" : ""}`
          }
          onClick={onClose}
        >
          <i className={link.icon} />
          <span>{link.label}</span>
        </NavLink>
      ))}

      <div className="dashboard-sidebar-divider" />

      <div className="dashboard-sidebar-section">Account</div>
      {bottomLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive: active }) =>
            `dashboard-sidebar-link ${active ? "active" : ""}`
          }
          onClick={onClose}
        >
          <i className={link.icon} />
          <span>{link.label}</span>
        </NavLink>
      ))}

      <div className="dashboard-sidebar-bottom">
        <button className="dashboard-sidebar-link dashboard-sidebar-logout" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket" />
          <span>Sign Out</span>
        </button>
        <NavLink to="/" className="dashboard-sidebar-link dashboard-sidebar-back" onClick={onClose}>
          <i className="fa-solid fa-arrow-left" />
          <span>Back to Site</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
