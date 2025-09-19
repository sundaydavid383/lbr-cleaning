import React from "react";
import "./service.css";
import Deal from '../../component/deals/Deal'
import Hero from '../../component/hero/Hero'
import ServiceSection from '../../component/serviceSection/ServiceSection'
import imageBac from "../../assets/cleaningbackground.jpg"
import star from  "../../assets/star.png"
import spark from  "../../assets/spark.png"
import heroimage1 from "../../assets/cleaner1.png"
import heroimage2 from "../../assets/cleaner2.png"
import heroimage3 from "../../assets/cleaner3.png"
import heroimage4 from "../../assets/cleaner4.png"
import service1 from "../../assets/cleaner19.jpg"
import service4 from "../../assets/cleaner25.jpg"
import service2 from "../../assets/cleaner20.jpg"
import service3 from "../../assets/cleaner21.jpg"
import service5 from "../../assets/cleaner24.jpg"
import service6 from "../../assets/cleaner22.jpg"
import dealimage1 from "../../assets/cleaner2.png"


    const deal_Intro  = {
    image:dealimage1,
    h2: "You Are welcome our service dear esteemed customer",
    email:"sundayudoh383@gmail.com",
    phone: "+123 934 43845"

  }
   const plans = [
    {
      price: "$/19monthly",
      description: "Affordable cleaning ",
      name: "Basic Cleaning",
      details: "Ideal for apartments and small offices. Get essential cleaning services at an affordable price.",
      features: [
        "Dusting and surface cleaning",
        "Vacuuming and mopping floors",
        "Bathroom and kitchen sanitization",
        "Trash removal",
        "Weekly scheduled cleaning"
      ],
      btnText: "Choose Plan"
    },
    {
      price: "$/29monthly",
      description: "Best value ",
      name: "Standard Cleaning",
      details: "Perfect for medium-sized homes and offices. Includes deep cleaning services to maintain hygiene and freshness.",
      features: [
        "Everything in Basic Cleaning",
        "Carpet and upholstery cleaning",
        "Window cleaning (interior)",
        "Appliance exterior cleaning",
        "Bi-weekly deep cleaning"
      ],
      btnText: "Choose Plan"
    },
    {
      price: "$/49monthly",
      description: "Premium service ",
      name: "Premium Cleaning",
      details: "Comprehensive cleaning for large homes, offices, and commercial spaces. Includes additional premium services.",
      features: [
        "Everything in Standard Cleaning",
        "Exterior window and glass cleaning",
        "Wall and ceiling dusting",
        "Disinfection and sanitization",
        "Customized cleaning schedule"
      ],
      btnText: "Choose Plan"
    }
  ];
const backgroundImage = imageBac
const features = [
  {
    icon: "fa-solid fa-soap",
    title: "Post-Construction Cleaning",
    description:
      "Finished a project? We remove debris, dust, and sanitize to leave your space move-in ready."
  },
  {
    icon: "fa-solid fa-truck-ramp-box",
    title: "Move In/Out Cleaning",
    description:
      "Moving? We clean thoroughly so your old place is spotless and your new one fresh and ready."
  },
  {
    icon: "fa-solid fa-calendar-check",
    title: "Custom & Scheduled Plans",
    description:
      "Need regular cleaning? Choose weekly, bi-weekly, or monthly plans with reliable quality."
  }
];
const section = [ 
  {
    questions: "Our Cleaning Expertise",
    header: "Premium Cleaning",
    headerspan: "Services You Can Trust",
    ps: [
      "Get expert cleaning with trained staff and eco-friendly solutions for homes, offices, and more.",
      "From one-time deep cleans to regular care, we keep your space spotless and healthy."
    ],
    sectionimage: heroimage2,
    sectionimageStar: star,
    sectionimageSpark: spark,
    talks: ["Reach out", "Let’s help you"],
    talksReport: "+234 813 456 7890"
  },
  {
    questions: "Residential & Commercial",
    header: "Customized Plans",
    headerspan: "For Every Space",
    ps: [
      "Every space is unique, so our services are flexible, reliable, and tailored to you.",
      "From apartments to offices, we clean with precision and care."
    ],
    sectionimage: heroimage1,
    sectionimageStar: star,
    sectionimageSpark: spark,
    talks: ["Book now", "Free consult"],
    talksReport: "+234 813 456 7890"
  },
  {
    questions: "Specialized Services",
    header: "Deep Cleaning &",
    headerspan: "Sanitization Experts",
    ps: [
      "Our deep cleaning and sanitization go beyond basic cleaning for post-construction or move-ins.",
      "We make spaces hygienically safe with hospital-grade tools and detail."
    ],
    sectionimage: heroimage3,
    sectionimageStar: star,
    sectionimageSpark: spark,
    talks: ["Sanitize Now", "More Info"],
    talksReport: "+234 813 456 7890"
  },
  {
    questions: "Why Choose Us?",
    header: "Reliable Service",
    headerspan: "With a Personal Touch",
    ps: [
      "We’re your trusted partners—punctual, professional, and passionate.",
      "Clients love us for reliability, great service, and consistent results."
    ],
    sectionimage: heroimage4,
    sectionimageStar: star,
    sectionimageSpark: spark,
    talks: ["Contact Now", "Let's Talk"],
    talksReport: "+234 813 456 7890"
  }
];

