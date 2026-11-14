import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import { useCms } from "../../hooks/useCmsContent";
import { getIn } from "../../services/cmsStore";
import "./editable.css";

// Text that an admin can click to change.
//
//   <EditableText cmsKey="about.heading" value="About us" as="h2" />
//   <EditableText cmsKey="about_page.intro" path="paragraphs.0" root={intro} value={intro.paragraphs[0]} as="p" />
//
// - cmsKey: content item. path: optional field inside it (with `root` as
//   the whole item's default value, used if it isn't saved yet).
// - value: what to show when nothing is saved yet.
// - multiline: use a big text box (auto-detected for long text).
// - label/help: shown in the edit panel.
const EditableText = ({
  cmsKey,
  path,
  root,
  value,
  type, // kept for backwards compatibility
  as: Tag = "span",
  className = "",
  multiline,
  label,
  help,
  placeholder = "Click to add text",
  children,
  ...rest
}) => {
  const { isEditMode, openPanel } = useEditMode();
  const rootValue = useCms(cmsKey, root);
  const stored = path ? getIn(rootValue, path) : rootValue;
  const display = stored !== undefined && stored !== null && typeof stored !== "object" ? stored : value;

  if (!isEditMode) {
    if (children) return <Tag className={className} {...rest}>{children(display)}</Tag>;
    return (
      <Tag className={className} {...rest}>
        {display}
      </Tag>
    );
  }

  const isLong = multiline ?? (type === "rich_text" || String(display ?? "").length > 70);

  const open = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPanel({
      cmsKey,
      path,
      root,
      value: display ?? "",
      title: label,
      help,
      field: { type: isLong ? "textarea" : "text", label: label || "Text" },
      openedAt: Date.now(),
    });
  };

  const empty = display === undefined || display === null || String(display).trim() === "";

  return (
    <Tag
      className={`${className} editable-field ${empty ? "editable-empty" : ""}`.trim()}
      onClickCapture={open}
      title="Click to edit"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? open(e) : undefined)}
      {...rest}
    >
      {empty ? <span className="editable-placeholder">{placeholder}</span> : children ? children(display) : display}
      <span className="editable-pencil" aria-hidden="true">
        <i className="fa-solid fa-pen"></i>
      </span>
    </Tag>
  );
};

export default EditableText;
