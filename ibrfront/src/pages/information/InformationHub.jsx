// filepath: ibrfront/src/pages/information/InformationHub.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./informationHub.css";
import Workingprocess from "../../component/workingprocess/Workingprocess";
import Portfolio from "../../component/portfolio/Portfolio";
import Deal from "../../component/deals/Deal";
import About from "../../component/about/About";
import Testimonial from "../../component/testimonials/Testimonials";
import Articles from "../../component/article/Articles";
import Contact from "../../component/contact/Contact";
import CTABanner from "../../component/ctaBanner/CTABanner";
import { SITE_CONFIG } from "../../config/site";

const InformationHub = () => {
  const [activeTab, setActiveTab] = useState("how-it-works");

  const tabs = [
    { id: "how-it-works", label: "How It Works", icon: "fa-solid fa-gears" },
    { id: "services", label: "Our Services", icon: "fa-solid fa-broom" },
    { id: "about", label: "About Us", icon: "fa-solid fa-building" },
    { id: "pricing", label: "Pricing", icon: "fa-solid fa-tags" },
    { id: "portfolio", label: "Portfolio", icon: "fa-solid fa-images" },
    { id: "faq", label: "FAQ", icon: "fa-solid fa-circle-question" },
    { id: "blog", label: "Blog", icon: "fa-solid fa-newspaper" },
  ];

  const faqs = [
    {
      question: "How do I book a cleaning service?",
      answer:
        "Booking is simple! Click the 'Apply Now' button on our homepage, fill out the form with your details and service preference, and our team will contact you within 24 hours to confirm your appointment.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We currently service Lagos State and surrounding areas in Nigeria. Contact us to confirm if we cover your specific location.",
    },
    {
      question: "Are your cleaning products safe?",
      answer:
        "Absolutely. We use eco-friendly, non-toxic, and biodegradable cleaning products that are safe for children, pets, and the environment.",
    },
    {
      question: "Do I need to be present during cleaning?",
      answer:
        "No, you don't need to be present. Many of our clients schedule cleaning while they're away at work. Just provide access and any special instructions.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, cash, and online payments. Payment details will be provided when we confirm your booking.",
    },
    {
      question: "Is there a satisfaction guarantee?",
      answer:
        "Yes! If you're not 100% satisfied with our service, we'll re-clean the area for free within 24 hours. Your satisfaction is our top priority.",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Home Cleaning",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      icon: "fa-solid fa-house-chimney",
      description: "Professional residential cleaning for sparkling homes",
      features: [
        { icon: "fa-solid fa-broom", text: "Deep vacuuming and mopping" },
        { icon: "fa-solid fa-spray-can", text: "Kitchen and bathroom sanitization" },
        { icon: "fa-solid fa-window-maximize", text: "Interior window cleaning" },
      ],
    },
    {
      id: 2,
      title: "Office Cleaning",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      icon: "fa-solid fa-briefcase",
      description: "Hygienic workspace solutions for modern offices",
      features: [
        { icon: "fa-solid fa-desktop", text: "Workstation sanitization" },
        { icon: "fa-solid fa-toilet", text: "Restroom deep cleaning" },
        { icon: "fa-solid fa-mug-hot", text: "Breakroom cleanup" },
      ],
    },
    {
      id: 3,
      title: "Carpet Cleaning",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
      icon: "fa-solid fa-rug",
      description: "Deep carpet cleaning that removes stains and odors",
      features: [
        { icon: "fa-solid fa-pump-soap", text: "Deep shampoo treatment" },
        { icon: "fa-solid fa-wind", text: "Fast-drying extraction" },
        { icon: "fa-solid fa-leaf", text: "Eco-friendly solutions" },
      ],
    },
    {
      id: 4,
      title: "Window Cleaning",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
      icon: "fa-solid fa-window-maximize",
      description: "Streak-free crystal clear windows",
      features: [
        { icon: "fa-solid fa-sun", text: "Interior and exterior cleaning" },
        { icon: "fa-solid fa-ruler", text: "Frame and sill detailing" },
        { icon: "fa-solid fa-shield-halved", text: "Safe access methods" },
      ],
    },
    {
      id: 5,
      title: "Move In/Out Cleaning",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      icon: "fa-solid fa-truck-moving",
      description: "Thorough cleaning for stress-free moves",
      features: [
        { icon: "fa-solid fa-boxes-stacked", text: "Complete property sweep" },
        { icon: "fa-solid fa-oven", text: "Appliance interior cleaning" },
        { icon: "fa-solid fa-spray-can-sparkles", text: "Deodorizing and sanitizing" },
      ],
    },
    {
      id: 6,
      title: "Sanitization Service",
      image: "https://images.unsplash.com/photo-1584463717955-2d3c3c3c3c3c?w=600&h=400&fit=crop",
      icon: "fa-solid fa-hand-sparkles",
      description: "Hospital-grade disinfection for your space",
      features: [
        { icon: "fa-solid fa-virus-slash", text: "99.9% germ elimination" },
        { icon: "fa-solid fa-spray-can", text: "Fogging and misting" },
        { icon: "fa-solid fa-baby", text: "Child and pet safe" },
      ],
    },
    {
      id: 7,
      title: "Post-Construction Cleaning",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
      icon: "fa-solid fa-building",
      description: "Remove construction dust and debris",
      features: [
        { icon: "fa-solid fa-dust", text: "Fine dust removal" },
        { icon: "fa-solid fa-paint-roller", text: "Paint and cement cleanup" },
        { icon: "fa-solid fa-gem", text: "Surface polishing" },
      ],
    },
  ];

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
              onClick={() => setActiveTab(tab.id)}
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
            <span className="section-tag">Our Process</span>
            <h2>How It Works</h2>
            <p>Getting your space cleaned is as easy as 1-2-3</p>
          </div>
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
            {services.map((service) => (
              <div className="service-card" key={service.id}>
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
                    {service.features.map((feature, idx) => (
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
            <span className="section-tag">Our Story</span>
            <h2>About LBR Cleaning</h2>
            <p>Trusted by thousands across Nigeria</p>
          </div>
          <About />
        </section>

        {/* Pricing */}
        <section id="pricing" className={`hub-section ${activeTab === "pricing" ? "active" : ""}`}>
          <div className="hub-section-header">
            <span className="section-tag">Transparent Pricing</span>
            <h2>Our Plans</h2>
            <p>Affordable cleaning solutions for every budget</p>
          </div>
          <Deal
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
          <div className="hub-section-header">
            <span className="section-tag">Our Work</span>
            <h2>Portfolio</h2>
            <p>See the quality of our work</p>
          </div>
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
            {faqs.map((faq, idx) => (
              <div className="faq-card" key={idx}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className={`hub-section ${activeTab === "blog" ? "active" : ""}`}>
          <div className="hub-section-header">
            <span className="section-tag">Resources</span>
            <h2>Latest Articles</h2>
            <p>Tips, insights, and cleaning advice</p>
          </div>
          <Articles
            articles={[
              {
                id: 38,
                title: "Engaging Clients with Quality Cleaning Services",
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
                date: "2025-12-05",
                author: "Cleaning Experts Team",
                quote: "Clean spaces create healthy lives.",
                gist1: "Providing professional cleaning services is more than just tidying up—it's about creating a space where people feel comfortable, safe, and productive.",
                gist2: "Effective cleaning involves understanding the unique needs of each client and space. By tailoring our approach to specific requirements, we ensure maximum cleanliness and hygiene.",
                advice: [
                  "Always use the right cleaning tools and eco-friendly products",
                  "Understand the client's needs and tailor your approach",
                  "Focus on high-touch areas to maintain hygiene",
                  "Maintain consistency to build trust",
                ],
              },
              {
                id: 39,
                title: "Showcasing the Benefits of Professional Cleaning",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
                date: "2025-12-05",
                author: "Cleaning Experts Team",
                quote: "A clean space is a productive space.",
                gist1: "Professional cleaning is more than aesthetics—it contributes to health, comfort, and efficiency.",
                gist2: "The goal of our cleaning services is to create spaces that are not only visually appealing but also safe and healthy.",
                advice: [
                  "Prioritize deep cleaning for high-use areas",
                  "Use safe, effective cleaning solutions",
                  "Pay attention to visible and hidden areas",
                  "Communicate with clients to meet expectations",
                ],
              },
              {
                id: 40,
                title: "Handling Challenging Cleaning Situations",
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
                date: "2025-12-05",
                author: "Cleaning Experts Team",
                quote: "Attention to detail makes all the difference.",
                gist1: "Some cleaning challenges require more than routine methods—they demand expertise and specialized equipment.",
                gist2: "Managing complex cleaning tasks requires preparation, knowledge, and the right products.",
                advice: [
                  "Identify areas needing special attention",
                  "Use specialized tools for difficult tasks",
                  "Plan your workflow for efficiency",
                  "Educate clients on maintenance tips",
                ],
              },
            ]}
          />
        </section>
      </div>

      {/* Bottom CTA */}
      <CTABanner />
    </div>
  );
};

export default InformationHub;
