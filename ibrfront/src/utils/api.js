// Builds a full API URL regardless of whether VITE_API_URL ends with a
// slash or not (e.g. both "http://localhost:5100" and
// "http://localhost:5100/" work the same way).
export const apiUrl = (path) => {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

/**
 * Thin wrapper around fetch that always sends/expects JSON, and always
 * returns the parsed body (even on non-2xx) so callers can read
 * data.message from the backend's error responses.
 */
export const apiFetch = async (path, { method = "GET", body, token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(apiUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
};
