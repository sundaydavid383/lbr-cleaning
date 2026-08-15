import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { apiFetch } from "../utils/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "lbr_auth_token";
const USER_KEY = "lbr_auth_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const expiryTimerRef = useRef(null);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [user, token]);

  // Decode a base64 JWT payload without adding a dependency. Returns null on failure.
  const parseJwtPayload = (jwt) => {
    try {
      const parts = jwt.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(decodeURIComponent(atob(payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
      return decoded;
    } catch (e) {
      return null;
    }
  };

  const scheduleExpiryLogout = (jwt) => {
    if (!jwt) return;
    const payload = parseJwtPayload(jwt);
    if (!payload || !payload.exp) return;
    const msLeft = payload.exp * 1000 - Date.now();
    if (msLeft <= 0) {
      // token already expired
      logout();
      return;
    }
    // Clear any existing timer
    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current);
    }
    // Schedule an automatic logout when the token expires
    expiryTimerRef.current = setTimeout(() => {
      logout();
    }, msLeft + 1500);
  };

  /**
   * Returns { success, message? } so the calling page can show its own
   * error UI instead of this context throwing.
   */
  const login = async (email, password) => {
    const { ok, data } = await apiFetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Login failed" };
    }

    setUser(data.user);
    setToken(data.token);
    scheduleExpiryLogout(data.token);
    return { success: true };
  };

  // Admin-specific login endpoint. Returns { success, message?, inputDisable? }
  const adminLogin = async (email, password) => {
    const { ok, data } = await apiFetch("/api/admin/login", {
      method: "POST",
      body: { email, password },
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Login failed", inputDisable: !!data.inputDisable };
    }

    setUser(data.user);
    setToken(data.token);
    scheduleExpiryLogout(data.token);
    return { success: true };
  };

  const signup = async ({ name, email, phone, password, address, city, propertyType, referralSource, avatar }) => {
    const { ok, data } = await apiFetch("/api/auth/signup", {
      method: "POST",
      body: { name, email, phone, password, address, city, propertyType, referralSource, avatar },
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Signup failed" };
    }

    setUser(data.user);
    setToken(data.token);
    scheduleExpiryLogout(data.token);
    return { success: true };
  };

  const updateProfile = async (updates) => {
    const { ok, data } = await apiFetch("/api/auth/profile", {
      method: "PUT",
      body: updates,
      token,
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Update failed" };
    }

    setUser((prev) => ({ ...prev, ...data.user }));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }
  };

  // Create another admin account (requires current admin token)
  const createAdmin = async ({ name, email, password }) => {
    if (!token) return { success: false, message: "Not authenticated" };
    const { ok, data } = await apiFetch("/api/admin/create", {
      method: "POST",
      body: { name, email, password },
      token,
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Failed to create admin" };
    }

    return { success: true, user: data.user };
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    adminLogin,
    signup,
    updateProfile,
    createAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
