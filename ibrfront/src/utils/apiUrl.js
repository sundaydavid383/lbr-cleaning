// filepath: ibrfront/src/utils/apiUrl.js
export const apiUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const viteApiUrl = import.meta.env.VITE_API_URL;
  if (viteApiUrl) {
    const base = viteApiUrl.replace(/\/$/, "");
    return `${base}${cleanPath}`;
  }

  if (typeof window !== "undefined") {
    const { location } = window;
    const host = `${location.protocol}//${location.host}`;

    if (location.host.includes("vercel.app") || location.host.includes("onrender.com")) {
      const renderHost = `https://ibrback.onrender.com`;
      return `${renderHost}${cleanPath}`;
    }

    return `${host}${cleanPath}`;
  }

  return `http://localhost:5100${cleanPath}`;
};
