import React from "react";
import "./notFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const popularLinks = [
    { to: "/", label: "Home" },
    { to: "/service", label: "Our Services" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-visual">
          <div className="notfound-number">404</div>
          <div className="notfound-icon">
            <i className="fa-solid fa-broom"></i>
          </div>
        </div>

        <h1>Page Not Found</h1>
        <p className="notfound-message">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to a clean, working page.
        </p>

        <div className="notfound-suggestions">
          <h3>You might be looking for:</h3>
          <div className="suggestion-links">
            {popularLinks.map((link) => (
              <Link key={link.to} to={link.to} className="suggestion-link">
                <i className="fa-solid fa-arrow-right"></i>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/" className="back-home-btn">
          <i className="fa-solid fa-house"></i> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
