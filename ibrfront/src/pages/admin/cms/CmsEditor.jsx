// filepath: ibrfront/src/pages/admin/cms/CmsEditor.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/api";
import "./cms.css";
import CustomAlert from "../../../component/customAlert/CustomAlert";
import { CmsSkeleton } from "../../../component/pageSkeleton/PageSkeleton";

// ============================================================================
// Plain-language help text shown under the Type field. Purely presentational.
// ============================================================================
const TYPE_HELP = {
  text: "A short line of text, like a title or a name.",
  rich_text: "Text that can include formatting, like bold, links, or paragraphs.",
  array: "A list of items — like the 3 stat cards on the homepage, or a set of testimonials.",
  object: "A group of related fields — like one card with a title, description, and icon.",
  image: "A picture. Paste a web address (URL) that points to the image.",
  boolean: "A simple on/off switch.",
  number: "A plain number, with no letters or symbols.",
  json: "Raw structured data for advanced use. Only edit this if you're comfortable with JSON.",
};

// ============================================================================
// Smart Value Field
// ----------------------------------------------------------------------------
// This section ONLY changes what the "Value" input looks like. Whatever the
// person edits here is always turned back into the exact same kind of string
// that used to sit in the plain <textarea> (formData.value). handleSubmit,
// the JSON.parse / Number() / boolean logic, and the API call below are
// completely untouched — this just gives non-technical admins a form instead
// of raw JSON, with a "raw JSON" fallback still available for anyone who
// wants it (developers, or content shapes too unusual to auto-render).
// ============================================================================

const safeParseJSON = (str) => {
  try {
    return { ok: true, data: JSON.parse(str) };
  } catch {
    return { ok: false, data: null };
  }
};

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

const guessFieldKind = (val) => {
  if (typeof val === "number") return "number";
  if (typeof val === "boolean") return "boolean";
  return "text";
};

