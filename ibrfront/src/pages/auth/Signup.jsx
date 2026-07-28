import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await signup({ name, email, phone, password });
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
            <h1>Create Account</h1>
            <p>Join LBR Cleaning and manage your services</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`auth-form-group ${focusedField === 'name' || name ? 'focused' : ''}`}>
              <label htmlFor="name">Full Name</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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

            <div className={`auth-form-group ${focusedField === 'phone' || phone ? 'focused' : ''}`}>
              <label htmlFor="phone">Phone Number</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+234 801 234 5678"
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
                  placeholder="Min. 6 characters"
                  required
                />
              </div>
            </div>

            <div className={`auth-form-group ${focusedField === 'confirmPassword' || confirmPassword ? 'focused' : ''}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-shield-halved"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Creating account...
                </span>
              ) : (
                <span>
                  Create Account <i className="fa-solid fa-arrow-right"></i>
                </span>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <h2>Get Started with LBR</h2>
          <p>Create your account to book cleaning services, track appointments, and get personalized recommendations.</p>
          <div className="auth-features">
            <div className="auth-feature">
              <i className="fa-solid fa-bolt"></i>
              <span>Quick Booking</span>
            </div>
            <div className="auth-feature">
              <i className="fa-solid fa-clock"></i>
              <span>Schedule Management</span>
            </div>
            <div className="auth-feature">
              <i className="fa-solid fa-percent"></i>
              <span>Member Discounts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
