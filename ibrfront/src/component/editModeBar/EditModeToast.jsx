import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import "../editable/editable.css";

const EditModeToast = () => {
  const { saveStatus } = useEditMode();

  if (saveStatus === "idle") return null;

  return (
    <div className={`edit-mode-toast ${saveStatus}`}>
      {saveStatus === "saving" && (
        <><i className="fa-solid fa-circle-notch fa-spin"></i> Saving…</>
      )}
      {saveStatus === "saved" && (
        <><i className="fa-solid fa-check"></i> Saved — reloading…</>
      )}
      {saveStatus === "error" && (
        <><i className="fa-solid fa-triangle-exclamation"></i> Couldn’t save. Click Refresh to try again.</>
      )}
    </div>
  );
};

export default EditModeToast;
