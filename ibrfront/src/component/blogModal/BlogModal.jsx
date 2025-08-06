import React from "react";
import "./blogModal.css";

const BlogModal = ({ article, onClose }) => {
  if (!article) return null;

  const {
    title,
    summary,
    description,
    image_url,
    link,
    pubDate,
    author,
    readTime,
    tags,
    source_id,
    content,
  } = article;

  const renderParagraphs = (text) => {
     if (!text) return <p className="modal-desc"> NO description available</p>

     const sentences = text.split(". ").filter(Boolean);
     const grouped = []

     for (let i = 0; i < sentences.length; i +=2){
        const para = sentences[i] + (sentences[i].endsWith(".") ? "": ".");
        const next = sentences[i + 1] ?
        sentences[i + 1] + (sentences[i + 1].endsWith(".") ? "" : ".")
        :"";
        grouped.push(`${para} ${next}`.trim());
     }

     return grouped.map((para, index)=>(
        <p key={index} className="modal-desc">
            {para} 
        </p>
     ))
  };

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        {image_url && (
          <img
            src={image_url}
            alt={title}
            className="modal-image"
            loading="lazy"
          />
        )}

        <div className="modal-body">
          <h2 className="modal-title">{title}</h2>

          <div className="modal-meta">
            {author && (
              <p>
                <strong>Author:</strong> {author}
              </p>
            )}
            {readTime && (
              <p>
                <strong>Read Time:</strong> {readTime}
              </p>
            )}
            {pubDate && (
              <p>
                <strong>Published:</strong>{" "}
                {new Date(pubDate).toLocaleDateString()}
              </p>
            )}
            {source_id && (
              <p>
                <strong>Source:</strong> {source_id}
              </p>
            )}
          </div>

          <div className="modal-content-block">
            <h4>Description:</h4>
           {renderParagraphs(summary || description || content)}
          </div>

          {tags?.length > 0 && (
            <div className="modal-tags">
              <h4>Tags:</h4>
              <div className="tags-wrap">
                {tags.map((tag, idx) => (
                  <span key={idx} className="modal-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {link && (
            <div className="modal-content-block">
              <h4>Read Original:</h4>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--secondary-color)" }}
              >
                {link}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogModal;