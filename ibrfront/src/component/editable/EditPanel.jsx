// The Shopify-style side panel used for every edit.
//
// Opened through openPanel(config) from EditModeContext:
//   {
//     cmsKey,        // content item to change, e.g. "about_page.intro"
//     path,          // optional field inside it, e.g. "paragraphs.0"
//     root,          // value to use for the whole item if it isn't saved yet
//     value,         // current value at `path` (what the page is showing)
//     field,         // optional field description (see fields.jsx)
//     title, help,   // shown at the top of the panel
//   }
// While typing, the page shows a live preview. Nothing is saved until
// "Save" is pressed; "Cancel" throws the changes away.

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useEditMode } from "../../context/EditModeContext";
import { getSavedValue, getIn, setIn, setPreview, clearPreview } from "../../services/cmsStore";
import { FieldInput, inferField, humanize } from "./fields";
import "./editPanel.css";

const PanelBody = ({ config, onClose }) => {
  const { saveAt, saveStatus, lastError } = useEditMode();
  const { cmsKey, path, root, field: givenField, title, help } = config;

  const initial = useMemo(() => {
    const saved = getIn(getSavedValue(cmsKey, root), path);
    const v = saved !== undefined && saved !== null ? saved : config.value;
    return v === undefined ? "" : structuredClone(v);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmsKey, path]);

  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);

  const field = useMemo(() => {
    const lastName = path ? String(path).split(".").pop() : cmsKey.split(".").pop();
    const base = givenField || inferField(initial, /^\d+$/.test(lastName) ? "" : lastName);
    return base;
  }, [givenField, initial, path, cmsKey]);

  // Live preview on the page while typing.
  useEffect(() => {
    if (!dirty) {
      clearPreview(cmsKey);
      return;
    }
    const baseRoot = getSavedValue(cmsKey, root);
    setPreview(cmsKey, path ? setIn(baseRoot ?? {}, path, draft) : draft);
  }, [draft, dirty, cmsKey, path, root]);

  useEffect(() => () => clearPreview(cmsKey), [cmsKey]);

  const close = useCallback(
    (force = false) => {
      if (!force && dirty && !window.confirm("You have unsaved changes. Close without saving?")) return;
      clearPreview(cmsKey);
      onClose();
    },
    [dirty, cmsKey, onClose]
  );

  const save = async () => {
    if (!dirty) {
      close(true);
      return;
    }
    setSaving(true);
    const ok = await saveAt(cmsKey, path, typeof draft === "string" ? draft.trim() : draft, root);
    setSaving(false);
    if (ok) close(true);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const heading = title || field.label || humanize(String(path || cmsKey).split(".").pop());

  return (
    <aside className="cms-panel" role="dialog" aria-label={`Edit ${heading}`}>
      <header className="cms-panel-head">
        <div>
          <span className="cms-panel-kicker">
            <i className="fa-solid fa-pen"></i> Editing
          </span>
          <h3>{heading}</h3>
        </div>
        <button type="button" className="cms-panel-close" onClick={() => close()} aria-label="Close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>

      <div className="cms-panel-body">
        {help && <p className="cms-panel-help">{help}</p>}
        {dirty && (
          <p className="cms-panel-preview-note">
            <i className="fa-regular fa-eye"></i> You're seeing a preview on the page. Press <strong>Save</strong> to make it live.
          </p>
        )}
        <FieldInput field={field} value={draft} onChange={setDraft} nameHint={cmsKey} />
        {saveStatus === "error" && lastError && <p className="cms-field-error">{lastError}</p>}
      </div>

      <footer className="cms-panel-foot">
        <button type="button" className="cms-btn ghost" onClick={() => close()} disabled={saving}>
          Cancel
        </button>
        <button type="button" className="cms-btn primary" onClick={save} disabled={saving || !dirty}>
          {saving ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Saving…
            </>
          ) : (
            "Save"
          )}
        </button>
      </footer>
    </aside>
  );
};

