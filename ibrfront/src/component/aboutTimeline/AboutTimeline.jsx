// filepath: ibrfront/src/component/aboutTimeline/AboutTimeline.jsx
import React from "react";
import "./aboutTimeline.css";
import { FaFlag, FaStar, FaUsers, FaBuilding } from "react-icons/fa6";

const milestones = [
  {
    year: "2018",
    icon: <FaFlag />,
    title: "Founded",
    description:
      "LBR Cleaning was founded with a simple mission: to bring professional, reliable cleaning to Nigerian homes and offices.",
  },
  {
    year: "2020",
    icon: <FaStar />,
    title: "500+ Clients",
    description:
      "Reached our first 500 satisfied clients across Lagos. Expanded our team to 25 trained professionals.",
  },
  {
    year: "2023",
    icon: <FaUsers />,
    title: "Community Impact",
    description:
      "Launched community cleaning initiatives and trained over 50 women in eco-friendly cleaning practices.",
  },
  {
    year: "2025",
    icon: <FaBuilding />,
    title: "Platform Launch",
    description:
      "Launching the digital platform to make booking, payments, and scheduling seamless for everyone.",
  },
];

const AboutTimeline = () => {
  return (
    <section className="about-timeline">
      <div className="about-timeline-container">
        <div className="about-timeline-header">
          <span className="section-tag">Our Journey</span>
          <h2 className="section-title">
            From Local Trust to <span className="highlight">Digital Innovation</span>
          </h2>
          <p className="section-subtitle">
            Every milestone reflects our commitment to quality, community, and growth.
          </p>
        </div>

        <div className="timeline-track">
          {milestones.map((milestone, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-marker">
                <div className="timeline-icon">{milestone.icon}</div>
                <div className="timeline-year">{milestone.year}</div>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