// One labeled input inside a card/object — e.g. "label", "value", "suffix"
const ObjectFieldRow = ({ fieldKey, value, onChange }) => {
  const kind = guessFieldKind(value);

  if (kind === "boolean") {
    return (
      <div className="cms-field">
        <label>{fieldKey}</label>
        <div className="cms-toggle-pair">
          <button type="button" className={value ? "active" : ""} onClick={() => onChange(true)}>Yes</button>
          <button type="button" className={!value ? "active" : ""} onClick={() => onChange(false)}>No</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cms-field">
      <label>{fieldKey}</label>
      <input
        type={kind === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) => onChange(kind === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
};

// A single object rendered as a small form (used standalone, and inside each
// card of an array of objects)
const StructuredObjectEditor = ({ data, onChange }) => (
  <div className="cms-structured-object">
    {Object.keys(data).map((k) => (
      <ObjectFieldRow
        key={k}
        fieldKey={k}
        value={data[k]}
        onChange={(newVal) => onChange({ ...data, [k]: newVal })}
      />
    ))}
  </div>
);

// A repeatable list — e.g. the 3 stat cards, a list of testimonials, FAQ items
const StructuredArrayEditor = ({ data, onChange }) => {
  const isObjectArray = data.length > 0 && data.every((item) => isPlainObject(item));

  if (isObjectArray) {
    const updateItem = (idx, newItem) => {
      const next = [...data];
      next[idx] = newItem;
      onChange(next);
    };
    const removeItem = (idx) => onChange(data.filter((_, i) => i !== idx));
    const addItem = () => {
      const template = data[0]
        ? Object.fromEntries(Object.keys(data[0]).map((k) => [k, guessFieldKind(data[0][k]) === "number" ? 0 : ""]))
        : { value: "" };
      onChange([...data, template]);
    };

    return (
      <div className="cms-structured-array">
        {data.map((item, idx) => (
          <div key={idx} className="cms-array-item-card">
            <div className="cms-array-item-header">
              <span>{item.label || item.title || item.name || `Item ${idx + 1}`}</span>
              <button type="button" className="cms-array-item-remove" onClick={() => removeItem(idx)} title="Remove this item">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            <StructuredObjectEditor data={item} onChange={(newItem) => updateItem(idx, newItem)} />
          </div>
        ))}
        <button type="button" className="cms-array-add" onClick={addItem}>
          <i className="fa-solid fa-plus"></i> Add Item
        </button>
      </div>
    );
  }

  // Array of simple values (e.g. a list of tags or names)
  const updatePrimitive = (idx, val) => {
    const next = [...data];
    next[idx] = val;
    onChange(next);
  };
  const removePrimitive = (idx) => onChange(data.filter((_, i) => i !== idx));
  const addPrimitive = () => onChange([...data, ""]);

  return (
    <div className="cms-structured-list">
      {data.map((val, idx) => (
        <div key={idx} className="cms-list-row">
          <input type="text" value={val ?? ""} onChange={(e) => updatePrimitive(idx, e.target.value)} />
          <button type="button" onClick={() => removePrimitive(idx)} title="Remove">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ))}
      <button type="button" className="cms-array-add" onClick={addPrimitive}>
        <i className="fa-solid fa-plus"></i> Add Item
      </button>
    </div>
  );
};

const RichTextField = ({ value, onChange }) => {
  const [preview, setPreview] = useState(false);
  return (
    <div>
      <div className="cms-richtext-toggle">
        <button type="button" className={!preview ? "active" : ""} onClick={() => setPreview(false)}>
          <i className="fa-solid fa-pen"></i> Edit
        </button>
        <button type="button" className={preview ? "active" : ""} onClick={() => setPreview(true)}>
          <i className="fa-solid fa-eye"></i> Preview
        </button>
      </div>
      {preview ? (
        <div className="cms-richtext-preview" dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder="Enter the content here..."
          required
        />
      )}
    </div>
  );
};

// The main switcher — decides which editor to show based on content type
const SmartValueField = ({ type, rawValue, onRawChange }) => {
  const [showRaw, setShowRaw] = useState(false);
  const parsed = safeParseJSON(rawValue);
  const canStructure = (type === "array" || type === "object") && parsed.ok;

  const handleStructuredChange = (newData) => {
    onRawChange(JSON.stringify(newData, null, 2));
  };

  if (type === "boolean") {
    const isYes = rawValue === "true";
    return (
      <div className="cms-toggle-pair cms-toggle-pair-lg">
        <button type="button" className={isYes ? "active" : ""} onClick={() => onRawChange("true")}>
          <i className="fa-solid fa-check"></i> Yes
        </button>
        <button type="button" className={!isYes ? "active" : ""} onClick={() => onRawChange("false")}>
          <i className="fa-solid fa-xmark"></i> No
        </button>
      </div>
    );
  }

  if (type === "number") {
    return <input type="number" value={rawValue} onChange={(e) => onRawChange(e.target.value)} placeholder="0" required />;
  }

  if (type === "image") {
    return (
      <div className="cms-image-field">
        <input
          type="text"
          value={rawValue}
          onChange={(e) => onRawChange(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          required
        />
        {rawValue && (
          <div className="cms-image-preview">
            <img src={rawValue} alt="Preview" onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        )}
      </div>
    );
  }

  if (type === "text") {
    return (
      <input
        type="text"
        value={rawValue}
        onChange={(e) => onRawChange(e.target.value)}
        placeholder="Enter the content here..."
        required
      />
    );
  }

  if (type === "rich_text") {
    return <RichTextField value={rawValue} onChange={onRawChange} />;
  }

  // array / object / json — structured field view, with raw JSON as a fallback
  if (canStructure && !showRaw) {
    return (
      <div className="cms-structured-wrap">
        {Array.isArray(parsed.data) ? (
          <StructuredArrayEditor data={parsed.data} onChange={handleStructuredChange} />
        ) : (
          <StructuredObjectEditor data={parsed.data} onChange={handleStructuredChange} />
        )}
        <button type="button" className="cms-raw-toggle" onClick={() => setShowRaw(true)}>
          <i className="fa-solid fa-code"></i> Edit as raw JSON instead
        </button>
      </div>
    );
  }

  return (
    <div className="cms-structured-wrap">
      <textarea
        value={rawValue}
        onChange={(e) => onRawChange(e.target.value)}
        rows={16}
        placeholder='{"key": "value"}'
        required
      />
      {(type === "array" || type === "object") && (
        <button type="button" className="cms-raw-toggle" onClick={() => setShowRaw(false)}>
          <i className="fa-solid fa-table-list"></i>{" "}
          {parsed.ok ? "Switch to easy field view" : "Fix the formatting to enable the easy field view"}
        </button>
      )}
    </div>
  );
};

// ============================================================================
// CmsEditor — same state, same handlers, same API calls as before.
// ============================================================================

const CmsEditor = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    key: "",
    type: "text",
    value: "",
    label: "",
    description: "",
    category: "",
    isPublic: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [activeTab, setActiveTab] = useState("edit");
   const fetchContent = async (contentKey) => {
    try {
      const token = localStorage.getItem("lbr_auth_token");
      const res = await fetch(apiUrl(`/api/cms/content/${encodeURIComponent(contentKey)}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const item = data.data;
        setFormData({
          key: item.key || "",
          type: item.type || "text",
          value: typeof item.value === "object" ? JSON.stringify(item.value, null, 2) : String(item.value || ""),
          label: item.label || "",
          description: item.description || "",
          category: item.category || "",
          isPublic: item.isPublic !== undefined ? item.isPublic : true,
        });
      }
    } catch (error) {
      showAlert("Failed to load content", "danger");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (key && key !== "new") {
      fetchContent(key);
    } else {
      setLoading(false);
    }
  }, [key]);

  if (loading) {
    return <CmsSkeleton />;
  }

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedValue = formData.value;
    if (formData.type === "array" || formData.type === "object" || formData.type === "json") {
      try {
        parsedValue = JSON.parse(formData.value);
      } catch {
        showAlert("Invalid JSON format", "danger");
        return;
      }
    } else if (formData.type === "number") {
      parsedValue = Number(formData.value);
      if (isNaN(parsedValue)) {
        showAlert("Please enter a valid number", "danger");
        return;
      }
    } else if (formData.type === "boolean") {
      parsedValue = formData.value === "true";
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("lbr_auth_token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/cms/content/${encodeURIComponent(formData.key)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          value: parsedValue,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showAlert("Content saved successfully!");
        navigate("/admin/cms");
      } else {
        showAlert(data.message || "Failed to save content", "danger");
      }
    } catch (error) {
      showAlert("Failed to save content", "danger");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="cms-editor">
        <div className="cms-loading">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  const isNewItem = !key || key === "new";
  const isStructuredType = formData.type === "array" || formData.type === "object" || formData.type === "json";
  const structuredParse = isStructuredType ? safeParseJSON(formData.value) : null;

  return (
    <div className="cms-editor">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      <div className="cms-editor-header">
        <div>
          <Link to="/admin/cms" className="cms-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to Content Library
          </Link>
          <h1>{isNewItem ? "Add New Content" : "Edit Content"}</h1>
          <p className="cms-editor-subtitle">
            {isNewItem
              ? "Fill in the details below to add a new piece of content to your website."
              : "Make your changes below, then save to update the live website."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="cms-editor-form">
        {/* Section 1 — the basics, in plain language */}
        <div className="cms-form-section">
          <div className="cms-form-section-title">
            <i className="fa-solid fa-circle-info"></i>
            <span>Basic Details</span>
          </div>

          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="label">Display Name</label>
              <input
                id="label"
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Homepage Welcome Message"
              />
              <small>The friendly name you'll see for this item in the list.</small>
            </div>

            <div className="cms-form-group">
              <label htmlFor="category">Section</label>
              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., homepage, services, about"
              />
              <small>Groups this item with related content in the library.</small>
            </div>
          </div>

          <div className="cms-form-group">
            <label htmlFor="description">Notes</label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A quick reminder of what this is used for"
            />
            <small>Optional — helpful for you or teammates later.</small>
          </div>

          <div className="cms-form-group cms-form-group-inline">
            <label className="cms-checkbox-label">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              />
              <span>
                Show this on the live website
                <small className="cms-inline-hint">Turn off to hide it from visitors without deleting it.</small>
              </span>
            </label>
          </div>
        </div>

        {/* Section 2 — the actual content, edited like a real form */}
        <div className="cms-form-section">
          <div className="cms-form-section-title">
            <i className="fa-solid fa-pen-nib"></i>
            <span>Content</span>
          </div>

          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="key">
                Content ID *
                {!isNewItem && <span className="cms-locked-hint"><i className="fa-solid fa-lock"></i> locked</span>}
              </label>
              <input
                id="key"
                type="text"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="e.g., home.hero_slides"
                required
                disabled={key && key !== "new"}
              />
              <small>
                {isNewItem
                  ? "A unique code used to find this item — no spaces, e.g. home.hero_slides."
                  : "This ID can't be changed once created, so nothing else on the site breaks."}
              </small>
            </div>

            <div className="cms-form-group">
              <label htmlFor="type">Content Type *</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="text">Text — a short line</option>
                <option value="rich_text">Formatted Text — with bold, links, etc.</option>
                <option value="array">List — multiple items</option>
                <option value="object">Group of Fields — structured data</option>
                <option value="image">Image — a picture link</option>
                <option value="boolean">Yes / No — a switch</option>
                <option value="number">Number</option>
                <option value="json">Advanced — raw data</option>
              </select>
              <small>{TYPE_HELP[formData.type]}</small>
            </div>
          </div>

          <div className="cms-form-group">
            <label>
              {formData.type === "image" ? "Image Link" : "Content"} *
              {isStructuredType && (
                <span className="cms-format-pill">
                  {structuredParse?.ok ? "Editable fields" : "Raw JSON"}
                </span>
              )}
            </label>
            <SmartValueField
              type={formData.type}
              rawValue={formData.value}
              onRawChange={(newVal) => setFormData({ ...formData, value: newVal })}
            />
            {isStructuredType && !structuredParse?.ok && (
              <small>
                <i className="fa-solid fa-triangle-exclamation"></i> This isn't valid JSON yet — check for matching brackets and quotes before saving.
              </small>
            )}
          </div>
        </div>

        <div className="cms-form-actions">
          <Link to="/admin/cms" className="cms-btn cms-btn-cancel">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn-save" disabled={saving}>
            {saving ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Saving...</>
            ) : (
              <><i className="fa-solid fa-check"></i> Save Content</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CmsEditor;