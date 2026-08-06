// filepath: ibrfront/src/component/skeleton/SkeletonLoader.jsx
import React from "react";
import "./skeletonLoader.css";

const SkeletonLoader = ({ type = "page" }) => {
  switch (type) {
    case "home":
      return <HomeSkeleton />;
    case "hero":
      return <HeroSkeleton />;
    case "features":
      return <FeaturesSkeleton />;
    case "stats":
      return <StatsSkeleton />;
    case "testimonials":
      return <TestimonialsSkeleton />;
    case "cta":
      return <CtaSkeleton />;
    case "services":
      return <ServicesSkeleton />;
    case "bookings":
      return <BookingsSkeleton />;
    case "dashboard":
      return <DashboardSkeleton />;
    case "form":
      return <FormSkeleton />;
    case "table":
      return <TableSkeleton />;
    case "profile":
      return <ProfileSkeleton />;
    case "apply":
      return <ApplySkeleton />;
    default:
      return <PageSkeleton />;
  }
};

const shimmer = (className) => (
  <div className={`skeleton-shimmer ${className}`}></div>
);

const HomeSkeleton = () => (
  <div className="skeleton-page">
    <HeroSkeleton />
    <section className="skeleton-section">
      <StatsSkeleton />
    </section>
    <section className="skeleton-section">
      <FeaturesSkeleton />
    </section>
    <section className="skeleton-section">
      <TestimonialsSkeleton />
    </section>
    <section className="skeleton-section">
      <CtaSkeleton />
    </section>
  </div>
);

const HeroSkeleton = () => (
  <div className="skeleton-hero">
    <div className="skeleton-hero-content">
      <div className="skeleton-hero-badge"></div>
      <div className="skeleton-hero-title"></div>
      <div className="skeleton-hero-text"></div>
      <div className="skeleton-hero-text short"></div>
      <div className="skeleton-hero-btn"></div>
    </div>
    <div className="skeleton-hero-image"></div>
  </div>
);

const FeaturesSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-section-header">
      <div className="skeleton-title short center"></div>
      <div className="skeleton-text center"></div>
    </div>
    <div className="skeleton-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card skeleton-feature">
          <div className="skeleton-icon circle"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </div>
  </div>
);

const StatsSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-grid stats-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton-card skeleton-stat">
          <div className="skeleton-icon"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </div>
  </div>
);

const TestimonialsSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-section-header">
      <div className="skeleton-title short center"></div>
    </div>
    <div className="skeleton-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card skeleton-testimonial">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-content">
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-title short"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CtaSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-card skeleton-cta">
      <div className="skeleton-title center"></div>
      <div className="skeleton-text center"></div>
      <div className="skeleton-btn center"></div>
    </div>
  </div>
);

const ServicesSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-section-header">
      <div className="skeleton-title short center"></div>
      <div className="skeleton-text center"></div>
    </div>
    <div className="skeleton-grid services-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton-card skeleton-service">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BookingsSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-section-header">
      <div className="skeleton-title short"></div>
    </div>
    <div className="skeleton-card skeleton-table">
      <div className="skeleton-table-header">
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton-table-row">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-dashboard-header"></div>
    <div className="skeleton-section">
      <div className="skeleton-grid dashboard-stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card skeleton-stat">
            <div className="skeleton-icon"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="skeleton-section">
      <div className="skeleton-grid dashboard-content-grid">
        <div className="skeleton-card skeleton-dashboard-card">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="skeleton-card skeleton-dashboard-card">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    </div>
  </div>
);

const FormSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-card skeleton-form">
      <div className="skeleton-section-header">
        <div className="skeleton-title center"></div>
        <div className="skeleton-text center"></div>
      </div>
      <div className="skeleton-form-fields">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-form-field">
            <div className="skeleton-label"></div>
            <div className="skeleton-input"></div>
          </div>
        ))}
        <div className="skeleton-btn center"></div>
      </div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-card skeleton-table">
      <div className="skeleton-table-header">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-text"></div>
        ))}
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton-table-row">
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="skeleton-text"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const ProfileSkeleton = () => (
  <div className="skeleton-section">
    <div className="skeleton-card skeleton-profile">
      <div className="skeleton-profile-header">
        <div className="skeleton-avatar large"></div>
        <div className="skeleton-profile-info">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
      <div className="skeleton-form-fields">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-form-field">
            <div className="skeleton-label"></div>
            <div className="skeleton-input"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ApplySkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-apply-hero">
      <div className="skeleton-hero-badge"></div>
      <div className="skeleton-hero-title"></div>
      <div className="skeleton-hero-text"></div>
      <div className="skeleton-hero-text short"></div>
    </div>
    <div className="skeleton-section">
      <div className="skeleton-card skeleton-form">
        <div className="skeleton-section-header">
          <div className="skeleton-title center"></div>
        </div>
        <div className="skeleton-form-fields">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-form-field">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
          ))}
          <div className="skeleton-form-field full-width">
            <div className="skeleton-label"></div>
            <div className="skeleton-textarea"></div>
          </div>
          <div className="skeleton-btn center"></div>
        </div>
      </div>
    </div>
  </div>
);

const PageSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-section">
      <div className="skeleton-card skeleton-default">
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
export {
  shimmer,
  HomeSkeleton,
  HeroSkeleton,
  FeaturesSkeleton,
  StatsSkeleton,
  TestimonialsSkeleton,
  CtaSkeleton,
  ServicesSkeleton,
  BookingsSkeleton,
  DashboardSkeleton,
  FormSkeleton,
  TableSkeleton,
  ProfileSkeleton,
  ApplySkeleton,
  PageSkeleton,
};
