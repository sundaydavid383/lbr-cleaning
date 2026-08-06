import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import EditModeBar from "../editModeBar/EditModeBar";

const AdminEditLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const { setIsEditMode } = useEditMode();

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      setIsEditMode(true);
    }
    return () => setIsEditMode(false);
  }, [isAuthenticated, user, setIsEditMode]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="cms-locked">
        <i className="fa-solid fa-lock"></i>
        <h2>Admins only</h2>
        <p>Log in as an administrator to edit this website visually.</p>
        
      </div>
    );
  }

  return (
    <>
      <EditModeBar />
      <Outlet />
    </>
  );
};

export default AdminEditLayout;