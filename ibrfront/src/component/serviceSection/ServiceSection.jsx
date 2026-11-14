import React from "react";
import "./serviceSection.css";
import { Link } from "react-router-dom";
import { useEditMode } from "../../context/EditModeContext";
import { useCms } from "../../hooks/useCmsContent";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";
import { SERVICE_CARD_FIELDS, newServiceCard, serviceSlug } from "./serviceFields";

const ServiceSection = ({ services = [] }) => {
  const { isEditMode } = useEditMode();
  const title = useCms("service_page.section_title", "Our Services");
  const viewDetails = useCms("service_page.view_details_text", "View Details");

  return (
    <section className="service-section">
      <div className="service-header">
        <div className="first_te">
          <EditableText cmsKey="service_page.section_tag" value="What We Offer" as="h2" label="Small heading" />
          {isEditMode ? (
            <EditableText cmsKey="service_page.section_title" value={title} as="h1" label="Main heading" />
          ) : (
            <h1>
              {String(title || "").split("").map((char, i) => (
                <span key={i} style={{ "--i": i }}>{char === " " ? " " : char}</span>
              ))}
            </h1>
          )}
        </div>
        <EditableText cmsKey="service_page.section_subtitle" value="Discover our professional cleaning solutions for every need." as="p" label="Intro text" />
      </div>

      <div className="service-cards">
        <EditableList
          cmsKey="service_page.services"
          value={services}
          itemLabel="service"
          label="Services"
          help="Each service gets its own page. After adding one, open it with 'View Details' to fill in its page."
          field={{ type: "items", itemLabel: "service", fields: SERVICE_CARD_FIELDS, newItem: newServiceCard, label: "" }}
        >
          {(service, index) => (
            <div className="service-card" key={index}>
              <div className="service-image-wrap">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="service-image" />
                ) : (
                  <div className="service-image" style={{ background: "var(--light-backgound)" }} />
                )}
              </div>

              <div className="card-content">
                <h2>{service.title}</h2>

                <ul>
                  {(service.details || []).slice(0, 2).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <Link to={`/services/${serviceSlug(service)}`} className="card-link" data-cms-nav title={isEditMode ? "Open this service's page to edit it" : undefined}>
                  <p>
                    {viewDetails} <i className="fa-solid fa-arrow-right"></i>
                  </p>
                  <i className={service.icon}></i>
                </Link>
              </div>
            </div>
          )}
        </EditableList>
      </div>
      {isEditMode && (
        <p style={{ textAlign: "center" }}>
          Card link text: <EditableText cmsKey="service_page.view_details_text" value={viewDetails} label="Card link text" />
        </p>
      )}
    </section>
  );
};

export default ServiceSection;
