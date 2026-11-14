// filepath: ibrfront/src/component/trustSection/TrustSection.jsx
import React from "react";
import "./trustSection.css";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";
import { highlight, HIGHLIGHT_HELP, RichText, RICH_HELP } from "../../utils/highlight";

const TrustSection = () => {
  const ready = useCmsReady();
  const stored = useCms("trust_section.badges", []);
  const { isEditMode } = useEditMode();
  const badges = Array.isArray(stored) ? stored : [];

  if (!ready || (!badges.length && !isEditMode)) {
    return null;
  }

  return (
    <section className="trust-section">
      <div className="trust-container">
        <div className="trust-header">
          <EditableText cmsKey="trust_section.tag" value="Trust & Safety" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="trust_section.title" value="Cleaning You Can *Trust*" as="h2" className="section-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
        </div>

        <div className="badges-grid">
          <EditableList
            cmsKey="trust_section.badges"
            value={badges}
            itemLabel="badge"
            label="Trust badges"
            fields={[
              { key: "icon", type: "icon", label: "Icon" },
              { key: "label", type: "text", label: "Text" },
            ]}
          >
            {(badge, index) => (
              <div className="badge-card" key={index}>
                <div className="badge-icon">
                  <i className={badge.icon}></i>
                </div>
                <span className="badge-label">{badge.label}</span>
              </div>
            )}
          </EditableList>
        </div>

        <div className="trust-footer">
          <EditableText
            cmsKey="trust_section.footer_text"
            value="With over **8+ years** of experience and **2,500+** satisfied clients, LBR Cleaning is the name Lagos homes and offices trust for spotless, reliable service."
            as="div"
            multiline
            label="Text under the badges"
            help={RICH_HELP}
          >
            {(v) => <RichText text={v} as="p" />}
          </EditableText>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
