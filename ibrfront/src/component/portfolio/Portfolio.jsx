import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './portfolio.css';
import img1 from "../../assets/cleaner11.jpg";
import img2 from "../../assets/cleaner12.jpg";
import img3 from "../../assets/cleaner14.jpg";
import img4 from "../../assets/cleaner13.jpg";
import img5 from "../../assets/cleaner15.jpg";
import img6 from "../../assets/cleaner16.jpg";
import img7 from "../../assets/cleaner17.jpg";
import img8 from "../../assets/cleaner18.jpg";

const cardsData = [
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
  const [activeIndex, setActiveIndex] = useState(0);
  const total = cardsData.length;
  const [direction, setDirection] = useState(0);
  const wrapperRef = useRef(null);
  const wheelCooldown = useRef(false);

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

  // Swipe / drag handling (covers touch on mobile + mouse-drag on desktop)
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 60;
    const velocityThreshold = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      moveRight();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      moveLeft();
    }
  };

  // Trackpad / mouse-wheel horizontal scroll support (desktop)
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const handleWheel = (e) => {
      // Only react to meaningfully horizontal intent
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

      setTimeout(() => {
        wheelCooldown.current = false;
      }, 500);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, [moveLeft, moveRight]);

  return (
    <div className="portfolio">
      <div className="portfolio_heading">
        <div className="title">
          <span className="priamry">our services</span>
          <h2 className="bright">Professional Cleaning Services</h2>
          <p className="tracker">
            Viewing service {activeIndex + 1} of {total}
          </p>
        </div>
        <div className="btn">
          <p>View all works <i className="fa-solid fa-arrow-right-long"></i></p>
        </div>
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
              <div className="person">{cardsData[activeIndex].name}</div>
              <img src={cardsData[activeIndex].img} alt={cardsData[activeIndex].name} draggable={false} />
              <div className="place">
                <span><i className='fas fa-location-dot'></i>{cardsData[activeIndex].location}</span>
                <p>{cardsData[activeIndex].name} - {cardsData[activeIndex].desc}</p>
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