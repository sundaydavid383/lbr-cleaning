import React, { createContext, useContext, useState, useCallback } from "react";
import { apiUrl } from "../utils/api";
import { invalidateCache } from "../services/contentService";
import { useAuth } from "./AuthContext";

const EditModeContext = createContext(null);

export const EditModeProvider = ({ children }) => {
  const { token, isAuthenticated, user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [overrides, setOverrides] = useState({});

  const isAdmin = isAuthenticated && user?.role === "admin";

  const setOverride = useCallback((key, value) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getOverride = useCallback(
    (key, fallback) =>
      Object.prototype.hasOwnProperty.call(overrides, key) ? overrides[key] : fallback,
    [overrides]
  );

  const saveField = useCallback(async (key, newValue, fallbackType) => {
    if (!token) {
      console.warn("[EDIT-MODE] No token available for saving");
      return false;
    }

    setSaveStatus("saving");
    try {
      const currentRes = await fetch(apiUrl(`/api/cms/content/${encodeURIComponent(key)}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const currentJson = await currentRes.json();
      const current = currentRes.ok && currentJson.success ? currentJson.data : null;

      const res = await fetch(apiUrl(`/api/cms/content/${encodeURIComponent(key)}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: current?.type || fallbackType,
          value: newValue,
          label: current?.label ?? null,
          description: current?.description ?? null,
          category: current?.category ?? null,
          isPublic: current?.isPublic !== undefined ? current.isPublic : true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOverride(key, newValue);
        invalidateCache();
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 1800);
        return true;
      }

      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return false;
    } catch (err) {
      console.error("[EDIT-MODE] saveField error:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return false;
    }
  }, [token, setOverride]);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode, saveStatus, saveField, getOverride, isAdmin }}>
      {children}
    </EditModeContext.Provider>
  );
};

// Safe to call from ANY component, even ones rendered outside the provider
// (i.e. every normal visitor-facing page) — editing simply reports as off.
export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    return {
      isEditMode: false,
      setIsEditMode: () => {},
      saveStatus: "idle",
      saveField: async () => false,
      getOverride: (_key, fallback) => fallback,
      isAdmin: false,
    };
  }
  return ctx;
};