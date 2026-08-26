import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import "./informationHub.css";
import Workingprocess from "../../component/workingprocess/Workingprocess";
import Portfolio from "../../component/portfolio/Portfolio";
import Deal from "../../component/deals/Deal";
import About from "../../component/about/About";
import Articles from "../../component/article/Articles";
import { useCmsContent } from "../../hooks/useCmsContent";
import { SITE_CONFIG } from "../../config/site";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";

const HUB_TABS = [
  { id: "how-it-works", label: "How It Works", icon: "fa-solid fa-gears" },
  { id: "services", label: "Our Services", icon: "fa-solid fa-broom" },
  { id: "about", label: "About Us", icon: "fa-solid fa-building" },
  { id: "pricing", label: "Pricing", icon: "fa-solid fa-tags" },
  { id: "portfolio", label: "Portfolio", icon: "fa-solid fa-images" },
  { id: "faq", label: "FAQ", icon: "fa-solid fa-circle-question" },
  { id: "blog", label: "Blog", icon: "fa-solid fa-newspaper" },
];

const DEAL_INTRO = {
  image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
  h2: "Please Call Us to Take the Extraordinary Service!",
  email: SITE_CONFIG.email,
  phone: SITE_CONFIG.phone,
};

const PLANS = [
  {
    price: "₦15,000/month",
    description: "Affordable cleaning",
    name: "Basic Cleaning",
    details: "Ideal for apartments and small offices",
    features: [
      "Dusting and surface cleaning",
      "Vacuuming and mopping floors",
      "Bathroom and kitchen sanitization",
      "Trash removal",
      "Weekly scheduled cleaning",
    ],
    btnText: "Choose Plan",
  },
  {
    price: "₦29,000/month",
    description: "Best value",
    name: "Standard Cleaning",
    details: "Perfect for medium-sized homes and offices",
    features: [
      "Everything in Basic Cleaning",
      "Carpet and upholstery cleaning",
      "Window cleaning (interior)",
      "Appliance exterior cleaning",
      "Bi-weekly deep cleaning",
    ],
    btnText: "Choose Plan",
    popular: true,
  },
  {
    price: "₦49,000/month",
    description: "Premium service",
    name: "Premium Cleaning",
    details: "Comprehensive for large spaces",
    features: [
      "Everything in Standard Cleaning",
      "Exterior window and glass cleaning",
      "Wall and ceiling dusting",
      "Disinfection and sanitization",
      "Customized cleaning schedule",
    ],
    btnText: "Choose Plan",
  },
];

const SECTION_HEADER_EDIT = {
  "how-it-works": {
    tag: "information.how_it_works.tag",
    title: "information.how_it_works.title",
    subtitle: "information.how_it_works.subtitle",
    defaults: { tag: "Simple Process", title: "How It Works", subtitle: "Booking a cleaning service with LBR is fast, simple, and stress-free" },
  },
  services: {
    tag: "information.services.tag",
    title: "information.services.title",
    subtitle: "information.services.subtitle",
    defaults: { tag: "What We Offer", title: "Our Cleaning Services", subtitle: "Professional solutions for every space" },
  },
  about: {
    tag: "information.about.tag",
    title: "information.about.title",
    subtitle: "information.about.subtitle",
    defaults: { tag: "About Us", title: "About LBR Cleaning", subtitle: "Professional cleaning services you can trust" },
  },
  pricing: {
    tag: "information.pricing.tag",
    title: "information.pricing.title",
    subtitle: "information.pricing.subtitle",
    defaults: { tag: "Our Plans", title: "Simple, Transparent Pricing", subtitle: "Choose the plan that fits your needs" },
  },
  portfolio: {
    tag: "information.portfolio.tag",
    title: "information.portfolio.title",
    subtitle: "information.portfolio.subtitle",
    defaults: { tag: "Our Work", title: "Portfolio", subtitle: "A glimpse into our completed projects" },
  },
  faq: {
    tag: "information.faq.tag",
    title: "information.faq.title",
    subtitle: "information.faq.subtitle",
    defaults: { tag: "Common Questions", title: "Frequently Asked Questions", subtitle: "Quick answers to help you make informed decisions" },
  },
};

