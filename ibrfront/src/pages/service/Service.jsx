import React from "react";
import "./service.css";
import Deal from '../../component/deals/Deal'
import Hero from '../../component/hero/Hero'
import ServiceSection from '../../component/serviceSection/ServiceSection'
import ServiceProcess from '../../component/serviceProcess/ServiceProcess'
import ServiceComparison from '../../component/serviceComparison/ServiceComparison'
import ServiceGuarantee from '../../component/serviceGuarantee/ServiceGuarantee'
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ServiceSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";

const Services = () => {
  const ready = useCmsReady();
  const { isEditMode } = useEditMode();
  const site = useSiteSettings();
  const slides = useCms("service_page.hero_slides", []);
  const features = useCms("service_page.features", []);
  const background = useCms("service_page.background_image", "/assets/cleaningbackground.jpg");
  const services = useCms("service_page.services", []);
  const plans = useCms("service_page.plans", []);
  const dealHeading = useCms("service_page.deal_heading", "Professional Cleaning, Transparent Pricing");
  const dealImage = useCms("service_page.deal_image", "/assets/cleaner2.png");

  if (!ready) {
    return <ServiceSkeleton />;
  }

  const deal_Intro = {
    image: dealImage,
    h2: dealHeading,
    email: site.email,
    phone: site.phone,
  };

  return (
    <>
      <Hero
        section={Array.isArray(slides) ? slides : []}
        features={Array.isArray(features) ? features : []}
        backgroundImage={background}
        backgroundVideo={null}
        slidesKey="service_page.hero_slides"
        featuresKey="service_page.features"
        backgroundKey="service_page.background_image"
      />
      <ServiceProcess />
      {(services.length > 0 || isEditMode) && <ServiceSection services={Array.isArray(services) ? services : []} />}
      <ServiceComparison />
      <ServiceGuarantee />
      {(plans.length > 0 || isEditMode) && (
        <Deal
          deal_Intro={deal_Intro}
          plans={Array.isArray(plans) ? plans : []}
          keys={{
            heading: "service_page.deal_heading",
            image: "service_page.deal_image",
            sectionTag: "service_page.deal_tag",
            sectionTitle: "service_page.deal_section_title",
            plans: "service_page.plans",
          }}
        />
      )}
    </>
  );
};

export default Services;
