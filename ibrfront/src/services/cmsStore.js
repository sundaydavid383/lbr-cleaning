// Central CMS content store.
//
// All public content is loaded with ONE request (/api/cms/content) and kept
// in memory. Every component reads from here through the hooks in
// hooks/useCmsContent.js, so when an admin saves an edit the store is
// updated and every place showing that content re-renders instantly —
// no page reloads.
//
// A copy is kept in localStorage so returning visitors see content
// immediately while fresh content loads in the background.

import { apiUrl } from "../utils/apiUrl";

const LS_KEY = "lbr_cms_store_v2";

const items = new Map(); // key -> { key, type, value, category, label, ... }
const listeners = new Set();
let status = "idle"; // idle | loading | ready | error
let version = 0;
let loadPromise = null;

const emit = () => {
  version += 1;
  listeners.forEach((fn) => fn());
};

const persist = () => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify([...items.values()]));
  } catch {
    // storage full or unavailable — the store still works in memory
  }
};

// Hydrate from the last visit so the first paint already has content.
try {
  const cached = JSON.parse(localStorage.getItem(LS_KEY) || "null");
  if (Array.isArray(cached)) {
    cached.forEach((it) => it?.key && items.set(it.key, it));
  }
} catch {
  // ignore broken cache
}

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const getVersion = () => version;
export const getStatus = () => status;
export const isReady = () => status === "ready" || items.size > 0;

export const loadAll = (force = false) => {
  if (loadPromise && !force) return loadPromise;
  status = items.size > 0 ? "ready" : "loading";
  loadPromise = fetch(apiUrl("/api/cms/content"))
    .then((res) => res.json())
    .then((json) => {
      if (!json?.success || !Array.isArray(json.data)) throw new Error("Bad CMS response");
      items.clear();
      json.data.forEach((it) => items.set(it.key, it));
      status = "ready";
      persist();
      emit();
    })
    .catch((err) => {
      console.error("[CMS-STORE] load failed:", err);
      status = items.size > 0 ? "ready" : "error";
      loadPromise = null; // allow a retry later
      emit();
    });
  return loadPromise;
};

export const hasKey = (key) => items.has(key);
export const getItem = (key) => items.get(key) || null;
export const getAllItems = () => [...items.values()];

// Unsaved values shown while an admin is typing in the edit panel
// (live preview). Cleared on save or cancel.
const previews = new Map();

export const setPreview = (key, value) => {
  previews.set(key, value);
  emit();
};

export const clearPreview = (key) => {
  if (previews.delete(key)) emit();
};

export const getValue = (key, fallback) => {
  if (previews.has(key)) return previews.get(key);
  const it = items.get(key);
  return it && it.value !== null && it.value !== undefined ? it.value : fallback;
};

// The saved value only, ignoring any live preview.
export const getSavedValue = (key, fallback) => {
  const it = items.get(key);
  return it && it.value !== null && it.value !== undefined ? it.value : fallback;
};

const lastSegment = (key) => {
  const parts = key.split(".");
  return parts[parts.length - 1];
};

// Same shape the old API returned: { <last key segment>: value }
export const getCategoryMap = (category) => {
  const result = {};
  for (const it of items.values()) {
    if (it.category === category) result[lastSegment(it.key)] = it.value;
  }
  return result;
};

// Best guess for the category of a brand-new key: whatever category the
// other keys with the same prefix already use (e.g. "home." -> "homepage").
export const guessCategory = (key) => {
  const prefix = key.split(".")[0];
  const counts = {};
  for (const it of items.values()) {
    if (it.key.split(".")[0] === prefix && it.category) {
      counts[it.category] = (counts[it.category] || 0) + 1;
    }
  }
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return best ? best[0] : prefix;
};

export const setItem = (item) => {
  if (!item?.key) return;
  items.set(item.key, { ...(items.get(item.key) || {}), ...item });
  persist();
  emit();
};

export const removeItem = (key) => {
  items.delete(key);
  persist();
  emit();
};

export const clearCache = () => {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
};

// ---- Path helpers -------------------------------------------------------
// Paths address a field inside an object/array value, e.g.
// "paragraphs.0" or "faqs.2.answer". Arrays are addressed by index.

const toParts = (path) =>
  path === undefined || path === null || path === ""
    ? []
    : String(path).split(".").filter((p) => p !== "");

export const getIn = (obj, path) => {
  let cur = obj;
  for (const p of toParts(path)) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[p];
  }
  return cur;
};

// Immutable set — returns a new object/array with the value replaced.
export const setIn = (obj, path, value) => {
  const parts = toParts(path);
  if (parts.length === 0) return value;
  const [head, ...rest] = parts;
  const isIndex = /^\d+$/.test(head);
  const base =
    obj !== null && typeof obj === "object" ? obj : isIndex ? [] : {};
  const clone = Array.isArray(base) ? [...base] : { ...base };
  clone[head] = setIn(base[head], rest.join("."), value);
  return clone;
};