const InformationHub = () => {
  const [activeTab, setActiveTab] = useState("how-it-works");
  const { isEditMode } = useEditMode();

  const { value: faqs = [], loading: faqsLoading } = useCmsContent("information.faqs", []);
  const { value: services = [], loading: servicesLoading } = useCmsContent("information.services", []);
  const { value: articles = [], loading: articlesLoading } = useCmsContent("information.articles", []);

  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const displayFaqs = useMemo(() => faqs.length > 0 ? faqs : [], [faqs]);
  const displayServices = useMemo(() => services.length > 0 ? services : [], [services]);
  const displayArticles = useMemo(() => articles.length > 0 ? articles : [], [articles]);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const el = document.getElementById(activeTab);
      const nav = document.querySelector(".hub-tabs");

      if (el) {
        const navHeight = nav ? nav.getBoundingClientRect().height : 70;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight - 10;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [activeTab]);

  const renderSectionHeader = (tabId) => {
    const cfg = SECTION_HEADER_EDIT[tabId];
    if (!cfg) return null;

    if (isEditMode) {
      return (
        <>
          <EditableText cmsKey={cfg.tag} type="text" value={cfg.defaults.tag} as="span" className="section-tag" />
          <EditableText cmsKey={cfg.title} type="text" value={cfg.defaults.title} as="h2" />
          <EditableText cmsKey={cfg.subtitle} type="text" value={cfg.defaults.subtitle} as="p" />
        </>
      );
    }

    return (
      <>
        <span className="section-tag">{cfg.defaults.tag}</span>
        <h2>{cfg.defaults.title}</h2>
        <p>{cfg.defaults.subtitle}</p>
      </>
    );
  };

  return (
    <div className="information-hub">
      {/* Hero Header */}
      <section className="hub-hero">
        <div className="hub-hero-bg"></div>
        <div className="hub-hero-content">
          {isEditMode ? (
            <>
              <EditableText cmsKey="information.hero.badge" type="text" value="Information Hub" as="span" className="hub-badge" />
              <h1>
                <EditableText cmsKey="information.hero.title" type="text" value="Everything You Need to" as="span" /> <span className="highlight">
                  <EditableText cmsKey="information.hero.title_highlight" type="text" value="Know" as="span" />
                </span>
              </h1>
              <EditableText cmsKey="information.hero.subtitle" type="text" value="Explore our comprehensive guides, services, and resources to make informed decisions about your cleaning needs." as="p" />
            </>
          ) : (
            <>
              <span className="hub-badge">Information Hub</span>
              <h1>Everything You Need to <span className="highlight">Know</span></h1>
              <p>Explore our comprehensive guides, services, and resources to make informed decisions about your cleaning needs.</p>
            </>
          )}

          {!isEditMode && (
            <div className="hub-hero-stats">
              <div className="hub-stat">
                <span className="hub-stat-number">8+</span>
                <span className="hub-stat-label">Years Experience</span>
              </div>
              <div className="hub-stat">
                <span className="hub-stat-number">2,500+</span>
                <span className="hub-stat-label">Happy Clients</span>
              </div>
              <div className="hub-stat">
                <span className="hub-stat-number">15,000+</span>
                <span className="hub-stat-label">Projects Done</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation Tabs */}
      <nav className="hub-tabs">
        <div className="hub-tabs-container">
          {HUB_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`hub-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Dynamic Content Sections */}
      <div className="hub-content">
        {/* How It Works */}
        <section id="how-it-works" className={`hub-section ${activeTab === "how-it-works" ? "active" : ""}`}>
          <div className="hub-section-header">
            {renderSectionHeader("how-it-works")}
          </div>
          <Workingprocess />
        </section>

        {/* Services */}
        <section id="services" className={`hub-section ${activeTab === "services" ? "active" : ""}`}>
          <div className="hub-section-header">
            {renderSectionHeader("services")}
          </div>
          <div className="services-grid">
            {displayServices.map((service) => (
              <div className="service-card" key={service.id || service.title}>
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="service-card-overlay">
                    <i className={service.icon}></i>
                  </div>
                </div>
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {(service.features || []).map((feature, idx) => (
                      <li key={idx}>
                        <i className={feature.icon}></i>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/apply" className="service-card-btn">
                    Apply Now <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section id="about" className={`hub-section ${activeTab === "about" ? "active" : ""}`}>
          <div className="hub-section-header">
            {renderSectionHeader("about")}
          </div>
          <About />
        </section>

        {/* Pricing */}
        <section id="pricing" className={`hub-section ${activeTab === "pricing" ? "active" : ""}`}>
          <div className="hub-section-header">
            {renderSectionHeader("pricing")}
          </div>
          <Deal sectionTitle="Our Plans" deal_Intro={DEAL_INTRO} plans={PLANS} />
        </section>

        {/* Portfolio */}
        <section id="portfolio" className={`hub-section ${activeTab === "portfolio" ? "active" : ""}`}>
          <div className="hub-section-header">
            {renderSectionHeader("portfolio")}
          </div>
          <Portfolio />
        </section>

        {/* FAQ */}
        <section id="faq" className={`hub-section ${activeTab === "faq" ? "active" : ""}`}>
          <div className="hub-section-header">
            {renderSectionHeader("faq")}
          </div>
          <div className="faq-grid">
            {displayFaqs.map((faq, idx) => (
              <div className="faq-card" key={idx}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className={`hub-section ${activeTab === "blog" ? "active" : ""}`}>
          <Articles articles={displayArticles} />
        </section>
      </div>
    </div>
  );
};

export default InformationHub;