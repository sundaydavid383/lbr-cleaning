import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import "../editable/editable.css";

const EditModeToast = () => {
  const { saveStatus, lastError, isEditMode, undo, canUndo } = useEditMode();

  if (!isEditMode || saveStatus === "idle") return null;

  return (
    <div className={`edit-mode-toast ${saveStatus}`} role="status" aria-live="polite">
      {saveStatus === "saving" && (
        <>
          <i className="fa-solid fa-circle-notch fa-spin"></i> Saving…
        </>
      )}
      {saveStatus === "saved" && (
        <>
          <i className="fa-solid fa-check"></i> Saved — your website is updated
          {canUndo && (
            <button type="button" onClick={undo}>
              Undo
            </button>
          )}
        </>
      )}
      {saveStatus === "error" && (
        <>
          <i className="fa-solid fa-triangle-exclamation"></i> {lastError || "Couldn't save. Please try again."}
        </>
      )}
    </div>
  );
};

export default EditModeToast;
