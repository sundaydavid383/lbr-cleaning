import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import { useCms } from "../../hooks/useCmsContent";
import { getIn } from "../../services/cmsStore";
import "./editable.css";

// A picture an admin can click to replace.
//   <EditableImage cmsKey="about.image" value={defaultImg} alt="Our team" />
// Supports `path` + `root` like EditableText.
const EditableImage = ({ cmsKey, path, root, value, type, alt = "", className = "", label, help, ...rest }) => {
  const { isEditMode, openPanel } = useEditMode();
  const rootValue = useCms(cmsKey, root);
  const stored = path ? getIn(rootValue, path) : rootValue;
  const src = typeof stored === "string" && stored ? stored : value;

  if (!isEditMode) {
    return src ? <img src={src} alt={alt} className={className} {...rest} /> : null;
  }

  const open = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPanel({
      cmsKey,
      path,
      root,
      value: src || "",
      title: label || "Picture",
      help: help || "Upload a new picture. It will replace the current one everywhere it is used.",
      field: { type: "image", label: "" },
      openedAt: Date.now(),
    });
  };

  return (
    <span className="editable-image-wrap" onClickCapture={open} title="Click to change picture">
      {src ? (
        <img src={src} alt={alt} className={`${className} editable-image`} {...rest} />
      ) : (
        <span className={`${className} editable-image-empty`}>
          <i className="fa-regular fa-image"></i> Add picture
        </span>
      )}
      <span className="editable-image-badge">
        <i className="fa-solid fa-camera"></i> Change picture
      </span>
    </span>
  );
};

export default EditableImage;
