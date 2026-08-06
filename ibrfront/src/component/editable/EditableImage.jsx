import React, { useState } from "react";
import { useEditMode } from "../../context/EditModeContext";
import "./editable.css";

const EditableImage = ({ cmsKey, type = "image", value, alt = "", className = "" }) => {
  const { isEditMode, saveField, getOverride } = useEditMode();
  const displayValue = getOverride(cmsKey, value);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(displayValue);

  if (!isEditMode) {
    return <img src={displayValue} alt={alt} className={className} />;
  }

  const handleSave = async () => {
    await saveField(cmsKey, draft, type);
    setOpen(false);
  };

  return (
    <div className="editable-image-wrap">
      <img
        src={displayValue}
        alt={alt}
        className={`${className} editable-field editable-image`}
        onClick={() => {
          setDraft(displayValue);
          setOpen(true);
        }}
      />
      {open && (
        <div className="editable-popover">
          <label>Image URL</label>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            autoFocus
          />
          {draft && <img src={draft} alt="Preview" className="editable-popover-preview" />}
          <div className="editable-popover-actions">
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="button" className="primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;