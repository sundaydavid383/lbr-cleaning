// filepath: ibrfront/src/component/serviceProcess/ServiceProcess.jsx
import React from "react";
import "./serviceProcess.css";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";

const ServiceProcess = () => {
  const ready = useCmsReady();
  const stored = useCms("service_process.steps", []);
  const { isEditMode } = useEditMode();
  const steps = Array.isArray(stored) ? stored : [];

  if (!ready) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!steps.length && !isEditMode) {
    return null;
  }

  return (
    <section className="service-process">
      <div className="service-process-container">
        <div className="service-process-header">
          <EditableText cmsKey="service_process.tag" value="How It Works" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="service_process.title" value="Four Simple Steps to a *Cleaner* Space" as="h2" className="section-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
          <EditableText cmsKey="service_process.subtitle" value="From booking to satisfaction, our streamlined process makes professional cleaning effortless." as="p" className="section-subtitle" label="Intro text" />
        </div>

        <div className="process-track">
          <EditableList
            cmsKey="service_process.steps"
            value={steps}
            itemLabel="step"
            label="Process steps"
            fields={[
              { key: "number", type: "text", label: "Step number (e.g. 01)" },
              { key: "icon", type: "icon", label: "Icon" },
              { key: "title", type: "text", label: "Title" },
              { key: "description", type: "textarea", label: "Description" },
            ]}
          >
            {(step, index) => (
              <div className="process-step" key={index}>
                <div className="step-connector">
                  {index < steps.length - 1 && <div className="connector-line"></div>}
                </div>
                <div className="step-card">
                  <div className="step-number">{step.number || String(index + 1).padStart(2, "0")}</div>
                  <div className="step-icon"><i className={step.icon}></i></div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            )}
          </EditableList>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
