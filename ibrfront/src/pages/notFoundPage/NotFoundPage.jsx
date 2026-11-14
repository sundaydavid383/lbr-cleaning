import React from "react";
import "./notFoundPage.css";
import { Link } from "react-router-dom";
import Txt from "../../component/editable/Txt";

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

        <h1><Txt k="notfound.page_not_found" d={"Page Not Found"} /></h1>
        <Txt k="notfound.message" d="The page you're looking for doesn't exist or may have been moved. Let's get you back to a clean, working page." as="p" className="notfound-message" label="Message" />

        <div className="notfound-suggestions">
          <h3><Txt k="notfound.you_might_be_looking_for" d={"You might be looking for:"} /></h3>
          <div className="suggestion-links">
            {popularLinks.map((link) => (
              <Link key={link.to} to={link.to} className="suggestion-link">
                <i className="fa-solid fa-arrow-right"></i>
                <Txt k={`notfound.link_${link.to.replace(/\W/g, "") || "home"}`} d={link.label} label="Link text" />
              </Link>
            ))}
          </div>
        </div>

        <Link to="/" className="back-home-btn">
          <i className="fa-solid fa-house"></i> <Txt k="notfound.button" d="Go Back Home" label="Button" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
