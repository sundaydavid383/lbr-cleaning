import React, { useRef, useEffect, useState } from "react";
import "./about.css";
import Hero from "../../component/hero/Hero";
import AboutTimeline from "../../component/aboutTimeline/AboutTimeline";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { AboutSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditableImage from "../../component/editable/EditableImage";
import EditableList from "../../component/editable/EditableList";
import EditSection from "../../component/editable/EditSection";
import { RichText, RICH_HELP, toEmbedUrl } from "../../utils/highlight";

const INTRO_KEY = "about_page.intro";

const About = () => {
  const ready = useCmsReady();
  const { isEditMode } = useEditMode();
  const introRef = useRef();
  const teamRef = useRef();
  const valuesRef = useRef();
  const videoRef = useRef();
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const slides = useCms("about_page.hero_slides", []);
  const background = useCms("about_page.background_image", "/assets/cleaningbackground.jpg");
  const intro = useCms(INTRO_KEY, {}) || {};
  const introImage = useCms("about_page.intro_image", "/assets/about-intro.jpg");
  const team = useCms("about_page.team", []);
  const values = useCms("about_page.values", []);
  const videoUrl = useCms("about_page.video_url", "");
  const videoParagraphs = useCms("about_page.video_paragraphs", []);

  useEffect(() => {
    if (!ready) return;

    const sections = [introRef, teamRef, valuesRef, videoRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          ref.current.classList.add("animate-in");
          observer.unobserve(ref.current);
        }
      }
    });

    return () => observer.disconnect();
  }, [ready]);

  if (!ready) {
    return <AboutSkeleton />;
  }

  const teamMembers = Array.isArray(team) ? team : [];
  const coreValues = Array.isArray(values) ? values : [];
  const introParas = Array.isArray(intro.paragraphs) ? intro.paragraphs : [];
  const videoParas = Array.isArray(videoParagraphs) ? videoParagraphs : [];
  const embed = toEmbedUrl(videoUrl);

  return (
    <main className="about-page">
      <Hero
        section={Array.isArray(slides) ? slides : []}
        features={[]}
        backgroundImage={background}
        slidesKey="about_page.hero_slides"
        backgroundKey="about_page.background_image"
      />

      <section className="intro-section observe" ref={introRef}>
        <div className="intro-wrapper">
          <div className="intro-content">
            <EditableText cmsKey={INTRO_KEY} root={intro} path="heading" value={intro.heading} as="h2" label="Heading" />
            <EditableList
              cmsKey={INTRO_KEY}
              root={intro}
              path="paragraphs"
              value={introParas}
              itemLabel="paragraph"
              label="Paragraphs"
              help={RICH_HELP}
              field={{ type: "list", itemLabel: "paragraph", itemField: { type: "textarea" }, label: "" }}
            >
              {(para, idx) => <RichText key={idx} text={para} as="p" />}
            </EditableList>
          </div>
          <div className="intro-image">
            <EditableImage cmsKey="about_page.intro_image" value={introImage} alt="About us" label="Intro picture" />
          </div>
        </div>
      </section>

      {(teamMembers.length > 0 || isEditMode) && (
        <section className="team-section observe" ref={teamRef}>
          <EditableText cmsKey="about_page.team_heading" value="Meet Our Dedicated Team" as="h2" label="Team heading" />
          <div className="team-grid">
            <EditableList
              cmsKey="about_page.team"
              value={teamMembers}
              itemLabel="team member"
              label="Team members"
              fields={[
                { key: "name", type: "text", label: "Name" },
                { key: "role", type: "text", label: "Job title" },
                { key: "image", type: "image", label: "Photo" },
              ]}
            >
              {(member, idx) => (
                <div key={idx} className="team-card">
                  {member.image && <img src={member.image} alt={member.name} />}
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              )}
            </EditableList>
          </div>
        </section>
      )}

      <section className="video-info-section observe" ref={videoRef}>
        <div className="video-info-wrapper">
          <div className="video-container" style={{ position: "relative" }}>
            <EditSection
              cmsKey="about_page.video_url"
              root=""
              label="video"
              icon="fa-video"
              help="Paste a YouTube or Vimeo link — a normal link from your browser's address bar works."
              field={{ type: "url", label: "Video link", placeholder: "https://www.youtube.com/watch?v=…" }}
            />
            {embed ? (
              <>
                {isVideoLoading && (
                  <div className="video-loader-overlay">
                    <div className="spinner"></div>
                    <p>Loading video...</p>
                  </div>
                )}
                <iframe
                  src={embed}
                  title="Company video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setIsVideoLoading(false)}
                  style={{
                    opacity: isVideoLoading ? 0 : 1,
                    transition: "opacity 0.3s ease-in-out",
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </>
            ) : (
              isEditMode && <p style={{ padding: "2rem", textAlign: "center" }}>No video yet.</p>
            )}
          </div>
          <div className="info-text">
            <EditableText cmsKey="about_page.video_heading" value="Why Choose LBR Cleaning?" as="h2" label="Heading" />
            <EditableList
              cmsKey="about_page.video_paragraphs"
              value={videoParas}
              itemLabel="paragraph"
              label="Paragraphs"
              help={RICH_HELP}
              field={{ type: "list", itemLabel: "paragraph", itemField: { type: "textarea" }, label: "" }}
            >
              {(para, idx) => <RichText key={idx} text={para} as="p" />}
            </EditableList>
          </div>
        </div>
      </section>

      {(coreValues.length > 0 || isEditMode) && (
        <section className="core-values-section observe" ref={valuesRef}>
          <EditableText cmsKey="about_page.values_heading" value="Our Core Values" as="h2" label="Values heading" />
          <div className="values-grid">
            <EditableList
              cmsKey="about_page.values"
              value={coreValues}
              itemLabel="value"
              label="Core values"
              fields={[
                { key: "icon", type: "icon", label: "Icon" },
                { key: "title", type: "text", label: "Title" },
                { key: "description", type: "textarea", label: "Description" },
              ]}
            >
              {(value, idx) => (
                <div key={idx} className="value-card">
                  <i className={value.icon}></i>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              )}
            </EditableList>
          </div>
        </section>
      )}

      <AboutTimeline />
    </main>
  );
};

export default About;
