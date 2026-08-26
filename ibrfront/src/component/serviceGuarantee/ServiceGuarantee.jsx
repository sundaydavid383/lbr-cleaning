// filepath: ibrfront/src/component/serviceGuarantee/ServiceGuarantee.jsx
import React from "react";
import "./serviceGuarantee.css";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const ServiceGuarantee = () => {
  const { value: guaranteeData, loading: guaranteeLoading } = useCmsCategory("service_guarantee", {});
  const { isEditMode } = useEditMode();

  if (guaranteeLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const guarantees = guaranteeData?.items || [];

  if (!guarantees.length) {
    return null;
  }

  return (
    <section className="service-guarantee">
      <div className="service-guarantee-container">
        <div className="guarantee-header">
          {isEditMode ? (
            <>
              <EditableText cmsKey="service_guarantee.tag" type="text" value="Our Promise" as="span" className="section-tag" />
              <h2 className="section-title">
                Cleaning with <span className="highlight">Confidence</span>
              </h2>
            </>
          ) : (
            <>
              <span className="section-tag">Our Promise</span>
              <h2 className="section-title">
                Cleaning with <span className="highlight">Confidence</span>
              </h2>
            </>
          )}
        </div>

        <div className="guarantee-grid">
          {guarantees.map((item, index) => (
            <div className="guarantee-card" key={index}>
              <div className="guarantee-icon"><i className={item.icon}></i></div>
              <h3 className="guarantee-title">{item.title}</h3>
              <p className="guarantee-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGuarantee;
