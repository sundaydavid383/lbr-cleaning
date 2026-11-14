import { useEffect, useSyncExternalStore, useCallback, useRef } from "react";
import {
  subscribe,
  getVersion,
  loadAll,
  isReady,
  getStatus,
  getValue,
  getCategoryMap,
  getAllItems,
  hasKey,
} from "../services/cmsStore";

// Re-renders the calling component whenever any CMS content changes
// (initial load, or an admin saving an edit).
const useStoreVersion = () => {
  const v = useSyncExternalStore(subscribe, getVersion, getVersion);
  useEffect(() => {
    loadAll();
  }, []);
  return v;
};

const useRefresh = () =>
  useCallback(async () => {
    await loadAll(true);
  }, []);

// Returns the value for a key directly. The simplest hook for new code:
//   const title = useCms("about.heading", "About Us");
export const useCms = (key, fallback) => {
  useStoreVersion();
  return getValue(key, fallback);
};

export const useCmsReady = () => {
  useStoreVersion();
  return isReady();
};

export const useCmsContent = (key, fallback = null) => {
  useStoreVersion();
  const refresh = useRefresh();
  const ready = isReady();
  return {
    value: getValue(key, fallback),
    loading: !ready && !hasKey(key),
    error: getStatus() === "error" ? new Error("Could not load content") : null,
    refresh,
  };
};

export const useCmsCategory = (category, fallback = {}) => {
  useStoreVersion();
  const refresh = useRefresh();
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  const data = getCategoryMap(category);
  const currentFallback = fallbackRef.current;
  let value;

  if (Array.isArray(currentFallback)) {
    const vals = Object.values(data);
    value = vals.length === 1 && Array.isArray(vals[0]) ? vals[0] : currentFallback;
  } else {
    value = { ...currentFallback, ...data };
  }

  return {
    value,
    loading: !isReady(),
    error: getStatus() === "error" ? new Error("Could not load content") : null,
    refresh,
  };
};

export const useAllCmsContent = (fallback = {}) => {
  useStoreVersion();
  const refresh = useRefresh();
  const result = { ...fallback };
  getAllItems().forEach((it) => {
    const parts = it.key.split(".");
    result[parts[parts.length - 1]] = it.value;
  });
  return { value: result, loading: !isReady(), refresh };
};
