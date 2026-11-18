import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCms } from "../hooks/useCmsContent";

// Gives every page its own browser-tab title and "real address" for Google,
// and keeps private pages (dashboard, admin, payment) out of search results.
const TITLES = {
  "/": "Professional House & Office Cleaning",
  "/service": "Our Cleaning Services & Prices",
  "/our-services": "What We Offer",
  "/about": "About Us",
  "/information": "Information Hub",
  "/blog": "Cleaning Tips & News",
  "/contact": "Contact Us",
  "/apply": "Book a Cleaning",
  "/login": "Sign In",
  "/signup": "Create an Account",
  "/payment": "Payment",
};

const PRIVATE = /^\/(admin|dashboard|payment|portal|notify)(\/|$)/;

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const PageMeta = () => {
  const { pathname } = useLocation();
  const siteName = useCms("site.name", "LBR Cleaning Services");

  useEffect(() => {
    const page = TITLES[pathname] || (pathname.startsWith("/services/") ? "Service Details" : pathname.startsWith("/dashboard") ? "My Dashboard" : pathname.startsWith("/admin") ? "Admin" : null);
    document.title = page ? `${page} | ${siteName}` : siteName;

    const url = `${window.location.origin}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:url"]', "content", url);
    setMeta('meta[name="robots"]', "content", PRIVATE.test(pathname) ? "noindex, nofollow" : "index, follow");
  }, [pathname, siteName]);

  return null;
};

export default PageMeta;
