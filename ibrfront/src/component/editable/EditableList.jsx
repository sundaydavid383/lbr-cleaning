import React, { useState } from "react";
import { useEditMode } from "../../context/EditModeContext";
import "./editable.css";

const EditableList = ({
  cmsKey,
  type = "array",
  value,
  fields,
  itemWrapperTag: Wrapper = "div",
  children, // render prop: (item, index) => JSX
}) => {
  const { isEditMode, saveField, getOverride } = useEditMode();
  const items = getOverride(cmsKey, value) || [];
  const [openIndex, setOpenIndex] = useState(null);
  const [draft, setDraft] = useState(null);

  if (!isEditMode) {
    return <>{items.map((item, i) => children(item, i))}</>;
  }

  const openEditor = (idx) => {
    setDraft({ ...items[idx] });
    setOpenIndex(idx);
  };

  const saveItem = () => {
    const next = items.map((it, i) => (i === openIndex ? draft : it));
    saveField(cmsKey, next, type);
    setOpenIndex(null);
  };

  const removeItem = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    saveField(cmsKey, next, type);
  };

  const addItem = () => {
    const template = Object.fromEntries(fields.map((f) => [f.key, ""]));
    saveField(cmsKey, [...items, template], type);
  };

  return (
    <>
      {items.map((item, idx) => (
        <Wrapper className="editable-list-item-wrap" key={idx}>
          {children(item, idx)}
          <span className="editable-list-controls">
            <button type="button" className="editable-list-edit-btn" onClick={() => openEditor(idx)} title="Edit">
              <i className="fa-solid fa-pen"></i>
            </button>
            <button type="button" className="editable-list-remove-btn" onClick={() => removeItem(idx)} title="Remove">
              ×
            </button>
          </span>

          {openIndex === idx && draft && (
            <div className="editable-popover">
              {fields.map((f) => (
                <div key={f.key} className="editable-popover-field">
                  <label>{f.label}</label>
                  <input
                    type="text"
                    value={draft[f.key] ?? ""}
                    onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="editable-popover-actions">
                <button type="button" onClick={() => setOpenIndex(null)}>Cancel</button>
                <button type="button" className="primary" onClick={saveItem}>Save</button>
              </div>
            </div>
          )}
        </Wrapper>
      ))}
      <button type="button" className="editable-add-btn" onClick={addItem}>
        <i className="fa-solid fa-plus"></i> Add item
      </button>
    </>
  );
};

export default EditableList;