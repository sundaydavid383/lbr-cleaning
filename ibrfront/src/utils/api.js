// Builds a full API URL regardless of whether VITE_API_URL ends with a
// slash or not (e.g. both "http://localhost:5100" and
// "http://localhost:5100/" work the same way).
import { apiUrl } from "./apiUrl";
import { transformApiError } from "./apiErrors";
import { showError, showInfo } from "../component/toast/useToast";

export { apiUrl };

// The backend runs on Render's free plan, which goes to sleep after ~15 min
// with no visitors and takes 30–60 s to wake up. So we wait long enough and
// retry a few times before telling the visitor anything is wrong.
const DEFAULT_TIMEOUT_MS = 60000;
const RETRY_DELAYS_MS = [3000, 6000, 10000];
const WAKING_STATUSES = [502, 503, 504];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wakeNoticeShown = false;
const noteWaking = () => {
  if (wakeNoticeShown) return;
  wakeNoticeShown = true;
  showInfo("Connecting to the server — this can take up to a minute the first time…");
  setTimeout(() => (wakeNoticeShown = false), 60000);
};

// Ping the server as soon as the site opens so it starts waking up early.
let wakePromise = null;
export const wakeServer = () => {
  if (!wakePromise) {
    wakePromise = fetch(apiUrl("/"), { cache: "no-store" }).catch(() => null);
  }
  return wakePromise;
};

const attempt = async (url, init, timeoutMs) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

export const apiFetch = async (path, { method = "GET", body, token, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = apiUrl(path);
  const init = { method, headers, body: body ? JSON.stringify(body) : undefined };
  const isRead = method === "GET";

  let lastError = null;
  for (let i = 0; i <= RETRY_DELAYS_MS.length; i++) {
    try {
      const res = await attempt(url, init, timeoutMs);

      // Render answers 502/503/504 while the server is still starting.
      if (WAKING_STATUSES.includes(res.status) && i < RETRY_DELAYS_MS.length) {
        noteWaking();
        await sleep(RETRY_DELAYS_MS[i]);
        continue;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage = data?.message || data?.error || JSON.stringify(data).slice(0, 500) || "Request failed";
        console.error(`[API-FETCH] ${method} ${url} failed | status=${res.status} | response=${errorMessage}`);
        showError(transformApiError({ status: res.status, data }));
      }

      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      lastError = err;
      const timedOut = err.name === "AbortError";
      console.error(`[API-FETCH] ${method} ${url} | ${timedOut ? `TIMEOUT after ${timeoutMs}ms` : "NETWORK ERROR"}`, err);

      // A plain "couldn't connect" error means the request never reached the
      // server, so it's safe to try again even for bookings and sign-ups.
      // After a timeout we only retry reads, so nothing gets submitted twice.
      const canRetry = i < RETRY_DELAYS_MS.length && (isRead || !timedOut) && navigator.onLine !== false;
      if (!canRetry) break;
      noteWaking();
      await sleep(RETRY_DELAYS_MS[i]);
    }
  }

  const timedOut = lastError?.name === "AbortError";
  const friendly = transformApiError({ status: timedOut ? 408 : 0, message: timedOut ? "timeout" : lastError?.message });
  showError(friendly);
  return { ok: false, status: 0, data: { success: false, message: friendly } };
};
