// filepath: ibrfront/src/component/aboutTimeline/AboutTimeline.jsx
import React from "react";
import "./aboutTimeline.css";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";

const AboutTimeline = () => {
  const ready = useCmsReady();
  const stored = useCms("about_timeline.milestones", []);
  const { isEditMode } = useEditMode();
  const milestones = Array.isArray(stored) ? stored : [];

  if (!ready || (!milestones.length && !isEditMode)) {
    return null;
  }

  return (
    <section className="about-timeline">
      <div className="about-timeline-container">
        <div className="about-timeline-header">
          <EditableText cmsKey="about_timeline.tag" value="Our Journey" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="about_timeline.title" value="From Local Trust to *Digital Innovation*" as="h2" className="section-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
          <EditableText cmsKey="about_timeline.subtitle" value="Every milestone reflects our commitment to quality, community, and growth." as="p" className="section-subtitle" label="Intro text" />
        </div>

        <div className="timeline-track">
          <EditableList
            cmsKey="about_timeline.milestones"
            value={milestones}
            itemLabel="milestone"
            label="Milestones"
            fields={[
              { key: "year", type: "text", label: "Year" },
              { key: "icon", type: "icon", label: "Icon" },
              { key: "title", type: "text", label: "Title" },
              { key: "description", type: "textarea", label: "Description" },
            ]}
          >
            {(milestone, index) => (
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
            )}
          </EditableList>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
