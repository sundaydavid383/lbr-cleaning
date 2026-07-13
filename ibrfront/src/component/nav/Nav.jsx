import React, { useState, useEffect } from "react";
import "./nav.css"
import houseimage from "../../assets/house-cleaning.png";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [linkActive, setLinkActive] = useState(false)
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  // Close mobile menu on route change
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

          <a href="mailto:lbrcleaningservices16@gmail.com" className="email" aria-label="Email us">
            <i className="fa-solid fa-envelope"></i>
            <span>lbrcleaningservices16@gmail.com</span>
          </a>
        </div>
        
        <div className="social-platforms">
          <a className="iconactive" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a className="iconactive" href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a className="iconactive" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a className="iconactive" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="iconactive" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
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
        </nav>
        
        <Link to="/contact" className="btn">
          <p>Contact Us <i className="fa-solid fa-arrow-right-long"></i></p>
        </Link>
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
