// filepath: ibrfront/src/component/categoryFilter/CategoryFilter.jsx
import React from "react";
import "./categoryFilter.css";

const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="category-filter">
      <div className="category-container">
        <div className="category-list">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
