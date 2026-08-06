import React, { useRef, useEffect, useState } from "react";
import { useEditMode } from "../../context/EditModeContext";
import "./editable.css";

const EditableText = ({ cmsKey, type = "text", as: Tag = "span", value, className = "" }) => {
  const { isEditMode, saveField, getOverride } = useEditMode();
  const displayValue = getOverride(cmsKey, value);
  const ref = useRef(null);
  const [lastSaved, setLastSaved] = useState(displayValue);

  useEffect(() => {
    setLastSaved(displayValue);
  }, [displayValue]);

  if (!isEditMode) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  const commit = async () => {
    const clean = ref.current?.innerText ?? lastSaved;
    if (clean !== lastSaved) {
      setLastSaved(clean);
      await saveField(cmsKey, clean, type);
    }
  };

  return (
    <Tag
      ref={ref}
      className={`editable-field ${className}`}
      contentEditable
      suppressContentEditableWarning
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter" && type === "text") {
          e.preventDefault();
          ref.current.blur();
        }
        if (e.key === "Escape") {
          ref.current.innerText = lastSaved;
          ref.current.blur();
        }
      }}
    >
      {displayValue}
    </Tag>
  );
};

export default EditableText;