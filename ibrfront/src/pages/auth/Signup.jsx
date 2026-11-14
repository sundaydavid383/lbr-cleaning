import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import { apiUrl } from "../../utils/api";
import EditableText from "../../component/editable/EditableText";
import Txt from "../../component/editable/Txt";
import AuthInfoExtras from "./AuthInfoExtras";
import { useCms } from "../../hooks/useCmsContent";
import EditZone from "../../component/editable/EditZone";
import EditSection from "../../component/editable/EditSection";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const SIGNUP_HINTS = {
  name: "e.g. Chidinma Okafor",
  email: "you@example.com",
  phone: "+234 801 234 5678",
  city: "Type or select area (e.g. Lekki, Ikeja...)",
  address: "e.g. 15 Admiralty Way, Lekki Phase 1",
  password: "Min. 6 characters",
  confirmPassword: "Re-enter your password",
};

// ───────────────────────────────────────────────
// Put your Geoapify API key here later
const GEOAPIFY_API_KEY = "b251c888b5e749e19c7296822cb1cdac";
// ───────────────────────────────────────────────

const REFERRAL_SOURCES = [
  "Google Search",
  "Social Media",
  "Friend / Family",
  "Flyer / Banner",
  "Existing Customer",
  "Other",
];

const LAGOS_AREAS = [
  "Victoria Island",
  "Lekki Phase 1",
  "Lekki Phase 2",
  "Ikoyi",
  "Banana Island",
  "Eko Atlantic",
  "Oniru",
  "Osborne",
  "Parkview",
  "Ajah",
  "Sangotedo",
  "Abraham Adesanya",
  "Chevron",
  "VGC",
  "Ibeju-Lekki",
  "Ikeja",
  "Ikeja GRA",
  "Allen Avenue",
  "Opebi",
  "Adeniyi Jones",
  "Maryland",
  "Anthony Village",
  "Gbagada",
  "Magodo",
  "Omole",
  "Ogudu",
  "Ojodu",
  "Berger",
  "Yaba",
  "Surulere",
  "Apapa",
  "Festac",
  "Amuwo-Odofin",
  "Satellite Town",
  "Ikorodu",
  "Ikorodu Road",
  "Mile 12",
  "Ketu",
  "Alapere",
  "Oshodi",
  "Isolo",
  "Mushin",
  "Shomolu",
  "Bariga",
  "Palmgrove",
  "Ebute Metta",
  "Agege",
  "Abule Egba",
  "Iyana Ipaja",
  "Egbeda",
  "Idimu",
  "Ikotun",
  "Alimosho",
  "Other",
];

