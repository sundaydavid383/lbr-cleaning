// filepath: ibrfront/src/pages/admin/cms/CmsDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cms.css";
import CustomAlert from "../../../component/customAlert/CustomAlert";
import { useAuth } from "../../../context/AuthContext";
import { CmsSkeleton } from "../../../component/pageSkeleton/PageSkeleton";
import { apiUrl } from "../../../utils/api";

// Pure display helpers — no state, no logic, just friendlier labels/icons
// for the same underlying "type" value. The raw value sent to/from the
// API (item.type) is never changed.
const TYPE_DISPLAY = {
  text: { label: "Text", icon: "fa-font" },
  rich_text: { label: "Formatted Text", icon: "fa-align-left" },
  array: { label: "List", icon: "fa-list" },
  object: { label: "Group of Fields", icon: "fa-layer-group" },
  image: { label: "Image", icon: "fa-image" },
  boolean: { label: "Yes / No", icon: "fa-toggle-on" },
  number: { label: "Number", icon: "fa-hashtag" },
  json: { label: "Advanced", icon: "fa-code" },
};

const getTypeDisplay = (type) => TYPE_DISPLAY[type] || { label: type, icon: "fa-circle" };

// Turns the item's actual value into a human-readable preview — so a
// non-technical admin can see roughly what a piece of content is before
// opening the editor, instead of a wall of raw JSON. Purely presentational;
// item.value itself is never touched.
const renderPreviewValue = (item) => {
  const { type, value } = item;

  if (value === null || value === undefined || value === "") {
    return <span className="cms-preview-empty">No content yet</span>;
  }

  if (type === "boolean") {
    const isYes = value === true || value === "true";
    return (
      <span className={`cms-preview-badge ${isYes ? "is-yes" : "is-no"}`}>
        {isYes ? "Yes" : "No"}
      </span>
    );
  }

  if (type === "image" && typeof value === "string") {
    return (
      <div className="cms-preview-image">
        <img src={value} alt={item.label || item.key} onError={(e) => { e.target.style.display = "none"; }} />
      </div>
    );
  }

  if (type === "rich_text" && typeof value === "string") {
    const plain = value.replace(/<[^>]+>/g, "");
    return <p className="cms-preview-text">{plain.slice(0, 140)}{plain.length > 140 && "…"}</p>;
  }

  if (Array.isArray(value)) {
    const isObjectArray = value.length > 0 && value.every((v) => v && typeof v === "object" && !Array.isArray(v));

    if (isObjectArray) {
      return (
        <ul className="cms-preview-list">
          {value.slice(0, 3).map((v, i) => {
            const primary = v.label || v.title || v.name || Object.values(v)[0];
            const secondary = v.value ?? v.description ?? "";
            return (
              <li key={i}>
                {String(primary)}
                {secondary !== "" ? `: ${secondary}` : ""}
              </li>
            );
          })}
          {value.length > 3 && <li className="cms-preview-more">+{value.length - 3} more</li>}
        </ul>
      );
    }

    return (
      <p className="cms-preview-text">
        {value.slice(0, 6).join(", ")}
        {value.length > 6 && "…"}
      </p>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value).slice(0, 3);
    return (
      <ul className="cms-preview-list">
        {entries.map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {typeof v === "object" ? "…" : String(v)}
          </li>
        ))}
      </ul>
    );
  }

  return <p className="cms-preview-text">{String(value)}</p>;
};

