import React, { useState, useRef } from "react";
import { useEditMode } from "../../context/EditModeContext";
import "./editable.css";

const EditableText = ({ cmsKey, type = "text", as: Tag = "span", value, className = "" }) => {
  const { isEditMode, saveField, getOverride } = useEditMode();
  const displayValue = getOverride(cmsKey, value);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  if (!isEditMode) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  const open = () => {
    setDraft(displayValue);
    setEditing(true);
    setError("");
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const cancel = () => {
    setEditing(false);
    setError("");
  };

  const save = async () => {
    const clean = draft.trim();
    if (clean === displayValue) {
      cancel();
      return;
    }

    setSaving(true);
    setError("");
    try {
      const saved = await saveField(cmsKey, clean, type);
      console.log(`[EDIT-MODE] EditableText save result for ${cmsKey}:`, saved, { newValue: clean, oldValue: displayValue });
      if (saved) {
        setEditing(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setError("Could not save. Check the browser console for details, then click Refresh.");
      }
    } catch (err) {
      console.error("[EDIT-MODE] EditableText save error:", err);
      setError("Save failed. Check the browser console for details.");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <span className={`editable-popover-wrap ${className}`}>
        <textarea
          ref={textareaRef}
          className="editable-popover-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              save();
            }
            if (e.key === "Escape") {
              cancel();
            }
          }}
          rows={3}
        />
        {error && <span className="editable-error">{error}</span>}
        <div className="editable-popover-actions">
          <button type="button" className="editable-popover-btn cancel" onClick={cancel} disabled={saving}>
            Cancel
          </button>
          <button type="button" className="editable-popover-btn primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </span>
    );
  }

  return (
    <Tag
      className={`editable-field ${className}`}
      onClick={open}
      title="Click to edit"
    >
      {displayValue}
      <span className="editable-pencil" aria-hidden="true">
        <i className="fa-solid fa-pen"></i>
      </span>
    </Tag>
  );
};

export default EditableText;
