// filepath: ibrfront/src/utils/apiUrl.js
export const apiUrl = (path) => {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
