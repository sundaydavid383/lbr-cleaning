import React, { useState, useRef, useEffect } from "react";
import "./contact.css";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

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
    btnText: "Apply Now",
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
    btnText: "Apply Now",
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
    btnText: "Apply Now",
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
    btnText: "Apply Now",
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
    btnText: "Apply Now",
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
    btnText: "Apply Now",
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
    btnText: "Apply Now",
  },
];

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const nextService = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 340;
      const nextIndex = (activeIndex + 1) % services.length;
      setActiveIndex(nextIndex);
      container.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevService = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 340;
      const prevIndex = activeIndex - 1 < 0 ? services.length - 1 : activeIndex - 1;
      setActiveIndex(prevIndex);
      container.scrollTo({
        left: prevIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 340;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

  return (
    <div className="contact" id="contact">
      {/* Decorative bubbles */}
      {[...Array(11)].map((_, i) => (
        <div className={`bubble b${i + 1}`} key={i}>
          <small></small>
        </div>
      ))}

      {/* Hero Header */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-badge">Our Services</span>
          <h1>Professional Cleaning <span className="highlight">Solutions</span></h1>
          <p>From homes to offices, we deliver spotless results with eco-friendly products and trained professionals.</p>
          <Link to="/apply" className="contact-cta-btn">
            Apply for Service <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      {/* Services Carousel */}
      <div className="contact_service">
        <div className="title">
          <span>What We Offer</span>
          <h2>Explore Our Cleaning Services</h2>
        </div>

        <div className="service-holder-wrapper">
          <button onClick={prevService} className="carousel-btn left" aria-label="Previous service">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="services-container" ref={scrollContainerRef}>
            {services.map((serviceItem, index) => (
              <div
                className={`single_service_display ${index === activeIndex ? "active" : ""}`}
                key={serviceItem.id}
              >
                <div className="service">
                  <img src={serviceItem.image} alt={serviceItem.title} loading="lazy" />
                  <div className="text">
                    <div className="h2">
                      <i className={serviceItem.icon}></i> {serviceItem.title}
                    </div>
                    <p className="service-desc">{serviceItem.description}</p>
                    <ul>
                      {serviceItem.features?.map((f, i) => (
                        <li key={i}>
                          <i className={f.icon}></i>
                          <p>{f.text}</p>
                        </li>
                      ))}
                    </ul>
                    <Link to="/apply" className="service-apply-btn">
                      {serviceItem.btnText} <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextService} className="carousel-btn right" aria-label="Next service">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Why Choose Us Strip */}
      <div className="contact-why-us">
        <div className="why-us-item">
          <i className="fa-solid fa-shield-halved"></i>
          <span>Fully Insured</span>
        </div>
        <div className="why-us-item">
          <i className="fa-solid fa-leaf"></i>
          <span>Eco-Friendly</span>
        </div>
        <div className="why-us-item">
          <i className="fa-solid fa-clock"></i>
          <span>Flexible Schedule</span>
        </div>
        <div className="why-us-item">
          <i className="fa-solid fa-star"></i>
          <span>Satisfaction Guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