const services = [
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    image: service1,
    description:
      "Restore the sparkle and peace of your home with our professional residential cleaning. From living rooms to bedrooms, we’ve got you covered.",
    details: [
      "Living room vacuuming & dusting",
      "Bedroom cleaning & arrangement",
      "Bathroom and toilet scrubbing",
      "Kitchen surface wipe-down",
      "Window washing (interior)",
      "Trash collection and deodorizing"
    ],
    icon: "fa-solid fa-house-chimney"
  },
  {
    id: "office-cleaning",
    title: "Office Cleaning",
    image: service2,
    description:
      "Create a hygienic and productive workspace with our expert office cleaning services. We clean desks, restrooms, and high-touch surfaces.",
    details: [
      "Desk and electronics dusting",
      "Waste bin emptying and sanitizing",
      "Floor mopping and vacuuming",
      "Restroom cleaning and disinfection",
      "Reception and common area maintenance",
      "Daily/weekly customizable schedules"
    ],
    icon: "fa-solid fa-briefcase"
  },
  {
    id: "carpet-cleaning",
    title: "Carpet Cleaning",
    image: service3,
    description:
      "Refresh your rugs and carpets with our deep-cleaning and stain-removal techniques. Safe and fast-drying for homes and businesses.",
    details: [
      "Pre-treatment of carpet surfaces",
      "Deep shampooing with safe solutions",
      "Stain and odor removal",
      "Quick-dry extraction method",
      "Carpet deodorizing and sanitization",
      "Suitable for homes, offices, churches"
    ],
    icon: "fa-solid fa-rug"
  },
  {
    id: "window-cleaning",
    title: "Window Cleaning",
    image: service4,
    description:
      "Let the light in! We offer professional indoor and outdoor window cleaning with streak-free shine every time.",
    details: [
      "Exterior and interior glass polishing",
      "Window frame wiping",
      "Sliding door cleaning",
      "Bug screen washing",
      "Safe ladder or pole extension methods",
      "Commercial and residential buildings"
    ],
    icon: "fa-solid fa-window-maximize"
  },
  {
    id: "move-cleaning",
    title: "In/Out Cleaning",
    image: service5,
    description:
      "Moving in or out? Let us handle the mess. We provide thorough cleanups that leave your space inspection-ready.",
    details: [
      "Complete home sweep and mop",
      "Appliance and cabinet cleaning",
      "Trash removal and deodorizing",
      "Wall marks and scuff wiping",
      "Final touch-up and fresh scenting",
      "Perfect for tenants and landlords"
    ],
    icon: "fa-solid fa-truck-moving"
  },
  {
    id: "sanitization-service",
    title: "Sanitization Service",
    image: service6,
    description:
      "Protect your environment with our professional sanitization. Ideal for post-illness, high-traffic areas, and health-sensitive spaces.",
    details: [
      "Surface disinfection",
      "Touchpoint sanitation (handles, switches)",
      "Fogging and air purification (on request)",
      "Post-COVID space treatment",
      "Ideal for schools, hospitals, offices",
      "Eco-safe and family-friendly solutions"
    ],
    icon: "fa-solid fa-hand-sparkles"
  }
];

export default function Services() {
  return (
    <>
        <Hero section={section} features={features} backgroundImage={backgroundImage}  backgroundVideo={null}/>
        <ServiceSection services={services}/>
         <Deal deal_Intro={deal_Intro} plans={plans}/>
  </>);
}
