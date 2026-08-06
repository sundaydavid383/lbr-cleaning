import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./contact.css";
import axios from "axios";
import Loading from "../../component/loading/Loading";
import Hero from "../../component/hero/Hero";
import TrustSection from "../../component/trustSection/TrustSection";
import bgImage from "../../assets/cleaningbackground.jpg";
import CustomAlert from "../../component/customAlert/CustomAlert";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { ContactSkeleton } from "../../component/pageSkeleton/PageSkeleton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const { value: contactContent, loading: contactLoading } = useCmsCategory("contact", {});

  if (contactLoading) {
    return <ContactSkeleton />;
  }

  if (!contactContent) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No content available. Please configure the CMS.</p>
      </div>
    );
  }

  const validateInputs = () => {
    const { name, email, subject, message, whatsapp } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+234\d{10}$/;

    if (name.trim().length < 2) return "Please enter a valid name";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (!subject.trim()) return "Subject cannot be empty";
    if (message.trim().length < 10) return "Message is too short";
    if (!phoneRegex.test(whatsapp))
      return "WhatsApp number must start with +234 and be 13 digits";

    return null;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "whatsapp") {
      value = value.replace(/\D/g, "");

      if (value.startsWith("234")) {
        value = `+${value}`;
      } else if (value.startsWith("0")) {
        value = `+234${value.slice(1)}`;
      } else if (!value.startsWith("+234")) {
        value = `+234${value}`;
      }

      value = value.slice(0, 14);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setAlertMessage(error);
      setAlertType("danger");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}api/contact`, formData);
      setAlertMessage("Your message has been sent!");
      setAlertType("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        whatsapp: "",
      });
    } catch (err) {
      console.error(err);
      setAlertMessage("Failed to send message. Please try again later.");
      setAlertType("danger");
    }
    finally {
      setLoading(false);
    }
  };

  const contactHeroSection = contactContent.hero || [];
  const contactPageFeatures = contactContent.features || [];
  const businessHours = contactContent.business_hours || [];
  const faqs = contactContent.faq || [];

  return (
    <main className="contact-page">
      {loading && <Loading message="Sending request..." />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage("")}
      />
      
      {contactHeroSection.length > 0 && (
        <Hero section={contactHeroSection} features={contactPageFeatures} backgroundImage={bgImage} />
      )}

      <section className="contact-info">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactContent.address || "")}`}
          className="info-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-map-marker-alt"></i>
          <h3>Office Address</h3>
          <p>{contactContent.address}</p>
        </a>

        <a href={`mailto:${contactContent.email}`} className="info-card">
          <i className="fas fa-envelope"></i>
          <h3>Email Us</h3>
          <p>{contactContent.email}</p>
        </a>

        <a href={`tel:${contactContent.phone}`} className="info-card">
          <i className="fas fa-phone"></i>
          <h3>Call Us</h3>
          <p>{contactContent.phone}</p>
        </a>
      </section>

      {contactContent.map_embed && (
        <section className="contact-map">
          <iframe
            src={contactContent.map_embed}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="LBR Cleaning Location"
          ></iframe>
        </section>
      )}

      {businessHours.length > 0 && (
        <section className="business-hours">
          <div className="hours-wrapper">
            <h2>Business Hours</h2>
            <ul>
              {businessHours.map((item, idx) => (
                <li key={idx}><strong>{item.days}:</strong> {item.hours}</li>
              ))}
            </ul>
            {contactContent.hours_note && <p>{contactContent.hours_note}</p>}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>
      )}

      <TrustSection />

      {contactContent.encouragement_heading && (
        <section className="encouragement-banner">
          <h3>{contactContent.encouragement_heading}</h3>
          <p>{contactContent.encouragement_text}</p>
          <Link to="/service" className="explore-btn">{contactContent.encouragement_cta || "Explore Our Services"}</Link>
        </section>
      )}

      <section className="contact-form-section">
        <div className="form-wrapper">
          <h2>{contactContent.form_heading || "Send Us a Message"}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={contactContent.form_placeholder_name || "Your Name"}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={contactContent.form_placeholder_email || "Your Email"}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder={contactContent.form_placeholder_whatsapp || "Your WhatsApp Number (e.g. +2348012345678)"}
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder={contactContent.form_placeholder_subject || "Subject"}
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={contactContent.form_placeholder_message || "Your Message"}
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              {contactContent.form_button || "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
