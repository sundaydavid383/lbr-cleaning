// filepath: ibrfront/src/component/ctaBanner/CTABanner.jsx
import React from "react";
import "./ctaBanner.css";
import { Link } from "react-router-dom";
import { useCmsCategory } from "../../hooks/useCmsContent";

const CTABanner = () => {
  const { value: ctaData, loading: ctaLoading } = useCmsCategory("cta_banner", {});

  if (ctaLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!ctaData) {
    return null;
  }

  return (
    <section className="cta-banner">
      <div className="cta-bg-pattern"></div>
      <div className="cta-container">
        <div className="cta-content">
          {ctaData.tag && <span className="cta-tag">{ctaData.tag}</span>}
          {ctaData.title && (
            <h2 className="cta-title">
              {ctaData.title.split('<span class="highlight">')[0]}
              {ctaData.title.includes('highlight') && <span className="highlight">{ctaData.title.split('<span class="highlight">')[1]?.replace('</span>', '')}</span>}
              {ctaData.title.split('</span>')[1] || ''}
            </h2>
          )}
          {ctaData.subtitle && <p className="cta-subtitle">{ctaData.subtitle}</p>}

          {ctaData.features?.length > 0 && (
            <div className="cta-features">
              {ctaData.features.map((feature, index) => (
                <div className="cta-feature" key={index}>
                  <i className="fa-solid fa-check-circle"></i>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              <p>
                {ctaData.primary_button || "Book Now"} <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </Link>
            <a href={`tel:${ctaData.phone || "+234 801 234 5678"}`} className="btn btn-secondary">
              <p>
                <i className="fa-solid fa-phone"></i> {ctaData.secondary_button || "Call Us"}
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
