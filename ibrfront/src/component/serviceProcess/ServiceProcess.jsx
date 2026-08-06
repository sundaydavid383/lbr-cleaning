// filepath: ibrfront/src/component/serviceProcess/ServiceProcess.jsx
import React from "react";
import "./serviceProcess.css";
import { useCmsCategory } from "../../hooks/useCmsContent";

const ServiceProcess = () => {
  const { value: processData, loading: processLoading } = useCmsCategory("service_process", {});

  if (processLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const steps = processData?.steps || [];

  if (!steps.length) {
    return null;
  }

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
                <div className="step-icon"><i className={step.icon}></i></div>
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
