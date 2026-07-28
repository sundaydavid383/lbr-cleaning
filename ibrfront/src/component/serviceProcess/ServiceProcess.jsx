// filepath: ibrfront/src/component/serviceProcess/ServiceProcess.jsx
import React from "react";
import "./serviceProcess.css";
import { FaCalendarCheck, FaPhone, FaBroom, FaThumbsUp } from "react-icons/fa6";

const steps = [
  {
    icon: <FaCalendarCheck />,
    number: "01",
    title: "Book Online",
    description:
      "Choose your service, select a date and time, and tell us about your space. It takes less than a minute.",
  },
  {
    icon: <FaPhone />,
    number: "02",
    title: "We Confirm",
    description:
      "Our team calls or messages you within minutes to confirm details, answer questions, and lock in your slot.",
  },
  {
    icon: <FaBroom />,
    number: "03",
    title: "We Clean",
    description:
      "A vetted, uniformed professional arrives on time with all supplies and equipment. We clean to our checklist.",
  },
  {
    icon: <FaThumbsUp />,
    number: "04",
    title: "You Approve",
    description:
      "Inspect the work. If anything falls short, we re-clean it for free within 24 hours — guaranteed.",
  },
];

const ServiceProcess = () => {
  return (
    <section className="service-process">
      <div className="service-process-container">
        <div className="service-process-header">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">
            Four Simple Steps to a <span className="highlight">Cleaner</span> Space
          </h2>
          <p className="section-subtitle">
            From booking to satisfaction, our streamlined process makes professional
            cleaning effortless.
          </p>
        </div>

        <div className="process-track">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-connector">
                {index < steps.length - 1 && <div className="connector-line"></div>}
              </div>
              <div className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
