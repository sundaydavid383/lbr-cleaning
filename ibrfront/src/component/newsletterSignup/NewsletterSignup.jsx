// filepath: ibrfront/src/component/newsletterSignup/NewsletterSignup.jsx
import React, { useState } from "react";
import "./newsletterSignup.css";
import { Link } from "react-router-dom";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter your email address.");
      return;
    }
    setStatus("Thanks for subscribing! Check your inbox for a welcome surprise.");
    setEmail("");
  };

  return (
    <section className="newsletter-signup">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
          <h2 className="newsletter-title">
            Stay in the <span className="highlight">Loop</span>
          </h2>
          <p className="newsletter-subtitle">
            Get weekly cleaning tips, exclusive offers, and helpful guides delivered
            straight to your inbox. No spam — just useful stuff.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>

          {status && (
            <p className={`newsletter-status ${status.includes("Thanks") ? "success" : "error"}`}>
              {status}
            </p>
          )}

          <p className="newsletter-privacy">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
