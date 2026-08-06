// filepath: ibrfront/src/component/blogModal/BlogModal.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./blogModal.css";
import { useAuth } from "../../context/AuthContext";

const BlogModal = ({ article, onClose, relatedArticles = [] }) => {
  const [readProgress, setReadProgress] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);
  const modalRef = useRef(null);
  const { isAuthenticated } = useAuth();

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

  const paragraphs = (summary || description || content || "")
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0);

  const headings = paragraphs
    .map((p, i) => {
      const trimmed = p.trim();
      if (trimmed.length < 80 && trimmed.endsWith(":")) {
        return { text: trimmed.replace(/:$/, ""), index: i };
      }
      return null;
    })
    .filter(Boolean);

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const progress = Math.min((scrollTop / (scrollHeight - clientHeight || 1)) * 100, 100);
    setReadProgress(progress);
  }, []);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;
    contentEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => contentEl.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: summary, url });
      } catch {
        // user cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="blog-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="blog-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-modal-progress" style={{ width: `${readProgress}%` }} />

            <button className="modal-close-btn" onClick={onClose} aria-label="Close article">
              <i className="fa-solid fa-xmark" />
            </button>

            {image_url && (
              <div className="modal-hero-image">
                <img src={image_url} alt={title} loading="lazy" />
                <div className="modal-hero-gradient" />
              </div>
            )}

            <div className="modal-scroll-area" ref={contentRef}>
              <div className="modal-content-wrapper">
                <header className="modal-header">
                  {tags?.length > 0 && (
                    <div className="modal-tags-row">
                      {tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="modal-tag">#{tag}</span>
                      ))}
                    </div>
                  )}

                  <h1 id="blog-modal-title" className="modal-title">{title}</h1>

                  <div className="modal-meta-row">
                    {author && (
                      <div className="modal-author">
                        <div className="modal-author-avatar">
                          {author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="modal-author-name">{author}</p>
                          {pubDate && <p className="modal-author-date">{formatDate(pubDate)}</p>}
                        </div>
                      </div>
                    )}
                    <div className="modal-meta-actions">
                      {readTime && <span className="modal-read-time"><i className="fa-regular fa-clock" /> {readTime}</span>}
                      <button className="modal-share-btn" onClick={handleShare} aria-label="Share article">
                        <i className={`fa-solid ${copied ? "fa-check" : "fa-share-nodes"}`} />
                        <span>{copied ? "Copied!" : "Share"}</span>
                      </button>
                    </div>
                  </div>
                </header>

                <article className="modal-body">
                  {headings.length > 1 && (
                    <div className="modal-toc-toggle">
                      <button className="toc-toggle-btn" onClick={() => setShowToc((prev) => !prev)}>
                        <i className="fa-solid fa-list" />
                        {showToc ? "Hide Table of Contents" : "Table of Contents"}
                      </button>
                      {showToc && (
                        <nav className="modal-toc" aria-label="Table of contents">
                          {headings.map((h, i) => (
                            <a key={i} href={`#section-${i}`} className="toc-link" onClick={() => setShowToc(false)}>
                              {h.text}
                            </a>
                          ))}
                        </nav>
                      )}
                    </div>
                  )}

                  <div className="modal-text">
                    {paragraphs.map((para, i) => {
                      const isHeading = para.length < 80 && para.endsWith(":") && headings.find((h) => h.index === i);
                      if (isHeading) {
                        return (
                          <h3 key={i} id={`section-${i}`} className="modal-subheading">
                            {para.replace(/:$/, "")}
                          </h3>
                        );
                      }
                      return (
                        <p key={i} className="modal-paragraph">
                          {para}
                        </p>
                      );
                    })}
                  </div>

                  {link && (
                    <div className="modal-original-link">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        Read original article <i className="fa-solid fa-arrow-up-right-from-square" />
                      </a>
                    </div>
                  )}
                </article>

                {relatedArticles.length > 0 && (
                  <footer className="modal-related">
                    <h3 className="modal-related-title">Related Articles</h3>
                    <div className="modal-related-grid">
                      {relatedArticles.slice(0, 3).map((article, i) => (
                        <a
                          key={i}
                          href="#"
                          className="modal-related-card"
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            setTimeout(() => {
                              window?.openBlogModal?.(article);
                            }, 300);
                          }}
                        >
                          {article.image_url && (
                            <img src={article.image_url} alt={article.title} loading="lazy" />
                          )}
                          <h4>{article.title}</h4>
                          {article.readTime && <span>{article.readTime}</span>}
                        </a>
                      ))}
                    </div>
                  </footer>
                )}

                <div className="modal-cta-banner">
                  <h3>Ready for a spotless space?</h3>
                  <p>Book your cleaning service today and experience the LBR difference.</p>
                  <a href="/apply" className="modal-cta-btn" onClick={onClose}>
                    Book a Cleaning <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
