import React, { useState, useRef, useEffect, useCallback } from "react";
import "./testimonials.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import testimonial1 from "../../assets/user1.jpg";
import testimonial3 from "../../assets/user2.jpg";
import testimonial4 from "../../assets/user3.jpg";
import testimonial2 from "../../assets/user4.jpg";
import testimonial5 from "../../assets/user5.jpg";
import testimonial6 from "../../assets/user6.jpg";
import { FaStar, FaInstagram, FaFacebookF, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    facebookLink: "https://www.facebook.com/adegoke.folarin.37/",
    instagramLink: "https://www.instagram.com/adegokefolarin/",
    name: "Folarin Adegoke",
    image: testimonial1,
    ratings: 5,
    testimony:
      "I am glad to be here for the retreat. Ever since I started attending, I've experienced significant changes in my life. At 14, I aspired to achieve the top position in my class with a perfect score. During the retreat, I poured out my heart to God about this desire, and He answered my prayer. I am grateful to God.",
  },
  {
    id: 2,
    facebookLink: "https://www.facebook.com/bruno.emeka.79/",
    instagramLink: "https://www.instagram.com/brunoemeka/",
    name: "Emeka Bruno",
    image: testimonial2,
    ratings: 4,
    testimony:
      "Participating in the retreat has been a transformative experience. Starting at 14, I sought academic excellence, aiming for the top position with a perfect score. Through heartfelt prayers during the retreat, God granted my request. I am deeply thankful.",
  },
  {
    id: 3,
    facebookLink: "https://www.facebook.com/gracious.clara/",
    instagramLink: "https://www.instagram.com/graciousclara/",
    name: "Gracious Clara",
    image: testimonial3,
    ratings: 5,
    testimony:
      "Attending the retreat has brought profound changes to my life. At 14, I desired to be the top student with a 100% mark. During the retreat, I earnestly prayed to God, and He answered my prayers. I am immensely grateful.",
  },
  {
    id: 4,
    facebookLink: "https://www.facebook.com/alex.rashford/",
    instagramLink: "https://www.instagram.com/alexrashford/",
    name: "Alex Rashford",
    image: testimonial4,
    ratings: 4,
    testimony:
      "The retreat has been a blessing. Since I began attending at 14, I've seen remarkable improvements in my life. I prayed fervently for academic success, and God responded graciously. I am thankful beyond words.",
  },
  {
    id: 5,
    facebookLink: "https://www.facebook.com/alakantara.john/",
    instagramLink: "https://www.instagram.com/alakantarajohn/",
    name: "Alakantara John",
    image: testimonial5,
    ratings: 4,
    testimony:
      "Being part of the retreat has been life-changing. At 14, I aimed for academic excellence. Through sincere prayers during the retreat, God granted my desires. I am profoundly grateful.",
  },
  {
    id: 6,
    facebookLink: "https://www.facebook.com/hernadez.jose/",
    instagramLink: "https://www.instagram.com/hernadezjose/",
    name: "Hernandez Jose",
    image: testimonial6,
    ratings: 5,
    testimony:
      "The retreat has positively impacted my life. Starting at 14, I aspired for top academic honors. Through earnest prayers during the retreat, God fulfilled my wishes. I am deeply appreciative.",
  },
];

const PrintStar = (ratings) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= ratings ? "solid" : "regular");
  }
  return stars;
};

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const isProgrammatic = useRef(false);
  const scrollEndTimer = useRef(null);
  const total = testimonials.length;

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    isProgrammatic.current = true;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);

    // release the programmatic lock once the browser settles
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
  }, [scrollToIndex]);

  // Sync active index + button state while the user swipes/trackpads natively
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
  }, []);

  return (
    <div className="testimonailImage">
      <div className="Testimonial">
        <div className="title">
          <span>our services</span>
          <h2>Professional Cleaning Services</h2>
        </div>

        <div className="testiment">
          <div className="testiment_frame">
            <div className="frame_status">
              <span className="dot" /> SYS_READY
              <span className="tracker_mono">[{String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}]</span>
            </div>

            <div className="testimonial-track" ref={trackRef}>
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`testimonialCard${index === activeIndex ? ' active' : ''}`}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="card_id">#{String(t.id).padStart(2, '0')}</span>

                  <div className="testimoniallCardUpper">
                    <div className="image">
                      <img src={t.image} alt={t.name} />
                    </div>
                    <div className="imagetext">
                      <h2>{t.name}</h2>
                      <div className="stars">
                        {PrintStar(t.ratings).map((star, i) => (
                          <FaStar key={i} color={star === "solid" ? "var(--tetiary-color)" : "rgba(255,255,255,0.2)"} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p>{t.testimony}</p>

                  <div className="link">
                    <Link className="iconactive" target="_blank" to={t.instagramLink}>
                      <FaInstagram />
                    </Link>
                    <Link className="iconactive" target="_blank" to={t.facebookLink}>
                      <FaFacebookF />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

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
            {testimonials.map((_, i) => (
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