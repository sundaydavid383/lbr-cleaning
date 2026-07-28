// filepath: ibrfront/src/component/whyChooseUs/WhyChooseUs.jsx
import React from "react";
import "./whyChooseUs.css";
import { FaShieldHalved, FaLeaf, FaClock, FaStar } from "react-icons/fa6";

const features = [
  {
    icon: <FaShieldHalved />,
    title: "Fully Insured & Bonded",
    description:
      "Every cleaning team is fully insured, giving you complete peace of mind with every service.",
  },
  {
    icon: <FaLeaf />,
    title: "Eco-Friendly Products",
    description:
      "We use non-toxic, biodegradable cleaning solutions safe for children, pets, and the environment.",
  },
  {
    icon: <FaClock />,
    title: "Flexible Scheduling",
    description:
      "Book one-time deep cleans or recurring visits — mornings, evenings, or weekends at your convenience.",
  },
  {
    icon: <FaStar />,
    title: "Satisfaction Guaranteed",
    description:
      "Not happy with the results? We'll re-clean the area for free within 24 hours. No questions asked.",
  },
];

const WhyChooseUs = () => {
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
                <div className="feature-icon">{feature.icon}</div>
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
