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
      setError("Please enter your email and password");
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
            <div className="auth-badge-row">
              <span className="auth-badge">Member Login</span>
            </div>
            <h1>Welcome Back</h1>
            <p>
              Sign in to manage your bookings, track cleaning schedules, and access exclusive member
              offers.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`auth-form-group ${focusedField === "email" || email ? "focused" : ""}`}>
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className={`auth-form-group ${focusedField === "password" || password ? "focused" : ""}`}>
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
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
              Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <div className="auth-info-inner">
            <div className="auth-info-badge">Trusted by 2,500+ customers</div>
            <h2>Your Cleaning Dashboard Awaits</h2>
            <p>
              Book, reschedule, and track your cleaning services — all from one place. Join thousands
              of Lagos residents who trust LBR Cleaning.
            </p>

            <div className="auth-stats">
              <div className="auth-stat">
                <span className="auth-stat-number">8+</span>
                <span className="auth-stat-label">Years Experience</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-number">15K+</span>
                <span className="auth-stat-label">Projects Done</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-number">4.9</span>
                <span className="auth-stat-label">Client Rating</span>
              </div>
            </div>

            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <strong>Manage Bookings</strong>
                  <p>View upcoming, completed, and cancelled appointments</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-bell"></i>
                </div>
                <div>
                  <strong>Smart Notifications</strong>
                  <p>Get reminders before your scheduled cleaning</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-tag"></i>
                </div>
                <div>
                  <strong>Exclusive Offers</strong>
                  <p>Members-only discounts and loyalty rewards</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <div>
                  <strong>Payment History</strong>
                  <p>Download invoices and track transactions</p>
                </div>
              </div>
            </div>

            <div className="auth-testimonial">
              <div className="auth-testimonial-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="auth-testimonial-text">
                &ldquo;The dashboard makes it so easy to rebook. I&apos;ve been using LBR Cleaning for
                over a year now and the consistency is unmatched.&rdquo;
              </p>
              <p className="auth-testimonial-author">— Emeka Nwosu, Lekki Phase 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
