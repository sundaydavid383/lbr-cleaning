// filepath: ibrfront/src/component/recentActivity/RecentActivity.jsx
import React, { useState, useEffect } from "react";
import "./recentActivity.css";
import { useCms } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditSection from "../editable/EditSection";
import EditZone from "../editable/EditZone";

const DEFAULT_ACTIVITIES = [
  { icon: "fa-solid fa-house", text: "Home cleaning completed in Lagos", time: "2 min ago", location: "Victoria Island" },
  { icon: "fa-solid fa-briefcase", text: "Office sanitization finished", time: "8 min ago", location: "Ikoyi" },
  { icon: "fa-solid fa-building", text: "Post-construction clean done", time: "15 min ago", location: "Lekki" },
  { icon: "fa-solid fa-church", text: "Worship center deep cleaned", time: "22 min ago", location: "Surulere" },
  { icon: "fa-solid fa-house", text: "Move-in/move-out cleaning", time: "35 min ago", location: "Ajah" },
  { icon: "fa-solid fa-briefcase", text: "Carpet cleaning completed", time: "41 min ago", location: "Ikeja" },
  { icon: "fa-solid fa-spray-can", text: "Fumigation service done", time: "55 min ago", location: "Yaba" },
  { icon: "fa-solid fa-broom", text: "Regular home cleaning", time: "1 hr ago", location: "Lagos Island" },
];

const ACTIVITY_FIELDS = [
  { key: "icon", type: "icon", label: "Icon" },
  { key: "text", type: "text", label: "Message" },
  { key: "location", type: "text", label: "Location" },
  { key: "time", type: "text", label: "Time shown (e.g. 5 min ago)" },
];

const RecentActivity = () => {
  const stored = useCms("homepage_stats.activities", DEFAULT_ACTIVITIES);
  const activities = Array.isArray(stored) ? stored : DEFAULT_ACTIVITIES;
  const enabled = useCms("homepage_stats.activities_enabled", true);
  const { isEditMode } = useEditMode();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activities.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, isEditMode ? 6000 : 3000);
    return () => clearInterval(timer);
  }, [activities.length, isEditMode]);

  if ((!enabled && !isEditMode) || activities.length === 0) {
    return isEditMode ? (
      <EditSection cmsKey="homepage_stats.activities" root={DEFAULT_ACTIVITIES} label="live activity messages" field={{ type: "items", itemLabel: "message", fields: ACTIVITY_FIELDS }} />
    ) : null;
  }

  const current = activities[currentIndex % activities.length] || activities[0];

  return (
    <div className="recent-activity">
      {isEditMode && (
        <EditSection
          inline
          label="Live activity"
          icon="fa-bolt"
          items={[
            { cmsKey: "homepage_stats.activities", root: DEFAULT_ACTIVITIES, label: "Messages", field: { type: "items", itemLabel: "message", fields: ACTIVITY_FIELDS } },
            { cmsKey: "homepage_stats.activities_enabled", root: true, label: enabled ? "Shown" : "Hidden", field: { type: "boolean", label: "Show the live activity box", onText: "Shown", offText: "Hidden" } },
          ]}
        />
      )}
      <div className="activity-header">
        <EditableText cmsKey="homepage_stats.activity_label" value="Live Activity" className="activity-label" label="Activity box title" />
        <span className="activity-dot"></span>
      </div>
      <EditZone
        className="activity-content"
        cmsKey="homepage_stats.activities"
        root={DEFAULT_ACTIVITIES}
        label="Live activity messages"
        field={{ type: "items", itemLabel: "message", fields: ACTIVITY_FIELDS }}
      >
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
      </EditZone>
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
