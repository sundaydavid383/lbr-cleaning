import { useState, useEffect } from "react";
import "./testimonialCarousel.css"

 const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  return (
    <section className="testimonial-section styled-carousel">
      <h2 className="section-title">What Our Clients Say</h2>

      <div className="testimonial-wrapper">
        <button className="carousel-btn left" onClick={prevSlide}>❮</button>

        <div className="testimonial-card">
          <i className="fa-solid fa-quote-left quote-icon"></i>
          <div className="testimonial-author">
  <img src={testimonials[current].image} alt={testimonials[current].author} />
  <span>{testimonials[current].author}</span>
</div>
          <blockquote>“{testimonials[current].quote}”</blockquote>
          <p className="testimonial-author">{testimonials[current].author}</p>
        </div>

        <button className="carousel-btn right" onClick={nextSlide}>❯</button>
      </div>

      <div className="carousel-dots">
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${current === idx ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

 export default TestimonialCarousel 
