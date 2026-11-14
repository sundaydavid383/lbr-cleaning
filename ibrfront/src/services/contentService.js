// Thin compatibility layer over the central CMS store (cmsStore.js).
import {
  loadAll,
  getValue,
  getCategoryMap,
  getAllItems,
  hasKey,
  clearCache,
} from "./cmsStore";

export const getContent = async (key) => {
  await loadAll();
  return hasKey(key) ? getValue(key, null) : null;
};

export const getContentByCategory = async (category) => {
  await loadAll();
  return getCategoryMap(category);
};

export const getAllPublicContent = async () => {
  await loadAll();
  const result = {};
  getAllItems().forEach((it) => {
    const parts = it.key.split(".");
    result[parts[parts.length - 1]] = it.value;
  });
  return result;
};

// Forces the next read to fetch fresh content from the server.
export const invalidateCache = () => {
  clearCache();
  loadAll(true);
};

export const prefetchContent = async () => {
  await loadAll();
};
