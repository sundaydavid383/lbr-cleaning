import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css";
import axios from "axios";
import Loading from "../../component/loading/Loading";
import Hero from "../../component/hero/Hero";
import TrustSection from "../../component/trustSection/TrustSection";
import CustomAlert from "../../component/customAlert/CustomAlert";
import { useCmsCategory, useCms, useCmsReady } from "../../hooks/useCmsContent";
import { ContactSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";
import { useSiteSettings, openSiteSettings } from "../../hooks/useSiteSettings";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";
import EditSection from "../../component/editable/EditSection";
import { apiUrl } from "../../utils/apiUrl";

// Accepts Google Maps "embed" HTML, an embed link, or a plain address.
const toMapEmbed = (value) => {
  if (!value || typeof value !== "string" || !value.trim()) return "";
  const v = value.trim();
  const src = v.match(/src=["']([^"']+)["']/i);
  if (src) return src[1];
  if (/^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/i.test(v)) return v;
  return `https://www.google.com/maps?q=${encodeURIComponent(v)}&output=embed`;
};

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
  const contactLoading = !useCmsReady();
  const contactContent = useCmsCategory("contact", {}).value || {};
  const { isEditMode, openPanel } = useEditMode();
  const site = useSiteSettings();
  const { address, email, phone } = site;
  const messages = useCms("contact.messages", {}) || {};

  if (contactLoading) {
    return <ContactSkeleton />;
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
    if (isEditMode) return;

    const error = validateInputs();
    if (error) {
      setAlertMessage(error);
      setAlertType("danger");
      return;
    }

    try {
      setLoading(true);
      await axios.post(apiUrl("/api/contact"), formData);
      setAlertMessage(messages.sent || "Your message has been sent!");
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
      setAlertMessage(messages.failed || "Failed to send message. Please try again later.");
      setAlertType("danger");
    }
    finally {
      setLoading(false);
    }
  };


  const contactHeroSection = Array.isArray(contactContent.hero) ? contactContent.hero : [];
  const contactPageFeatures = Array.isArray(contactContent.features) ? contactContent.features : [];
  const businessHours = Array.isArray(contactContent.business_hours) ? contactContent.business_hours : [];
  const faqs = Array.isArray(contactContent.faq) ? contactContent.faq : [];
  const mapSrc = toMapEmbed(contactContent.map_embed);

  const T = (key, value, Tag, props = {}) => <EditableText cmsKey={key} value={value} as={Tag} {...props} />;

  const businessInfoCard = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    openSiteSettings(openPanel);
  };

  return (
    <main className="contact-page">
      {loading && <Loading message="Sending request..." />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage("")}
      />

      <Hero
        section={contactHeroSection}
        features={contactPageFeatures}
        backgroundImage={contactContent.background_image || "/assets/cleaningbackground.jpg"}
        slidesKey="contact.hero"
        featuresKey="contact.features"
        backgroundKey="contact.background_image"
      />

      <section className="contact-info">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || "")}`}
          className={`info-card ${isEditMode ? "editable-field" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          onClickCapture={businessInfoCard}
        >
          <i className="fas fa-map-marker-alt"></i>
          <h3>{contactContent.address_label || "Office Address"}</h3>
          <p>{address}</p>
        </a>

        <a href={`mailto:${email}`} className={`info-card ${isEditMode ? "editable-field" : ""}`} onClickCapture={businessInfoCard}>
          <i className="fas fa-envelope"></i>
          <h3>{contactContent.email_label || "Email Us"}</h3>
          <p>{email}</p>
        </a>

        <a href={site.phoneHref} className={`info-card ${isEditMode ? "editable-field" : ""}`} onClickCapture={businessInfoCard}>
          <i className="fas fa-phone"></i>
          <h3>{contactContent.phone_label || "Call Us"}</h3>
          <p>{phone}</p>
        </a>
      </section>
      {isEditMode && (
        <EditSection
          label="Contact cards"
          icon="fa-address-card"
          items={[
            { cmsKey: "contact.address_label", root: "Office Address", label: "Address title", field: { type: "text", label: "Title on the address card" } },
            { cmsKey: "contact.email_label", root: "Email Us", label: "Email title", field: { type: "text", label: "Title on the email card" } },
            { cmsKey: "contact.phone_label", root: "Call Us", label: "Phone title", field: { type: "text", label: "Title on the phone card" } },
            {
              cmsKey: "contact.map_embed",
              root: "",
              label: mapSrc ? "Map" : "Add a map",
              help: "In Google Maps, find your business, click Share → Embed a map → Copy HTML, and paste it here. You can also just type your address.",
              field: { type: "textarea", label: "Google Maps embed code or address (leave empty for no map)" },
            },
          ]}
        />
      )}

      {mapSrc && (
        <section className="contact-map">
          <iframe
            src={mapSrc}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Our location"
          ></iframe>
        </section>
      )}

      {(businessHours.length > 0 || isEditMode) && (
        <section className="business-hours">
          <div className="hours-wrapper">
            {T("contact.hours_heading", "Business Hours", "h2", { label: "Heading" })}
            <ul>
              <EditableList
                cmsKey="contact.business_hours"
                value={businessHours}
                itemLabel="opening time"
                label="Opening hours"
                itemWrapperTag="li"
                fields={[
                  { key: "days", type: "text", label: "Days (e.g. Monday – Friday)" },
                  { key: "hours", type: "text", label: "Hours (e.g. 8:00 AM – 6:00 PM, or Closed)" },
                ]}
              >
                {(item, idx) =>
                  isEditMode ? (
                    <React.Fragment key={idx}><strong>{item.days}:</strong> {item.hours}</React.Fragment>
                  ) : (
                    <li key={idx}><strong>{item.days}:</strong> {item.hours}</li>
                  )
                }
              </EditableList>
            </ul>
            {(contactContent.hours_note || isEditMode) && T("contact.hours_note", contactContent.hours_note, "p", { label: "Note under the hours" })}
          </div>
        </section>
      )}

      {(faqs.length > 0 || isEditMode) && (
        <section className="faq-section">
          {T("contact.faq_heading", "Frequently Asked Questions", "h2", { label: "Heading" })}
          <EditableList
            cmsKey="contact.faq"
            value={faqs}
            itemLabel="question"
            label="Questions & answers"
            fields={[
              { key: "question", type: "text", label: "Question" },
              { key: "answer", type: "textarea", label: "Answer" },
            ]}
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

      {(contactContent.encouragement_heading || isEditMode) && (
        <section className="encouragement-banner">
          {T("contact.encouragement_heading", contactContent.encouragement_heading, "h3", { label: "Heading" })}
          {T("contact.encouragement_text", contactContent.encouragement_text, "p", { label: "Text" })}
          <Link to="/service" className="explore-btn">
            {T("contact.encouragement_cta", contactContent.encouragement_cta || "Explore Our Services", "span", { label: "Button text" })}
          </Link>
        </section>
      )}

      <section className="contact-form-section">
        <div className="form-wrapper">
          {T("contact.form_heading", contactContent.form_heading || "Send Us a Message", "h2", { label: "Form heading" })}
          <EditSection
            label="form wording"
            icon="fa-keyboard"
            items={[
              {
                cmsKey: "contact.form_placeholder_name",
                root: "Your Name",
                label: "Box hints",
                help: "The grey hint text shown inside each empty box.",
                field: { type: "text", label: "Name box" },
              },
              { cmsKey: "contact.form_placeholder_email", root: "Your Email", label: "Email box", field: { type: "text", label: "Email box hint" } },
              { cmsKey: "contact.form_placeholder_whatsapp", root: "Your WhatsApp Number", label: "WhatsApp box", field: { type: "text", label: "WhatsApp box hint" } },
              { cmsKey: "contact.form_placeholder_subject", root: "Subject", label: "Subject box", field: { type: "text", label: "Subject box hint" } },
              { cmsKey: "contact.form_placeholder_message", root: "Your Message", label: "Message box", field: { type: "text", label: "Message box hint" } },
              {
                cmsKey: "contact.messages",
                root: { sent: "Your message has been sent!", failed: "Failed to send message. Please try again later." },
                label: "Messages after sending",
                fields: [
                  { key: "sent", type: "text", label: "When the message was sent" },
                  { key: "failed", type: "text", label: "When sending failed" },
                ],
              },
            ]}
          />
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
              {T("contact.form_button", contactContent.form_button || "Send Message", "span", { label: "Send button text" })}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
