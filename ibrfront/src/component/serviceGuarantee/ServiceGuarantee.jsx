// filepath: ibrfront/src/component/serviceGuarantee/ServiceGuarantee.jsx
import React from "react";
import "./serviceGuarantee.css";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";

const ServiceGuarantee = () => {
  const ready = useCmsReady();
  const stored = useCms("service_guarantee.items", []);
  const { isEditMode } = useEditMode();
  const guarantees = Array.isArray(stored) ? stored : [];

  if (!ready) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!guarantees.length && !isEditMode) {
    return null;
  }

  return (
    <section className="service-guarantee">
      <div className="service-guarantee-container">
        <div className="guarantee-header">
          <EditableText cmsKey="service_guarantee.tag" value="Our Promise" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="service_guarantee.title" value="Cleaning with *Confidence*" as="h2" className="section-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
        </div>

        <div className="guarantee-grid">
          <EditableList
            cmsKey="service_guarantee.items"
            value={guarantees}
            itemLabel="promise"
            label="Our promises"
            fields={[
              { key: "icon", type: "icon", label: "Icon" },
              { key: "title", type: "text", label: "Title" },
              { key: "description", type: "textarea", label: "Description" },
            ]}
          >
            {(item, index) => (
              <div className="guarantee-card" key={index}>
                <div className="guarantee-icon"><i className={item.icon}></i></div>
                <h3 className="guarantee-title">{item.title}</h3>
                <p className="guarantee-desc">{item.description}</p>
              </div>
            )}
          </EditableList>
        </div>
      </div>
    </section>
  );
};

export default ServiceGuarantee;
