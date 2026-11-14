import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import { getSavedValue, getIn } from "../../services/cmsStore";
import "./editable.css";

// An "Edit this section" button, shown only in edit mode. Opens the side
// panel with a form for a whole group of content.
//
//   <EditSection cmsKey="cta_banner.data" root={fallback} label="Call-to-action banner"
//     fields={[{ key: "title", label: "Heading" }, { key: "image", type: "image" }]} />
//
// For several separate keys at once, use `items`:
//   <EditSection label="Section heading" items={[
//     { cmsKey: "why_choose_us.tag", label: "Small tag", value: "Why us" }, ...]} />
// (each key opens in turn from a small menu).
const EditSection = ({ cmsKey, path, root, fields, field, label = "this section", help, items, inline = false, icon = "fa-sliders" }) => {
  const { isEditMode, openPanel } = useEditMode();
  if (!isEditMode) return null;

  const openOne = (cfg) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const current = getIn(getSavedValue(cfg.cmsKey, cfg.root), cfg.path);
    openPanel({
      ...cfg,
      value: current ?? cfg.value ?? (cfg.path ? getIn(cfg.root, cfg.path) : cfg.root),
      title: cfg.label,
      field: cfg.field || (cfg.fields ? { type: "object", fields: cfg.fields, label: "" } : undefined),
      openedAt: Date.now(),
    });
  };

  if (items && items.length) {
    return (
      <div className={`cms-section-bar ${inline ? "inline" : ""}`}>
        <span className="cms-section-bar-label">
          <i className={`fa-solid ${icon}`}></i> {label}
        </span>
        {items.map((it) => (
          <button type="button" key={`${it.cmsKey}${it.path || ""}`} className="cms-section-btn" onClick={openOne(it)}>
            <i className="fa-solid fa-pen"></i> {it.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`cms-section-bar ${inline ? "inline" : ""}`}>
      <button type="button" className="cms-section-btn primary" onClick={openOne({ cmsKey, path, root, fields, field, label, help })}>
        <i className={`fa-solid ${icon}`}></i> Edit {label}
      </button>
    </div>
  );
};

export default EditSection;
