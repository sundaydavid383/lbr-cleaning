import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";

// Old visual-editor URLs (/admin/edit/…) now open the real page with
// editing switched on, so admins edit exactly what visitors see.
const MAP = {
  "/admin/edit": "/",
  "/admin/edit/home": "/",
  "/admin/edit/about": "/about",
  "/admin/edit/services": "/service",
  "/admin/edit/blog": "/blog",
  "/admin/edit/contact": "/contact",
};

export const editTarget = (pathname) => {
  if (MAP[pathname]) return MAP[pathname];
  const m = pathname.match(/^\/admin\/edit\/services\/(.+)$/);
  if (m) return `/services/${m[1]}`;
  return pathname.replace(/^\/admin\/edit/, "") || "/";
};

const AdminEditLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const { setIsEditMode } = useEditMode();
  const location = useLocation();
  const isAdmin = isAuthenticated && user?.role === "admin";

  useEffect(() => {
    if (isAdmin) setIsEditMode(true);
  }, [isAdmin, setIsEditMode]);

  if (!isAdmin) {
    return (
      <div className="cms-locked">
        <i className="fa-solid fa-lock"></i>
        <h2>Admins only</h2>
        <p>Log in as an administrator to edit this website visually.</p>
      </div>
    );
  }

  return <Navigate to={editTarget(location.pathname)} replace />;
};

export default AdminEditLayout;
