// filepath: ibrfront/src/utils/apiUrl.js
export const apiUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // 1. Explicit VITE_API_URL from env (works in dev & build)
  const viteApiUrl = import.meta.env.VITE_API_URL;
  if (viteApiUrl) {
    const base = viteApiUrl.replace(/\/$/, "");
    return `${base}${cleanPath}`;
  }

  // 2. Fallback: derive from current window location
  if (typeof window !== "undefined") {
    const { host } = window.location;

    // If running on Vercel, point to the Render backend
    if (host.includes("vercel.app")) {
      return `https://ibrback.onrender.com${cleanPath}`;
    }

    // If running on Render's frontend (unlikely but handle it)
    if (host.includes("onrender.com")) {
      // Assume same domain serves both, or use a known backend URL
      return `${window.location.origin}${cleanPath}`;
    }

    // Local dev: same host works because Vite proxies, or use localhost:5100
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return `http://localhost:5100${cleanPath}`;
    }

    // Default: assume same origin
    return `${window.location.origin}${cleanPath}`;
  }

  // 3. SSR/build-time default
  return `http://localhost:5100${cleanPath}`;
};