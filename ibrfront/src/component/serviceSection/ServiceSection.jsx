import React from "react";
import "./serviceSection.css";
import { Link } from "react-router-dom";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";

const ServiceSection = ({ services }) => {
  const { isEditMode } = useEditMode();

  return (
    <section className="service-section">
      <div className="service-header">
        <div className="first_te">
          {isEditMode ? (
            <>
              <EditableText cmsKey="service_page.section_tag" type="text" value="What We Offer" as="h2" />
              <EditableText cmsKey="service_page.section_title" type="text" value="Our Services" as="h1" />
            </>
          ) : (
            <>
              <h2>What We Offer</h2>
              <h1>
                {"Our Services".split("").map((char, i) => (
                  <span key={i} style={{ "--i": i }}>{char === " " ? "\u00A0" : char}</span>
                ))}
              </h1>
            </>
          )}
        </div>
        {isEditMode ? (
          <EditableText cmsKey="service_page.section_subtitle" type="text" value="Discover our professional cleaning solutions for every need." as="p" />
        ) : (
          <p>Discover our professional cleaning solutions for every need.</p>
        )}
      </div>

      <div className="service-cards">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-image-wrap">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
            </div>

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