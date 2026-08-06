import React, { createContext, useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [user, token]);

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
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    signup,
    updateProfile,
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
