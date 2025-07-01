import React,{ useEffect, useState, useRef} from "react";
import { useParams, Link } from "react-router-dom";
import "./serviceDetails.css";
import service1 from "../../assets/cleaner19.jpg"
import service4 from "../../assets/cleaner25.jpg"
import service2 from "../../assets/cleaner20.jpg"
import service3 from "../../assets/cleaner21.jpg"
import service5 from "../../assets/cleaner24.jpg"
import service6 from "../../assets/cleaner22.jpg"
import TestimonialCarousel from "../testimonial/TestimonialCarousel"

const services = [
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    image: service1,
    outlistimage: service1,
    description:
      "Restore the sparkle and peace of your home with our professional residential cleaning. From living rooms to bedrooms, we’ve got you covered.",
    details: [
      "Living room vacuuming and dusting",
      "Bedroom cleaning and bed arrangement",
      "Bathroom and toilet scrubbing",
      "Kitchen surface wipe-down",
      "Window washing (interior)",
      "Trash collection and deodorizing",
      "Kitchen cabinet fronts wipe",
      "Mirror and glass polishing"
    ],
    benefits: [
      "Promotes better indoor air quality",
      "Boosts relaxation and mental clarity",
      "Reduces allergens and bacteria at home",
      "Flexible schedules for busy homeowners",
      "Protects surfaces from long-term wear"
    ],
    preparation: [
      "Declutter living areas before the team arrives",
      "Store away personal or breakable items",
      "Inform us of special cleaning preferences",
      "Ensure access to electricity and water",
      "Keep pets secured in a safe room"
    ],
    faqs: [
      {
        question: "Do you clean under furniture?",
        answer: "Yes, we clean under light movable furniture where safe."
      },
      {
        question: "What products do you use?",
        answer: "We use eco-friendly and child-safe cleaning solutions."
      }
    ],
   testimonials: [
  {
    quote: "My home feels like a hotel after every session!",
    author: "- Ifeoma, Lagos",
    image: service1
  },
  {
    quote: "Best cleaning team I've ever hired. Thank you!",
    author: "- Damilola, Surulere",
    image: service1
  }
]
  },
  {
    id: "office-cleaning",
    title: "Office Cleaning",
    image: service2,
    outlistimage: service2,
    description:
      "Create a hygienic and productive workspace with our expert office cleaning services. We clean desks, restrooms, and high-touch surfaces.",
    details: [
      "Desk and electronics dusting",
      "Waste bin emptying and sanitizing",
      "Floor mopping and vacuuming",
      "Restroom cleaning and disinfection",
      "Reception and common area maintenance",
      "Daily/weekly customizable schedules",
      "Kitchenette sanitization",
      "Conference room tidying"
    ],
    benefits: [
      "Improves employee health and morale",
      "Maintains a professional office image",
      "Discreet, after-hours service available",
      "Tailored plans for your business type",
      "Minimizes sick days"
    ],
    preparation: [
      "Inform employees about the cleaning schedule",
      "Label sensitive documents and items",
      "Grant access to all areas to be cleaned",
      "Identify high-priority areas in advance",
      "Clear desks for thorough cleaning"
    ],
    faqs: [
      {
        question: "Do you clean during office hours?",
        answer: "Yes, we offer flexible timing including after-hours."
      },
      {
        question: "Can you handle large offices?",
        answer: "Absolutely. We scale our team according to your needs."
      }
    ],
 testimonials: [
  {
    quote: "Our office looks and smells amazing every week!",
    author: "- Mr. Ade, Victoria Island",
    image: service2
  },
  {
    quote: "Their consistency is unmatched. Highly professional.",
    author: "- HR Manager, Yaba",
    image: service2
  }
]
  },
  {
    id: "carpet-cleaning",
    title: "Carpet Cleaning",
    image: service3,
    outlistimage: service3,
    description:
      "Refresh your rugs and carpets with our deep-cleaning and stain-removal techniques. Safe and fast-drying for homes and businesses.",
    details: [
      "Pre-treatment of carpet surfaces",
      "Deep shampooing with safe solutions",
      "Stain and odor removal",
      "Quick-dry extraction method",
      "Carpet deodorizing and sanitization",
      "Suitable for homes, offices, churches",
      "Edge-to-edge deep clean",
      "Furniture spot cleaning"
    ],
    benefits: [
      "Removes deep-set dirt and allergens",
      "Restores color and fluffiness of carpets",
      "Safe for children and pets",
      "Prevents mold and mildew buildup",
      "Extends the lifespan of carpets"
    ],
    preparation: [
      "Vacuum the carpet lightly before we arrive",
      "Remove small items and valuables from the floor",
      "Notify us of old or tough stains",
      "Ensure access to a power source",
      "Push furniture aside for full coverage"
    ],
    faqs: [
      {
        question: "How long does it take to dry?",
        answer: "Typically 2–4 hours depending on ventilation."
      },
      {
        question: "Can you clean wool carpets?",
        answer: "Yes, we have methods for all carpet materials."
      }
    ],
  testimonials: [
  {
    quote: "They saved my favorite rug! Looks brand new!",
    author: "- Chuka, Ajah",
    image: service3
  },
  {
    quote: "Fast and clean. No chemical smell. 10/10.",
    author: "- Blessing, Ikeja",
    image: service3
  }
]
  },
  {
    id: "window-cleaning",
    title: "Window Cleaning",
    image: service4,
    outlistimage: service4,
    description:
      "Let the light in! We offer professional indoor and outdoor window cleaning with streak-free shine every time.",
    details: [
      "Exterior and interior glass polishing",
      "Window frame wiping",
      "Sliding door cleaning",
      "Bug screen washing",
      "Safe ladder or pole extension methods",
      "Commercial and residential buildings",
      "Gutter edge wiping",
      "Track vacuuming"
    ],
    benefits: [
      "Crystal-clear visibility and shine",
      "Improves natural light flow indoors",
      "Enhances curb appeal of your property",
      "Safe and streak-free cleaning",
      "Prevents damage to window seals"
    ],
    preparation: [
      "Unlock and open any accessible windows",
      "Remove decorations or plants on sills",
      "Inform us of any fragile panes or screens",
      "Ensure safety access where needed",
      "Clear curtains or blinds"
    ],
    faqs: [
      {
        question: "Do you clean high-rise windows?",
        answer: "Yes, with the right equipment and safety measures."
      },
      {
        question: "Do you use harsh chemicals?",
        answer: "No, we use eco-friendly, non-abrasive solutions."
      }
    ],
  testimonials: [
  {
    quote: "I didn’t realize how dirty my windows were till they cleaned them!",
    author: "- Mrs. Joy, Gwarinpa",
    image: service4
  },
  {
    quote: "Professional work and very polite staff.",
    author: "- Kingsley, Festac",
    image: service4
  }
]
  },
  {
    id: "in-out-cleaning",
    title: "In/Out Cleaning",
    image: service5,
    outlistimage: service5,
    description:
      "Moving in or out? Let us handle the mess. We provide thorough cleanups that leave your space inspection-ready.",
    details: [
      "Complete home sweep and mop",
      "Appliance and cabinet cleaning",
      "Trash removal and deodorizing",
      "Wall marks and scuff wiping",
      "Final touch-up and fresh scenting",
      "Perfect for tenants and landlords",
      "Baseboard cleaning",
      "Door and trim wipe-down"
    ],
    benefits: [
      "Stress-free moving experience",
      "Ensures property is move-in ready",
      "Saves time for tenants and agents",
      "Reduces chance of landlord complaints",
      "Helps with security deposit recovery"
    ],
    preparation: [
      "Empty all drawers and closets",
      "Unplug all appliances before we arrive",
      "Remove large trash and clutter",
      "Leave access to every room",
      "Have keys/access ready"
    ],
    faqs: [
      {
        question: "Do you clean inside appliances?",
        answer: "Yes, we clean ovens, fridges, and microwaves too."
      },
      {
        question: "Can you handle last-minute bookings?",
        answer: "Yes, based on availability. Contact us ASAP."
      }
    ],
testimonials: [
  {
    quote: "Our landlord was amazed. We got our deposit back!",
    author: "- Seyi & Tolu, Lekki Phase 1",
    image: service5
  },
  {
    quote: "Very thorough and punctual. Highly recommend!",
    author: "- Sandra, Garki",
    image: service5
  }
]
  },
  {
    id: "sanitization-service",
    title: "Sanitization Service",
    image: service6,
    outlistimage: service6,
    description:
      "Protect your environment with our professional sanitization. Ideal for post-illness, high-traffic areas, and health-sensitive spaces.",
    details: [
      "Surface disinfection with safe chemicals",
      "Touchpoint sanitation (handles, switches)",
      "Fogging and air purification (on request)",
      "Post-COVID space treatment",
      "Ideal for schools, hospitals, offices",
      "Eco-safe and family-friendly solutions",
      "Restroom deep sanitization",
      "Common area sterilization"
    ],
    benefits: [
      "Reduces spread of viruses and bacteria",
      "Creates a safer environment",
      "Peace of mind after sickness or exposure",
      "Custom plans for schools and businesses",
      "Ideal for eldercare and clinics"
    ],
    preparation: [
      "Vacate the space during sanitization",
      "Store food items and cover electronics",
      "Notify us of vulnerable persons or areas",
      "Leave all rooms accessible",
      "Open windows if possible"
    ],
    faqs: [
      {
        question: "Is it safe for kids and pets?",
        answer: "Yes, we use hospital-grade but safe products."
      },
      {
        question: "How long before we can re-enter the space?",
        answer: "Usually within 2 hours after completion."
      }
    ],
 testimonials: [
  {
    quote: "This service gave me peace after COVID exposure.",
    author: "- Emmanuel, Abuja",
    image: service6
  },
  {
    quote: "Excellent work. Our clinic smells fresh and feels safe.",
    author: "- Clinic Admin, Port Harcourt",
    image: service6
  }
]
  }
];

