// filepath: ibrfront/src/component/ctaBanner/CTABanner.jsx
import React from "react";
import "./ctaBanner.css";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="cta-banner">
      <div className="cta-bg-pattern"></div>
      <div className="cta-container">
        <div className="cta-content">
          <span className="cta-tag">Get Started Today</span>
          <h2 className="cta-title">
            Ready for a <span className="highlight">Spotless</span> Space?
          </h2>
          <p className="cta-subtitle">
            Book your cleaning appointment in under 60 seconds. Our team is standing by
            to bring freshness back to your home or office.
          </p>

          <div className="cta-features">
            <div className="cta-feature">
              <i className="fa-solid fa-check-circle"></i>
              <span>Free consultation & quote</span>
            </div>
            <div className="cta-feature">
              <i className="fa-solid fa-check-circle"></i>
              <span>No hidden fees</span>
            </div>
            <div className="cta-feature">
              <i className="fa-solid fa-check-circle"></i>
              <span>Satisfaction guaranteed</span>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              <p>
                Book Now <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </Link>
            <a href="tel:+2348134567890" className="btn btn-secondary">
              <p>
                <i className="fa-solid fa-phone"></i> Call Us
              </p>
            </a>
          </div>
        </div>

        <div className="cta-visual">
          <div className="cta-circle cta-circle-1"></div>
          <div className="cta-circle cta-circle-2"></div>
          <div className="cta-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=600&fit=crop"
              alt="Professional cleaning"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