// Simple debounce helper
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const Signup = () => {
  const site = useSiteSettings();
  const hints = { ...SIGNUP_HINTS, ...(useCms("signup.placeholders", {}) || {}) };
  const navigate = useNavigate();
  const { signup } = useAuth();
  const fileInputRef = useRef(null);
  const { isEditMode } = useEditMode();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    referralSource: "",
    password: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  // Autocomplete state
  const [citySuggestions, setCitySuggestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cityLoading, setCityLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const debouncedCity = useDebounce(formData.city, 400);
  const debouncedAddress = useDebounce(formData.address, 400);

  // Fetch suggestions from Geoapify
  const fetchSuggestions = useCallback(async (text, type) => {
    if (!text || text.trim().length < 2 || GEOAPIFY_API_KEY === "YOUR_GEOAPIFY_API_KEY_HERE") {
      if (type === "city") setCitySuggestions([]);
      else setAddressSuggestions([]);
      return;
    }

    const isCity = type === "city";
    if (isCity) setCityLoading(true);
    else setAddressLoading(true);

    try {
      // For city/area we bias toward locality/suburb/neighbourhood
      // For full address we allow more detailed results
      const typeFilter = isCity
        ? "&type=city&type=suburb&type=neighbourhood&type=locality"
        : "";

      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&filter=countrycode:ng&limit=8${typeFilter}&apiKey=${GEOAPIFY_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      const results = (data.features || []).map((f) => {
        const p = f.properties;
        return {
          id: f.properties.place_id || Math.random().toString(36),
          // Nice display text
          label: p.formatted || p.name || p.address_line1,
          // What we actually store
          city: p.city || p.suburb || p.neighbourhood || p.county || p.name || "",
          address: p.formatted || p.address_line1 || "",
          raw: p,
        };
      });

      if (isCity) {
        setCitySuggestions(results);
        setShowCityDropdown(true);
      } else {
        setAddressSuggestions(results);
        setShowAddressDropdown(true);
      }
    } catch (err) {
      console.error("Geoapify error:", err);
      if (isCity) setCitySuggestions([]);
      else setAddressSuggestions([]);
    } finally {
      if (isCity) setCityLoading(false);
      else setAddressLoading(false);
    }
  }, []);

  // Trigger searches
  useEffect(() => {
    if (debouncedCity) fetchSuggestions(debouncedCity, "city");
    else {
      setCitySuggestions([]);
      setShowCityDropdown(false);
    }
  }, [debouncedCity, fetchSuggestions]);

  useEffect(() => {
    if (debouncedAddress) fetchSuggestions(debouncedAddress, "address");
    else {
      setAddressSuggestions([]);
      setShowAddressDropdown(false);
    }
  }, [debouncedAddress, fetchSuggestions]);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCitySelect = (item) => {
    setFormData((prev) => ({
      ...prev,
      city: item.city || item.label,
    }));
    setShowCityDropdown(false);
    setCitySuggestions([]);
  };

  const handleAddressSelect = (item) => {
    setFormData((prev) => ({
      ...prev,
      address: item.address || item.label,
      // Optionally also fill city if empty
      city: prev.city || item.city || "",
    }));
    setShowAddressDropdown(false);
    setAddressSuggestions([]);
  };

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

  const safeSignupError = (msg) => {
    const m = (msg || "").trim();
    if (!m) return "We couldn't create your account. Please try again.";
    const safe = new Set([
      "All fields are required",
      "Password must be at least 6 characters",
      "A user with that email already exists",
      "Failed to create account",
      "Signup failed",
      "Please fill in all required fields",
      "Passwords do not match",
    ]);
    if (safe.has(m)) return m;
    return "We couldn't create your account. Please try again.";
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
    try {
      let avatarUrl = avatarPreview;
      
      // If avatar is a base64 data URL, upload to ImageKit first
      if (avatarPreview && avatarPreview.startsWith("data:image")) {
        try {
          const uploadRes = await fetch(apiUrl("/api/uploads/avatar"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: avatarPreview, fileName: `avatar_${Date.now()}.jpg` }),
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success && uploadData.data?.url) {
            avatarUrl = uploadData.data.url;
          }
        } catch (err) {
          console.error("Avatar upload failed:", err);
        }
      }
      
      const result = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        referralSource: formData.referralSource,
        avatar: avatarUrl,
      });

      if (!result || !result.success) {
        setError(safeSignupError(result?.message));
        return;
      }

      navigate("/");
    } catch (err) {
      setError("We couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
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
<EditZone as="span" site badge="Logo">
                <img src={site.logo} alt={site.name} />
              </EditZone>
            </Link>
            <div className="auth-badge-row">
              <>
                <EditableText cmsKey="signup.badge" type="text" value="New Account" as="span" className="auth-badge" />
                <EditableText cmsKey="signup.badge_count" type="text" value="Step 1 of 1" as="span" className="auth-badge-count" />
              </>
            </div>
            <EditableText cmsKey="signup.heading" type="text" value="Create Your Account" as="h1" />
            <EditableText
              cmsKey="signup.subtitle"
              type="text"
              value="Join 2,500+ happy customers across Lagos. Tell us a bit about yourself so we can personalize your cleaning experience."
              as="p"
            />
          </div>

          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <EditSection
            cmsKey="signup.placeholders"
            root={SIGNUP_HINTS}
            label="box hints"
            icon="fa-keyboard"
            help="The grey hint text shown inside each empty box."
            fields={Object.keys(SIGNUP_HINTS).map((key) => ({ key, type: "text", label: `${key.replace(/([A-Z])/g, " $1")} box` }))}
          />
          <form onSubmit={handleSubmit} className="auth-form auth-form--grid">
            {/* ===== Profile Picture ===== */}
            <div className="auth-section-title">
              <>
                <i className="fa-solid fa-camera"></i>
                <EditableText cmsKey="signup.avatar_section" type="text" value="Profile Picture" as="span" />
              </>
            </div>

            <div className="auth-avatar-upload">
              <div className="auth-avatar-preview" onClick={triggerAvatarUpload}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile preview" />
                ) : (
                  <div className="auth-avatar-placeholder">
                    <i className="fa-solid fa-camera"></i>
                    <Txt k="signup.upload_photo" d="Upload Photo" label="Upload button" />
                  </div>
                )}
                <div className="auth-avatar-overlay">
                  <i className="fa-solid fa-camera"></i>
                </div>
              </div>
              <div className="auth-avatar-info">
                <>
                  <EditableText cmsKey="signup.avatar_label" type="text" value="Add a profile picture" as="p" className="auth-avatar-label" />
                  <EditableText cmsKey="signup.avatar_hint" type="text" value="JPG, PNG or GIF. Max 5MB." as="p" className="auth-avatar-hint" />
                </>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="auth-avatar-input"
              />
            </div>

            {/* ===== Personal Information ===== */}
            <div className="auth-section-title">
              <>
                <i className="fa-solid fa-user"></i>
                <EditableText cmsKey="signup.personal_section" type="text" value="Personal Information" as="span" />
              </>
            </div>

            <div className={inputClass("name")}>
              <label htmlFor="name"><Txt k="signup.label_name" d="Full Name *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={update("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.name}
                  required
                />
              </div>
            </div>

            <div className={inputClass("email")}>
              <label htmlFor="email"><Txt k="signup.label_email" d="Email Address *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={update("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.email}
                  required
                />
              </div>
            </div>

            <div className={inputClass("phone")}>
              <label htmlFor="phone"><Txt k="signup.label_phone" d="Phone Number *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={update("phone")}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.phone}
                  required
                />
              </div>
            </div>

            {/* ===== Location Details ===== */}
            <div className="auth-section-title">
              <>
                <i className="fa-solid fa-location-dot"></i>
                <EditableText cmsKey="signup.location_section" type="text" value="Location Details" as="span" />
              </>
            </div>

            {/* CITY / AREA - Searchable dropdown (local list) */}
            <div className={inputClass("city")} style={{ position: "relative" }}>
              <label htmlFor="city"><Txt k="signup.label_city" d="City / Area *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-map-pin"></i>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, city: e.target.value }));
                    setShowCityDropdown(true);
                  }}
                  onFocus={() => {
                    setFocusedField("city");
                    setShowCityDropdown(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setFocusedField(null);
                      setShowCityDropdown(false);
                    }, 200);
                  }}
                  placeholder={hints.city}
                  autoComplete="off"
                  required
                />
              </div>

              {showCityDropdown && (
                <ul className="geoapify-dropdown">
                  {LAGOS_AREAS
                    .filter((area) =>
                      area.toLowerCase().includes(formData.city.toLowerCase())
                    )
                    .map((area) => (
                      <li
                        key={area}
                        onMouseDown={() => {
                          setFormData((prev) => ({ ...prev, city: area }));
                          setShowCityDropdown(false);
                        }}
                      >
                        {area}
                      </li>
                    ))}
                  {LAGOS_AREAS.filter((area) =>
                    area.toLowerCase().includes(formData.city.toLowerCase())
                  ).length === 0 && (
                    <li style={{ color: "#94a3b8", cursor: "default" }}>
                      No matching area
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* FULL ADDRESS - Autocomplete */}
            <div className={inputClass("address")} style={{ position: "relative" }}>
              <label htmlFor="address"><Txt k="signup.label_address" d="Full Address *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-house"></i>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={update("address")}
                  onFocus={() => {
                    setFocusedField("address");
                    if (addressSuggestions.length) setShowAddressDropdown(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setFocusedField(null);
                      setShowAddressDropdown(false);
                    }, 200);
                  }}
                  placeholder={hints.address}
                  autoComplete="off"
                  required
                />
                {addressLoading && (
                  <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </span>
                )}
              </div>

              {showAddressDropdown && addressSuggestions.length > 0 && (
                <ul
                  className="geoapify-dropdown"
                >
                  {addressSuggestions.map((item) => (
                    <li
                      key={item.id}
                      onMouseDown={() => handleAddressSelect(item)}
                      style={{
                        padding: "10px 14px",
                        cursor: "pointer",
                        borderBottom: "1px solid #f1f5f9",
                        fontSize: 14,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={inputClass("referralSource")}>
              <label htmlFor="referralSource"><Txt k="signup.label_referralSource" d="How Did You Hear About Us?" label="Box title" /></label>
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
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ===== Security ===== */}
            <div className="auth-section-title">
              <>
                <i className="fa-solid fa-lock"></i>
                <EditableText cmsKey="signup.security_section" type="text" value="Security" as="span" />
              </>
            </div>

            <div className={inputClass("password")}>
              <label htmlFor="password"><Txt k="signup.label_password" d="Password *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={update("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.password}
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
              <label htmlFor="confirmPassword"><Txt k="signup.label_confirmPassword" d="Confirm Password *" label="Box title" /></label>
              <div className="auth-input-wrapper">
                <i className="fa-solid fa-shield-halved"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={update("confirmPassword")}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={hints.confirmPassword}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Creating your account...
                </span>
              ) : (
                <span>
                  <Txt k="signup.button" d="Create Account" label="Sign up button" /> <i className="fa-solid fa-arrow-right"></i>
                </span>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              <EditableText cmsKey="signup.footer_text" value="Already have an account?" label="Footer text" />{" "}
              <Link to="/login" className="auth-link">
                <EditableText cmsKey="signup.footer_link" value="Sign In" label="Footer link text" />
              </Link>
            </p>
          </div>
        </div>

        {/* Right side info panel stays the same */}
        <div className="auth-info">
          {/* ... keep your existing auth-info content exactly as it was ... */}
          <div className="auth-info-inner">
            <EditableText cmsKey="signup.info_badge" type="text" value="Trusted by 2,500+ customers" as="span" className="auth-info-badge" />
            <EditableText cmsKey="signup.info_heading" type="text" value="Your Spotless Space Is Just a Few Clicks Away" as="h2" />
            <EditableText
              cmsKey="signup.info_text"
              type="text"
              value="LBR Cleaning is Lagos' most trusted professional cleaning company. From Victoria Island to Lekki, we deliver premium, eco-friendly cleaning services tailored to your home or business."
              as="p"
            />

            <AuthInfoExtras
              prefix="signup"
              defaultFeatures={[
                { icon: "fa-solid fa-bolt", title: "Book in 60 Seconds", text: "Streamlined scheduling that fits your busy lifestyle" },
                { icon: "fa-solid fa-leaf", title: "Eco-Friendly Products", text: "Non-toxic, family-safe cleaning solutions" },
                { icon: "fa-solid fa-shield-halved", title: "100% Satisfaction", text: "Not happy? We re-clean for free within 24 hours" },
                { icon: "fa-solid fa-clock", title: "Flexible Scheduling", text: "Weekly, bi-weekly, or one-time cleans" },
              ]}
              defaultQuote="LBR Cleaning transformed my apartment in Lekki. The team was punctual, professional, and the results were outstanding."
              defaultAuthor="Funke Adeyemi, Victoria Island"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;