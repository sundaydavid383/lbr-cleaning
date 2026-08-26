import React from "react";
import "./emergencyBanner.css";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const EmergencyBanner = () => {
  const { isEditMode } = useEditMode();

  return (
    <div className="emergency-banner">
      <div className="emergency-container">
        <div className="emergency-content">
          <div className="emergency-icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div className="emergency-text">
            {isEditMode ? (
              <>
                <EditableText cmsKey="emergency_banner.tag" type="text" value="Emergency Cleaning Available" as="span" className="emergency-urgent" />
                <EditableText cmsKey="emergency_banner.subtitle" type="text" value="Need emergency cleaning? We're available 7 days a week" as="span" className="emergency-detail" />
              </>
            ) : (
              <>
                <span className="emergency-urgent">Emergency Cleaning Available</span>
                <span className="emergency-detail">Need emergency cleaning? We're available 7 days a week</span>
              </>
            )}
          </div>
        </div>

        <div className="emergency-contact">
          <a href="tel:+2348134567890" className="emergency-phone">
            <i className="fa-solid fa-phone-volume"></i>
            {isEditMode ? (
              <EditableText cmsKey="emergency_banner.phone" type="text" value="+234 813 456 7890" as="span" />
            ) : (
              <span>+234 813 456 7890</span>
            )}
          </a>
          <a href="tel:+2348134567890" className="btn btn-call-now">
            <p>
              <i className="fa-solid fa-phone"></i> {isEditMode ? (
                <EditableText cmsKey="emergency_banner.button" type="text" value="Call Now" as="span" />
              ) : (
                <span>Call Now</span>
              )}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;