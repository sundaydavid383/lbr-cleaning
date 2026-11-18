import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUserGuide } from "../../context/UserGuideContext";
import "./userGuide.css";
import { useEditMode } from "../../context/EditModeContext";

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
  const { isEditMode } = useEditMode();
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

  const findTarget = useCallback(() => {
    if (!currentStep?.target) return null;
    // Pick the first matching element that is actually visible on the page.
    const all = [...document.querySelectorAll(currentStep.target)];
    return all.find((n) => n.getClientRects().length > 0 && n.offsetWidth > 0) || null;
  }, [currentStep]);

  // Measure the highlighted element and place the tip box where it covers
  // as little of it as possible. Never scrolls the page.
  const measure = useCallback(() => {
    const el = findTarget();
    if (!el) {
      setTargetExists(false);
      setTargetRect(null);
      setTooltipPos(null);
      return;
    }
    setTargetExists(true);

    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });

    const pad = 16;
    const navH = document.querySelector("nav, .nav, header")?.getBoundingClientRect().bottom || 0;
    const topLimit = Math.max(pad, Math.min(navH, 120) + 8);
    const tw = tooltipRef.current?.offsetWidth || Math.min(340, vw - 24);
    const th = tooltipRef.current?.offsetHeight || 220;
    const clampL = (x) => Math.max(pad, Math.min(x, vw - tw - pad));
    const clampT = (y) => Math.max(topLimit, Math.min(y, vh - th - pad));
    const midX = clampL(r.left + r.width / 2 - tw / 2);
    const midY = clampT(r.top + r.height / 2 - th / 2);

    // Candidates in order of preference: next to the element first, then the
    // screen corners (used when the element fills the whole screen).
    const candidates = [
      { top: r.bottom + pad, left: midX },
      { top: r.top - th - pad, left: midX },
      { top: midY, left: r.right + pad },
      { top: midY, left: r.left - tw - pad },
      { top: vh - th - pad, left: vw - tw - pad },
      { top: vh - th - pad, left: pad },
      { top: topLimit, left: vw - tw - pad },
      { top: topLimit, left: pad },
    ];

    const fits = (c) => c.top >= topLimit && c.left >= pad && c.top + th <= vh - pad && c.left + tw <= vw - pad;
    const overlap = (c) => {
      const x = Math.max(0, Math.min(c.left + tw, r.right) - Math.max(c.left, r.left));
      const y = Math.max(0, Math.min(c.top + th, r.bottom) - Math.max(c.top, r.top));
      return x * y;
    };

    let best = null;
    let bestScore = Infinity;
    candidates.forEach((c, i) => {
      if (!fits(c)) return;
      const score = overlap(c) * 10 + i; // least overlap wins; ties keep the preferred order
      if (score < bestScore) {
        bestScore = score;
        best = c;
      }
    });

    setTooltipPos(best || { top: clampT(vh - th - pad), left: clampL(vw - tw - pad) });
  }, [findTarget]);

  // When the step changes: scroll the element into view once, then measure.
  const goToTarget = useCallback(() => {
    clearScrollTracking();
    const el = findTarget();
    if (!el) {
      measure();
      return;
    }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const navH = Math.min(document.querySelector("nav, .nav, header")?.getBoundingClientRect().bottom || 0, 120);
    const alreadyVisible = r.top >= navH && r.bottom <= vh;
    if (!alreadyVisible) {
      // Tall sections: bring their top into view (just under the menu) so the
      // heading is visible; small ones: centre them.
      const tall = r.height > vh * 0.55;
      const y = window.scrollY + r.top - (tall ? navH + 12 : (vh - r.height) / 2);
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
    measure();

    const done = () => {
      window.removeEventListener("scrollend", done);
      clearScrollTracking();
      measure();
    };
    if ("onscrollend" in window) window.addEventListener("scrollend", done);
    scrollEndTimerRef.current = setTimeout(done, 900);
  }, [findTarget, measure, clearScrollTracking]);

  useEffect(() => {
    if (!active) {
      clearScrollTracking();
      return;
    }

    goToTarget();

    let frame = 0;
    const onChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange);
      clearScrollTracking();
    };
  }, [active, goToTarget, measure, stepIndex, clearScrollTracking]);

  // Re-place once the tip box has rendered and its real size is known.
  useEffect(() => {
    if (active && targetExists) {
      const id = requestAnimationFrame(measure);
      return () => cancelAnimationFrame(id);
    }
  }, [active, targetExists, stepIndex, measure]);

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

  // The tour would cover the page while an admin is editing.
  if (isEditMode || !active || !currentStep || !targetExists) return null;

  const tooltipStyle = tooltipPos
    ? { top: tooltipPos.top, left: tooltipPos.left }
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <div className="ug-overlay" aria-live="polite">
      <div className={`ug-backdrop${targetRect ? " ug-backdrop--clear" : ""}`} onClick={skip} />
      {targetExists && targetRect && (
        <div
          className="ug-highlight ug-highlight--active"
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
