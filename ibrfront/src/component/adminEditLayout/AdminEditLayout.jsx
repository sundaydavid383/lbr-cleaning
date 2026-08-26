import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import EditModeBar from "../editModeBar/EditModeBar";
import EditModeToast from "../editModeBar/EditModeToast";

const AdminEditLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const { isEditMode, setIsEditMode, saveStatus, refreshAll } = useEditMode();
  const reloadTimerRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      setIsEditMode(true);
    }
    return () => setIsEditMode(false);
  }, [isAuthenticated, user, setIsEditMode]);

  useEffect(() => {
    if (saveStatus === "saved") {
      if (reloadTimerRef.current) {
        clearTimeout(reloadTimerRef.current);
      }
      reloadTimerRef.current = setTimeout(() => {
        refreshAll();
        window.location.reload();
      }, 1200);
    }
    return () => {
      if (reloadTimerRef.current) {
        clearTimeout(reloadTimerRef.current);
      }
    };
  }, [saveStatus, refreshAll]);

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
      <EditModeToast />
      <Outlet />
    </>
  );
};

export default AdminEditLayout;