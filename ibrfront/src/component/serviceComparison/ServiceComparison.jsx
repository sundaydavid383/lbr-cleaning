// filepath: ibrfront/src/component/serviceComparison/ServiceComparison.jsx
import React from "react";
import "./serviceComparison.css";
import { FaCheck, FaTimes } from "react-icons/fa";

const plans = [
  {
    name: "Basic Cleaning",
    price: "$19/mo",
    popular: false,
    features: {
      "Dusting & vacuuming": true,
      "Bathroom sanitization": true,
      "Kitchen wipe-down": true,
      "Trash removal": true,
      "Weekly schedule": true,
      "Carpet cleaning": false,
      "Window cleaning": false,
      "Disinfection": false,
      "Custom schedule": false,
    },
  },
  {
    name: "Standard Cleaning",
    price: "$29/mo",
    popular: true,
    features: {
      "Dusting & vacuuming": true,
      "Bathroom sanitization": true,
      "Kitchen wipe-down": true,
      "Trash removal": true,
      "Weekly schedule": true,
      "Carpet cleaning": true,
      "Window cleaning": true,
      "Disinfection": false,
      "Custom schedule": false,
    },
  },
  {
    name: "Premium Cleaning",
    price: "$49/mo",
    popular: false,
    features: {
      "Dusting & vacuuming": true,
      "Bathroom sanitization": true,
      "Kitchen wipe-down": true,
      "Trash removal": true,
      "Weekly schedule": true,
      "Carpet cleaning": true,
      "Window cleaning": true,
      "Disinfection": true,
      "Custom schedule": true,
    },
  },
];

const ServiceComparison = () => {
  const featureKeys = Object.keys(plans[0].features);

  return (
    <section className="service-comparison">
      <div className="service-comparison-container">
        <div className="comparison-header">
          <span className="section-tag">Compare Plans</span>
          <h2 className="section-title">
            Find the Perfect <span className="highlight">Cleaning Plan</span>
          </h2>
          <p className="section-subtitle">
            All plans include eco-friendly products and satisfaction guarantee.
            Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Features</th>
                {plans.map((plan, i) => (
                  <th key={i} className={plan.popular ? "popular-col" : ""}>
                    {plan.popular && <span className="popular-badge">Most Popular</span>}
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-price">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureKeys.map((feature, i) => (
                <tr key={i}>
                  <td className="feature-col">{feature}</td>
                  {plans.map((plan, j) => (
                    <td key={j} className="check-col">
                      {plan.features[feature] ? (
                        <span className="check-icon"><FaCheck /></span>
                      ) : (
                        <span className="times-icon"><FaTimes /></span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comparison-footer">
          <p>
            Need a custom plan for your office or facility?{" "}
            <a href="/contact" className="text-link">Contact us</a> for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;
