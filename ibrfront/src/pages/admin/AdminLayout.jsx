import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./admin.css";

const AdminLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  const crumbs = location.pathname.split("/").filter(Boolean);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h3>Admin</h3>
          <p className="admin-user">{user?.name || "-"}</p>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/cms" className={`admin-nav-link ${location.pathname.startsWith("/admin/cms") ? "active" : ""}`}>Content Library</Link>
          <Link to="/admin/cms/batch" className={`admin-nav-link ${location.pathname === "/admin/cms/batch" ? "active" : ""}`}>Batch Editor</Link>
          <Link to="/admin/edit/home" className={`admin-nav-link ${location.pathname.startsWith("/admin/edit") ? "active" : ""}`}>Visual Editor</Link>
          <Link to="/admin/message" className={`admin-nav-link ${location.pathname === "/admin/message" ? "active" : ""}`}>Messages</Link>
          <Link to="/admin/create-admin" className="admin-nav-link">Create Admin</Link>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-logout" onClick={() => logout()}>Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-breadcrumbs">
          {crumbs.length === 0 ? <span>Admin</span> : crumbs.map((c, i) => (
            <span key={i} className="crumb">{c}</span>
          ))}
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
