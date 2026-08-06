import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";

const LAGOS_AREAS = [
  "Victoria Island",
  "Lekki",
  "Ikoyi",
  "Banana Island",
  "Ikeja",
  "Surulere",
  "Yaba",
  "Apapa",
  "Lagos Island",
  "Maryland",
  "Ajah",
  "Sangotedo",
  "Adeniyi Jones",
  "Allen Avenue",
  "Opebi",
  "Gbagada",
  "Ikorodu",
  "Eko Atlantic",
  "Other",
];

const PROPERTY_TYPES = [
  "Apartment",
  "Duplex",
  "Bungalow",
  "Terrace",
  "Office Space",
  "Commercial Property",
  "Short Let",
  "Other",
];

const SERVICES = [
  "Home Cleaning",
  "Office Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Move In/Out",
  "Deep Cleaning",
  "Sanitization",
  "Post-Construction",
];

const REFERRAL_SOURCES = [
  "Google Search",
  "Social Media",
  "Friend / Family",
  "Flyer / Banner",
  "Existing Customer",
  "Other",
];

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    propertyType: "",
    preferredService: "",
    referralSource: "",
    password: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
    setError("");
  };

  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const required = ["name", "email", "phone", "address", "city", "password", "confirmPassword"];
    const missing = required.filter((field) => !formData[field]?.trim());
    if (missing.length > 0) {
      setError("Please fill in all required fields");
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
    const result = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      city: formData.city,
      propertyType: formData.propertyType,
      referralSource: formData.referralSource,
      avatar: avatarPreview,
    });
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  const inputClass = (field) =>
    `auth-form-group ${focusedField === field || formData[field] ? "focused" : ""}`;

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-bg-shape shape-1"></div>
        <div className="auth-bg-shape shape-2"></div>
        <div className="auth-bg-shape shape-3"></div>
      </div>

      <div className="auth-container auth-container--signup">
        <div className="auth-card auth-card--wide">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <img src="/house-cleaning.png" alt="LBR Cleaning" />
            </Link>
            <div className="auth-badge-row">
              <span className="auth-badge">New Account</span>
              <span className="auth-badge-count">Step 1 of 1</span>
            </div>
            <h1>Create Your Account</h1>
            <p>
              Join <strong>2,500+</strong> happy customers across Lagos. Tell us a bit about yourself so we
              can personalize your cleaning experience.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form auth-form--grid">
            <div className="auth-section-title">
              <i className="fa-solid fa-camera"></i>
              <span>Profile Picture</span>
            </div>

            <div className="auth-avatar-upload">
              <div className="auth-avatar-preview" onClick={triggerAvatarUpload}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile preview" />
                ) : (
                  <div className="auth-avatar-placeholder">
                    <i className="fa-solid fa-camera"></i>
                    <span>Upload Photo</span>
                  </div>
                )}
                <div className="auth-avatar-overlay">
                  <i className="fa-solid fa-camera"></i>
                </div>
              </div>
              <div className="auth-avatar-info">
                <p className="auth-avatar-label">Add a profile picture</p>
                <p className="auth-avatar-hint">JPG, PNG or GIF. Max 5MB.</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="auth-avatar-input"
              />
            </div>

            <div className="auth-section-title">
              <i className="fa-solid fa-user"></i>
              <span>Personal Information</span>
            </div>

            <div className={inputClass("name")}>
              <label htmlFor="name">Full Name *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={update("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Chidinma Okafor"
                  required
                />
              </div>
            </div>

            <div className={inputClass("email")}>
              <label htmlFor="email">Email Address *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={update("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className={inputClass("phone")}>
              <label htmlFor="phone">Phone Number *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={update("phone")}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+234 801 234 5678"
                  required
                />
              </div>
            </div>

            <div className="auth-section-title">
              <i className="fa-solid fa-location-dot"></i>
              <span>Location Details</span>
            </div>

            <div className={inputClass("city")}>
              <label htmlFor="city">City / Area *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-map-pin"></i>
                <select
                  id="city"
                  value={formData.city}
                  onChange={update("city")}
                  onFocus={() => setFocusedField("city")}
                  onBlur={() => setFocusedField(null)}
                  required
                >
                  <option value="">Select your area</option>
                  {LAGOS_AREAS.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={inputClass("address")}>
              <label htmlFor="address">Full Address *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-house"></i>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={update("address")}
                  onFocus={() => setFocusedField("address")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. 15 Admiralty Way, Lekki Phase 1"
                  required
                />
              </div>
            </div>

            <div className={inputClass("propertyType")}>
              <label htmlFor="propertyType">Property Type</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-building"></i>
                <select
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={update("propertyType")}
                  onFocus={() => setFocusedField("propertyType")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">Select property type</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="auth-section-title">
              <i className="fa-solid fa-broom"></i>
              <span>Service Preferences</span>
            </div>

            <div className={inputClass("preferredService")}>
              <label htmlFor="preferredService">Preferred Service</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-sparkles"></i>
                <select
                  id="preferredService"
                  value={formData.preferredService}
                  onChange={update("preferredService")}
                  onFocus={() => setFocusedField("preferredService")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={inputClass("referralSource")}>
              <label htmlFor="referralSource">How Did You Hear About Us?</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-share-nodes"></i>
                <select
                  id="referralSource"
                  value={formData.referralSource}
                  onChange={update("referralSource")}
                  onFocus={() => setFocusedField("referralSource")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">Select an option</option>
                  {REFERRAL_SOURCES.map((source) => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="auth-section-title">
              <i className="fa-solid fa-lock"></i>
              <span>Security</span>
            </div>

            <div className={inputClass("password")}>
              <label htmlFor="password">Password *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={update("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Min. 6 characters"
                  required
                />
              </div>
              {formData.password && (
                <div className="auth-password-strength">
                  <div className={`auth-strength-bar ${formData.password.length >= 6 ? "strong" : "weak"}`} />
                </div>
              )}
            </div>

            <div className={inputClass("confirmPassword")}>
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-shield-halved"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={update("confirmPassword")}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>

            <div className="auth-form-consent">
              <label className="auth-checkbox">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                I agree to LBR Cleaning&apos;s Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Creating your account...
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
          <div className="auth-info-inner">
            <div className="auth-info-badge">Trusted by 2,500+ customers</div>
            <h2>Your Spotless Space Is Just a Few Clicks Away</h2>
            <p>
              LBR Cleaning is Lagos&apos; most trusted professional cleaning company. From Victoria Island
              to Lekki, we deliver premium, eco-friendly cleaning services tailored to your home or
              business.
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
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <div>
                  <strong>Book in 60 Seconds</strong>
                  <p>Streamlined scheduling that fits your busy lifestyle</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-leaf"></i>
                </div>
                <div>
                  <strong>Eco-Friendly Products</strong>
                  <p>Non-toxic, family-safe cleaning solutions</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <strong>100% Satisfaction</strong>
                  <p>Not happy? We re-clean for free within 24 hours</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <strong>Flexible Scheduling</strong>
                  <p>Weekly, bi-weekly, or one-time cleans</p>
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
                &ldquo;LBR Cleaning transformed my apartment in Lekki. The team was punctual,
                professional, and the results were outstanding.&rdquo;
              </p>
              <p className="auth-testimonial-author">— Funke Adeyemi, Victoria Island</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
