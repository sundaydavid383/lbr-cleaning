import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-bg-shape shape-1"></div>
        <div className="auth-bg-shape shape-2"></div>
        <div className="auth-bg-shape shape-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <img src="/house-cleaning.png" alt="LBR Cleaning" />
            </Link>
            <h1>Welcome Back</h1>
            <p>Sign in to your LBR Cleaning account</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`auth-form-group ${focusedField === 'email' || email ? 'focused' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className={`auth-form-group ${focusedField === 'password' || password ? 'focused' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="auth-form-options">
              <label className="auth-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="#" className="auth-forgot">Forgot password?</Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
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

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <h2>Welcome to LBR Cleaning</h2>
          <p>Sign in to manage your bookings, track cleaning schedules, and access exclusive offers.</p>
          <div className="auth-features">
            <div className="auth-feature">
              <i className="fa-solid fa-calendar-check"></i>
              <span>Manage Bookings</span>
            </div>
            <div className="auth-feature">
              <i className="fa-solid fa-bell"></i>
              <span>Get Notifications</span>
            </div>
            <div className="auth-feature">
              <i className="fa-solid fa-tag"></i>
              <span>Exclusive Offers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