// Several separate content items in one form, e.g. business details:
//   openPanel({ title, help, multi: [{ cmsKey, root, field: { type, label } }, …] })
const MultiPanelBody = ({ config, onClose }) => {
  const { saveField, saveStatus, lastError } = useEditMode();
  const entries = config.multi;

  const initial = useMemo(
    () =>
      entries.map((e) => {
        const v = getSavedValue(e.cmsKey, e.root);
        return v === undefined || v === null ? (e.field?.type === "boolean" ? false : "") : structuredClone(v);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const changed = entries.map((_, i) => JSON.stringify(draft[i]) !== JSON.stringify(initial[i]));
  const dirty = changed.some(Boolean);

  useEffect(() => {
    entries.forEach((e, i) => (changed[i] ? setPreview(e.cmsKey, draft[i]) : clearPreview(e.cmsKey)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  useEffect(() => () => entries.forEach((e) => clearPreview(e.cmsKey)), [entries]);

  const close = (force = false) => {
    if (!force && dirty && !window.confirm("You have unsaved changes. Close without saving?")) return;
    entries.forEach((e) => clearPreview(e.cmsKey));
    onClose();
  };

  const save = async () => {
    setSaving(true);
    let ok = true;
    for (let i = 0; i < entries.length; i++) {
      if (!changed[i]) continue;
      const v = typeof draft[i] === "string" ? draft[i].trim() : draft[i];
      // eslint-disable-next-line no-await-in-loop
      ok = (await saveField(entries[i].cmsKey, v, entries[i].type)) && ok;
    }
    setSaving(false);
    if (ok) close(true);
  };

  return (
    <aside className="cms-panel" role="dialog" aria-label={config.title}>
      <header className="cms-panel-head">
        <div>
          <span className="cms-panel-kicker">
            <i className="fa-solid fa-pen"></i> Editing
          </span>
          <h3>{config.title}</h3>
        </div>
        <button type="button" className="cms-panel-close" onClick={() => close()} aria-label="Close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>
      <div className="cms-panel-body">
        {config.help && <p className="cms-panel-help">{config.help}</p>}
        {entries.map((e, i) => (
          <div className="cms-field" key={e.cmsKey}>
            {e.field?.label && <label className="cms-field-label">{e.field.label}</label>}
            {e.field?.help && <p className="cms-field-hint">{e.field.help}</p>}
            <FieldInput
              field={e.field || { type: "text" }}
              value={draft[i]}
              nameHint={e.cmsKey}
              onChange={(v) => setDraft((d) => d.map((x, j) => (j === i ? v : x)))}
            />
          </div>
        ))}
        {saveStatus === "error" && lastError && <p className="cms-field-error">{lastError}</p>}
      </div>
      <footer className="cms-panel-foot">
        <button type="button" className="cms-btn ghost" onClick={() => close()} disabled={saving}>
          Cancel
        </button>
        <button type="button" className="cms-btn primary" onClick={save} disabled={saving || !dirty}>
          {saving ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Saving…
            </>
          ) : (
            "Save"
          )}
        </button>
      </footer>
    </aside>
  );
};

const EditPanel = () => {
  const { panel, closePanel, isEditMode } = useEditMode();
  const open = !!panel && isEditMode;
  useEffect(() => {
    document.body.classList.toggle("cms-panel-open", open);
    return () => document.body.classList.remove("cms-panel-open");
  }, [open]);
  if (!open) return null;
  // key forces a fresh form whenever a different thing is opened
  return (
    <>
      <div className="cms-panel-backdrop" onClick={() => document.querySelector(".cms-panel-close")?.click()} />
      {panel.multi ? (
        <MultiPanelBody key={`multi|${panel.openedAt ?? ""}`} config={panel} onClose={closePanel} />
      ) : (
        <PanelBody key={`${panel.cmsKey}|${panel.path ?? ""}|${panel.openedAt ?? ""}`} config={panel} onClose={closePanel} />
      )}
    </>
  );
};

export default EditPanel;
