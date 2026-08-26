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
import { useCmsContent } from "../../hooks/useCmsContent";
import { ContactSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { SITE_CONFIG } from "../../config/site";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";

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
  const { value: siteSettings } = useCmsCategory("site_settings", {});
  const { isEditMode } = useEditMode();

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

  const address = contactContent.address || siteSettings?.address || SITE_CONFIG.address;
  const email = contactContent.email || siteSettings?.email || SITE_CONFIG.email;
  const phone = contactContent.phone || siteSettings?.phone || SITE_CONFIG.phone;

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
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || "")}`}
          className="info-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-map-marker-alt"></i>
          {isEditMode ? (
            <>
              <EditableText cmsKey="contact.address_label" type="text" value="Office Address" as="h3" />
              <EditableText cmsKey="contact.address" type="text" value={address} as="p" />
            </>
          ) : (
            <>
              <h3>Office Address</h3>
              <p>{address}</p>
            </>
          )}
        </a>

        <a href={`mailto:${email}`} className="info-card">
          <i className="fas fa-envelope"></i>
          {isEditMode ? (
            <>
              <EditableText cmsKey="contact.email_label" type="text" value="Email Us" as="h3" />
              <EditableText cmsKey="contact.email" type="text" value={email} as="p" />
            </>
          ) : (
            <>
              <h3>Email Us</h3>
              <p>{email}</p>
            </>
          )}
        </a>

        <a href={`tel:${phone}`} className="info-card">
          <i className="fas fa-phone"></i>
          {isEditMode ? (
            <>
              <EditableText cmsKey="contact.phone_label" type="text" value="Call Us" as="h3" />
              <EditableText cmsKey="contact.phone" type="text" value={phone} as="p" />
            </>
          ) : (
            <>
              <h3>Call Us</h3>
              <p>{phone}</p>
            </>
          )}
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
            {isEditMode ? (
              <EditableText cmsKey="contact.hours_heading" type="text" value="Business Hours" as="h2" />
            ) : (
              <h2>Business Hours</h2>
            )}
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
          {isEditMode ? (
            <EditableText cmsKey="contact.faq_heading" type="text" value="Frequently Asked Questions" as="h2" />
          ) : (
            <h2>Frequently Asked Questions</h2>
          )}
          <EditableList
            cmsKey="contact.faq"
            type="array"
            value={faqs}
            fields={[
              { key: "question", label: "Question" },
              { key: "answer", label: "Answer" },
            ]}
            itemWrapperTag="div"
          >
            {(item, idx) => (
              <div key={idx} className="faq-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            )}
          </EditableList>
        </section>
      )}

      <TrustSection />

      {contactContent.encouragement_heading && (
        <section className="encouragement-banner">
          {isEditMode ? (
            <>
              <EditableText cmsKey="contact.encouragement_heading" type="text" value={contactContent.encouragement_heading} as="h3" />
              <EditableText cmsKey="contact.encouragement_text" type="text" value={contactContent.encouragement_text} as="p" />
              <EditableText cmsKey="contact.encouragement_cta" type="text" value={contactContent.encouragement_cta || "Explore Our Services"} as={Link} to="/service" className="explore-btn" />
            </>
          ) : (
            <>
              <h3>{contactContent.encouragement_heading}</h3>
              <p>{contactContent.encouragement_text}</p>
              <Link to="/service" className="explore-btn">{contactContent.encouragement_cta || "Explore Our Services"}</Link>
            </>
          )}
        </section>
      )}

      <section className="contact-form-section">
        <div className="form-wrapper">
          {isEditMode ? (
            <EditableText cmsKey="contact.form_heading" type="text" value={contactContent.form_heading || "Send Us a Message"} as="h2" />
          ) : (
            <h2>{contactContent.form_heading || "Send Us a Message"}</h2>
          )}
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
