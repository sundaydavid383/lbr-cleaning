import React from "react";
import { useEditMode } from "../../context/EditModeContext";
import { useCms } from "../../hooks/useCmsContent";
import { getIn } from "../../services/cmsStore";
import { inferField } from "./fields";
import "./editable.css";

// A list of things (services, testimonials, FAQs, team members…) that an
// admin can add to, remove from, reorder and edit.
//
//   <EditableList cmsKey="testimonials.list" value={fallbackList}
//                 itemLabel="testimonial"
//                 fields={[{ key: "name", label: "Name" }, { key: "photo", type: "image" }]}>
//     {(item, i) => <Card key={i} {...item} />}
//   </EditableList>
//
// `fields` is optional — it's worked out from the data if left out.
// Supports `path` + `root` for lists stored inside a bigger item.
const plural = (w) => (/(s|x|ch|sh)$/i.test(w) ? `${w}es` : `${w}s`);

const EditableList = ({
  cmsKey,
  path,
  root,
  value,
  fields,
  field: givenField,
  itemLabel = "item",
  label,
  help,
  type, // kept for backwards compatibility
  itemWrapperTag: Wrapper = "div",
  wrapperClassName = "",
  addButtonPosition = "after",
  children,
}) => {
  const { isEditMode, openPanel } = useEditMode();
  const rootValue = useCms(cmsKey, root);
  const stored = path ? getIn(rootValue, path) : rootValue;
  const items = Array.isArray(stored) ? stored : Array.isArray(value) ? value : [];

  if (!isEditMode) {
    return <>{items.map((item, i) => children(item, i))}</>;
  }

  const buildField = (initialOpen = null) => {
    const sampleIsString = items.length > 0 && typeof items[0] !== "object";
    if (givenField) return { ...givenField, initialOpen };
    if (sampleIsString || (fields && fields.length === 0)) {
      return { type: "list", itemLabel, itemField: inferField(items[0] ?? "", itemLabel), label: "" };
    }
    const inferred = inferField(items.length ? items : [{}], "");
    const finalFields = fields
      ? fields.map((f) => {
          const sample = items.find((it) => it?.[f.key] !== undefined)?.[f.key];
          return f.type ? f : { ...inferField(sample ?? "", f.key), ...f };
        })
      : inferred.fields || [];
    return { type: "items", fields: finalFields, itemLabel, initialOpen, label: "" };
  };

  const open = (index = null) => (e) => {
    // Links marked data-cms-nav still navigate while editing (e.g. "View Details").
    if (e?.target?.closest?.("[data-cms-nav]")) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    openPanel({
      cmsKey,
      path,
      root,
      value: items,
      title: label || plural(`${itemLabel.charAt(0).toUpperCase()}${itemLabel.slice(1)}`),
      help: help || `Add, remove, reorder or change each ${itemLabel}. Use the arrows to change the order.`,
      field: buildField(index),
      openedAt: Date.now(),
    });
  };

  const manageBtn = (
    <button type="button" className="editable-list-manage" onClick={open(null)}>
      <i className="fa-solid fa-list-check"></i> Manage {plural(itemLabel)} ({items.length})
      <span className="editable-list-manage-add">
        <i className="fa-solid fa-plus"></i> Add / remove
      </span>
    </button>
  );

  return (
    <>
      {addButtonPosition === "before" && manageBtn}
      {items.map((item, idx) => (
        <Wrapper className={`editable-list-item-wrap ${wrapperClassName}`} key={idx} onClickCapture={open(idx)} title={`Click to edit this ${itemLabel}`}>
          {children(item, idx)}
          <span className="editable-list-controls" aria-hidden="true">
            <i className="fa-solid fa-pen"></i> Edit
          </span>
        </Wrapper>
      ))}
      {items.length === 0 && (
        <div className="editable-list-empty">No {plural(itemLabel)} yet.</div>
      )}
      {addButtonPosition !== "before" && manageBtn}
    </>
  );
};

export default EditableList;
