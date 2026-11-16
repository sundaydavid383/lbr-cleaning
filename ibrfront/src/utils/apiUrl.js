// filepath: ibrfront/src/utils/apiUrl.js
export const apiUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // In Vite dev mode, route API requests through the dev-server proxy as
  // same-origin relative URLs. This sidesteps CORS entirely, so it works no
  // matter which host/IP:port the dev UI is opened on (localhost, 127.0.0.1,
  // or a LAN "Network" URL).
  if (import.meta.env.DEV) {
    return cleanPath;
  }

  // 1. Explicit VITE_API_URL from env (works in dev & build)
  const viteApiUrl = import.meta.env.VITE_API_URL;
  if (viteApiUrl && viteApiUrl.trim() !== "") {
    const base = viteApiUrl.replace(/\/$/, "");
    return `${base}${cleanPath}`;
  }

  // 2. Fallback: derive from current window location
  if (typeof window !== "undefined") {
    const { host } = window.location;

    // If running on Vercel, point to the Render backend
    if (host.includes("vercel.app")) {
      return `https://lbr-cleaning.onrender.com${cleanPath}`;
    }

    // If running on Render
    if (host.includes("onrender.com")) {
      return `https://lbr-cleaning.onrender.com${cleanPath}`;
    }

    // Local dev
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return `http://localhost:5100${cleanPath}`;
    }

    // Default to Render backend
    return `https://lbr-cleaning.onrender.com${cleanPath}`;
  }

  // 3. SSR/build-time default
  return `https://lbr-cleaning.onrender.com${cleanPath}`;
};