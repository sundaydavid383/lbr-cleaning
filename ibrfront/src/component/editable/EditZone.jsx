import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import { getSavedValue, getIn } from "../../services/cmsStore";
import { openSiteSettings } from "../../hooks/useSiteSettings";
import "./editable.css";

// Makes a whole area clickable in edit mode. Clicking opens the side panel
// for the content shown inside it (same config as EditSection), or the
// Business info settings when `site` is set.
//
//   <EditZone cmsKey="testimonials.list" root={list} label="Customer reviews" field={...}>
//     ...carousel...
//   </EditZone>
const EditZone = ({ as: Tag = "div", className = "", children, site, badge = "Edit", ...cfg }) => {
  const { isEditMode, openPanel } = useEditMode();
  if (!isEditMode) return <Tag className={className || undefined}>{children}</Tag>;

  const open = (e) => {
    // Let editable things inside handle their own clicks, and let marked links navigate.
    if (e.target.closest("[data-cms-nav]")) return;
    const inner = e.target.closest(".editable-field, .editable-list-item-wrap, .editable-image-wrap, .cms-section-bar, .editable-list-manage");
    if (inner && e.currentTarget.contains(inner) && inner !== e.currentTarget) return;
    e.preventDefault();
    e.stopPropagation();
    if (site) {
      openSiteSettings(openPanel);
      return;
    }
    const current = getIn(getSavedValue(cfg.cmsKey, cfg.root), cfg.path);
    openPanel({
      ...cfg,
      value: current ?? (cfg.path ? getIn(cfg.root, cfg.path) : cfg.root),
      title: cfg.label,
      field: cfg.field || (cfg.fields ? { type: "object", fields: cfg.fields, label: "" } : undefined),
      openedAt: Date.now(),
    });
  };

  return (
    <Tag className={`${className} editable-list-item-wrap editable-zone`.trim()} onClickCapture={open} title={`Click to edit: ${site ? "Business info" : cfg.label || "this"}`}>
      {children}
      <span className="editable-list-controls" aria-hidden="true">
        <i className="fa-solid fa-pen"></i> {badge}
      </span>
    </Tag>
  );
};

export default EditZone;
