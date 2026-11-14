// filepath: ibrfront/src/component/statsSection/StatsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import "./statsSection.css";
import RecentActivity from "../recentActivity/RecentActivity";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import EditableList from "../editable/EditableList";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

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
  const ready = useCmsReady();
  const stats = useCms("homepage_stats.stats", []);
  const statsLoading = !ready;
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);
  const { isEditMode } = useEditMode();

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
  }, [statsLoading]);

  if (statsLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (!stats.length && !isEditMode) {
    return null;
  }

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-wrapper">
        <div className="stats-header">
          <EditableText cmsKey="homepage_stats.tag" value="By the Numbers" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="homepage_stats.title" value="Trusted by *Thousands* Across Nigeria" as="h2" className="stats-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
          <EditableText cmsKey="homepage_stats.subtitle" value="Our track record speaks for itself. Here's what we've built through consistent, quality service." as="p" className="stats-subtitle" label="Intro text" />
        </div>

        <div className="stats-container">
          <EditableList
            cmsKey="homepage_stats.stats"
            value={stats}
            itemLabel="number"
            label="Numbers"
            help="Each box counts up to the number when visitors scroll to it."
            fields={[
              { key: "icon", type: "icon", label: "Icon (optional)" },
              { key: "value", type: "number", label: "Number" },
              { key: "suffix", type: "text", label: "After the number (e.g. + or %)" },
              { key: "label", type: "text", label: "Label" },
            ]}
          >
            {(stat, index) => (
              <div className="stat-card" key={index} style={{ animationDelay: `${index * 0.12}s` }}>
                {stat.icon && (
                  <div className="stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                )}
                <div className="stat-content">
                  <span className="stat-number">
                    <AnimatedCounter end={Number(stat.value) || 0} duration={2200} suffix={stat.suffix || ""} started={started} />
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            )}
          </EditableList>
        </div>

        <RecentActivity />
      </div>
    </section>
  );
};

export default StatsSection;
