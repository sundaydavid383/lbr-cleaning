import React, { useEffect, useState, useRef, useCallback } from "react";
import "./hero.css";
import Feature from "../feature/Feature";
import { Link } from "react-router-dom";
import fallbackImage from "../../assets/about-intro.jpg";

const Hero = ({ section, features, backgroundImage, backgroundVideo }) => {
  const [printedTalk, setPrintedTalk] = useState(0);
  const [printedSection, setPrintedSection] = useState(0);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  // Rotating talks
  useEffect(() => {
    const interval = setInterval(() => {
      setPrintedTalk((prev) => {
        const currentTalks = section[printedSection]?.talks || [];
        if (currentTalks.length === 0) return 0;
        return (prev + 1) % currentTalks.length;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [section, printedSection]);

  // Auto-advance slides
  useEffect(() => {
    if (section.length <= 1) return;
    const interval = setInterval(() => {
      setPrintedSection((prev) => (prev + 1) % section.length);
    }, 44000);
    return () => clearInterval(interval);
  }, [section.length]);

  // Reset talk when slide changes
  useEffect(() => {
    setPrintedTalk(0);
  }, [printedSection]);

  const handleNext = useCallback(() => {
    setPrintedSection((prev) => (prev + 1) % section.length);
  }, [section.length]);

  const handlePrev = useCallback(() => {
    setPrintedSection((prev) => (prev - 1 + section.length) % section.length);
  }, [section.length]);

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      deltaX > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse drag
  const onMouseDown = (e) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };

  const onMouseMove = (e) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  };

  const onMouseUp = (e) => {
    if (!isDragging.current || dragStartX.current === null) {
      dragStartX.current = null;
      return;
    }
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? handleNext() : handlePrev();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  const page = section[printedSection];
  if (!page) return null;

  return (
    <div
      className="hero"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* Background */}
      {backgroundVideo ? (
        <div className="background-video-wrapper">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
            src={backgroundVideo}
            poster={fallbackImage}
          />
        </div>
      ) : (
        <div
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Bubbles */}
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className={`bubble b${i + 1}`}>
          <small></small>
        </div>
      ))}

      {/* Arrow navigation */}
      {section.length > 1 && (
        <>
          <div onClick={handlePrev} className="moveleft iconactive" aria-label="Previous slide">
            <i className="fa-solid fa-arrow-left-long"></i>
          </div>
          <div onClick={handleNext} className="moveright iconactive" aria-label="Next slide">
            <i className="fa-solid fa-arrow-right-long"></i>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="container columnreverseonmobile">
        <div className="text">
          <div className="question">{page.questions}</div>
          <h1>
            {page.header}
            <span>{page.headerspan}</span>
          </h1>
          <div className="ps">
            {page.ps.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link to="/contact" className="btn">
            <p>
              contact us <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </Link>
        </div>

        <div className="image">
          <img className="person" src={page.sectionimage} alt="Cleaning professional" />
          <img className="stars" src={page.sectionimageStar} alt="" aria-hidden="true" />
          <img className="spark" src={page.sectionimageSpark} alt="" aria-hidden="true" />
          <div className="speech">
            <div className="circle">
              <p>{page.talks?.[printedTalk] || ""}</p>
              <h3>
                <i className="fa-solid fa-phone-volume"></i>
                {page.talksReport}
              </h3>
            </div>
            <div className="cone">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      {section.length > 1 && (
        <div className="hero-dots">
          {section.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === printedSection ? " active" : ""}`}
              onClick={() => setPrintedSection(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Feature strip */}
      <Feature features={features} />
    </div>
  );
};

export default Hero;