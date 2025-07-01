import React from "react";
import "./serviceSection.css";
import { Link } from "react-router-dom";

const ServiceSection = ({ services }) => {
  return (
    <section className="service-section">
      <div className="service-header">
        <div className="first_te">
          <h2>What We Offer</h2>
          <h1>Our Services</h1>
        </div>
        <p>Discover our professional cleaning solutions for every need.</p>
      </div>

      <div className="service-cards">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />

            <div className="card-content">
              <h2>{service.title}</h2>

              <ul>
                {service.details.slice(0, 2).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <Link to={`/services/${service.id}`} className="card-link">
                <p>
                  View Details <i className="fa-solid fa-arrow-right"></i>
                </p>
                <i className={service.icon}></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;