// filepath: ibrfront/src/component/ctaBanner/CTABanner.jsx
import React from "react";
import "./ctaBanner.css";
import { Link } from "react-router-dom";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const CTABanner = () => {
  const { value: ctaData, loading: ctaLoading } = useCmsCategory("cta_banner", {});
  const { isEditMode } = useEditMode();

  if (ctaLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!ctaData) {
    return null;
  }

  const data = ctaData.data || ctaData;

  return (
    <section className="cta-banner">
      <div className="cta-bg-pattern"></div>
      <div className="cta-container">
        <div className="cta-content">
          {isEditMode ? (
            <>
              <EditableText cmsKey="cta_banner.tag" type="text" value={data.tag} as="span" className="cta-tag" />
              <h2 className="cta-title">
                <EditableText cmsKey="cta_banner.title" type="text" value={data.title} as="span" />
              </h2>
              <EditableText cmsKey="cta_banner.subtitle" type="text" value={data.subtitle} as="p" className="cta-subtitle" />
            </>
          ) : (
            <>
              {data.tag && <span className="cta-tag">{data.tag}</span>}
              {data.title && (
                <h2 className="cta-title">{data.title}</h2>
              )}
              {data.subtitle && <p className="cta-subtitle">{data.subtitle}</p>}
            </>
          )}

          {data.features?.length > 0 && (
            <div className="cta-features">
              {data.features.map((feature, index) => (
                <div className="cta-feature" key={index}>
                  <i className="fa-solid fa-check-circle"></i>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              <p>
                {data.primary_button || "Book Now"} <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </Link>
            <a href={`tel:${data.phone || "+234 801 234 5678"}`} className="btn btn-secondary">
              <p>
                <i className="fa-solid fa-phone"></i> {data.secondary_button || "Call Us"}
              </p>
            </a>
          </div>
        </div>

        <div className="cta-visual">
          <div className="cta-circle cta-circle-1"></div>
          <div className="cta-circle cta-circle-2"></div>
          <div className="cta-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=600&fit=crop"
              alt="Professional cleaning"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
