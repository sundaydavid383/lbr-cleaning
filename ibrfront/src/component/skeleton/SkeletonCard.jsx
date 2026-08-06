// filepath: ibrfront/src/component/skeleton/SkeletonCard.jsx
import React from "react";
import "./skeleton.css";

const SkeletonCard = ({ type = "default" }) => {
  if (type === "service") {
    return (
      <div className="skeleton-card skeleton-service">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    );
  }

  if (type === "stat") {
    return (
      <div className="skeleton-card skeleton-stat">
        <div className="skeleton-icon"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text short"></div>
        </div>
      </div>
    );
  }

  if (type === "testimonial") {
    return (
      <div className="skeleton-card skeleton-testimonial">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-content">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-title short"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-card skeleton-default">
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
