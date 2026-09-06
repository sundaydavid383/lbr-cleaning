import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUserGuide } from "../../context/UserGuideContext";
import "./userGuide.css";

const UserGuideOverlay = () => {
  const {
    active,
    currentSteps,
    currentStep,
    stepIndex,
    isFirst,
    isLast,
    next,
    prev,
    skip,
    restart,
  } = useUserGuide();
  const [targetRect, setTargetRect] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [targetExists, setTargetExists] = useState(false);
  const tooltipRef = useRef(null);
  const scrollEndTimerRef = useRef(null);

  const clearScrollTracking = useCallback(() => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    clearScrollTracking();

    if (!currentStep?.target) {
      setTargetRect(null);
      setTargetExists(false);
      setTooltipPos(null);
      return;
    }

    const el = document.querySelector(currentStep.target);

    if (!el) {
      setTargetRect(null);
      setTargetExists(false);
      setTooltipPos(null);
      return;
    }

    setTargetExists(true);

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    const waitForScroll = () => {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      const pad = 16;
      const tooltipWidth = 340;
      const estimatedTooltipHeight = tooltipRef.current?.offsetHeight || 220;

      const spaceBelow = window.innerHeight - rect.bottom - pad;
      const spaceAbove = rect.top - pad;

      let top;
      if (spaceBelow >= estimatedTooltipHeight || spaceAbove < spaceBelow) {
        top = rect.bottom + pad;
      } else {
        top = rect.top - estimatedTooltipHeight - pad;
      }

      top = Math.max(pad, Math.min(top, window.innerHeight - estimatedTooltipHeight - pad));

      let left = rect.left + rect.width / 2;
      left = Math.max(pad, Math.min(left - tooltipWidth / 2, window.innerWidth - tooltipWidth - pad));

      setTooltipPos({ top, left });
      clearScrollTracking();
    };

    if ("onscrollend" in window) {
      const onScrollEnd = () => {
        window.removeEventListener("scrollend", onScrollEnd);
        waitForScroll();
      };
      window.addEventListener("scrollend", onScrollEnd);
      scrollEndTimerRef.current = setTimeout(() => {
        window.removeEventListener("scrollend", onScrollEnd);
        waitForScroll();
      }, 800);
    } else {
      scrollEndTimerRef.current = setTimeout(waitForScroll, 400);
    }
  }, [currentStep, clearScrollTracking]);

  useEffect(() => {
    if (!active) {
      clearScrollTracking();
      return;
    }

    updatePosition();

    const onResize = () => updatePosition();
    const onScroll = () => updatePosition();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      clearScrollTracking();
    };
  }, [active, updatePosition, stepIndex, clearScrollTracking]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, next, prev, skip]);

  useEffect(() => {
    if (!active) {
      setTargetRect(null);
      setTooltipPos(null);
      setTargetExists(false);
    }
  }, [active]);

  if (!active || !currentStep || !targetExists) return null;

  const tooltipStyle = tooltipPos
    ? { top: tooltipPos.top, left: tooltipPos.left }
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <div className="ug-overlay" aria-live="polite">
      <div className="ug-backdrop" onClick={skip} />
      {targetExists && targetRect && (
        <div
          className={`ug-highlight${targetExists ? " ug-highlight--active" : ""}`}
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}
      <div
        ref={tooltipRef}
        className="ug-tooltip"
        style={tooltipStyle}
      >
        <div className="ug-tooltip-header">
          <div className="ug-icon">
            <i className={currentStep.icon || "fa-solid fa-circle-info"}></i>
          </div>
          <div className="ug-progress">
            <div className="ug-progress-track">
              <div
                className="ug-progress-fill"
                style={{ width: `${((stepIndex + 1) / currentSteps.length) * 100}%` }}
              />
            </div>
            <span className="ug-step-count">
              {stepIndex + 1} / {currentSteps.length}
            </span>
          </div>
        </div>
        <h3 className="ug-tooltip-title">{currentStep.title}</h3>
        <p className="ug-tooltip-desc">{currentStep.description}</p>
        <div className="ug-tooltip-actions">
          {!isFirst && (
            <button className="ug-btn ug-btn-ghost" onClick={prev}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
          )}
          <button className="ug-btn ug-btn-ghost" onClick={skip}>
            Skip Tour
          </button>
          <button className="ug-btn ug-btn-primary" onClick={next}>
            {isLast ? "Done" : "Next"} <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGuideOverlay;