const CmsDashboard = () => {
  const { user, isAuthenticated, token } = useAuth();
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 5000);
  };

  const fetchContent = async () => {
    try {
      const url = apiUrl('/api/cms/content');
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContent(data.data || []);
      }
    } catch (error) {
      console.error("[CMS-DASHBOARD] fetchContent error:", error);
      showAlert("Failed to load content", "danger");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const url = apiUrl('/api/cms/categories');
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error("[CMS-DASHBOARD] fetchCategories error:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchContent();
    fetchCategories();
  }, [isAuthenticated]);

  const handleDelete = async (key) => {
    try {
      const res = await fetch(`${apiUrl(`/api/cms/content/${encodeURIComponent(key)}`)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showAlert("Content deleted successfully");
        fetchContent();
      } else {
        showAlert(data.message || "Failed to delete content", "danger");
      }
    } catch (error) {
      showAlert("Failed to delete content", "danger");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch = !searchQuery || 
      item.key?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="cms-dashboard">
        <div className="cms-locked">
          <i className="fa-solid fa-lock"></i>
          <h2>You need to log in first</h2>
          <p>Log in with an administrator account to manage this website's content.</p>
          <Link to="/portal/a9f2c1e8b4d67320" className="btn-primary">Admin Sign In</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <CmsSkeleton />;
  }

  const pageCards = [
    {
      title: "Home Page",
      description: "Hero banner, How It Works, Coverage areas, Guarantee section, and more.",
      icon: "fa-solid fa-house",
      path: "/admin/edit/home",
      color: "var(--primary-color)",
    },
    {
      title: "About Page",
      description: "Company intro, team members, video section, and core values.",
      icon: "fa-solid fa-building",
      path: "/admin/edit/about",
      color: "var(--tetiary-color)",
    },
    {
      title: "Services Page",
      description: "Service cards, pricing plans, process steps, and comparison table.",
      icon: "fa-solid fa-broom",
      path: "/admin/edit/services",
      color: "#0ea5e9",
    },
    {
      title: "Blog Page",
      description: "Articles, featured post, category filters, and newsletter signup.",
      icon: "fa-solid fa-newspaper",
      path: "/admin/edit/blog",
      color: "#8b5cf6",
    },
    {
      title: "Contact Page",
      description: "Contact form, business hours, FAQs, map, and encouragement banner.",
      icon: "fa-solid fa-phone",
      path: "/admin/edit/contact",
      color: "#f43f5e",
    },
  ];

  return (
    <div className="cms-dashboard">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      {/* ===== VISUAL PAGE EDITOR SECTION ===== */}
      <div className="cms-header">
        <div>
          <span className="cms-eyebrow">Website Content</span>
          <h1>Content Dashboard</h1>
          <p>Choose a page below to edit it visually, exactly how visitors see it. No technical skills needed.</p>
        </div>
      </div>

      <div className="cms-page-cards">
        {pageCards.map((page) => (
          <Link to={page.path} key={page.path} className="cms-page-card" style={{ "--card-accent": page.color }}>
            <div className="cms-page-card-icon">
              <i className={page.icon}></i>
            </div>
            <div className="cms-page-card-body">
              <h3>{page.title}</h3>
              <p>{page.description}</p>
            </div>
            <div className="cms-page-card-action">
              <span className="cms-page-card-btn">
                Edit Page <i className="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ===== CONTENT LIBRARY SECTION ===== */}
      <div className="cms-content-section">
        <div className="cms-content-section-header">
          <div>
            <span className="cms-eyebrow">Advanced</span>
            <h2>Content Library</h2>
            <p>Every piece of content on your website, all in one list. Search, filter, and edit individual items.</p>
          </div>
          <div className="cms-header-actions">
            <button
              className="btn-primary"
              onClick={() => window.open("/admin/cms/batch", "_blank")}
              title="Edit several items at once, all on one page"
            >
              <i className="fa-solid fa-table-cells"></i> Edit Multiple Items
            </button>
          </div>
        </div>

        <div className="cms-filters">
          <div className="cms-search">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Search by name, section, or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cms-category-filter"
            aria-label="Filter by section"
          >
            <option value="all">All Sections</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="cms-stats">
            <span className="cms-stat">
              <i className="fa-solid fa-file-lines"></i> {content.length} items
            </span>
            <span className="cms-stat">
              <i className="fa-solid fa-folder"></i> {categories.length} sections
            </span>
          </div>
        </div>

        {searchQuery || selectedCategory !== "all" ? (
          <p className="cms-results-count">
            Showing {filteredContent.length} of {content.length} items
          </p>
        ) : null}

        {content.length === 0 ? (
          <div className="cms-empty">
            <i className="fa-solid fa-inbox"></i>
            <h3>Nothing here yet</h3>
            <p>Your content library is empty. Ask a developer to run: <code>npm run seed:cms</code></p>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="cms-empty">
            <i className="fa-solid fa-magnifying-glass"></i>
            <h3>No matches</h3>
            <p>Try a different search term or choose "All Sections".</p>
          </div>
        ) : (
          <div className="cms-content-grid">
            {filteredContent.map((item) => {
              const typeDisplay = getTypeDisplay(item.type);
              const rawPreviewText = JSON.stringify(item.value, null, 2);
              return (
                <div key={item.id || item.key} className="cms-content-card">
                  <div className="cms-card-header">
                    <div>
                      <h3>{item.label || item.key}</h3>
                      <span className="cms-card-key" title="Internal ID — used by developers to find this item in the code">
                        <i className="fa-solid fa-tag"></i> {item.key}
                      </span>
                    </div>
                    <span className={`cms-card-type ${item.type}`}>
                      <i className={`fa-solid ${typeDisplay.icon}`}></i> {typeDisplay.label}
                    </span>
                  </div>

                  <div className="cms-card-body">
                    <div className="cms-card-tags">
                      {item.category && (
                        <span className="cms-card-category">
                          <i className="fa-solid fa-folder-open"></i> {item.category}
                        </span>
                      )}
                      <span className={`cms-visibility-badge ${item.isPublic ? "is-public" : "is-hidden"}`}>
                        <i className={`fa-solid ${item.isPublic ? "fa-eye" : "fa-eye-slash"}`}></i>
                        {item.isPublic ? "Visible on site" : "Hidden"}
                      </span>
                    </div>

                    {item.description && (
                      <p className="cms-card-description">{item.description}</p>
                    )}

                    {renderPreviewValue(item)}

                    <details className="cms-card-preview-toggle">
                      <summary>View raw data (for developers)</summary>
                      <pre className="cms-card-preview">
                        {rawPreviewText.slice(0, 200)}
                        {rawPreviewText.length > 200 && "..."}
                      </pre>
                    </details>
                  </div>

                  <div className="cms-card-actions">
                    <Link
                      to={`/admin/cms/${encodeURIComponent(item.key)}`}
                      className="cms-btn cms-btn-edit"
                    >
                      <i className="fa-solid fa-pen"></i> Edit
                    </Link>
                    {deleteConfirm === item.key ? (
                      <div className="cms-delete-confirm">
                        <span>Delete this?</span>
                        <button className="cms-btn cms-btn-confirm" onClick={() => handleDelete(item.key)}>Yes, delete</button>
                        <button className="cms-btn cms-btn-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                      </div>
                    ) : (
                      <button
                        className="cms-btn cms-btn-delete"
                        onClick={() => setDeleteConfirm(item.key)}
                        title="Delete this item"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CmsDashboard;