const useRevealOnScroll = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => el && observer.observe(el));

    return () => {
      elementsRef.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return elementsRef;
};

const ServiceDetails = ({}) => {
  const { serviceId } = useParams();
  const [openFAQ, setOpenFAQ] = useState(null);
  const service = services.find((s) => s.id === serviceId);
  const sectionsRef = useRevealOnScroll();

  if (!service) {
    return (
      <div className="not-found">
        <h2>Service not found</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
    <section
  className="detail-banner"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${service.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  <div className="overlay">
    <h1>{service.title}</h1>
    <p>{service.description}</p>
  </div>
</section>

      {["detail-content", "why-section", "prep-section", "testimonial-section", "faq-section", "cta-section"].map((cls, i) => (
        <section
          key={cls}
          className={`${cls} reveal`}
          ref={(el) => (sectionsRef.current[i] = el)}
        >
          {cls === "detail-content" && (
                  <>
          <h2>What’s Included</h2>
          <div className="inclusion-wrapper">
            <ul className="inclusion-list">
              {service.details.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <div className="inclusion-image">
              <img src={service.outlistimage} alt={service.title} />
            </div>
          </div>
        </>
          )}

          {cls === "why-section" && (
  <>
    <h2>Why Choose Our {service.title}?</h2>
    <ul className="benefits-list">
      {service.benefits?.map((item, idx) => (
        <li key={idx}>✅ {item}</li>
      ))}
    </ul>
  </>
)}

{cls === "prep-section" && (
  <>
    <h2>How to Prepare</h2>
    <ul className="prep-list">
      {service.preparation?.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </>
)}

{cls === "testimonial-section" && (
  <TestimonialCarousel testimonials={service.testimonials} />
)}

{cls === "faq-section" && (
 <>
  <h2>Frequently Asked Questions</h2>
  <div className="faq-list">
    {service.faqs?.map((faq, idx) => (
      <div className="faq-item" key={idx}>
        <button
          className="faq-question"
          onClick={() =>
            setOpenFAQ(openFAQ === idx ? null : idx)
          }
        >
          <span>{faq.question}</span>
          <i className={`fa-solid ${openFAQ === idx ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </button>
        {openFAQ === idx && (
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
</>
)}

          {cls === "cta-section" && (
           <>
  <h2>Interested in {service.title}?</h2>
  <p>We're ready to bring excellence to your doorstep. Reach out now!</p>
  <a href="tel:+2349012345678" className="cta-button">
    <i className="fa-solid fa-phone"></i> Call: 0901 234 5678
  </a>
</>
          )}
        </section>
      ))}
    </div>
  );
};

export default ServiceDetails;
