// filepath: ibrfront/src/component/trustSection/TrustSection.jsx
import React from "react";
import "./trustSection.css";

const badges = [
  { icon: "fa-solid fa-shield-halved", label: "Licensed & Insured" },
  { icon: "fa-solid fa-leaf", label: "Eco Certified" },
  { icon: "fa-solid fa-clock", label: "24/7 Support" },
  { icon: "fa-solid fa-medal", label: "5-Star Rated" },
  { icon: "fa-solid fa-hand-holding-heart", label: "Satisfaction Guarantee" },
  { icon: "fa-solid fa-user-shield", label: "Background-Checked Staff" },
];

const TrustSection = () => {
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
