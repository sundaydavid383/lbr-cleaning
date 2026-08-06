import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";

const AdminCreateAdmin = () => {
  const { isAuthenticated, user, createAdmin } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="auth-page">
        <div className="auth-container" style={{ justifyContent: "center" }}>
          <div className="auth-card">
            <div className="auth-header">
              <h1>Admins Only</h1>
              <p>You need to be signed in as an administrator to create new admin accounts.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const update = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await createAdmin({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(`Admin account created for ${result.user.email}.`);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ justifyContent: "center" }}>
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge-row">
              <span className="auth-badge">Admin Tools</span>
            </div>
            <h1>Add a New Admin</h1>
            <p>Create login credentials for another administrator. They'll be able to sign in and manage content immediately.</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}
          {success && (
            <div className="auth-error" style={{ background: "rgba(22,163,74,0.1)", color: "#166534", borderColor: "rgba(22,163,74,0.3)" }}>
              <i className="fa-solid fa-circle-check"></i>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`auth-form-group ${formData.name ? "focused" : ""}`}>
              <label htmlFor="name">Full Name</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-user"></i>
                <input type="text" id="name" value={formData.name} onChange={update("name")} required />
              </div>
            </div>

            <div className={`auth-form-group ${formData.email ? "focused" : ""}`}>
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input type="email" id="email" value={formData.email} onChange={update("email")} required />
              </div>
            </div>

            <div className={`auth-form-group ${formData.password ? "focused" : ""}`}>
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-key"></i>
                <input type="password" id="password" value={formData.password} onChange={update("password")} placeholder="Min. 6 characters" required />
              </div>
            </div>

            <div className={`auth-form-group ${formData.confirmPassword ? "focused" : ""}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-shield-halved"></i>
                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={update("confirmPassword")} required />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Creating...
                </span>
              ) : (
                <span>Create Admin Account</span>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p><Link to="/admin/cms" className="auth-link">Back to Content Library</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateAdmin;