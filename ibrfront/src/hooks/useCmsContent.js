import { useState, useEffect, useCallback, useRef } from "react";
import { getContent, getContentByCategory, getAllPublicContent, invalidateCache } from "../services/contentService";

export const useCmsContent = (key, fallback = null) => {
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // `fallback` is almost always passed as a fresh literal (e.g. `useCmsContent("x", {})`)
  // on every render. Keeping it in the effect's dependency array below would make the
  // effect re-run every render -> setLoading -> re-render -> forever. A ref lets the
  // effect always read the *current* fallback without depending on its identity.
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await getContent(key);
        if (mounted) {
          setValue(data ?? fallbackRef.current);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setValue(fallbackRef.current);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const refresh = useCallback(async () => {
    invalidateCache();
    const data = await getContent(key);
    setValue(data ?? fallbackRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { value, loading, error, refresh };
};

export const useCmsCategory = (category, fallback = {}) => {
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  const mergeWithFallback = (data) => {
    const currentFallback = fallbackRef.current;
    if (Array.isArray(currentFallback)) {
      if (Array.isArray(data)) {
        return data;
      }
      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        Object.keys(data).length === 1 &&
        Array.isArray(Object.values(data)[0])
      ) {
        return Object.values(data)[0];
      }
      return currentFallback;
    }
    return { ...currentFallback, ...data };
  };

  useEffect(() => {
    let mounted = true;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        console.log(`[CMS-HOOK] useCmsCategory START | category=${category}`);
        const data = await getContentByCategory(category);
        console.log(`[CMS-HOOK] useCmsCategory RESULT | category=${category} | dataType=${typeof data} | keys=${Array.isArray(data) ? 'array' : Object.keys(data)}`);
        if (mounted) {
          const merged = mergeWithFallback(data);
          console.log(`[CMS-HOOK] useCmsCategory SET | category=${category} | mergedKeys=${Array.isArray(merged) ? `array[${merged.length}]` : Object.keys(merged)}`);
          setValue(merged);
          setError(null);
        }
      } catch (err) {
        console.error(`[CMS-HOOK] useCmsCategory ERROR | category=${category}`, err);
        if (mounted) {
          setError(err);
          setValue(fallbackRef.current);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategory();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const refresh = useCallback(async () => {
    invalidateCache();
    const data = await getContentByCategory(category);
    setValue(mergeWithFallback(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return { value, loading, error, refresh };
};

export const useAllCmsContent = (fallback = {}) => {
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);

  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await getAllPublicContent();
        if (mounted) {
          setValue({ ...fallbackRef.current, ...data });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(async () => {
    invalidateCache();
    const data = await getAllPublicContent();
    setValue({ ...fallbackRef.current, ...data });
  }, []);

  return { value, loading, refresh };
};