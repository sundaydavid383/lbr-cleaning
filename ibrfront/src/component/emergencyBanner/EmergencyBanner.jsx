import React from "react";
import "./emergencyBanner.css";

const EmergencyBanner = () => {
  return (
    <div className="emergency-banner">
      <div className="emergency-container">
        <div className="emergency-content">
          <div className="emergency-icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div className="emergency-text">
            <span className="emergency-urgent">Emergency Cleaning Available</span>
            <span className="emergency-detail">Need emergency cleaning? We're available 7 days a week</span>
          </div>
        </div>

        <div className="emergency-contact">
          <a href="tel:+2348134567890" className="emergency-phone">
            <i className="fa-solid fa-phone-volume"></i>
            <span>+234 813 456 7890</span>
          </a>
          <a href="tel:+2348134567890" className="btn btn-call-now">
            <p>
              <i className="fa-solid fa-phone"></i> Call Now
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;