// filepath: ibrfront/src/component/categoryFilter/CategoryFilter.jsx
import React, { useState, useRef, useEffect } from "react";
import "./categoryFilter.css";

const CategoryFilter = ({ categories = [], activeCategory, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const VISIBLE_COUNT = 5;
  const visibleCategories = categories.slice(0, VISIBLE_COUNT);
  const hiddenCategories = categories.slice(VISIBLE_COUNT);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="category-filter">
      <div className="category-container">
        <div className="category-list">
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          ))}

          {hiddenCategories.length > 0 && (
            <div className="category-dropdown-wrapper" ref={dropdownRef}>
              <button
                className={`category-btn category-more-btn ${dropdownOpen ? "active" : ""}`}
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                More <i className={`fa-solid fa-chevron-down category-chevron ${dropdownOpen ? "open" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="category-dropdown">
                  {hiddenCategories.map((cat) => (
                    <button
                      key={cat}
                      className={`category-dropdown-item ${activeCategory === cat ? "active" : ""}`}
                      onClick={() => {
                        onSelect(cat);
                        setDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!expanded && hiddenCategories.length > 0 && (
            <button
              className="category-btn category-expand-btn"
              onClick={() => setExpanded(true)}
            >
              View All <i className="fa-solid fa-chevron-down" />
            </button>
          )}

          {expanded && (
            <button
              className="category-btn category-collapse-btn"
              onClick={() => setExpanded(false)}
            >
              Show Less <i className="fa-solid fa-chevron-up" />
            </button>
          )}
        </div>
      </div>

      {expanded && hiddenCategories.length > 0 && (
        <div className="category-expanded">
          {hiddenCategories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
