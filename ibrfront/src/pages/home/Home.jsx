import React from 'react'
import Hero from '../../component/hero/Hero'
import StatsSection from '../../component/statsSection/StatsSection'
import WhyChooseUs from '../../component/whyChooseUs/WhyChooseUs'
import Testimonial from '../../component/testimonials/Testimonials'
import CTABanner from '../../component/ctaBanner/CTABanner'
import { Link } from 'react-router-dom';
import "./home.css"
import { useCmsCategory } from "../../hooks/useCmsContent";
import { HomeSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";

const Home = () => {
  const { value: heroContent, loading: heroLoading } = useCmsCategory("homepage", {});
  const { value: howItWorksContent, loading: howLoading } = useCmsCategory("how_it_works", {});
  const { value: guaranteeContent, loading: guaranteeLoading } = useCmsCategory("guarantee", {});
  const { value: areasContent, loading: areasLoading } = useCmsCategory("coverage_areas", {});
  const { value: statsContent, loading: statsLoading } = useCmsCategory("homepage_stats", {});
  const { value: trustContent, loading: trustLoading } = useCmsCategory("trust_badges", {});
  const { value: ctaContent, loading: ctaLoading } = useCmsCategory("cta_banner", {});
  const { isEditMode } = useEditMode();

  const isLoading = heroLoading || howLoading || guaranteeLoading || areasLoading || statsLoading || trustLoading || ctaLoading;

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (!heroContent && !howItWorksContent && !guaranteeContent && !areasContent) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No content available. Please configure the CMS.</p>
      </div>
    );
  }

  const features = heroContent?.features || [];
  const section = heroContent?.hero_slides || [];
  const howSteps = howItWorksContent?.steps || [];
  const guaranteeItems = guaranteeContent?.items || [];
  const areas = areasContent?.list || [];
  const stats = statsContent?.stats || [];
  const trustBadges = trustContent?.badges || [];

  return (
    <div>
      {section.length > 0 && (
        <Hero section={section} features={features} backgroundImage={heroContent?.background_image} backgroundVideo={heroContent?.background_video} />
      )}
      {stats.length > 0 && <StatsSection />}
      {trustBadges.length > 0 && <WhyChooseUs />}
      <Testimonial />
      {ctaContent && <CTABanner />}
      
      {howSteps.length > 0 && (
        <section className="home-how-it-works">
          <div className="home-how-it-works-container">
            <div className="section-header">
              {isEditMode ? (
                <>
                  <EditableText cmsKey="how_it_works.tag" type="text" value={howItWorksContent?.tag} as="span" className="section-tag" />
                  <EditableText cmsKey="how_it_works.title" type="text" value={howItWorksContent?.title} as="h2" />
                  <EditableText cmsKey="how_it_works.subtitle" type="text" value={howItWorksContent?.subtitle} as="p" />
                </>
              ) : (
                <>
                  <span className="section-tag">{howItWorksContent?.tag}</span>
                  <h2>{howItWorksContent?.title}</h2>
                  <p>{howItWorksContent?.subtitle}</p>
                </>
              )}
            </div>
            <div className="how-it-works-grid">
              {howSteps.map((step, idx) => (
                <div key={idx} className="how-step">
                  <div className="how-step-number">{idx + 1}</div>
                  <div className="how-step-icon"><i className={step.icon}></i></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {areas.length > 0 && (
        <section className="home-areas">
          <div className="home-areas-container">
            <div className="section-header">
              {isEditMode ? (
                <>
                  <EditableText cmsKey="coverage_areas.tag" type="text" value={areasContent?.tag} as="span" className="section-tag" />
                  <EditableText cmsKey="coverage_areas.title" type="text" value={areasContent?.title} as="h2" />
                  <EditableText cmsKey="coverage_areas.subtitle" type="text" value={areasContent?.subtitle} as="p" />
                </>
              ) : (
                <>
                  <span className="section-tag">{areasContent?.tag}</span>
                  <h2>{areasContent?.title}</h2>
                  <p>{areasContent?.subtitle}</p>
                </>
              )}
            </div>
            <div className="areas-grid">
              {areas.map((area) => (
                <div key={area} className="area-card">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <p className="areas-note">
              {isEditMode ? (
                <>
                  <EditableText cmsKey="coverage_areas.note" type="text" value={areasContent?.note} as="span" /> <Link to="/contact">{areasContent?.note_link_text}</Link> — we're always expanding.
                </>
              ) : (
                <>
                  {areasContent?.note} <Link to="/contact">{areasContent?.note_link_text}</Link> — we're always expanding.
                </>
              )}
            </p>
          </div>
        </section>
      )}

      {guaranteeItems.length > 0 && (
        <section className="home-guarantee">
          <div className="home-guarantee-container">
            <div className="guarantee-content">
              {isEditMode ? (
                <>
                  <EditableText cmsKey="guarantee.tag" type="text" value={guaranteeContent?.tag} as="span" className="section-tag" />
                  <EditableText cmsKey="guarantee.title" type="text" value={guaranteeContent?.title} as="h2" />
                  <EditableText cmsKey="guarantee.description" type="text" value={guaranteeContent?.description} as="p" />
                </>
              ) : (
                <>
                  <span className="section-tag">{guaranteeContent?.tag}</span>
                  <h2>{guaranteeContent?.title}</h2>
                  <p>{guaranteeContent?.description}</p>
                </>
              )}
              <ul className="guarantee-list">
                {guaranteeItems.map((item, idx) => (
                  <li key={idx}><i className="fa-solid fa-check-circle"></i> {item}</li>
                ))}
              </ul>
              {isEditMode ? (
                <EditableText cmsKey="guarantee.cta_text" type="text" value={guaranteeContent?.cta_text} as={Link} to="/apply" className="guarantee-cta" />
              ) : (
                <Link to="/apply" className="guarantee-cta">{guaranteeContent?.cta_text} <i className="fa-solid fa-arrow-right"></i></Link>
              )}
            </div>
            <div className="guarantee-visual">
              <div className="guarantee-badge">
                <i className="fa-solid fa-shield-halved"></i>
                <span>100%<br />Satisfaction<br />Guaranteed</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
