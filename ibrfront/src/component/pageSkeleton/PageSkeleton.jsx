// filepath: ibrfront/src/component/pageSkeleton/PageSkeleton.jsx
import React from 'react';
import './pageSkeleton.css';

export const HomeSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-hero">
      <div className="skeleton-hero-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
        <div className="skeleton-buttons">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
      <div className="skeleton-hero-image"></div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="skeleton-grid">
        {[1,2,3].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-icon"></div>
            <div className="skeleton-line skeleton-card-title"></div>
            <div className="skeleton-line skeleton-card-text"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="skeleton-section">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="skeleton-grid">
        {[1,2,3,4].map(i => (
          <div key={i} className="skeleton-step">
            <div className="skeleton-step-number"></div>
            <div className="skeleton-line skeleton-step-title"></div>
            <div className="skeleton-line skeleton-step-text"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ServiceSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-hero">
      <div className="skeleton-hero-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="skeleton-grid">
        {[1,2,3].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line skeleton-card-title"></div>
            <div className="skeleton-line skeleton-price"></div>
            <div className="skeleton-line skeleton-card-text"></div>
            <div className="skeleton-button"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const AboutSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-hero">
      <div className="skeleton-hero-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="skeleton-text-block">
        <div className="skeleton-line skeleton-text-long"></div>
        <div className="skeleton-line skeleton-text-long"></div>
        <div className="skeleton-line skeleton-text-medium"></div>
      </div>
    </div>

    <div className="skeleton-section">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="skeleton-grid">
        {[1,2,3,4].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-line skeleton-card-title"></div>
            <div className="skeleton-line skeleton-card-text short"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ContactSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-hero">
      <div className="skeleton-hero-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-grid">
        {[1,2,3].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-icon"></div>
            <div className="skeleton-line skeleton-card-title"></div>
            <div className="skeleton-line skeleton-card-text"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="skeleton-section">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="skeleton-form">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="skeleton-input"></div>
        ))}
        <div className="skeleton-button"></div>
      </div>
    </div>
  </div>
);

export const BlogSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-hero">
      <div className="skeleton-hero-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-grid">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="skeleton-card skeleton-blog-card">
            <div className="skeleton-blog-image"></div>
            <div className="skeleton-line skeleton-card-title"></div>
            <div className="skeleton-line skeleton-card-text"></div>
            <div className="skeleton-line skeleton-card-text short"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CmsSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-section">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-subtitle"></div>
    </div>
    <div className="skeleton-grid">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-line skeleton-card-title"></div>
          <div className="skeleton-line skeleton-card-text"></div>
          <div className="skeleton-line skeleton-card-text short"></div>
        </div>
      ))}
    </div>
  </div>
);
