import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./apply.css";
import validator from "validator";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import { apiUrl } from "../../utils/apiUrl";

const services = [
  { value: "residential", label: "Residential Cleaning", icon: "fa-solid fa-house", price: 15000 },
  { value: "commercial", label: "Office Cleaning", icon: "fa-solid fa-briefcase", price: 25000 },
  { value: "deep_cleaning", label: "Deep Cleaning", icon: "fa-solid fa-spray-can", price: 30000 },
  { value: "move_in_move_out", label: "Move In/Out Cleaning", icon: "fa-solid fa-truck-moving", price: 35000 },
  { value: "post_construction", label: "Post-Construction Cleaning", icon: "fa-solid fa-building", price: 45000 },
  { value: "carpet_cleaning", label: "Carpet Cleaning", icon: "fa-solid fa-rug", price: 18000 },
  { value: "window_cleaning", label: "Window Cleaning", icon: "fa-solid fa-window-maximize", price: 12000 },
  { value: "sanitization", label: "Sanitization Service", icon: "fa-solid fa-hand-sparkles", price: 20000 },
];

const formatNGN = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const Apply = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isEditMode } = useEditMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "residential",
    message: "",
    paymentOption: "PAY_AFTER",
  });
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !prefilled) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
      setPrefilled(true);
    }
  }, [isAuthenticated, user, prefilled]);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 6000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedService = services.find((s) => s.value === formData.service);

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
      const response = await fetch(apiUrl("/api/book"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: selectedService?.label || formData.service,
          message: formData.message,
          paymentOption: formData.paymentOption,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.payment && data.payment.authorizationUrl) {
          sessionStorage.setItem("lbr_booking_success", JSON.stringify({
            orderId: data.order?.id,
            amount: data.payment.amount,
            service: selectedService?.label,
          }));
          window.location.href = data.payment.authorizationUrl;
          return;
        }

        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "residential", message: "", paymentOption: "PAY_AFTER" });
      } else {
        showAlert(data.message || data.data || "Something went wrong. Please try again.", "danger");
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
          {isEditMode ? (
            <>
              <EditableText cmsKey="apply.success_heading" type="text" value="Booking Received!" as="h1" />
              <EditableText cmsKey="apply.success_text" type="text" value="Thank you for choosing LBR Cleaning. We've received your booking request and will contact you within 24 hours to confirm your appointment." as="p" />
            </>
          ) : (
            <>
              <h1>Booking Received!</h1>
              <p>Thank you for choosing LBR Cleaning. We've received your booking request and will contact you within 24 hours to confirm your appointment.</p>
            </>
          )}
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

      {loading && <Loading message="Processing your booking..." />}

      {/* Hero Section */}
      <section className="apply-hero">
        <div className="apply-hero-bg"></div>
        <div className="apply-hero-content">
          {isEditMode ? (
            <>
              <EditableText cmsKey="apply.badge" type="text" value="Book Now" as="span" className="apply-badge" />
              <h1>
                Book Your <span className="highlight">
                  <EditableText cmsKey="apply.heading_highlight" type="text" value="Cleaning" as="span" />
                </span> Service
              </h1>
              <EditableText cmsKey="apply.subtitle" type="text" value="Fill out the form below and our team will get back to you within 24 hours to confirm your appointment." as="p" />
            </>
          ) : (
            <>
              <span className="apply-badge">Book Now</span>
              <h1>Book Your <span className="highlight">Cleaning</span> Service</h1>
              <p>Fill out the form below and our team will get back to you within 24 hours to confirm your appointment.</p>
            </>
          )}
          {!isEditMode && (
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
          )}
        </div>
      </section>

      {/* Form Section */}
      <section className="apply-form-section">
        <div className="apply-form-container">
          <div className="apply-form-card">
            <div className="form-header">
              {isEditMode ? (
                <>
                  <EditableText cmsKey="apply.form_heading" type="text" value="Tell Us About Your Needs" as="h2" />
                  <EditableText cmsKey="apply.form_subheading" type="text" value="We'll match you with the perfect cleaning solution" as="p" />
                </>
              ) : (
                <>
                  <h2>Tell Us About Your Needs</h2>
                  <p>We'll match you with the perfect cleaning solution</p>
                </>
              )}
              {isAuthenticated && (
                <p className="form-prefilled-note">
                  <i className="fa-solid fa-circle-check"></i>
                  Your profile information has been pre-filled from your account
                </p>
              )}
            </div>

            <form onSubmit={onSubmit} className="apply-form">
              {isAuthenticated && (
                <div className="form-profile-picture">
                  <div className="profile-picture-preview">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" />
                    ) : (
                      <div className="profile-picture-placeholder">
                        <i className="fa-solid fa-camera"></i>
                        <span>Add Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="profile-picture-info">
                    <p className="profile-picture-label">Profile Picture</p>
                    <p className="profile-picture-hint">Optional — helps our team recognize you</p>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className={`form-group ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
                  <label htmlFor="name">Full Name {isAuthenticated && formData.name ? <span className="prefilled-badge"><i className="fa-solid fa-check"></i> From profile</span> : ''}</label>
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
                  <label htmlFor="email">Email Address {isAuthenticated && formData.email ? <span className="prefilled-badge"><i className="fa-solid fa-check"></i> From profile</span> : ''}</label>
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
                  <label htmlFor="phone">Phone Number {isAuthenticated && formData.phone ? <span className="prefilled-badge"><i className="fa-solid fa-check"></i> From profile</span> : ''}</label>
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

              {/* Service Price Preview */}
              {selectedService && (
                <div className="service-price-preview">
                  {isEditMode ? (
                    <>
                      <EditableText cmsKey="apply.price_label" type="text" value="Estimated starting price" as="span" className="service-price-label" />
                      <div className="service-price-amount">{formatNGN(selectedService.price)}</div>
                      <EditableText cmsKey="apply.price_note" type="text" value="Final price may vary based on space size and requirements" as="span" className="service-price-note" />
                    </>
                  ) : (
                    <>
                      <div className="service-price-label">Estimated starting price</div>
                      <div className="service-price-amount">{formatNGN(selectedService.price)}</div>
                      <div className="service-price-note">Final price may vary based on space size and requirements</div>
                    </>
                  )}
                </div>
              )}

              {/* Payment Option */}
               <div className="form-group full-width">
                 {isEditMode ? (
                   <>
                     <EditableText cmsKey="apply.payment_heading" type="text" value="Payment Preference" as="label" />
                   </>
                 ) : (
                   <label>Payment Preference</label>
                 )}
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentOption === "PAY_AFTER" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentOption"
                      value="PAY_AFTER"
                      checked={formData.paymentOption === "PAY_AFTER"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      {isEditMode ? (
                        <>
                          <EditableText cmsKey="apply.pay_after_title" type="text" value="Pay After Service" as="span" className="payment-option-title" />
                          <EditableText cmsKey="apply.pay_after_desc" type="text" value="Pay once the job is done to your satisfaction" as="span" className="payment-option-desc" />
                        </>
                      ) : (
                        <>
                          <div className="payment-option-title">
                            <i className="fa-solid fa-calendar-check"></i>
                            Pay After Service
                          </div>
                          <div className="payment-option-desc">Pay once the job is done to your satisfaction</div>
                        </>
                      )}
                    </div>
                  </label>
                  <label className={`payment-option ${formData.paymentOption === "PAY_BEFORE" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentOption"
                      value="PAY_BEFORE"
                      checked={formData.paymentOption === "PAY_BEFORE"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      {isEditMode ? (
                        <>
                          <EditableText cmsKey="apply.pay_before_title" type="text" value="Pay Now to Secure Booking" as="span" className="payment-option-title" />
                          <EditableText cmsKey="apply.pay_before_desc" type="text" value="Secure your slot instantly with instant payment" as="span" className="payment-option-desc" />
                        </>
                      ) : (
                        <>
                          <div className="payment-option-title">
                            <i className="fa-solid fa-lock"></i>
                            Pay Now to Secure Booking
                          </div>
                          <div className="payment-option-desc">Secure your slot instantly with instant payment</div>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className={`form-group full-width ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
                {isEditMode ? (
                  <EditableText cmsKey="apply.message_heading" type="text" value="Tell Us More" as="label" />
                ) : (
                  <label htmlFor="message">Tell Us More <span className="optional">(optional)</span></label>
                )}
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
                     Processing...
                   </span>
                 ) : (
                   <span>
                     {formData.paymentOption === "PAY_BEFORE" ? "Proceed to Payment" : "Submit Booking"} <i className="fa-solid fa-arrow-right"></i>
                   </span>
                 )}
               </button>

               {isEditMode ? (
                 <EditableText cmsKey="apply.form_note" type="text" value="By submitting, you agree to our terms. We'll never share your information." as="p" className="form-note" />
               ) : (
                 <p className="form-note">
                   By submitting, you agree to our terms. We'll never share your information.
                 </p>
               )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apply;
