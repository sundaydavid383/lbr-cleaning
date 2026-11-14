// filepath: ibrfront/src/component/ctaBanner/CTABanner.jsx
import React from "react";
import "./ctaBanner.css";
import { Link } from "react-router-dom";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import EditableList from "../editable/EditableList";
import EditSection from "../editable/EditSection";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";

const KEY = "cta_banner.data";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=600&fit=crop";

const CTABanner = () => {
  const ready = useCmsReady();
  const data = useCms(KEY, {}) || {};
  const { isEditMode } = useEditMode();

  if (!ready) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const features = Array.isArray(data.features) ? data.features : [];
  const T = (path, Tag, props = {}) => (
    <EditableText cmsKey={KEY} root={data} path={path} value={data[path]} as={Tag} {...props} />
  );

  return (
    <section className="cta-banner">
      <div className="cta-bg-pattern"></div>
      <div className="cta-container">
        <div className="cta-content">
          {(data.tag || isEditMode) && T("tag", "span", { className: "cta-tag", label: "Small tag" })}
          {(data.title || isEditMode) && (
            <EditableText cmsKey={KEY} root={data} path="title" value={data.title} as="h2" className="cta-title" label="Heading" help={HIGHLIGHT_HELP}>
              {(v) => highlight(v)}
            </EditableText>
          )}
          {(data.subtitle || isEditMode) && T("subtitle", "p", { className: "cta-subtitle", label: "Text" })}

          {(features.length > 0 || isEditMode) && (
            <div className="cta-features">
              <EditableList cmsKey={KEY} root={data} path="features" value={features} itemLabel="point" label="Ticked points" fields={[]}>
                {(feature, index) => (
                  <div className="cta-feature" key={index}>
                    <i className="fa-solid fa-check-circle"></i>
                    <span>{feature}</span>
                  </div>
                )}
              </EditableList>
            </div>
          )}

          <div className="cta-buttons">
            <Link to={data.primary_link || "/contact"} className="btn btn-primary">
              <p>
                {T("primary_button", "span", { value: data.primary_button || "Book Now", label: "Main button text" })}{" "}
                <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </Link>
            <a href={`tel:${(data.phone || "+234 801 234 5678").replace(/\s+/g, "")}`} className="btn btn-secondary">
              <p>
                <i className="fa-solid fa-phone"></i> {T("secondary_button", "span", { value: data.secondary_button || "Call Us", label: "Call button text" })}
              </p>
            </a>
          </div>
          <EditSection
            cmsKey={KEY}
            root={data}
            label="buttons & phone"
            icon="fa-link"
            fields={[
              { key: "primary_button", type: "text", label: "Main button text" },
              { key: "primary_link", type: "url", label: "Main button goes to", help: "A page on this site such as /apply or /contact, or a full web address." },
              { key: "secondary_button", type: "text", label: "Call button text" },
              { key: "phone", type: "text", label: "Phone number the call button dials" },
            ]}
          />
        </div>

        <div className="cta-visual">
          <div className="cta-circle cta-circle-1"></div>
          <div className="cta-circle cta-circle-2"></div>
          <div className="cta-image-wrap">
            <EditableImage cmsKey={KEY} root={data} path="image" value={data.image || DEFAULT_IMAGE} alt="Professional cleaning" loading="lazy" label="Banner picture" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
