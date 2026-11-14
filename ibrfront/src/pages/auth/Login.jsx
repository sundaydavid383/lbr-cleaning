import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import Txt from "../../component/editable/Txt";
import AuthInfoExtras from "./AuthInfoExtras";
import { useCms } from "../../hooks/useCmsContent";
import EditZone from "../../component/editable/EditZone";
import EditSection from "../../component/editable/EditSection";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const Login = () => {
  const site = useSiteSettings();
  const hints = useCms("login.placeholders", {}) || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isEditMode } = useEditMode();

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
        <div className="auth-card auth-form-topspacing">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
<EditZone as="span" site badge="Logo">
                <img src={site.logo} alt={site.name} />
              </EditZone>
            </Link>
            <div className="auth-badge-row">
              <EditableText cmsKey="login.badge" type="text" value="Member Login" as="span" className="auth-badge" />
            </div>
            <EditableText cmsKey="login.heading" type="text" value="Welcome Back" as="h1" />
            <EditableText cmsKey="login.subtitle" type="text" value="Sign in to manage your bookings, track cleaning schedules, and access exclusive member offers." as="p" />
          </div>

          {/* {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )} */}

          <EditSection
            cmsKey="login.placeholders"
            root={{ email: "you@example.com", password: "Enter your password" }}
            label="box hints"
            icon="fa-keyboard"
            help="The grey hint text shown inside each empty box."
            fields={[
              { key: "email", type: "text", label: "Email box" },
              { key: "password", type: "text", label: "Password box" },
            ]}
          />
          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`auth-form-group ${focusedField === "email" || email ? "focused" : ""}`}>
              <label htmlFor="email"><Txt k="login.email_label" d="Email Address" label="Email box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.email || "you@example.com"}
                  required
                />
              </div>
            </div>

            <div className={`auth-form-group ${focusedField === "password" || password ? "focused" : ""}`}>
              <label htmlFor="password"><Txt k="login.password_label" d="Password" label="Password box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.password || "Enter your password"}
                  required
                />
              </div>
            </div>

            {/* <div className="auth-form-options">
              <label className="auth-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="#" className="auth-forgot">Forgot password?</Link>
            </div> */}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                <span>
                  <Txt k="login.button" d="Sign In" label="Sign in button" /> <i className="fa-solid fa-arrow-right"></i>
                </span>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              <Txt k="login.footer_text" d="Don't have an account?" label="Footer text" />{" "}
              <Link to="/signup" className="auth-link"><Txt k="login.footer_link" d="Sign Up" label="Footer link" /></Link>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <div className="auth-info-inner">
            <EditableText cmsKey="login.info_badge" type="text" value="Trusted by 2,500+ customers" as="span" className="auth-info-badge" />
            <EditableText cmsKey="login.info_heading" type="text" value="Your Cleaning Dashboard Awaits" as="h2" />
            <EditableText cmsKey="login.info_text" type="text" value="Book, reschedule, and track your cleaning services — all from one place. Join thousands of Lagos residents who trust LBR Cleaning." as="p" />

            <AuthInfoExtras
              prefix="login"
              defaultFeatures={[
                { icon: "fa-solid fa-calendar-check", title: "Manage Bookings", text: "View upcoming, completed, and cancelled appointments" },
                { icon: "fa-solid fa-bell", title: "Smart Notifications", text: "Get reminders before your scheduled cleaning" },
                { icon: "fa-solid fa-tag", title: "Exclusive Offers", text: "Members-only discounts and loyalty rewards" },
                { icon: "fa-solid fa-receipt", title: "Payment History", text: "Download invoices and track transactions" },
              ]}
              defaultQuote="The dashboard makes it so easy to rebook. I've been using LBR Cleaning for over a year now and the consistency is unmatched."
              defaultAuthor="Emeka Nwosu, Lekki Phase 1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
