import React, { useRef, useEffect } from "react";
import "./about.css";
import image1 from "../../assets/about-intro.jpg";
import bgImage from "../../assets/cleaningbackground.jpg";
import Hero from "../../component/hero/Hero";
import AboutTimeline from "../../component/aboutTimeline/AboutTimeline";
import team1 from "../../assets/user1.jpg";
import team2 from "../../assets/user2.jpg";
import team3 from "../../assets/user3.jpg";
import team4 from "../../assets/user4.jpg";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { AboutSkeleton } from "../../component/pageSkeleton/PageSkeleton";

const About = () => {
  const { value: aboutContent, loading: aboutLoading } = useCmsCategory("about_page", {});
  const introRef = useRef();
  const teamRef = useRef();
  const valuesRef = useRef();
  const videoRef = useRef();

  // This must run on every render, in the same position, no matter what
  // aboutLoading/aboutContent are — that's why it sits above both early
  // returns below. Putting it after them (as it was) meant this hook
  // simply didn't run on the loading render, then suddenly did run once
  // content arrived — a different number of hooks between renders, which
  // is exactly what "Rendered more hooks than during the previous render"
  // is warning about.
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

  const aboutHeroSection = aboutContent.hero_slides || [];
  const teamMembers = aboutContent.team || [];
  const coreValues = aboutContent.values || [];
  const introText = aboutContent.intro || {};

  if (aboutLoading) {
    return <AboutSkeleton />;
  }

  if (!aboutContent) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No content available. Please configure the CMS.</p>
      </div>
    );
  }

  return (
    <main className="about-page">
      {aboutHeroSection.length > 0 && (
        <Hero section={aboutHeroSection} features={[]} backgroundImage={bgImage} />
      )}

      {introText && (
        <section className="intro-section observe" ref={introRef}>
          <div className="intro-wrapper">
            <div className="intro-content">
              <h2>{introText.heading}</h2>
              {introText.paragraphs?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <div className="intro-image">
              <img src={image1} alt="About LBR Cleaning" />
            </div>
          </div>
        </section>
      )}

      {teamMembers.length > 0 && (
        <section className="team-section observe" ref={teamRef}>
          <h2>Meet Our Dedicated Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="video-info-section observe" ref={videoRef}>
        <div className="video-info-wrapper">
          <div className="video-container">
            <iframe
              src={aboutContent.video_url}
              title="LBR Cleaning Intro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="info-text">
            <h2>{aboutContent.video_heading}</h2>
            {aboutContent.video_paragraphs?.map((para, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </div>
      </section>

      {coreValues.length > 0 && (
        <section className="core-values-section observe" ref={valuesRef}>
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {coreValues.map((value, idx) => (
              <div key={idx} className="value-card">
                <i className={value.icon}></i>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <AboutTimeline />
    </main>
  );
};

export default About;