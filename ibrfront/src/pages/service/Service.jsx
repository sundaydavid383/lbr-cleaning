import React from "react";
import "./service.css";
import Deal from '../../component/deals/Deal'
import Hero from '../../component/hero/Hero'
import ServiceSection from '../../component/serviceSection/ServiceSection'
import ServiceProcess from '../../component/serviceProcess/ServiceProcess'
import ServiceComparison from '../../component/serviceComparison/ServiceComparison'
import ServiceGuarantee from '../../component/serviceGuarantee/ServiceGuarantee'
import imageBac from "../../assets/cleaningbackground.jpg"
import { SITE_CONFIG } from "../../config/site";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { ServiceSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";

const Services = () => {
  const { value: servicePageContent, loading: serviceLoading } = useCmsCategory("service_page", {});
  const { isEditMode } = useEditMode();

  if (serviceLoading) {
    return <ServiceSkeleton />;
  }

  if (!servicePageContent) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No service content available. Please configure the CMS.</p>
      </div>
    );
  }

  const deal_Intro = {
    image: servicePageContent.deal_image || "/assets/cleaner2.png",
    h2: servicePageContent.deal_heading,
    email: SITE_CONFIG.email,
    phone: SITE_CONFIG.phone,
  };

  const plans = servicePageContent.plans || [];
  const features = servicePageContent.features || [];
  const section = servicePageContent.hero_slides || [];
  const services = servicePageContent.services || [];

  return (
    <>
        {section.length > 0 && (
          <Hero section={section} features={features} backgroundImage={imageBac}  backgroundVideo={null}/>
        )}
        <ServiceProcess />
        {services.length > 0 && <ServiceSection services={services}/>}
        <ServiceComparison />
        <ServiceGuarantee />
        {plans.length > 0 && (
          <Deal 
            deal_Intro={deal_Intro} 
            plans={plans}
          />
        )}
    </>
  );
};

export default Services;
