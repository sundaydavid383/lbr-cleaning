import React from "react";
import { useCms } from "../../hooks/useCmsContent";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";

const DEFAULT_STATS = [
  { number: "8+", label: "Years Experience" },
  { number: "15K+", label: "Projects Done" },
  { number: "4.9", label: "Client Rating" },
];

// Numbers, feature list and testimonial on the right side of the
// login / signup pages. `prefix` is "login" or "signup".
const AuthInfoExtras = ({ prefix, defaultFeatures, defaultQuote, defaultAuthor }) => {
  const stats = useCms(`${prefix}.stats`, DEFAULT_STATS);
  const features = useCms(`${prefix}.features`, defaultFeatures);
  const testimonial = useCms(`${prefix}.testimonial`, { quote: defaultQuote, author: defaultAuthor }) || {};

  return (
    <>
      <div className="auth-stats">
        <EditableList
          cmsKey={`${prefix}.stats`}
          value={Array.isArray(stats) ? stats : DEFAULT_STATS}
          itemLabel="number"
          label="Numbers"
          fields={[
            { key: "number", type: "text", label: "Number (e.g. 15K+)" },
            { key: "label", type: "text", label: "Label" },
          ]}
        >
          {(s, i) => (
            <div className="auth-stat" key={i}>
              <span className="auth-stat-number">{s.number}</span>
              <span className="auth-stat-label">{s.label}</span>
            </div>
          )}
        </EditableList>
      </div>

      <div className="auth-features">
        <EditableList
          cmsKey={`${prefix}.features`}
          value={Array.isArray(features) ? features : defaultFeatures}
          itemLabel="feature"
          label="Features"
          fields={[
            { key: "icon", type: "icon", label: "Icon" },
            { key: "title", type: "text", label: "Title" },
            { key: "text", type: "text", label: "Description" },
          ]}
        >
          {(f, i) => (
            <div className="auth-feature" key={i}>
              <div className="auth-feature-icon">
                <i className={f.icon}></i>
              </div>
              <div>
                <strong>{f.title}</strong>
                <p>{f.text}</p>
              </div>
            </div>
          )}
        </EditableList>
      </div>

      <div className="auth-testimonial">
        <div className="auth-testimonial-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
        </div>
        <EditableText
          cmsKey={`${prefix}.testimonial`}
          root={{ quote: defaultQuote, author: defaultAuthor, ...testimonial }}
          path="quote"
          value={testimonial.quote || defaultQuote}
          as="p"
          className="auth-testimonial-text"
          label="Review text"
        >
          {(v) => <>&ldquo;{v}&rdquo;</>}
        </EditableText>
        <EditableText
          cmsKey={`${prefix}.testimonial`}
          root={{ quote: defaultQuote, author: defaultAuthor, ...testimonial }}
          path="author"
          value={testimonial.author || defaultAuthor}
          as="p"
          className="auth-testimonial-author"
          label="Reviewer name"
        >
          {(v) => <>— {v}</>}
        </EditableText>
      </div>
    </>
  );
};

export default AuthInfoExtras;
