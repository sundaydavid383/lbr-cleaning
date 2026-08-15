// filepath: ibrfront/src/component/nav/Nav.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserGuide } from "../../context/UserGuideContext";
import "./nav.css";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { restart } = useUserGuide();
  const userMenuRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target) && !e.target.closest(".mobile-toggle")) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/service", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/information", label: "Learn More" },
    { to: "/blog", label: "Blog" },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="LBR Cleaning Home">
          <img src="/house-cleaning.png" alt="" aria-hidden="true" />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
              {isActive(link.to) && <span className="nav-link-indicator" />}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="nav-user-menu" ref={userMenuRef}>
              <button
                className="nav-user-trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="nav-user-avatar">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="nav-user-name">{user?.name?.split(" ")[0] || "User"}</span>
                <i className={`fa-solid fa-chevron-down nav-user-chevron ${userMenuOpen ? "open" : ""}`} />
              </button>

              <div className={`nav-user-dropdown ${userMenuOpen ? "open" : ""}`}>
                <div className="nav-user-dropdown-header">
                  <div className="nav-user-avatar large">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="nav-user-fullname">{user?.name}</p>
                    <p className="nav-user-email">{user?.email}</p>
                  </div>
                </div>
                <div className="nav-user-dropdown-divider" />
                <Link to="/dashboard" className="nav-user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                  <i className="fa-solid fa-grid-2" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/dashboard/bookings" className="nav-user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                  <i className="fa-solid fa-calendar-check" />
                  <span>My Bookings</span>
                </Link>
                <Link to="/dashboard/payments" className="nav-user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                  <i className="fa-solid fa-credit-card" />
                  <span>Payments</span>
                </Link>
                <Link to="/dashboard/settings" className="nav-user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                  <i className="fa-solid fa-gear" />
                  <span>Settings</span>
                </Link>
                <div className="nav-user-dropdown-divider" />
                <button className="nav-user-dropdown-item logout" onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="nav-btn nav-btn-ghost">Sign In</Link>
              <Link to="/signup" className="nav-btn nav-btn-primary">Get Started</Link>
            </div>
          )}

          <button
            className="nav-guide-btn"
            onClick={restart}
            title="Restart the website tour"
            aria-label="Take a tour"
          >
            <i className="fa-solid fa-route"></i>
            <span>Take Tour</span>
          </button>

          <Link to="/apply" className="nav-cta">
            <span>Apply Now</span>
            <i className="fa-solid fa-arrow-right" />
          </Link>

          <button
            className={`mobile-toggle ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} ref={mobileRef}>
        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-nav-link ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <>
              <div className="mobile-nav-divider" />
              <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-grid-2" /> Dashboard
              </Link>
              <Link to="/dashboard/bookings" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-calendar-check" /> My Bookings
              </Link>
              <Link to="/dashboard/payments" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-credit-card" /> Payments
              </Link>
              <Link to="/dashboard/settings" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-gear" /> Settings
              </Link>
              <div className="mobile-nav-divider" />
              <button className="mobile-nav-link mobile-nav-logout" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket" /> Sign Out
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <div className="mobile-nav-divider" />
              <button className="mobile-nav-link mobile-nav-auth" onClick={() => { restart(); setMobileOpen(false); }}>
                <i className="fa-solid fa-route" /> Take a Tour
              </button>
              <Link to="/login" className="mobile-nav-link mobile-nav-auth" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="mobile-nav-link mobile-nav-auth primary" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
};

export default Nav;
