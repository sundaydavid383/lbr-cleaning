import React, { useRef, useEffect, useState } from "react";
import "./about.css";
import star from  "../../assets/star.png"
import spark from  "../../assets/spark.png"
import heroimage1 from "../../assets/cleaner1.png"
import heroimage2 from "../../assets/cleaner2.png"
import heroimage3 from "../../assets/cleaner3.png"
import heroimage4 from "../../assets/cleaner4.png"
import image1 from "../../assets/about-intro.jpg"
import bgImage from "../../assets/cleaningbackground.jpg";
import Hero from "../../component/hero/Hero";
import team1 from "../../assets/user1.jpg";
import team2 from "../../assets/user2.jpg";
import team3 from "../../assets/user3.jpg";
import team4 from "../../assets/user4.jpg";

const About = () => {
  const aboutHeroSection = [
    {
      questions: "Best cleeny Agency",
      header: "Need cleeny? call",
      headerspan: "us today",
      ps: [
        "Welcome to our website! We're glad you're here. Our goal is to provide you with the best services and resources to help you achieve your goals.",
        "Explore our various pages to learn more about what we offer, from professional services to engaging blog posts and helpful resources. Whether you're looking for advice, inspiration, or solutions, we've got you covered!"
      ],
      sectionimage: heroimage1,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["call us", "Help us"],
      talksReport: "090125434"
    },  {
      questions: "Our Professional Cleaning Services",
      header: "We Clean and Protize",
      headerspan: " your satisfaction",
      ps: [
        "Our professional cleaning team uses state-of-the-art equipment and eco-friendly cleaning solutions to ensure the best results.",
        "From homes to offices, we deliver comprehensive cleaning services that meet your specific needs, leaving your space sparkling clean."
      ],
      sectionimage: heroimage2,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Book a cleaning", "clean today"],
      talksReport: "090876543"
    },
    {
      questions: "Our Commitment to Excellence",
      header: "Choose because?",
      headerspan: "We go the extra mile",
      ps: [
        "We believe in providing exceptional cleaning services that not only meet but exceed your expectations.",
        "Our dedicated team is always ready to help you with personalized services tailored to your specific cleaning needs."
      ],
      sectionimage: heroimage3,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Learn more", "free estimate"],
      talksReport: "090112233"
    },
    {
      questions: "About Us",
      header: "Who are we?",
      headerspan: "about our company",
      ps: [
        "We are a leading cleaning service provider committed to offering top-quality cleaning solutions tailored to your needs.",
        "Our team is passionate about delivering exceptional services with a focus on customer satisfaction and eco-friendly practices."
      ],
      sectionimage: heroimage4,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Contact us", "Get a quote"],
      talksReport: "090987654"
    }
  ];
  const introRef = useRef();
  const teamRef = useRef();
  const valuesRef = useRef();
  const videoRef = useRef()

  useEffect(() => {
  const sections = [introRef, teamRef, valuesRef, videoRef];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <main className="about-page">
      {/* Hero */}
  <Hero
  section={aboutHeroSection}
  features={[]} // Or pass some unique about-page features here
  backgroundImage={bgImage}
/>

      {/* Intro */}
      <section className="intro-section observe" ref={introRef}>
        <div className="intro-wrapper">
          <div className="intro-content">
            <h2>Who We Are</h2>
            <p>
              SparkleClean is a family-owned cleaning service committed to
              providing top-tier residential and commercial cleaning since 2010.
              Our mission is simple: bring sparkle, comfort, and peace of mind to
              every space we touch.
            </p>
            <p>
              With a team of trained and friendly professionals, we use
              eco-friendly products and modern equipment to ensure your spaces
              aren't just clean—but healthy and safe.
            </p>
          </div>

          <div className="intro-image">
            <img src={image1} alt="About SparkleClean" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section observe" ref={teamRef}>
        <h2>Meet Our Dedicated Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src={team1} alt="Jane" />
            <h3>Jane Doe</h3>
            <p>Lead Cleaning Specialist</p>
          </div>
          <div className="team-card">
            <img src={team2} alt="John" />
            <h3>John Smith</h3>
            <p>Equipment Manager</p>
          </div>
          <div className="team-card">
            <img src={team3} alt="Aisha" />
            <h3>Aisha Bello</h3>
            <p>Sanitation Consultant</p>
          </div>
          <div className="team-card">
            <img src={team4} alt="Emeka" />
            <h3>Emeka Okoro</h3>
            <p>Customer Relations</p>
          </div>
        </div>
      </section>


{/* Video & Info Section */}

<section className="video-info-section observe" ref={videoRef}>
  <div className="video-info-wrapper">
    <div className="video-container">
      <iframe
        src="https://www.youtube.com/embed/1Bsgv6DnTiI"
        title="LBR Cleaning Intro"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
    <div className="info-text">
      <h2>Why Choose LBR Cleaning?</h2>
      <p>
        At <strong>LBR Cleaning</strong>, we go beyond surface-level sparkle. We
        are a trusted, eco-conscious cleaning company dedicated to making homes
        and offices shine—inside and out.
      </p>
      <p>
        With years of expertise, highly trained staff, and a deep commitment to
        excellence, LBR Cleaning has earned a reputation for transforming spaces
        into healthy, inviting environments. Whether it's daily maintenance or
        deep cleaning, our solutions are personalized and reliable.
      </p>
      <p>
        Choose LBR Cleaning—where precision meets passion, and your peace of
        mind is our priority.
      </p>
    </div>
  </div>
</section> 
      {/* Core Values */}
      <section className="core-values-section observe" ref={valuesRef}>
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-broom"></i>
            <h3>Excellence</h3>
            <p>
              We strive to deliver spotless cleaning with attention to detail
              and high standards.
            </p>
          </div>
          <div className="value-card">
            <i className="fas fa-handshake"></i>
            <h3>Trust</h3>
            <p>
              We build long-term relationships with clients based on honesty and
              reliability.
            </p>
          </div>
          <div className="value-card">
            <i className="fas fa-leaf"></i>
            <h3>Eco-Friendliness</h3>
            <p>
              We use environmentally friendly products that are safe for your
              family and pets.
            </p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Teamwork</h3>
            <p>
              Our united team works together to ensure you always get the best
              results.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;