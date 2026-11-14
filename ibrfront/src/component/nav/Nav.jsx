// filepath: ibrfront/src/component/nav/Nav.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserGuide } from "../../context/UserGuideContext";
import "./nav.css";
import { ImageViewer } from "../imageviewer/ImageViewer";
import { useCms } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import { useSiteSettings, openSiteSettings } from "../../hooks/useSiteSettings";
import EditableText from "../editable/EditableText";

const DEFAULT_NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/service", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/information", label: "Learn More" },
  { to: "/blog", label: "Blog" },
];

const NAV_LINK_FIELDS = [
  { key: "label", type: "text", label: "Text shown" },
  { key: "to", type: "url", label: "Goes to", help: "A page on this site like /about, or a full web address." },
];

const isExternal = (to) => /^(https?:|mailto:|tel:)/i.test(to || "");

const NavItem = ({ link, className, children }) =>
  isExternal(link.to) ? (
    <a href={link.to} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link to={link.to || "/"} className={className}>{children}</Link>
  );

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
  const [openImageViewer, setOpenImageViewer] = useState(false);

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

  const storedLinks = useCms("site.nav_links", DEFAULT_NAV_LINKS);
  const navLinks = Array.isArray(storedLinks) ? storedLinks.filter((l) => l && l.label) : DEFAULT_NAV_LINKS;
  const site = useSiteSettings();
  const { isEditMode, openPanel } = useEditMode();
  const ctaText = useCms("site.nav_cta_text", "Apply Now");
  const signInText = useCms("site.nav_signin_text", "Sign In");
  const getStartedText = useCms("site.nav_signup_text", "Get Started");
  const tourText = useCms("site.nav_tour_text", "Take Tour");

  const editLinks = () =>
    openPanel({
      cmsKey: "site.nav_links",
      root: DEFAULT_NAV_LINKS,
      value: navLinks,
      title: "Menu links",
      help: "These are the links in the top menu (and the mobile menu). Add, remove, rename or reorder them.",
      field: { type: "items", itemLabel: "link", fields: NAV_LINK_FIELDS, newItem: { label: "New link", to: "/" } },
      openedAt: Date.now(),
    });

  const label = (key, fallback, help) =>
    isEditMode ? <EditableText cmsKey={key} value={fallback} label={help || "Button text"} /> : fallback;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link
          to="/"
          className={`nav-logo ${isEditMode ? "editable-field" : ""}`}
          aria-label={`${site.name} Home`}
          onClickCapture={isEditMode ? (e) => { e.preventDefault(); e.stopPropagation(); openSiteSettings(openPanel); } : undefined}
          title={isEditMode ? "Change logo & business info" : undefined}
        >
          <img src={site.logo} alt="" aria-hidden="true" />
        </Link>

        <nav
          className={`nav-links ${isEditMode ? "editable-field" : ""}`}
          aria-label="Primary"
          onClickCapture={isEditMode ? (e) => { e.preventDefault(); e.stopPropagation(); editLinks(); } : undefined}
          title={isEditMode ? "Click to edit menu links" : undefined}
        >
          {navLinks.map((link, i) => (
            <NavItem key={`${link.to}-${i}`} link={link} className={`nav-link ${isActive(link.to) ? "active" : ""}`}>
              {link.label}
              {isActive(link.to) && <span className="nav-link-indicator" />}
            </NavItem>
          ))}
          {isEditMode && <span className="editable-pencil" aria-hidden="true"><i className="fa-solid fa-pen"></i></span>}
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
                {user?.avatar ? (
                  <img src={user.avatar} alt={`${user.name}'s avatar`} className="nav-user-avatar" />
                ) : (
                <div className="nav-user-avatar">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                )}

                <span className="nav-user-name">{user?.name?.split(" ")[0] || "User"}</span>
                <i className={`fa-solid fa-chevron-down nav-user-chevron ${userMenuOpen ? "open" : ""}`} />
              </button>

              <div className={`nav-user-dropdown ${userMenuOpen ? "open" : ""}`}>
                <div className="nav-user-dropdown-header">
                  { user?.avatar ? (
                    <img onClick={() => setOpenImageViewer(prev=> !prev)}
                    src={user.avatar} alt={`${user.name}'s avatar`} className="nav-user-avatar large" />
                  ) : (
                  <div className="nav-user-avatar large">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  )}

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
              <Link to="/login" className="nav-btn nav-btn-ghost">{label("site.nav_signin_text", signInText, "Sign in button")}</Link>
              <Link to="/signup" className="nav-btn nav-btn-primary">{label("site.nav_signup_text", getStartedText, "Sign up button")}</Link>
            </div>
          )}

          <button
            className="nav-guide-btn"
            onClick={restart}
            title="Restart the website tour"
            aria-label="Take a tour"
          >
            <i className="fa-solid fa-route"></i>
            <span>{label("site.nav_tour_text", tourText, "Tour button")}</span>
          </button>

          <Link to="/apply" className="nav-cta">
            <span>{label("site.nav_cta_text", ctaText, "Main button (top right)")}</span>
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
          {navLinks.map((link, i) => (
            <NavItem key={`${link.to}-${i}`} link={link} className={`mobile-nav-link ${isActive(link.to) ? "active" : ""}`}>
              {link.label}
            </NavItem>
          ))}
          <div className="mobile-nav-divider" />
          <Link to="/apply" className="mobile-nav-link mobile-nav-cta" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-arrow-right" /> {ctaText}
          </Link>
          <button className="mobile-nav-link mobile-nav-auth" onClick={() => { restart(); setMobileOpen(false); }}>
            <i className="fa-solid fa-route" /> {tourText}
          </button>
          {isAuthenticated ? (
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
          ) : (
            <>
              <div className="mobile-nav-divider" />
              <Link to="/login" className="mobile-nav-link mobile-nav-auth" onClick={() => setMobileOpen(false)}>
                {signInText}
              </Link>
              <Link to="/signup" className="mobile-nav-link mobile-nav-auth primary" onClick={() => setMobileOpen(false)}>
                {getStartedText}
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
      <ImageViewer
        imageUrl={user?.avatar}
        isOpen={openImageViewer}
        onClose={() => setOpenImageViewer(false)}
      />
    </header>
  );
};

export default Nav;
