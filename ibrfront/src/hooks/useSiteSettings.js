import { useCms } from "./useCmsContent";
import { SITE_CONFIG, WHATSAPP_NUMBER } from "../config/site";

// Business details used all over the site. Editable by admins through
// "Business info" in the editor toolbar; falls back to config/site.js.
export const SITE_SETTINGS_FIELDS = [
  { cmsKey: "site.name", root: SITE_CONFIG.name, field: { type: "text", label: "Business name" } },
  { cmsKey: "site.tagline", root: SITE_CONFIG.tagline, field: { type: "text", label: "Tagline" } },
  { cmsKey: "site.logo", root: "/house-cleaning.png", field: { type: "image", label: "Logo" } },
  { cmsKey: "site.phone", root: SITE_CONFIG.phone, field: { type: "text", label: "Phone number" } },
  {
    cmsKey: "site.whatsapp",
    root: WHATSAPP_NUMBER,
    field: { type: "text", label: "WhatsApp number", help: "Country code + number, digits only, e.g. 2348012345678" },
  },
  { cmsKey: "site.email", root: SITE_CONFIG.email, field: { type: "text", label: "Email address" } },
  { cmsKey: "site.address", root: SITE_CONFIG.address, field: { type: "textarea", label: "Address" } },
  { cmsKey: "site.hours", root: "", field: { type: "text", label: "Opening hours (short)", help: "e.g. Mon–Sat, 8am – 7pm" } },
];

export const openSiteSettings = (openPanel) =>
  openPanel({
    title: "Business info",
    help: "These details are used across the whole website — header, footer, contact page and buttons.",
    multi: SITE_SETTINGS_FIELDS,
    openedAt: Date.now(),
  });

const digits = (v) => String(v || "").replace(/[^\d]/g, "");

export const useSiteSettings = () => {
  const name = useCms("site.name", SITE_CONFIG.name);
  const tagline = useCms("site.tagline", SITE_CONFIG.tagline);
  const logo = useCms("site.logo", "/house-cleaning.png");
  const phone = useCms("site.phone", SITE_CONFIG.phone);
  const whatsapp = useCms("site.whatsapp", WHATSAPP_NUMBER);
  const email = useCms("site.email", SITE_CONFIG.email);
  const address = useCms("site.address", SITE_CONFIG.address);
  const hours = useCms("site.hours", "");

  return {
    name: name || SITE_CONFIG.name,
    tagline,
    logo: logo || "/house-cleaning.png",
    phone: phone || SITE_CONFIG.phone,
    phoneHref: `tel:${String(phone || SITE_CONFIG.phone).replace(/[^\d+]/g, "")}`,
    whatsapp: digits(whatsapp) || WHATSAPP_NUMBER,
    whatsappHref: `https://wa.me/${digits(whatsapp) || WHATSAPP_NUMBER}`,
    email: email || SITE_CONFIG.email,
    address: address || SITE_CONFIG.address,
    hours,
  };
};
