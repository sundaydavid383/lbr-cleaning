// filepath: ibrfront/src/component/newsletterSignup/NewsletterSignup.jsx
import React, { useState } from "react";
import "./newsletterSignup.css";
import { useCms } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditSection from "../editable/EditSection";
import { apiUrl } from "../../utils/apiUrl";

const KEY = "newsletter.data";
const DEFAULTS = {
  title: "Stay in the Loop",
  subtitle: "Get weekly cleaning tips, exclusive offers, and helpful guides delivered straight to your inbox. No spam — just useful stuff.",
  placeholder: "Enter your email address",
  button_text: "Subscribe",
  success_message: "Thanks for subscribing! Check your inbox for a welcome surprise.",
  error_message: "Please enter a valid email address.",
  privacy_text: "We respect your privacy. Unsubscribe at any time.",
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ text: "", ok: true });
  const [busy, setBusy] = useState(false);
  const stored = useCms(KEY, {});
  const { isEditMode } = useEditMode();
  const data = { ...DEFAULTS, ...(stored && typeof stored === "object" ? stored : {}) };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) return;
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus({ text: data.error_message, ok: false });
      return;
    }
    try {
      setBusy(true);
      const res = await fetch(apiUrl("/api/subscribe"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ text: data.success_message, ok: true });
        setEmail("");
      } else {
        setStatus({ text: json.message || data.error_message, ok: false });
      }
    } catch {
      setStatus({ text: "Something went wrong. Please try again later.", ok: false });
    } finally {
      setBusy(false);
    }
  };

  const T = (path, Tag, props = {}) => (
    <EditableText cmsKey={KEY} root={data} path={path} value={data[path]} as={Tag} {...props} />
  );

  return (
    <section className="newsletter-signup">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
          {T("title", "h2", { className: "newsletter-title", label: "Heading" })}
          {T("subtitle", "p", { className: "newsletter-subtitle", label: "Text" })}

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={data.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn" disabled={busy}>
              {busy ? "…" : T("button_text", "span", { label: "Button text" })}
            </button>
          </form>

          {status.text && <p className={`newsletter-status ${status.ok ? "success" : "error"}`}>{status.text}</p>}

          {T("privacy_text", "p", { className: "newsletter-privacy", label: "Small print" })}

          <EditSection
            cmsKey={KEY}
            root={data}
            label="messages"
            icon="fa-comment-dots"
            fields={[
              { key: "placeholder", type: "text", label: "Text inside the email box" },
              { key: "success_message", type: "text", label: "Message after subscribing" },
              { key: "error_message", type: "text", label: "Message when the email is wrong" },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
