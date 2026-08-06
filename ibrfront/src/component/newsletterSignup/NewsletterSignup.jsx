// filepath: ibrfront/src/component/newsletterSignup/NewsletterSignup.jsx
import React, { useState } from "react";
import "./newsletterSignup.css";
import { Link } from "react-router-dom";
import { useCmsCategory } from "../../hooks/useCmsContent";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const { value: newsletterData, loading: newsletterLoading } = useCmsCategory("newsletter", {});

  if (newsletterLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus(newsletterData?.error_message || "Please enter your email address.");
      return;
    }
    setStatus(newsletterData?.success_message || "Thanks for subscribing! Check your inbox for a welcome surprise.");
    setEmail("");
  };

  const title = newsletterData?.title || "Stay in the Loop";
  const subtitle = newsletterData?.subtitle || "Get weekly cleaning tips, exclusive offers, and helpful guides delivered straight to your inbox. No spam — just useful stuff.";
  const placeholder = newsletterData?.placeholder || "Enter your email address";
  const buttonText = newsletterData?.button_text || "Subscribe";
  const privacyText = newsletterData?.privacy_text || "We respect your privacy. Unsubscribe at any time.";

  return (
    <section className="newsletter-signup">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
          <h2 className="newsletter-title">
            {title.split('<span class="highlight">')[0]}
            {title.includes('highlight') && <span className="highlight">{title.split('<span class="highlight">')[1]?.replace('</span>', '')}</span>}
            {title.split('</span>')[1] || ''}
          </h2>
          <p className="newsletter-subtitle">{subtitle}</p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              {buttonText}
            </button>
          </form>

          {status && (
            <p className={`newsletter-status ${status.includes("Thanks") || status.includes("success") || status.includes("welcome") ? "success" : "error"}`}>
              {status}
            </p>
          )}

          <p className="newsletter-privacy">
            {privacyText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
