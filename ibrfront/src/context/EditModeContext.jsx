import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { apiUrl } from "../utils/api";
import { useAuth } from "./AuthContext";
import {
  getItem,
  getValue,
  setItem,
  removeItem,
  setIn,
  guessCategory,
  loadAll,
} from "../services/cmsStore";

const EditModeContext = createContext(null);
const EDIT_MODE_KEY = "lbr_edit_mode";

const inferType = (value) => {
  if (Array.isArray(value)) return "array";
  if (value !== null && typeof value === "object") return "object";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  return "text";
};

export const EditModeProvider = ({ children }) => {
  const { token, isAuthenticated, user } = useAuth();
  const isAdmin = isAuthenticated && user?.role === "admin";

  const [isEditMode, setIsEditModeState] = useState(() => {
    try {
      return sessionStorage.getItem(EDIT_MODE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [saveStatus, setSaveStatus] = useState("idle");
  const [lastError, setLastError] = useState("");
  const [panel, setPanel] = useState(null); // side-panel config, see EditPanel
  const [canUndo, setCanUndo] = useState(false);
  const historyRef = useRef([]); // [{ key, prev }] — prev is the item before the save
  const statusTimer = useRef(null);

  const setIsEditMode = useCallback((on) => {
    setIsEditModeState(on);
    try {
      sessionStorage.setItem(EDIT_MODE_KEY, on ? "1" : "0");
    } catch {
      // ignore
    }
    if (!on) setPanel(null);
  }, []);

  // Never leave edit mode switched on for someone who isn't an admin.
  useEffect(() => {
    if (!isAdmin && isEditMode) setIsEditMode(false);
  }, [isAdmin, isEditMode, setIsEditMode]);

  useEffect(() => {
    document.body.classList.toggle("cms-editing", isEditMode && isAdmin);
  }, [isEditMode, isAdmin]);

  const flashStatus = (status, ms) => {
    clearTimeout(statusTimer.current);
    setSaveStatus(status);
    if (ms) statusTimer.current = setTimeout(() => setSaveStatus("idle"), ms);
  };

  // Low-level save of a whole content item. Returns true/false.
  const putItem = useCallback(
    async (key, value, type, meta = {}, { recordHistory = true } = {}) => {
      if (!token) {
        setLastError("You are not logged in. Please log in again.");
        flashStatus("error", 4000);
        return false;
      }

      const prev = getItem(key);
      const body = { value, type: prev?.type || type || inferType(value) };
      if (!prev) {
        body.category = meta.category || guessCategory(key);
        body.label = meta.label || null;
        body.isPublic = true;
      } else {
        if (meta.label !== undefined) body.label = meta.label;
        if (meta.category !== undefined) body.category = meta.category;
      }

      flashStatus("saving");
      // Optimistic: show the change right away, roll back if the save fails.
      setItem({ key, ...body, category: body.category ?? prev?.category });

      try {
        const res = await fetch(apiUrl(`/api/cms/content/${encodeURIComponent(key)}`), {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          setItem(data.data);
          if (recordHistory) {
            historyRef.current = [...historyRef.current.slice(-29), { key, prev }];
            setCanUndo(true);
          }
          setLastError("");
          flashStatus("saved", 2500);
          return true;
        }

        throw new Error(
          res.status === 401 || res.status === 403
            ? "Your login has expired. Please log in again."
            : data.message || "Could not save."
        );
      } catch (err) {
        console.error("[EDIT-MODE] save failed:", err);
        if (prev) setItem(prev);
        else removeItem(key);
        setLastError(err.message || "Could not save. Check your internet connection.");
        flashStatus("error", 5000);
        return false;
      }
    },
    [token]
  );

  // saveField(key, value, type) — replace a whole content item.
  const saveField = useCallback(
    (key, newValue, fallbackType, meta) => putItem(key, newValue, fallbackType, meta),
    [putItem]
  );

  // saveAt(key, path, value, rootFallback) — change one field inside an
  // object/array item, e.g. saveAt("service_details.home-cleaning", "faqs.0.answer", "…").
  // rootFallback is used when the item doesn't exist in the database yet.
  const saveAt = useCallback(
    (key, path, newValue, rootFallback, meta) => {
      if (!path) return putItem(key, newValue, inferType(newValue), meta);
      const root = getValue(key, rootFallback);
      const nextRoot = setIn(root ?? (/^\d/.test(String(path)) ? [] : {}), path, newValue);
      return putItem(key, nextRoot, inferType(nextRoot), meta);
    },
    [putItem]
  );

  const undo = useCallback(async () => {
    const last = historyRef.current.pop();
    setCanUndo(historyRef.current.length > 0);
    if (!last) return false;
    if (last.prev) {
      return putItem(last.key, last.prev.value, last.prev.type, {}, { recordHistory: false });
    }
    // The item was newly created — remove it again.
    try {
      await fetch(apiUrl(`/api/cms/content/${encodeURIComponent(last.key)}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      removeItem(last.key);
      flashStatus("saved", 2000);
      return true;
    } catch {
      flashStatus("error", 4000);
      return false;
    }
  }, [putItem, token]);

  // Kept for older callers: reads the live value from the store.
  const getOverride = useCallback((key, fallback) => getValue(key, fallback), []);

  const refreshAll = useCallback(() => {
    loadAll(true);
  }, []);

  const openPanel = useCallback((config) => setPanel(config), []);
  const closePanel = useCallback(() => setPanel(null), []);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode: isEditMode && isAdmin,
        setIsEditMode,
        saveStatus,
        lastError,
        saveField,
        saveAt,
        getOverride,
        refreshAll,
        undo,
        canUndo,
        panel,
        openPanel,
        closePanel,
        isAdmin,
        token,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

// Safe to call from ANY component — outside the provider editing is simply off.
export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    return {
      isEditMode: false,
      setIsEditMode: () => {},
      saveStatus: "idle",
      lastError: "",
      saveField: async () => false,
      saveAt: async () => false,
      getOverride: (_key, fallback) => fallback,
      refreshAll: () => {},
      undo: async () => false,
      canUndo: false,
      panel: null,
      openPanel: () => {},
      closePanel: () => {},
      isAdmin: false,
      token: null,
    };
  }
  return ctx;
};
