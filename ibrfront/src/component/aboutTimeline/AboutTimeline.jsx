// filepath: ibrfront/src/component/aboutTimeline/AboutTimeline.jsx
import React from "react";
import "./aboutTimeline.css";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const AboutTimeline = () => {
  const { value: timelineData, loading: timelineLoading } = useCmsCategory("about_timeline", {});
  const { isEditMode } = useEditMode();

  if (timelineLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const milestones = timelineData?.milestones || [];

  if (!milestones.length) {
    return null;
  }

  return (
    <section className="about-timeline">
      <div className="about-timeline-container">
        <div className="about-timeline-header">
          {isEditMode ? (
            <>
              <EditableText cmsKey="about_timeline.tag" type="text" value="Our Journey" as="span" className="section-tag" />
              <h2 className="section-title">
                <EditableText cmsKey="about_timeline.title" type="text" value="From Local Trust to Digital Innovation" as="span" />
                <span className="highlight">Digital Innovation</span>
              </h2>
              <EditableText cmsKey="about_timeline.subtitle" type="text" value="Every milestone reflects our commitment to quality, community, and growth." as="p" className="section-subtitle" />
            </>
          ) : (
            <>
              <span className="section-tag">Our Journey</span>
              <h2 className="section-title">
                From Local Trust to <span className="highlight">Digital Innovation</span>
              </h2>
              <p className="section-subtitle">
                Every milestone reflects our commitment to quality, community, and growth.
              </p>
            </>
          )}
        </div>

        <div className="timeline-track">
          {milestones.map((milestone, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-marker">
                <div className="timeline-icon"><i className={milestone.icon}></i></div>
                <div className="timeline-year">{milestone.year}</div>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
