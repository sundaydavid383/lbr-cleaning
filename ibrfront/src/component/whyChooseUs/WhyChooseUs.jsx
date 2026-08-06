// filepath: ibrfront/src/component/whyChooseUs/WhyChooseUs.jsx
import React from "react";
import "./whyChooseUs.css";
import { useCmsCategory } from "../../hooks/useCmsContent";

const WhyChooseUs = () => {
  const { value: featuresData, loading: featuresLoading } = useCmsCategory("why_choose_us", {});

  if (featuresLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const features = featuresData?.features || [];

  if (!features.length) {
    return null;
  }

  return (
    <section className="why-choose-us">
      <div className="why-choose-us-container">
        <div className="why-choose-us-header">
          <span className="section-tag">Why LBR Cleaning</span>
          <h2 className="section-title">
            The <span className="highlight">Smarter</span> Way to Clean
          </h2>
          <p className="section-subtitle">
            We combine professional expertise with eco-conscious products to deliver
            results that exceed expectations every single time.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-wrap">
                <div className="feature-icon"><i className={feature.icon}></i></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-link">
                <span>Learn more</span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
