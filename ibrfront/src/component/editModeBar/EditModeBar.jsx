import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEditMode } from "../../context/EditModeContext";
import "../editable/editable.css";

const EDITABLE_PAGES = [
  { label: "Home", path: "/admin/edit/home" },
  { label: "About", path: "/admin/edit/about" },
  { label: "Services", path: "/admin/edit/services" },
  { label: "Blog", path: "/admin/edit/blog" },
  { label: "Contact", path: "/admin/edit/contact" },
];

const EditModeBar = () => {
  const { saveStatus, refreshAll } = useEditMode();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="edit-mode-bar">
      <div className="edit-mode-bar-left">
        <i className="fa-solid fa-pen-to-square"></i>
        <span>Editing:</span>
        <select value={location.pathname} onChange={(e) => navigate(e.target.value)}>
          {EDITABLE_PAGES.map((p) => (
            <option key={p.path} value={p.path}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="edit-mode-bar-right">
        <span className={`edit-save-status ${saveStatus}`}>
          {saveStatus === "saving" && <><i className="fa-solid fa-circle-notch fa-spin"></i> Saving…</>}
          {saveStatus === "saved" && <><i className="fa-solid fa-check"></i> Saved</>}
          {saveStatus === "error" && <><i className="fa-solid fa-triangle-exclamation"></i> Couldn't save</>}
          {saveStatus === "idle" && <><i className="fa-regular fa-circle-check"></i> Up to date</>}
        </span>
        <button type="button" className="edit-mode-refresh-btn" onClick={() => { refreshAll(); window.location.reload(); }}>
          <i className="fa-solid fa-rotate-right"></i> Refresh
        </button>
        <button type="button" className="edit-mode-exit-btn" onClick={() => navigate("/admin/cms")}>
          Exit Editor
        </button>
      </div>
    </div>
  );
};

export default EditModeBar;