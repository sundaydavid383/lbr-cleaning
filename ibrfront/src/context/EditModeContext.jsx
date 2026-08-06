import React, { createContext, useContext, useState, useCallback } from "react";
import { apiUrl } from "../utils/api";
import { invalidateCache } from "../services/contentService";

const EditModeContext = createContext(null);

export const EditModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [overrides, setOverrides] = useState({});

  const setOverride = useCallback((key, value) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Components read the just-saved value instantly via this, instead of
  // waiting for a refetch — value is whatever the page originally passed in.
  const getOverride = useCallback(
    (key, fallback) =>
      Object.prototype.hasOwnProperty.call(overrides, key) ? overrides[key] : fallback,
    [overrides]
  );

  const saveField = useCallback(async (key, newValue, fallbackType) => {
    setSaveStatus("saving");
    try {
      const token = localStorage.getItem("lbr_auth_token");

      // Read the current record first so we never blank out its
      // label/description/category/isPublic. The PUT endpoint expects the
      // full record, not a partial patch — if we only sent `value`, the
      // controller would overwrite label/description/category with null.
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
  }, [setOverride]);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode, saveStatus, saveField, getOverride }}>
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
    };
  }
  return ctx;
};