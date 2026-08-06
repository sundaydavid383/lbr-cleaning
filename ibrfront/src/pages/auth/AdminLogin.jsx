import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);
    const result = await adminLogin(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      setLocked(!!result.inputDisable);
      return;
    }

    navigate("/admin/cms");
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-bg-shape shape-1"></div>
        <div className="auth-bg-shape shape-2"></div>
        <div className="auth-bg-shape shape-3"></div>
      </div>

      <div className="auth-container" style={{ justifyContent: "center" }}>
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge-row">
              <span className="auth-badge">Admin Access</span>
            </div>
            <h1>Admin Sign In</h1>
            <p>Restricted area. Sign in with your administrator credentials.</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`auth-form-group ${email ? "focused" : ""}`}>
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  disabled={locked}
                  required
                />
              </div>
            </div>

            <div className={`auth-form-group ${password ? "focused" : ""}`}>
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={locked}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading || locked}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                <span>
                  Sign In <i className="fa-solid fa-arrow-right"></i>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;