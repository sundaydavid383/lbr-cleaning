// Shared definitions for editing services.

export const slugify = (text) =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// The address of a service's own page: /services/<slug>
export const serviceSlug = (card) => (card?.id ? String(card.id) : slugify(card?.title));

export const SERVICE_CARD_FIELDS = [
  { key: "title", type: "text", label: "Service name" },
  { key: "image", type: "image", label: "Picture" },
  { key: "icon", type: "icon", label: "Icon" },
  {
    key: "details",
    type: "list",
    label: "Short points shown on the card",
    itemLabel: "point",
    help: "The first two are shown on the Services page.",
  },
  {
    key: "id",
    type: "text",
    label: "Page address",
    help: "Used in the link: yoursite.com/services/<this>. Use lowercase words joined with dashes. Changing it later breaks old links and disconnects the service's page content.",
  },
];

export const newServiceCard = () => ({
  title: "New Service",
  image: "",
  icon: "fa-solid fa-broom",
  details: ["What this service includes", "Another highlight"],
  id: `new-service-${Date.now().toString(36).slice(-4)}`,
});
