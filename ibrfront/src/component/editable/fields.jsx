// Form controls for the edit side panel.
//
// A "field" describes how to edit a value:
//   { type: "text" | "textarea" | "image" | "icon" | "url" | "number" |
//           "boolean" | "select" | "list" | "items" | "object",
//     label, help, placeholder, options, fields, itemLabel, newItem }
//
// When no field description is given, inferField() works one out from the
// value itself and the property names, so any content can be edited.

import React, { useState, useRef } from "react";
import { useEditMode } from "../../context/EditModeContext";
import { uploadImage, checkImageFile } from "../../utils/uploadImage";

// ---------- inference ----------------------------------------------------

const IMAGE_RE = /(image|img|photo|picture|avatar|logo|thumbnail|thumb|banner|poster|^src$|background|sectionimage)/i;
const ICON_RE = /icon/i;
const URL_RE = /(url|link|href|path|route|to$|embed|video)/i;
const LONG_RE = /(description|desc|text|answer|quote|content|paragraph|body|excerpt|summary|bio|about|message|note|details|subtitle|intro|story)/i;

export const humanize = (name) => {
  if (name === undefined || name === null) return "";
  return String(name)
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\bps\b/i, "paragraphs")
    .replace(/\bcta\b/i, "button")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
};

const looksLikeImageUrl = (v) =>
  typeof v === "string" && /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(v.trim());

export const inferField = (value, name = "") => {
  const label = humanize(name);
  if (Array.isArray(value)) {
    const sample = value.find((v) => v !== null && v !== undefined);
    if (sample && typeof sample === "object" && !Array.isArray(sample)) {
      // union of keys across all items, in first-seen order
      const keys = [];
      value.forEach((it) => it && typeof it === "object" && Object.keys(it).forEach((k) => !keys.includes(k) && keys.push(k)));
      const fields = keys.map((k) => ({ key: k, ...inferField(value.find((it) => it?.[k] !== undefined)?.[k], k) }));
      return { type: "items", label, fields };
    }
    if (sample !== undefined && typeof sample !== "string" && typeof sample !== "number") {
      return { type: "json", label };
    }
    return { type: "list", label, itemField: inferField(sample ?? "", name.replace(/s$/, "")) };
  }
  if (value !== null && typeof value === "object") {
    return {
      type: "object",
      label,
      fields: Object.keys(value).map((k) => ({ key: k, ...inferField(value[k], k) })),
    };
  }
  if (typeof value === "boolean") return { type: "boolean", label };
  if (typeof value === "number") return { type: "number", label };
  if (ICON_RE.test(name) || (typeof value === "string" && /^fa[srlbd]?[ -]/.test(value))) return { type: "icon", label };
  if (IMAGE_RE.test(name) || looksLikeImageUrl(value)) return { type: "image", label };
  if (URL_RE.test(name)) return { type: "url", label };
  if (LONG_RE.test(name) || (typeof value === "string" && value.length > 70)) return { type: "textarea", label };
  return { type: "text", label };
};

// Short, readable summary of a list item for collapsed rows.
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const summarize = (item, index, itemLabel) => {
  const fallback = `${cap(itemLabel || "item")} ${index + 1}`;
  if (item === null || item === undefined) return fallback;
  if (typeof item !== "object") return String(item).slice(0, 80) || fallback;
  const pick =
    item.title || item.name || item.label || item.question || item.heading || item.header ||
    item.author || item.text || item.value || item.year || item.id;
  if (pick && typeof pick !== "object") return String(pick).slice(0, 80);
  const firstText = Object.values(item).find((v) => typeof v === "string" && v.trim() && !looksLikeImageUrl(v));
  return firstText ? firstText.slice(0, 80) : fallback;
};

const thumbnailOf = (item) => {
  if (!item || typeof item !== "object") return null;
  const v = Object.entries(item).find(([k, val]) => typeof val === "string" && (IMAGE_RE.test(k) || looksLikeImageUrl(val)) && val);
  return v ? v[1] : null;
};

