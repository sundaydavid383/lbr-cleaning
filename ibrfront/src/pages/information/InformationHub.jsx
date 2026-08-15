// filepath: ibrfront/src/pages/information/InformationHub.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./informationHub.css";
import Workingprocess from "../../component/workingprocess/Workingprocess";
import Portfolio from "../../component/portfolio/Portfolio";
import Deal from "../../component/deals/Deal";
import About from "../../component/about/About";
import Articles from "../../component/article/Articles";
import { useCmsContent } from "../../hooks/useCmsContent";
import { SITE_CONFIG } from "../../config/site";

const InformationHub = () => {
  const [activeTab, setActiveTab] = useState("how-it-works");

  const { value: faqs = [], loading: faqsLoading } = useCmsContent("information.faqs", []);
  const { value: services = [], loading: servicesLoading } = useCmsContent("information.services", []);
  const { value: articles = [], loading: articlesLoading } = useCmsContent("information.articles", []);

  const tabs = [
    { id: "how-it-works", label: "How It Works", icon: "fa-solid fa-gears" },
    { id: "services", label: "Our Services", icon: "fa-solid fa-broom" },
    { id: "about", label: "About Us", icon: "fa-solid fa-building" },
    { id: "pricing", label: "Pricing", icon: "fa-solid fa-tags" },
    { id: "portfolio", label: "Portfolio", icon: "fa-solid fa-images" },
    { id: "faq", label: "FAQ", icon: "fa-solid fa-circle-question" },
    { id: "blog", label: "Blog", icon: "fa-solid fa-newspaper" },
  ];

  // Run scroll behavior AFTER React updates the DOM state and reveals active content
useEffect(() => {
  const timer = requestAnimationFrame(() => {
    const el = document.getElementById(activeTab);
    const nav = document.querySelector(".hub-tabs");

    if (el) {
      // Get height of sticky nav bar (or fallback to 70px)
      const navHeight = nav ? nav.getBoundingClientRect().height : 70;
      
      // Calculate absolute top offset minus sticky header
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 10; // 10px buffer

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });

  return () => cancelAnimationFrame(timer);
}, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const displayFaqs = faqs.length > 0 ? faqs : [];
  const displayServices = services.length > 0 ? services : [];
  const displayArticles = articles.length > 0 ? articles : [];

  return (
    <div className="information-hub">
      {/* Hero Header */}
      <section className="hub-hero">
        <div className="hub-hero-bg"></div>
        <div className="hub-hero-content">
          <span className="hub-badge">Information Hub</span>
          <h1>Everything You Need to <span className="highlight">Know</span></h1>
          <p>Explore our comprehensive guides, services, and resources to make informed decisions about your cleaning needs.</p>
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
        </div>
      </section>

      {/* Quick Navigation Tabs */}
      <nav className="hub-tabs">
        <div className="hub-tabs-container">
          {tabs.map((tab) => (
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
          <Workingprocess />
        </section>

        {/* Services */}
        <section id="services" className={`hub-section ${activeTab === "services" ? "active" : ""}`}>
          <div className="hub-section-header">
            <span className="section-tag">What We Offer</span>
            <h2>Our Cleaning Services</h2>
            <p>Professional solutions for every space</p>
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
          <About />
        </section>

        {/* Pricing */}
        <section id="pricing" className={`hub-section ${activeTab === "pricing" ? "active" : ""}`}>
          <Deal
            sectionTitle="Our Plans"
            deal_Intro={{
              image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
              h2: "Please Call Us to Take the Extraordinary Service!",
              email: SITE_CONFIG.email,
              phone: SITE_CONFIG.phone,
            }}
            plans={[
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
            ]}
          />
        </section>

        {/* Portfolio */}
        <section id="portfolio" className={`hub-section ${activeTab === "portfolio" ? "active" : ""}`}>
          <Portfolio />
        </section>

        {/* FAQ */}
        <section id="faq" className={`hub-section ${activeTab === "faq" ? "active" : ""}`}>
          <div className="hub-section-header">
            <span className="section-tag">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to help you make informed decisions</p>
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