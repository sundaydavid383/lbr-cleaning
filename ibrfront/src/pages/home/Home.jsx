import React from 'react'
import Hero from '../../component/hero/Hero'
import StatsSection from '../../component/statsSection/StatsSection'
import WhyChooseUs from '../../component/whyChooseUs/WhyChooseUs'
import Testimonial from '../../component/testimonials/Testimonials'
import CTABanner from '../../component/ctaBanner/CTABanner'
import { Link } from 'react-router-dom';
import "./home.css"
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { HomeSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";
import EditSection from "../../component/editable/EditSection";

const HOW_KEY = "home.how_it_works";
const AREAS_KEY = "home.coverage_areas";
const GUARANTEE_KEY = "home.guarantee";

const Home = () => {
  const ready = useCmsReady();
  const { isEditMode } = useEditMode();

  const slides = useCms("home.hero_slides", []);
  const features = useCms("homepage.features", []);
  const backgroundImage = useCms("home.background_image", "/assets/cleaningbackground.jpg");
  const backgroundVideo = useCms("home.background_video", "");
  const how = useCms(HOW_KEY, {});
  const areas = useCms(AREAS_KEY, {});
  const guarantee = useCms(GUARANTEE_KEY, {});
  const sections = useCms("home.sections", {});

  if (!ready) {
    return <HomeSkeleton />;
  }

  // Admins can switch whole sections off (they stay visible while editing).
  const show = (name) => isEditMode || sections?.[name] !== false;

  const howSteps = Array.isArray(how?.steps) ? how.steps : [];
  const areaList = Array.isArray(areas?.list) ? areas.list : [];
  const guaranteeItems = Array.isArray(guarantee?.items) ? guarantee.items : [];

  const T = (cmsKey, root, path, as, props = {}) => (
    <EditableText cmsKey={cmsKey} root={root} path={path} value={root?.[path]} as={as} {...props} />
  );

  return (
    <div>
      {isEditMode && (
        <EditSection
          cmsKey="home.sections"
          label="which sections show on this page"
          icon="fa-eye"
          help="Switch a section off to hide it from visitors. Hidden sections still show while you are editing."
          fields={[
            { key: "stats", type: "boolean", label: "Numbers (stats)", onText: "Shown", offText: "Hidden" },
            { key: "why_choose_us", type: "boolean", label: "Why choose us", onText: "Shown", offText: "Hidden" },
            { key: "testimonials", type: "boolean", label: "Customer reviews", onText: "Shown", offText: "Hidden" },
            { key: "cta_banner", type: "boolean", label: "Call-to-action banner", onText: "Shown", offText: "Hidden" },
            { key: "how_it_works", type: "boolean", label: "How it works", onText: "Shown", offText: "Hidden" },
            { key: "areas", type: "boolean", label: "Areas we serve", onText: "Shown", offText: "Hidden" },
            { key: "guarantee", type: "boolean", label: "Our guarantee", onText: "Shown", offText: "Hidden" },
          ]}
          root={{ stats: true, why_choose_us: true, testimonials: true, cta_banner: true, how_it_works: true, areas: true, guarantee: true, ...sections }}
        />
      )}

      <Hero
        section={slides}
        features={features}
        backgroundImage={backgroundImage}
        backgroundVideo={backgroundVideo}
        slidesKey="home.hero_slides"
        featuresKey="homepage.features"
        backgroundKey="home.background_image"
        videoKey="home.background_video"
      />
      {show("stats") && <StatsSection />}
      {show("why_choose_us") && <WhyChooseUs />}
      {show("testimonials") && <Testimonial />}
      {show("cta_banner") && <CTABanner />}

      {show("how_it_works") && (howSteps.length > 0 || isEditMode) && (
        <section className="home-how-it-works">
          <div className="home-how-it-works-container">
            <div className="section-header">
              {T(HOW_KEY, how, "tag", "span", { className: "section-tag", label: "Small tag" })}
              {T(HOW_KEY, how, "title", "h2", { label: "Heading" })}
              {T(HOW_KEY, how, "subtitle", "p", { label: "Intro text" })}
            </div>
            <div className="how-it-works-grid">
              <EditableList
                cmsKey={HOW_KEY}
                root={how}
                path="steps"
                value={howSteps}
                itemLabel="step"
                label="How it works — steps"
                fields={[
                  { key: "icon", type: "icon", label: "Icon" },
                  { key: "title", type: "text", label: "Step title" },
                  { key: "description", type: "textarea", label: "Description" },
                ]}
              >
                {(step, idx) => (
                  <div key={idx} className="how-step">
                    <div className="how-step-number">{idx + 1}</div>
                    <div className="how-step-icon"><i className={step.icon}></i></div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                )}
              </EditableList>
            </div>
          </div>
        </section>
      )}

      {show("areas") && (areaList.length > 0 || isEditMode) && (
        <section className="home-areas">
          <div className="home-areas-container">
            <div className="section-header">
              {T(AREAS_KEY, areas, "tag", "span", { className: "section-tag", label: "Small tag" })}
              {T(AREAS_KEY, areas, "title", "h2", { label: "Heading" })}
              {T(AREAS_KEY, areas, "subtitle", "p", { label: "Intro text" })}
            </div>
            <div className="areas-grid">
              <EditableList cmsKey={AREAS_KEY} root={areas} path="list" value={areaList} itemLabel="area" label="Areas we serve" fields={[]}>
                {(area, i) => (
                  <div key={`${area}-${i}`} className="area-card">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{area}</span>
                  </div>
                )}
              </EditableList>
            </div>
            <p className="areas-note">
              {T(AREAS_KEY, areas, "note", "span", { label: "Note" })}{" "}
              <Link to="/contact">{T(AREAS_KEY, areas, "note_link_text", "span", { label: "Link text" })}</Link>{" "}
              <EditableText cmsKey={AREAS_KEY} root={areas} path="note_suffix" value={areas?.note_suffix ?? "— we're always expanding."} label="Text after the link" />
            </p>
          </div>
        </section>
      )}

      {show("guarantee") && (guaranteeItems.length > 0 || isEditMode) && (
        <section className="home-guarantee">
          <div className="home-guarantee-container">
            <div className="guarantee-content">
              {T(GUARANTEE_KEY, guarantee, "tag", "span", { className: "section-tag", label: "Small tag" })}
              {T(GUARANTEE_KEY, guarantee, "title", "h2", { label: "Heading" })}
              {T(GUARANTEE_KEY, guarantee, "description", "p", { label: "Description" })}
              <ul className="guarantee-list">
                <EditableList cmsKey={GUARANTEE_KEY} root={guarantee} path="items" value={guaranteeItems} itemLabel="promise" label="Guarantee promises" fields={[]} itemWrapperTag="li">
                  {(item, idx) =>
                    isEditMode ? (
                      <React.Fragment key={idx}><i className="fa-solid fa-check-circle"></i> {item}</React.Fragment>
                    ) : (
                      <li key={idx}><i className="fa-solid fa-check-circle"></i> {item}</li>
                    )
                  }
                </EditableList>
              </ul>
              <Link to="/apply" className="guarantee-cta">
                {T(GUARANTEE_KEY, guarantee, "cta_text", "span", { label: "Button text" })} <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="guarantee-visual">
              <div className="guarantee-badge">
                <i className="fa-solid fa-shield-halved"></i>
                {isEditMode ? (
                  <EditableText
                    cmsKey={GUARANTEE_KEY}
                    root={guarantee}
                    path="badge_text"
                    value={guarantee?.badge_text || "100% Satisfaction Guaranteed"}
                    label="Badge text"
                  />
                ) : (
                  <span>
                    {guarantee?.badge_text || (
                      <>100%<br />Satisfaction<br />Guaranteed</>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
