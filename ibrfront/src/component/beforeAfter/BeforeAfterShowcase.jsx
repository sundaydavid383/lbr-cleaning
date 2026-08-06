import React, { useState, useRef, useCallback, useEffect } from "react";
import "./beforeAfter.css";

const beforeAfterData = [
  {
    label: "Residential Deep Clean",
    beforeGradient: "linear-gradient(135deg, #e7e5e4 0%, #d6d3d1 40%, #a8a29e 100%)",
    afterGradient: "linear-gradient(135deg, #16a34a 0%, #19532f 60%, #0f7a37 100%)",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    label: "Office Space Sanitization",
    beforeGradient: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 40%, #d6d3d1 100%)",
    afterGradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 60%, #0d3b1e 100%)",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    label: "Post-Construction Cleanup",
    beforeGradient: "linear-gradient(135deg, #ca8a04 0%, #a16207 40%, #713f12 100%)",
    afterGradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 60%, #15803d 100%)",
    beforeLabel: "Before",
    afterLabel: "After",
  },
];

const BeforeAfterShowcase = () => {
  return (
    <section className="before-after-showcase">
      <div className="before-after-container">
        <div className="before-after-header">
          <h2 className="before-after-title">Real Transformations</h2>
          <p className="before-after-subtitle">See the LBR difference</p>
        </div>

        <div className="before-after-grid">
          {beforeAfterData.map((item, index) => (
            <BeforeAfterCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BeforeAfterCard = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const updateSlider = useCallback((clientX) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const onMouseDown = useCallback((e) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  }, [updateSlider]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  }, [isDragging, updateSlider]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onTouchStart = useCallback((e) => {
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  }, [updateSlider]);

  const onTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, [isDragging, updateSlider]);

  const onTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return (
    <div
      className="before-after-card"
      ref={cardRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="card-label">{item.label}</div>

      <div className="ba-images">
        <div
          className="ba-after"
          style={{ background: item.afterGradient }}
        />
        <div
          className="ba-before"
          style={{
            background: item.beforeGradient,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        />
      </div>

      <div
        className={`ba-slider-handle${isDragging ? " active" : ""}`}
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="ba-slider-line" />
        <div className="ba-slider-thumb">
          <i className="fa-solid fa-arrows-left-right"></i>
        </div>
        <div className="ba-slider-label before-label">{item.beforeLabel}</div>
        <div className="ba-slider-label after-label">{item.afterLabel}</div>
      </div>
    </div>
  );
};

export default BeforeAfterShowcase;