import { apiFetch } from "../utils/api";

const CACHE_KEY = "lbr_cms_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// 1. In-memory cache store
const contentCache = new Map();

// 2. Helper function to clean up CMS keys (e.g., "about_us.title" -> "title")
const fieldNameFromKey = (key) => {
  if (!key) return "";
  const parts = key.split(".");
  return parts[parts.length - 1];
};

// 3. Exported function to fetch a single content item by key
export const getContent = async (key) => {
  if (contentCache.has(key)) {
    return contentCache.get(key);
  }

  try {
    const { ok, data } = await apiFetch(`/api/cms/content/${encodeURIComponent(key)}`);

    if (ok && data?.success && data?.data) {
      contentCache.set(key, data.data.value);
      return data.data.value;
    }

    return null;
  } catch (err) {
    console.error(`[CMS-CLIENT] getContent: ${key} | error:`, err);
    return null;
  }
};

// 4. Exported function to fetch content by category.
// Always maps every item in the category to { <lastKeySegment>: value },
// regardless of how many items the category has. Previously a category
// with exactly one key (e.g. "blog" -> blog.articles, or "about_timeline"
// -> about_timeline.milestones) returned the raw value instead of
// { articles: [...] } / { milestones: [...] }, which silently broke every
// component reading category.articles / category.milestones etc.
export const getContentByCategory = async (category) => {
  const cacheKey = `category:${category}`;

  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  try {
    const { ok, data } = await apiFetch(`/api/cms/content/category/${encodeURIComponent(category)}`);

    if (ok && data?.success && Array.isArray(data?.data)) {
      const result = {};
      data.data.forEach((item) => {
        const field = fieldNameFromKey(item.key);
        result[field] = item.value;
      });

      contentCache.set(cacheKey, result);
      return result;
    }

    return {};
  } catch (err) {
    console.error(`[CMS-CLIENT] getContentByCategory: ${category} | error:`, err);
    return {};
  }
};

// 5. Fetch all public content
export const getAllPublicContent = async () => {
  try {
    const { ok, data } = await apiFetch("/api/cms/content");
    if (ok && data?.success && Array.isArray(data?.data)) {
      const result = {};
      data.data.forEach((item) => {
        result[fieldNameFromKey(item.key)] = item.value;
      });
      return result;
    }
    return {};
  } catch {
    return {};
  }
};

// 6. Cache Invalidation
export const invalidateCache = () => {
  contentCache.clear();
  if (typeof window !== "undefined") {
    localStorage.removeItem(CACHE_KEY);
  }
};

// 7. Prefetch multiple keys into cache
export const prefetchContent = async (keys) => {
  const promises = keys.map((key) => getContent(key));
  await Promise.all(promises);
};