// Empty copy of an item: same keys, blank values.
export const blankLike = (sample, field) => {
  if (field?.newItem !== undefined) return typeof field.newItem === "function" ? field.newItem() : structuredClone(field.newItem);
  if (field?.fields) {
    return Object.fromEntries(field.fields.map((f) => [f.key, blankLike(sample?.[f.key], f)]));
  }
  if (Array.isArray(sample)) return [];
  if (sample !== null && typeof sample === "object") {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blankLike(v)]));
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (field?.type === "list" || field?.type === "items") return [];
  return "";
};

// ---------- individual controls -----------------------------------------

const ImageField = ({ value, onChange, nameHint }) => {
  const { token } = useEditMode();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    setError("");
    const problem = checkImageFile(file);
    if (problem) {
      setError(problem);
      return;
    }
    try {
      setBusy(true);
      const url = await uploadImage(file, token, nameHint);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="cms-image-field">
      <div
        className={`cms-image-drop ${dragOver ? "drag" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => !busy && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="" onError={(e) => (e.currentTarget.style.opacity = 0.2)} />
        ) : (
          <div className="cms-image-empty">
            <i className="fa-regular fa-image"></i>
            <span>No picture yet</span>
          </div>
        )}
        <div className="cms-image-overlay">
          {busy ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Uploading…
            </>
          ) : (
            <>
              <i className="fa-solid fa-upload"></i> {value ? "Change picture" : "Upload picture"}
            </>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <p className="cms-field-hint">Click or drag a picture here. JPG, PNG or WebP, up to 5 MB.</p>
      {error && <p className="cms-field-error">{error}</p>}
      <div className="cms-image-actions">
        <button type="button" className="cms-link-btn" onClick={() => setShowUrl((s) => !s)}>
          {showUrl ? "Hide web address" : "Use a web address instead"}
        </button>
        {value && (
          <button type="button" className="cms-link-btn danger" onClick={() => onChange("")}>
            Remove picture
          </button>
        )}
      </div>
      {showUrl && (
        <input
          type="url"
          className="cms-input"
          value={value || ""}
          placeholder="https://…"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

const COMMON_ICONS = [
  "fa-solid fa-house", "fa-solid fa-building", "fa-solid fa-broom", "fa-solid fa-spray-can-sparkles",
  "fa-solid fa-soap", "fa-solid fa-hand-sparkles", "fa-solid fa-sparkles", "fa-solid fa-star",
  "fa-solid fa-leaf", "fa-solid fa-shield-halved", "fa-solid fa-clock", "fa-solid fa-calendar-check",
  "fa-solid fa-phone", "fa-solid fa-envelope", "fa-solid fa-location-dot", "fa-solid fa-users",
  "fa-solid fa-user-check", "fa-solid fa-award", "fa-solid fa-thumbs-up", "fa-solid fa-heart",
  "fa-solid fa-check", "fa-solid fa-circle-check", "fa-solid fa-truck", "fa-solid fa-window-maximize",
  "fa-solid fa-rug", "fa-solid fa-hammer", "fa-solid fa-virus-slash", "fa-solid fa-bolt",
  "fa-solid fa-money-bill-wave", "fa-solid fa-gift", "fa-solid fa-headset", "fa-solid fa-medal",
  "fa-brands fa-whatsapp", "fa-brands fa-facebook-f", "fa-brands fa-instagram", "fa-brands fa-x-twitter",
  "fa-brands fa-linkedin-in", "fa-brands fa-tiktok", "fa-brands fa-youtube", "fa-solid fa-globe",
];

const IconField = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="cms-icon-field">
      <div className="cms-icon-current">
        <span className="cms-icon-preview">{value ? <i className={value}></i> : <i className="fa-regular fa-square"></i>}</span>
        <button type="button" className="cms-btn ghost" onClick={() => setOpen((o) => !o)}>
          {open ? "Close icons" : "Choose icon"}
        </button>
      </div>
      {open && (
        <div className="cms-icon-grid">
          {COMMON_ICONS.map((ic) => (
            <button
              type="button"
              key={ic}
              className={`cms-icon-option ${ic === value ? "active" : ""}`}
              onClick={() => {
                onChange(ic);
                setOpen(false);
              }}
              title={ic.replace(/fa-(solid|brands|regular) fa-/, "")}
            >
              <i className={ic}></i>
            </button>
          ))}
        </div>
      )}
      <details className="cms-advanced">
        <summary>Advanced: icon code</summary>
        <input className="cms-input" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="fa-solid fa-star" />
        <p className="cms-field-hint">
          Any icon name from fontawesome.com, e.g. <code>fa-solid fa-star</code>
        </p>
      </details>
    </div>
  );
};

const moveItem = (arr, from, to) => {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [it] = next.splice(from, 1);
  next.splice(to, 0, it);
  return next;
};

const RowControls = ({ index, count, onMove, onDuplicate, onRemove, label }) => (
  <span className="cms-row-controls" onClick={(e) => e.stopPropagation()}>
    <button type="button" title="Move up" disabled={index === 0} onClick={() => onMove(index, index - 1)}>
      <i className="fa-solid fa-arrow-up"></i>
    </button>
    <button type="button" title="Move down" disabled={index === count - 1} onClick={() => onMove(index, index + 1)}>
      <i className="fa-solid fa-arrow-down"></i>
    </button>
    {onDuplicate && (
      <button type="button" title="Duplicate" onClick={() => onDuplicate(index)}>
        <i className="fa-regular fa-copy"></i>
      </button>
    )}
    <button
      type="button"
      title="Delete"
      className="danger"
      onClick={() => {
        if (window.confirm(`Delete this ${label || "item"}? You can still press Cancel afterwards to undo.`)) onRemove(index);
      }}
    >
      <i className="fa-regular fa-trash-can"></i>
    </button>
  </span>
);

const ListField = ({ field, value, onChange }) => {
  const items = Array.isArray(value) ? value : [];
  const itemField = field.itemField || { type: "text" };
  const itemLabel = field.itemLabel || "line";
  return (
    <div className="cms-list-field">
      {items.length === 0 && <p className="cms-field-hint">Nothing here yet.</p>}
      {items.map((it, i) => (
        <div className="cms-list-row" key={i}>
          <div className="cms-list-row-input">
            <FieldInput
              field={itemField}
              value={it}
              onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))}
            />
          </div>
          <RowControls
            index={i}
            count={items.length}
            label={itemLabel}
            onMove={(a, b) => onChange(moveItem(items, a, b))}
            onRemove={(idx) => onChange(items.filter((_, j) => j !== idx))}
          />
        </div>
      ))}
      <button type="button" className="cms-btn add" onClick={() => onChange([...items, blankLike(items[0], itemField)])}>
        <i className="fa-solid fa-plus"></i> Add {itemLabel}
      </button>
    </div>
  );
};

export const ItemsField = ({ field, value, onChange, initialOpen = null }) => {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(initialOpen);
  const itemLabel = field.itemLabel || "item";
  const subField = { type: "object", fields: field.fields };

  return (
    <div className="cms-items-field">
      {items.length === 0 && <p className="cms-field-hint">No {itemLabel}s yet. Use the button below to add one.</p>}
      {items.map((it, i) => {
        const thumb = thumbnailOf(it);
        const isOpen = open === i;
        return (
          <div className={`cms-item ${isOpen ? "open" : ""}`} key={i}>
            <div className="cms-item-head" onClick={() => setOpen(isOpen ? null : i)} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpen(isOpen ? null : i)}>
              <i className={`fa-solid fa-chevron-${isOpen ? "down" : "right"} cms-item-caret`}></i>
              {thumb && <img src={thumb} alt="" className="cms-item-thumb" />}
              <span className="cms-item-title">{summarize(it, i, itemLabel)}</span>
              <RowControls
                index={i}
                count={items.length}
                label={itemLabel}
                onMove={(a, b) => {
                  onChange(moveItem(items, a, b));
                  if (open === a) setOpen(b);
                }}
                onDuplicate={(idx) => {
                  const next = [...items];
                  next.splice(idx + 1, 0, structuredClone(items[idx]));
                  onChange(next);
                  setOpen(idx + 1);
                }}
                onRemove={(idx) => {
                  onChange(items.filter((_, j) => j !== idx));
                  setOpen(null);
                }}
              />
            </div>
            {isOpen && (
              <div className="cms-item-body">
                <FieldInput
                  field={subField}
                  value={it}
                  onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))}
                />
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        className="cms-btn add"
        onClick={() => {
          onChange([...items, blankLike(items[0], field)]);
          setOpen(items.length);
        }}
      >
        <i className="fa-solid fa-plus"></i> Add {itemLabel}
      </button>
    </div>
  );
};

const ObjectField = ({ field, value, onChange }) => {
  const obj = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const fields = field.fields || inferField(obj).fields || [];
  return (
    <div className="cms-object-field">
      {fields
        .filter((f) => !f.hidden)
        .map((f) => (
          <FieldRow
            key={f.key}
            field={f}
            value={obj[f.key]}
            onChange={(v) => onChange({ ...obj, [f.key]: v })}
          />
        ))}
    </div>
  );
};

const JsonField = ({ value, onChange }) => {
  const [text, setText] = useState(() => JSON.stringify(value ?? null, null, 2));
  const [err, setErr] = useState("");
  return (
    <>
      <textarea
        className="cms-input cms-code"
        rows={8}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(JSON.parse(e.target.value));
            setErr("");
          } catch {
            setErr("This isn't valid yet — check brackets and quotes.");
          }
        }}
      />
      {err && <p className="cms-field-error">{err}</p>}
    </>
  );
};

// The control only (no label).
export const FieldInput = ({ field, value, onChange, nameHint }) => {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          className="cms-input"
          rows={field.rows || Math.min(10, Math.max(3, Math.ceil(String(value || "").length / 60)))}
          value={value ?? ""}
          placeholder={field.placeholder || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input
          type="number"
          className="cms-input"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <label className="cms-switch">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="cms-switch-track"></span>
          <span>{value ? (field.onText || "On") : (field.offText || "Off")}</span>
        </label>
      );
    case "select":
      return (
        <select
          className="cms-input"
          value={value ?? ""}
          onChange={(e) => {
            const first = (field.options || [])[0];
            const numeric = typeof (typeof first === "object" ? first?.value : first) === "number";
            onChange(numeric ? Number(e.target.value) : e.target.value);
          }}
        >
          {(field.options || []).map((o) => {
            const opt = typeof o === "object" ? o : { value: o, label: o };
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      );
    case "image":
      return <ImageField value={value} onChange={onChange} nameHint={nameHint || field.key} />;
    case "icon":
      return <IconField value={value} onChange={onChange} />;
    case "url":
      return (
        <input
          type="text"
          className="cms-input"
          value={value ?? ""}
          placeholder={field.placeholder || "https://… or /page"}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "list":
      return <ListField field={field} value={value} onChange={onChange} />;
    case "items":
      return <ItemsField field={field} value={value} onChange={onChange} initialOpen={field.initialOpen ?? null} />;
    case "object":
      return <ObjectField field={field} value={value} onChange={onChange} />;
    case "json":
      return <JsonField value={value} onChange={onChange} />;
    case "custom":
      return field.render({ value, onChange });
    default:
      return (
        <input
          type="text"
          className="cms-input"
          value={value ?? ""}
          placeholder={field.placeholder || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

// Control with its label and help text.
export const FieldRow = ({ field, value, onChange }) => {
  const resolved = field.type ? field : { ...inferField(value, field.key), ...field };
  const label = resolved.label ?? humanize(resolved.key);
  const grouped = ["items", "list", "object"].includes(resolved.type);
  return (
    <div className={`cms-field ${grouped ? "cms-field-group" : ""}`}>
      {label && <label className="cms-field-label">{label}</label>}
      {resolved.help && <p className="cms-field-hint">{resolved.help}</p>}
      <FieldInput field={resolved} value={value} onChange={onChange} nameHint={resolved.key} />
    </div>
  );
};
