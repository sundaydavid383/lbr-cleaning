import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEditMode } from "../../context/EditModeContext";
import "./globalEditToggle.css";
import { openSiteSettings } from "../../hooks/useSiteSettings";

export const EDITABLE_PAGES = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/service" },
  { label: "Service: Home Cleaning", path: "/services/home-cleaning" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Our Services (showcase)", path: "/our-services" },
  { label: "Information", path: "/information" },
  { label: "Book a Cleaning (Apply)", path: "/apply" },
  { label: "Payment", path: "/payment" },
  { label: "Login", path: "/login" },
  { label: "Sign up", path: "/signup" },
  { label: "Customer Dashboard", path: "/dashboard" },
];

// Floating toolbar shown to admins on every page of the website.
const GlobalEditToggle = () => {
  const { isEditMode, setIsEditMode, isAdmin, saveStatus, undo, canUndo, openPanel } = useEditMode();
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAdmin || location.pathname.startsWith("/admin")) return null;

  if (!isEditMode) {
    return (
      <button type="button" className="ge-launch" onClick={() => setIsEditMode(true)}>
        <i className="fa-solid fa-pen-to-square"></i> Edit this page
      </button>
    );
  }

  const known = EDITABLE_PAGES.some((p) => p.path === location.pathname);

  return (
    <div className="ge-bar" role="toolbar" aria-label="Website editor">
      <div className="ge-left">
        <span className="ge-badge">
          <span className="ge-dot"></span> Editing
        </span>
        <select
          className="ge-select"
          value={known ? location.pathname : ""}
          onChange={(e) => e.target.value && navigate(e.target.value)}
          aria-label="Go to page"
        >
          {!known && <option value="">This page</option>}
          {EDITABLE_PAGES.map((p) => (
            <option key={p.path} value={p.path}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ge-right">
        <span className={`ge-status ${saveStatus}`}>
          {saveStatus === "saving" && <><i className="fa-solid fa-circle-notch fa-spin"></i> Saving…</>}
          {saveStatus === "saved" && <><i className="fa-solid fa-check"></i> Saved & live</>}
          {saveStatus === "error" && <><i className="fa-solid fa-triangle-exclamation"></i> Not saved</>}
          {saveStatus === "idle" && <><i className="fa-regular fa-circle-check"></i> All changes live</>}
        </span>
        <button type="button" className="ge-btn" onClick={undo} disabled={!canUndo || saveStatus === "saving"} title="Undo last change">
          <i className="fa-solid fa-rotate-left"></i> <span className="ge-hide-sm">Undo</span>
        </button>
        <button type="button" className="ge-btn" onClick={() => openSiteSettings(openPanel)} title="Business name, phone, email, logo…">
          <i className="fa-solid fa-store"></i> <span className="ge-hide-sm">Business info</span>
        </button>
        <button type="button" className="ge-btn" onClick={() => setShowHelp((s) => !s)} title="How to edit">
          <i className="fa-regular fa-circle-question"></i> <span className="ge-hide-sm">Help</span>
        </button>
        <button type="button" className="ge-btn" onClick={() => navigate("/admin/cms")} title="Admin area">
          <i className="fa-solid fa-gauge"></i> <span className="ge-hide-sm">Admin</span>
        </button>
        <button type="button" className="ge-btn ge-done" onClick={() => setIsEditMode(false)}>
          <i className="fa-solid fa-check"></i> Done
        </button>
      </div>

      {showHelp && (
        <div className="ge-help">
          <button type="button" className="ge-help-close" onClick={() => setShowHelp(false)} aria-label="Close help">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h4>How to edit your website</h4>
          <ul>
            <li><strong>Words:</strong> click any text with a green dotted outline, change it in the panel on the right, then press <em>Save</em>.</li>
            <li><strong>Pictures:</strong> click a picture and choose <em>Change picture</em> to upload a new one from your phone or computer.</li>
            <li><strong>Lists</strong> (services, reviews, questions…): click an item to change it, or use <em>Manage … / Add / remove</em> to add, delete or reorder.</li>
            <li><strong>Sections:</strong> green <em>Edit …</em> buttons open settings for a whole section.</li>
            <li>While typing you see a <strong>preview</strong>. Nothing changes for visitors until you press <em>Save</em>.</li>
            <li><strong>Business info</strong> changes your phone number, email, address, WhatsApp and logo everywhere at once.</li>
            <li>Made a mistake? Press <strong>Undo</strong>.</li>
            <li>Use the page menu on the left to jump to another page. Press <strong>Done</strong> to see the site as visitors do.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GlobalEditToggle;
