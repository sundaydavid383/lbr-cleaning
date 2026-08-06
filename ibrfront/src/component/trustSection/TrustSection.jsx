// filepath: ibrfront/src/component/trustSection/TrustSection.jsx
import React from "react";
import "./trustSection.css";
import { useCmsCategory } from "../../hooks/useCmsContent";

const TrustSection = () => {
  const { value: trustData, loading: trustLoading } = useCmsCategory("trust_section", {});

  if (trustLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const badges = trustData?.badges || [];

  if (!badges.length) {
    return null;
  }

  return (
    <section className="trust-section">
      <div className="trust-container">
        <div className="trust-header">
          <span className="section-tag">Trust & Safety</span>
          <h2 className="section-title">
            Cleaning You Can <span className="highlight">Trust</span>
          </h2>
        </div>

        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div className="badge-card" key={index}>
              <div className="badge-icon">
                <i className={badge.icon}></i>
              </div>
              <span className="badge-label">{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="trust-footer">
          <p>
            With over <strong>8+ years</strong> of experience and <strong>2,500+</strong> satisfied clients,
            LBR Cleaning is the name Lagos homes and offices trust for spotless, reliable service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
