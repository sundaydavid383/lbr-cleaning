// filepath: ibrfront/src/component/statsSection/StatsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import "./statsSection.css";
import RecentActivity from "../recentActivity/RecentActivity";

const stats = [
  { label: "Years Experience", value: 8, suffix: "+", icon: "fa-solid fa-award" },
  { label: "Happy Clients", value: 2500, suffix: "+", icon: "fa-solid fa-face-smile" },
  { label: "Cleaning Projects", value: 15000, suffix: "+", icon: "fa-solid fa-broom" },
  { label: "Team Members", value: 120, suffix: "+", icon: "fa-solid fa-users" },
];

const AnimatedCounter = ({ end, duration, suffix, started }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <>{started ? value.toLocaleString() + suffix : "0" + suffix}</>;
};

const StatsSection = () => {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-wrapper">
        <div className="stats-header">
          <span className="section-tag">By the Numbers</span>
          <h2 className="stats-title">
            Trusted by <span className="highlight">Thousands</span> Across Nigeria
          </h2>
          <p className="stats-subtitle">
            Our track record speaks for itself. Here's what we've built through
            consistent, quality service.
          </p>
        </div>

        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index} style={{ animationDelay: `${index * 0.12}s` }}>
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  <AnimatedCounter
                    end={stat.value}
                    duration={2200}
                    suffix={stat.suffix}
                    started={started}
                  />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <RecentActivity />
      </div>
    </section>
  );
};

export default StatsSection;
