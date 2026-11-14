import React, { useState, useRef, useEffect, useCallback } from "react";
import "./testimonials.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import EditSection from "../editable/EditSection";
import EditZone from "../editable/EditZone";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const TESTIMONIAL_FIELDS = [
  { key: "name", type: "text", label: "Customer name" },
  { key: "image", type: "image", label: "Photo" },
  { key: "ratings", type: "select", label: "Star rating", options: [5, 4, 3, 2, 1].map((n) => ({ value: n, label: "★".repeat(n) + ` (${n})` })) },
  { key: "testimony", type: "textarea", label: "What they said" },
];

const Testimonial = () => {
  const ready = useCmsReady();
  const storedList = useCms("testimonials.list", []);
  const testimonialsData = Array.isArray(storedList) ? storedList : [];
  const testimonialsLoading = !ready;
  const background = useCms("testimonials.background", "");
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const isProgrammatic = useRef(false);
  const scrollEndTimer = useRef(null);
  const total = testimonialsData?.length || 0;
  const { isEditMode } = useEditMode();

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    isProgrammatic.current = true;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);

    clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => {
      isProgrammatic.current = false;
    }, 500);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = Math.min(prev + 1, total - 1);
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;

    const handleScroll = () => {
      if (isProgrammatic.current) return;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const cards = cardRefs.current;
        let closest = 0;
        let closestDist = Infinity;

        cards.forEach((card, i) => {
          if (!card) return;
          const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });

        setActiveIndex((prev) => (prev !== closest ? closest : prev));
        ticking = false;
      });
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [testimonialsLoading]);

  if (testimonialsLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  if (testimonialsData.length === 0 && !isEditMode) {
    return null;
  }

  return (
    <div className="testimonailImage" style={background ? { backgroundImage: `url(${background})` } : undefined}>
      <EditSection
        cmsKey="testimonials.background"
        root=""
        label="background picture"
        icon="fa-image"
        field={{ type: "image", label: "" }}
        help="The picture behind the customer reviews. Leave empty to use the original one."
      />
      <div className="Testimonial">
        <div className="title">
          <EditableText cmsKey="testimonials.tag" value="our services" as="span" label="Small tag" />
          <EditableText cmsKey="testimonials.title" value="What Our Clients Say" as="h2" label="Heading" />
        </div>

        <EditSection
          cmsKey="testimonials.list"
          root={testimonialsData}
          label={`customer reviews (${testimonialsData.length})`}
          icon="fa-star"
          help="Add, remove, reorder or change your customer reviews."
          field={{ type: "items", itemLabel: "review", fields: TESTIMONIAL_FIELDS, newItem: { name: "", image: "", ratings: 5, testimony: "" } }}
        />

        <EditZone
          className="testiment"
          cmsKey="testimonials.list"
          root={testimonialsData}
          label="Customer reviews"
          help="Add, remove, reorder or change your customer reviews."
          field={{ type: "items", itemLabel: "review", fields: TESTIMONIAL_FIELDS, newItem: { name: "", image: "", ratings: 5, testimony: "" } }}
        >
          <div className="testiment_frame">
            <div className="frame_status">
              <span className="dot" /> <EditableText cmsKey="testimonials.status_text" value="SYS_READY" label="Small status text" />
              <span className="tracker_mono">[{String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}]</span>
            </div>

            <div className="testimonial-track" ref={trackRef}>
              {testimonialsData?.map((t, index) => (
                <motion.div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`testimonialCard${index === activeIndex ? ' active' : ''}`}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="card_id">#{String(t.id || index + 1).padStart(2, '0')}</span>

                  <div className="testimoniallCardUpper">
                    <div className="image">
                      <img src={t.image} alt={t.name} />
                    </div>
                    <div className="imagetext">
                      <h2>{t.name}</h2>
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} color={i < (t.ratings || 5) ? "var(--tetiary-color)" : "rgba(255,255,255,0.2)"} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p>{t.testimony}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </EditZone>

        <div className="carousel_controls">
          <button
            className={`moveleft${activeIndex === 0 ? ' disabled' : ''}`}
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
          >
            <FaArrowLeft />
          </button>

          <div className="dots_track">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                className={`dot_item${i === activeIndex ? ' active' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={`moveright${activeIndex === total - 1 ? ' disabled' : ''}`}
            onClick={goNext}
            disabled={activeIndex === total - 1}
            aria-label="Next testimonial"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
