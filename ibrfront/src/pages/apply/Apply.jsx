// filepath: ibrfront/src/pages/apply/Apply.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./apply.css";
import validator from "validator";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";

const services = [
  { value: "residential", label: "Residential Cleaning", icon: "fa-solid fa-house" },
  { value: "commercial", label: "Office Cleaning", icon: "fa-solid fa-briefcase" },
  { value: "deep_cleaning", label: "Deep Cleaning", icon: "fa-solid fa-spray-can" },
  { value: "move_in_move_out", label: "Move In/Out Cleaning", icon: "fa-solid fa-truck-moving" },
  { value: "post_construction", label: "Post-Construction Cleaning", icon: "fa-solid fa-building" },
  { value: "carpet_cleaning", label: "Carpet Cleaning", icon: "fa-solid fa-rug" },
  { value: "window_cleaning", label: "Window Cleaning", icon: "fa-solid fa-window-maximize" },
  { value: "sanitization", label: "Sanitization Service", icon: "fa-solid fa-hand-sparkles" },
];

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "residential",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 6000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, phone, service, message } = formData;

    if (!name || name.trim().split(/\s+/).length < 2) {
      showAlert("Please enter your full name (first and last name)", "warning");
      return false;
    }

    if (!validator.isEmail(email)) {
      showAlert("Please enter a valid email address", "warning");
      return false;
    }

    if (!validator.isMobilePhone(phone, "any")) {
      showAlert("Please enter a valid phone number", "warning");
      return false;
    }

    if (!service) {
      showAlert("Please select a cleaning service", "warning");
      return false;
    }

    if (!message || message.trim().length < 10) {
      showAlert("Please tell us more about your cleaning needs (at least 10 characters)", "warning");
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: services.find((s) => s.value === formData.service)?.label || formData.service,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "residential", message: "" });
      } else {
        showAlert(data.data || "Something went wrong. Please try again.", "danger");
      }
    } catch (error) {
      showAlert("We're having trouble connecting. Please check your internet and try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="apply-page">
        <div className="apply-success">
          <div className="success-icon">
            <i className="fa-solid fa-check"></i>
          </div>
          <h1>Application Received!</h1>
          <p>Thank you for choosing LBR Cleaning. We've received your application and will contact you within 24 hours to confirm your appointment.</p>
          <div className="success-actions">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/service" className="btn-secondary">Browse More Services</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      {loading && <Loading message="Submitting your application..." />}

      {/* Hero Section */}
      <section className="apply-hero">
        <div className="apply-hero-bg"></div>
        <div className="apply-hero-content">
          <span className="apply-badge">Apply Now</span>
          <h1>Book Your <span className="highlight">Cleaning</span> Service</h1>
          <p>Fill out the form below and our team will get back to you within 24 hours to confirm your appointment.</p>
          <div className="apply-hero-features">
            <div className="apply-hero-feature">
              <i className="fa-solid fa-check-circle"></i>
              <span>Free Consultation</span>
            </div>
            <div className="apply-hero-feature">
              <i className="fa-solid fa-check-circle"></i>
              <span>No Hidden Fees</span>
            </div>
            <div className="apply-hero-feature">
              <i className="fa-solid fa-check-circle"></i>
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="apply-form-section">
        <div className="apply-form-container">
          <div className="apply-form-card">
            <div className="form-header">
              <h2>Tell Us About Your Needs</h2>
              <p>We'll match you with the perfect cleaning solution</p>
            </div>

            <form onSubmit={onSubmit} className="apply-form">
              <div className="form-row">
                <div className={`form-group ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-user"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className={`form-group ${focusedField === 'email' || formData.email ? 'focused' : ''}`}>
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${focusedField === 'phone' || formData.phone ? 'focused' : ''}`}>
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-phone"></i>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+234 801 234 5678"
                      required
                    />
                  </div>
                </div>

                <div className={`form-group ${focusedField === 'service' || formData.service ? 'focused' : ''}`}>
                  <label htmlFor="service">Service Needed</label>
                  <div className="input-wrapper select-wrapper">
                    <i className="fa-solid fa-broom"></i>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      required
                    >
                      {services.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={`form-group full-width ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
                <label htmlFor="message">Tell Us More <span className="optional">(optional)</span></label>
                <div className="input-wrapper textarea-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Describe your space, preferred date/time, any special requirements..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="apply-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Submitting...
                  </span>
                ) : (
                  <span>
                    Submit Application <i className="fa-solid fa-arrow-right"></i>
                  </span>
                )}
              </button>

              <p className="form-note">
                By submitting, you agree to our terms. We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apply;
