import React, { useState, useEffect } from "react";
import "./nav.css"
import houseimage from "../../assets/house-cleaning.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const [linkActive, setLinkActive] = useState(false)
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setActive(true);
        setScrolled(true);
      } else {
        setActive(false);
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLinkActive(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`nav ${active ? "active" : ""}`}>
      <div className="nav-upper">
        <div className="media">
          <a href="tel:+2348068698053" className="phone" aria-label="Call us">
            <i className="fa-solid fa-phone-volume"></i> 
            <span>+234 806 869 8053</span>
          </a>

          <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="email" aria-label="Email us">
            <i className="fa-solid fa-envelope"></i>
            <span>{import.meta.env.VITE_CONTACT_EMAIL}</span>
          </a>
        </div>
        
        <div className="nav-upper-actions">
          {isAuthenticated ? (
            <div className="auth-buttons logged-in">
              <span className="user-greeting">
                <i className="fa-solid fa-circle-check"></i>
                {user?.name || "User"}
              </span>
              <button onClick={logout} className="btn-logout">
                <i className="fa-solid fa-right-from-bracket"></i> Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                <i className="fa-solid fa-right-to-bracket"></i> Sign In
              </Link>
              <Link to="/signup" className="btn-signup">
                <i className="fa-solid fa-user-plus"></i> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="nav-lower">
        <Link to="/" className="logo" aria-label="LBR Cleaning Home">
          <img src={houseimage} alt="LBR Cleaning Services Logo" />
        </Link>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setLinkActive(!linkActive)}
          aria-label={linkActive ? "Close menu" : "Open menu"}
          aria-expanded={linkActive}
        >
          <i className={`fa-solid ${linkActive ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
        </button>
        
        <nav className={`links ${linkActive ? "active" : ""}`} aria-label="Main navigation">
          <Link 
            className={isActive("/") ? "active" : ""} 
            to="/"
          >
            <span>Home</span>
            <div></div>
          </Link>
          <Link 
            className={isActive("/service") ? "active" : ""} 
            to="/service"
          >
            <span>Services</span>
            <div></div>
          </Link>
          <Link 
            className={isActive("/about") ? "active" : ""} 
            to="/about"
          >
            <span>About</span>
            <div></div>
          </Link>
          <Link 
            className={isActive("/blog") ? "active" : ""} 
            to="/blog"
          >
            <span>Blog</span>
            <div></div>
          </Link>
          
          {isAuthenticated && (
            <Link 
              className={isActive("/notify") ? "active" : ""} 
              to="/notify"
            >
              <span>Notify</span>
              <div></div>
            </Link>
          )}
        </nav>
        
        {!isAuthenticated && (
          <Link to="/apply" className="btn apply-btn">
            <p>
              Apply <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </Link>
        )}
      </div>
      
      {/* Mobile overlay */}
      <div 
        className={`mobile-menu-overlay ${linkActive ? "active" : ""}`}
        onClick={() => setLinkActive(false)}
        aria-hidden="true"
      />
    </div>
  );
};

export default Nav;
