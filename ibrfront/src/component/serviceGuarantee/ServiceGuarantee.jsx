// filepath: ibrfront/src/component/serviceGuarantee/ServiceGuarantee.jsx
import React from "react";
import "./serviceGuarantee.css";
import { FaShieldHalved, FaLeaf, FaClock, FaMedal } from "react-icons/fa6";

const guarantees = [
  {
    icon: <FaShieldHalved />,
    title: "Satisfaction Guarantee",
    description:
      "If you're not 100% satisfied, we'll re-clean the area for free within 24 hours.",
  },
  {
    icon: <FaLeaf />,
    title: "Eco-Friendly Promise",
    description:
      "We use only non-toxic, biodegradable products safe for kids, pets, and the planet.",
  },
  {
    icon: <FaClock />,
    title: "On-Time Arrival",
    description:
      "Our teams arrive within the scheduled window or you get a 20% discount on your next service.",
  },
  {
    icon: <FaMedal />,
    title: "Background-Checked Team",
    description:
      "Every cleaner is vetted, trained, and insured. Your home is in safe hands.",
  },
];

const ServiceGuarantee = () => {
  return (
    <section className="service-guarantee">
      <div className="service-guarantee-container">
        <div className="guarantee-header">
          <span className="section-tag">Our Promise</span>
          <h2 className="section-title">
            Cleaning with <span className="highlight">Confidence</span>
          </h2>
        </div>

        <div className="guarantee-grid">
          {guarantees.map((item, index) => (
            <div className="guarantee-card" key={index}>
              <div className="guarantee-icon">{item.icon}</div>
              <h3 className="guarantee-title">{item.title}</h3>
              <p className="guarantee-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGuarantee;
