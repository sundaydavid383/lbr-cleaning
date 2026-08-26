// Builds a full API URL regardless of whether VITE_API_URL ends with a
// slash or not (e.g. both "http://localhost:5100" and
// "http://localhost:5100/" work the same way).
import { apiUrl } from "./apiUrl";
import { transformApiError } from "./apiErrors";
import { showError } from "../component/toast/useToast";

export { apiUrl };

const DEFAULT_TIMEOUT_MS = 15000;

export const apiFetch = async (path, { method = "GET", body, token, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = apiUrl(path);

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

    if (!res.ok) {
      const friendly = transformApiError({ status: res.status, data });
      showError(friendly);
    }

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    if (err.name === "AbortError") {
      console.error(`[API] ${method} ${url} | TIMED OUT after ${timeoutMs}ms`);
      const friendly = transformApiError({ status: 0, message: "timeout" });
      showError(friendly);
      return {
        ok: false,
        status: 0,
        data: { success: false, message: friendly },
      };
    }

    console.error(`[API] ${method} ${url} | network error:`, err);
    const friendly = transformApiError({ status: 0, message: err.message });
    showError(friendly);
    return {
      ok: false,
      status: 0,
      data: { success: false, message: friendly },
    };
  } finally {
    clearTimeout(timeoutId);
  }
};