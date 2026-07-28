// filepath: ibrfront/src/component/recentActivity/RecentActivity.jsx
import React, { useState, useEffect } from "react";
import "./recentActivity.css";

const activities = [
  { icon: "fa-solid fa-house", text: "Home cleaning completed in Lagos", time: "2 min ago", location: "Victoria Island" },
  { icon: "fa-solid fa-briefcase", text: "Office sanitization finished", time: "8 min ago", location: "Ikoyi" },
  { icon: "fa-solid fa-building", text: "Post-construction clean done", time: "15 min ago", location: "Lekki" },
  { icon: "fa-solid fa-church", text: "Worship center deep cleaned", time: "22 min ago", location: "Surulere" },
  { icon: "fa-solid fa-house", text: "Move-in/move-out cleaning", time: "35 min ago", location: "Ajah" },
  { icon: "fa-solid fa-briefcase", text: "Carpet cleaning completed", time: "41 min ago", location: "Ikeja" },
  { icon: "fa-solid fa-spray-can", text: "Fumigation service done", time: "55 min ago", location: "Yaba" },
  { icon: "fa-solid fa-broom", text: "Regular home cleaning", time: "1 hr ago", location: "Lagos Island" },
];

const RecentActivity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = activities[currentIndex];

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <span className="activity-label">Live Activity</span>
        <span className="activity-dot"></span>
      </div>
      <div className="activity-content">
        <div className="activity-icon">
          <i className={current.icon}></i>
        </div>
        <div className="activity-details">
          <p className="activity-text">{current.text}</p>
          <span className="activity-location">
            <i className="fa-solid fa-location-dot"></i> {current.location}
          </span>
        </div>
        <span className="activity-time">{current.time}</span>
      </div>
      <div className="activity-dots">
        {activities.map((_, i) => (
          <span
            key={i}
            className={`activity-dot-item ${i === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
