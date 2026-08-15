// Builds a full API URL regardless of whether VITE_API_URL ends with a
// slash or not (e.g. both "http://localhost:5100" and
// "http://localhost:5100/" work the same way).
export const apiUrl = (path) => {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

const DEFAULT_TIMEOUT_MS = 15000;

/**
 * Thin wrapper around fetch that always sends/expects JSON, and always
 * returns the parsed body (even on non-2xx) so callers can read
 * data.message from the backend's error responses.
 *
 * Bounded by a client-side timeout (AbortController) so a hung or
 * unreachable backend fails fast with a clear message instead of leaving
 * the caller (and the UI) waiting indefinitely with no explanation.
 */
export const apiFetch = async (path, { method = "GET", body, token, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = apiUrl(path);
  console.log(`[API] ${method} ${url}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));
    console.log(`[API] ${method} ${url} | status=${res.status} | ok=${res.ok}`);

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    if (err.name === "AbortError") {
      console.error(`[API] ${method} ${url} | TIMED OUT after ${timeoutMs}ms`);
      return {
        ok: false,
        status: 0,
        data: { success: false, message: "The server took too long to respond. Please check your connection and try again." },
      };
    }

    console.error(`[API] ${method} ${url} | network error:`, err);
    return {
      ok: false,
      status: 0,
      data: { success: false, message: "Could not reach the server. Please check your connection and try again." },
    };
  } finally {
    clearTimeout(timeoutId);
  }
};