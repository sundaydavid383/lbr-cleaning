import React from "react";
import "./service.css";
import Deal from '../../component/deals/Deal'
import Hero from '../../component/hero/Hero'
import ServiceSection from '../../component/serviceSection/ServiceSection'
import ServiceProcess from '../../component/serviceProcess/ServiceProcess'
import ServiceComparison from '../../component/serviceComparison/ServiceComparison'
import ServiceGuarantee from '../../component/serviceGuarantee/ServiceGuarantee'
import imageBac from "../../assets/cleaningbackground.jpg"
import star from  "../../assets/star.png"
import spark from  "../../assets/spark.png"
import heroimage1 from "../../assets/cleaner1.png"
import heroimage2 from "../../assets/cleaner2.png"
import heroimage3 from "../../assets/cleaner3.png"
import heroimage4 from "../../assets/cleaner4.png"
import service1 from "../../assets/cleaner19.jpeg"
import service4 from "../../assets/cleaner25.jpg"
import service2 from "../../assets/cleaner20.jpg"
import service3 from "../../assets/cleaner21.jpg"
import service5 from "../../assets/cleaner24.jpg"
import service6 from "../../assets/cleaner22.jpg"
import dealimage1 from "../../assets/cleaner2.png"
import { SITE_CONFIG } from "../../config/site";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { ServiceSkeleton } from "../../component/pageSkeleton/PageSkeleton";

const Services = () => {
  const { value: servicePageContent, loading: serviceLoading } = useCmsCategory("service_page", {});

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
    image: dealimage1,
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
        {plans.length > 0 && <Deal deal_Intro={deal_Intro} plans={plans}/>}
    </>
  );
};

export default Services;
