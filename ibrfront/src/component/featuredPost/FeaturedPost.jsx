// filepath: ibrfront/src/component/featuredPost/FeaturedPost.jsx
import React from "react";
import "./featuredPost.css";
import { Link } from "react-router-dom";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const FeaturedPost = ({ articles, onEdit }) => {
  const { isEditMode } = useEditMode();
  if (!articles || articles.length === 0) return null;
  const featured = articles[0];

  return (
    <section
      className={`featured-post ${onEdit ? "editable-list-item-wrap" : ""}`}
      onClick={onEdit}
      title={onEdit ? "Click to edit this article" : undefined}
    >
      {onEdit && (
        <span className="editable-list-controls" aria-hidden="true">
          <i className="fa-solid fa-pen"></i> Edit article
        </span>
      )}
      <div className="featured-container">
        <div className="featured-image">
          {featured.image_url && <img src={featured.image_url} alt={featured.title} loading="lazy" />}
          <div className="featured-badge">Featured</div>
        </div>
        <div className="featured-content">
          <div className="featured-meta">
            <EditableText cmsKey="featured_post.tag" value="Latest Article" as="span" className="featured-tag" label="Featured tag" />
            <span className="featured-date">
              {featured.pubDate && new Date(featured.pubDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h2 className="featured-title">{featured.title}</h2>
          <p className="featured-summary">{featured.summary?.slice(0, 280)}...</p>
          <div className="featured-footer">
            <span className="featured-author">
              <i className="fa-solid fa-pen"></i> {featured.author || "LBR Editorial"}
            </span>
            <span className="featured-read-time">
              <i className="fa-solid fa-clock"></i> {featured.readTime || "5 min read"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
