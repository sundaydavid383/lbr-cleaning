import React from "react";

export const HIGHLIGHT_HELP = "Tip: put *stars* around words to show them in the highlight colour, e.g. The *Smarter* Way to Clean.";

// Turns "The *Smarter* Way" into: The <span class="highlight">Smarter</span> Way
export const highlight = (text, className = "highlight") => {
  if (typeof text !== "string" || !text.includes("*")) return text;
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <span key={i} className={className}>
        {part.slice(1, -1)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

export const RICH_HELP = "Tip: put **double stars** around words to make them bold.";

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Safe light formatting for admin-written text: **bold**, *highlight*,
// plus the old <strong>/<em>/<br> tags already in the content. Anything
// else is shown as plain text, so no scripts or styles can be injected.
export const richTextHtml = (text) => {
  if (typeof text !== "string") return "";
  let html = escapeHtml(text);
  html = html
    .replace(/&lt;(\/?)(strong|b|em|i)&gt;/gi, "<$1$2>")
    .replace(/&lt;br\s*\/?&gt;/gi, "<br />")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
  return html;
};

export const RichText = ({ text, as: Tag = "span", className }) => (
  <Tag className={className} dangerouslySetInnerHTML={{ __html: richTextHtml(text) }} />
);

// Accepts a normal YouTube / Vimeo link and returns an embeddable one.
export const toEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return u;
};
