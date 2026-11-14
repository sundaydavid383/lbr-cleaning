import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './portfolio.css';
const img1 = "/assets/cleaner11.jpg";
const img2 = "/assets/cleaner12.jpg";
const img3 = "/assets/cleaner14.jpg";
const img4 = "/assets/cleaner13.jpg";
const img5 = "/assets/cleaner15.jpg";
const img6 = "/assets/cleaner16.jpg";
const img7 = "/assets/cleaner17.jpg";
const img8 = "/assets/cleaner18.jpg";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditSection from "../../component/editable/EditSection";
import { useCms } from "../../hooks/useCmsContent";

const DEFAULT_CARDS = [
  { name: "John Doe", img: img1, location: "New York, USA", desc: "Residential Cleaning Specialist" },
  { name: "Jane Smith", img: img2, location: "London, UK", desc: "Office Cleaning Expert" },
  { name: "Michael Johnson", img: img3, location: "Toronto, Canada", desc: "Deep Cleaning Specialist" },
  { name: "Alice Brown", img: img4, location: "Sydney, Australia", desc: "Post-Construction Cleaning" },
  { name: "David Wilson", img: img5, location: "Berlin, Germany", desc: "Move-in/Move-out Cleaning" },
  { name: "Emma Davis", img: img6, location: "Paris, France", desc: "Carpet and Upholstery Cleaning" },
  { name: "Chris Lee", img: img7, location: "Tokyo, Japan", desc: "Window and Glass Cleaning" },
  { name: "Mr Love", img: img8, location: "Newcastle, UK", desc: "Window and Glass Cleaning" },
];

const Portfolio = () => {
  const stored = useCms("portfolio.cards", DEFAULT_CARDS);
  const cardsData = Array.isArray(stored) && stored.length ? stored : DEFAULT_CARDS;
  const total = cardsData.length;
  const trackerText = useCms("portfolio.tracker", "Viewing service {n} of {total}");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const wrapperRef = useRef(null);
  const wheelCooldown = useRef(false);
  const wheelTimer = useRef(null);
  const { isEditMode } = useEditMode();

  const moveLeft = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev > 0) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const moveRight = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev < total - 1) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, [total]);

  const handleDragEnd = useCallback((event, info) => {
    const swipeThreshold = 60;
    const velocityThreshold = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      moveRight();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      moveLeft();
    }
  }, [moveLeft, moveRight]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < 15) return;

      e.preventDefault();

      if (wheelCooldown.current) return;
      wheelCooldown.current = true;

      if (e.deltaX > 0) {
        moveRight();
      } else {
        moveLeft();
      }

      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelCooldown.current = false;
      }, 500);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [moveLeft, moveRight]);

  return (
    <div className="portfolio">
      <div className="portfolio_heading">
        <div className="title">
          <EditableText cmsKey="portfolio.tag" value="our work" as="span" className="priamry" label="Small tag" />
          <EditableText cmsKey="portfolio.title" value="Portfolio" as="h2" className="bright" label="Heading" />
          <p className="tracker">
            {String(trackerText || "").replace("{n}", activeIndex + 1).replace("{total}", total)}
          </p>
        </div>
        <EditSection
          label="Portfolio"
          icon="fa-images"
          items={[
            {
              cmsKey: "portfolio.cards",
              root: DEFAULT_CARDS,
              label: `Cards (${total})`,
              field: {
                type: "items",
                itemLabel: "card",
                label: "",
                fields: [
                  { key: "name", type: "text", label: "Name" },
                  { key: "img", type: "image", label: "Picture" },
                  { key: "location", type: "text", label: "Location" },
                  { key: "desc", type: "text", label: "Description" },
                ],
                newItem: { name: "", img: "", location: "", desc: "" },
              },
            },
            {
              cmsKey: "portfolio.tracker",
              root: "Viewing service {n} of {total}",
              label: "Counter text",
              help: "{n} becomes the current card number and {total} the number of cards.",
              field: { type: "text", label: "Counter text" },
            },
          ]}
        />
      </div>

      <div className="portfolio_holder">
        {activeIndex > 0 && (
          <div className="moveleft iconactive" onClick={moveLeft}>
            <i className="fa-solid fa-arrow-left-long"></i>
          </div>
        )}

        <div className="portfolio_card_wrapper" ref={wrapperRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="portfolio_card"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{ cursor: 'grab', touchAction: 'pan-y' }}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <div className="person">{cardsData[Math.min(activeIndex, total - 1)]?.name}</div>
              <img src={cardsData[Math.min(activeIndex, total - 1)]?.img} alt={cardsData[Math.min(activeIndex, total - 1)]?.name} draggable={false} />
              <div className="place">
                <span><i className='fas fa-location-dot'></i>{cardsData[Math.min(activeIndex, total - 1)]?.location}</span>
                <p>{cardsData[Math.min(activeIndex, total - 1)]?.name} - {cardsData[Math.min(activeIndex, total - 1)]?.desc}</p>
                <i className="fa-solid fa-circle-arrow-right"></i>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {activeIndex < total - 1 && (
          <div className="moveright iconactive" onClick={moveRight}>
            <i className="fa-solid fa-arrow-right-long"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
