import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import "./globalEditToggle.css";

const GlobalEditToggle = () => {
  const { isEditMode, setIsEditMode, isAdmin, saveStatus } = useEditMode();

  if (!isAdmin) return null;

  return (
    <div className={`global-edit-toggle ${isEditMode ? "active" : ""}`}>
      <div className="global-edit-toggle-inner">
        <span className="global-edit-label">
          <i className="fa-solid fa-pen-to-square"></i>
          {isEditMode ? "Edit Mode Active" : "View Mode"}
        </span>
        <button
          className={`global-edit-btn ${isEditMode ? "exit" : "enter"}`}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? "Exit Editing" : "Edit Website"}
        </button>
        {isEditMode && (
          <span className={`global-edit-status ${saveStatus}`}>
            {saveStatus === "saving" && <><i className="fa-solid fa-circle-notch fa-spin"></i> Saving…</>}
            {saveStatus === "saved" && <><i className="fa-solid fa-check"></i> Saved</>}
            {saveStatus === "error" && <><i className="fa-solid fa-triangle-exclamation"></i> Error</>}
            {saveStatus === "idle" && <><i className="fa-regular fa-circle-check"></i> Ready</>}
          </span>
        )}
      </div>
    </div>
  );
};

export default GlobalEditToggle;
