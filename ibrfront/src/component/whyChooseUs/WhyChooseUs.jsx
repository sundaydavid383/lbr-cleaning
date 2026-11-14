// filepath: ibrfront/src/component/whyChooseUs/WhyChooseUs.jsx
import React from "react";
import "./whyChooseUs.css";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";

const WhyChooseUs = () => {
  const ready = useCmsReady();
  const stored = useCms("why_choose_us.features", []);
  const showLink = useCms("why_choose_us.show_learn_more", true);
  const learnMore = useCms("why_choose_us.learn_more_text", "Learn more");
  const { isEditMode } = useEditMode();
  const features = Array.isArray(stored) ? stored : [];

  if (!ready) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!features.length && !isEditMode) {
    return null;
  }

  return (
    <section className="why-choose-us">
      <div className="why-choose-us-container">
        <div className="why-choose-us-header">
          <EditableText cmsKey="why_choose_us.tag" value="Why LBR Cleaning" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="why_choose_us.title" value="The *Smarter* Way to Clean" as="h2" className="section-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
          <EditableText cmsKey="why_choose_us.subtitle" value="We combine professional expertise with eco-conscious products to deliver results that exceed expectations every single time." as="p" className="section-subtitle" label="Intro text" />
        </div>

        <div className="features-grid">
          <EditableList
            cmsKey="why_choose_us.features"
            value={features}
            itemLabel="reason"
            label="Reasons to choose us"
            fields={[
              { key: "icon", type: "icon", label: "Icon" },
              { key: "title", type: "text", label: "Title" },
              { key: "description", type: "textarea", label: "Description" },
            ]}
          >
            {(feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon-wrap">
                  <div className="feature-icon"><i className={feature.icon}></i></div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {showLink !== false && (
                  <div className="feature-link">
                    <span>{learnMore}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                )}
              </div>
            )}
          </EditableList>
        </div>
        {isEditMode && (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Link text on each card:{" "}
            <EditableText cmsKey="why_choose_us.learn_more_text" value={learnMore} label="Link text on each card" />
          </p>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
