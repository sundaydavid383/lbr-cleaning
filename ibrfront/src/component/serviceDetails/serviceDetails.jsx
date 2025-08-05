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
  tagline: "Sparkling homes, happy hearts!",
  duration: "2–4 hours depending on home size",
  pricing: "Starting from ₦15,000",
  targetAudience: ["Homeowners", "Tenants", "Families", "Busy professionals"],
  image: service1,
  outlistimage: service1,
  description:
    "Restore the sparkle and peace of your home with our professional residential cleaning. From living rooms to bedrooms, kitchens to windows — we give your home the glow it deserves with attention to every detail.",
  details: [
    "Living room vacuuming, mopping, and dusting of surfaces and electronics",
    "Bedroom cleaning, including wardrobe exterior wipe-down and bed arrangement",
    "Bathroom and toilet scrubbing, descaling, and mirror shining",
    "Kitchen surface wipe-down and degreasing of stoves and countertops",
    "Window washing (interior), track cleaning, and window sill dusting",
    "Trash collection, bin sanitization, and air freshening",
    "Kitchen cabinet fronts and handle wipe-down",
    "Ceiling fan and light fixture dust removal",
    "Curtain and blind dusting or vacuuming",
    "Baseboard cleaning and corner cobweb removal"
  ],
  benefits: [
    "Promotes better indoor air quality and breathing comfort",
    "Boosts relaxation, mental clarity, and general mood",
    "Reduces allergens, dust mites, and bacteria lurking in hidden spots",
    "Protects surfaces and furniture from grime and premature aging",
    "Creates a consistently welcoming environment for guests",
    "Flexible service frequencies — one-time, weekly, or bi-weekly",
    "Special care for children’s play areas and high-touch zones",
    "Professional-grade tools and trained cleaning experts"
  ],
  preparation: [
    "Declutter living areas (e.g. clothes, books, toys) before our team arrives",
    "Store fragile or valuable items in a safe location",
    "Notify us about any stains, odors, or areas needing extra attention",
    "Ensure access to running water and electricity",
    "Secure pets in a separate room or inform us of pet-friendly handling",
    "List any personal preferences (scent, product sensitivity, etc.)"
  ],
  faqs: [
    {
      question: "Do you clean behind and under furniture?",
      answer:
        "Yes, we move light furniture like chairs and small tables. For heavy items, we clean around and under them where possible."
    },
    {
      question: "What cleaning products do you use?",
      answer:
        "We use eco-friendly, child-safe, and pet-safe cleaning products unless you prefer specific brands."
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer:
        "Not necessarily. Many of our clients prefer to schedule cleaning while they're away. Just provide access and clear instructions."
    },
    {
      question: "Can I book recurring home cleaning?",
      answer:
        "Absolutely! We offer weekly, bi-weekly, and monthly cleaning plans tailored to your needs."
    }
  ],
  testimonials: [
    {
      quote: "My home feels like a hotel after every session. They even cleaned under my bed!",
      author: "- Ifeoma, Lagos",
      image: service1
    },
    {
      quote: "Best cleaning team I've ever hired. Professional and punctual!",
      author: "- Damilola, Surulere",
      image: service1
    },
    {
      quote: "The attention to detail blew me away. Even my bookshelf was dust-free.",
      author: "- Mr. Sola, Ogudu",
      image: service1
    },
    {
      quote: "They used natural products as I requested, and the result was amazing!",
      author: "- Chinyere, Ikeja GRA",
      image: service1
    }
  ]
},
{
  id: "office-cleaning",
  title: "Office Cleaning",
  tagline: "A clean office is a productive office.",
  duration: "Flexible — before, during, or after office hours",
  pricing: "Custom quote based on office size",
  targetAudience: ["Startups", "Agencies", "Banks", "Corporate offices"],
  image: service2,
  outlistimage: service2,
  description:
    "Boost productivity and first impressions with a spotless workplace. Our tailored office cleaning services cover everything from workstations to reception areas, ensuring a fresh and hygienic space that inspires daily excellence.",
  details: [
    "Workstation dusting, desk sanitization, and electronics wipe-down",
    "Restroom cleaning with full disinfection and deodorizing",
    "Breakroom/kitchenette surface cleaning and sink scrubbing",
    "Trash bin emptying, liner replacement, and bin sanitization",
    "Floor sweeping, vacuuming, and mopping of tiled/carpetted areas",
    "Door handles, light switches, and elevator button disinfection",
    "Glass surface cleaning (interior partitions and doors)",
    "Reception and lobby area dusting and polishing",
    "Conference room prep and table wipe-downs",
    "Restocking of tissues, soap, and sanitizers if requested"
  ],
  benefits: [
    "Enhances employee well-being and reduces sick days",
    "Creates a professional atmosphere for visitors and clients",
    "Prevents dust buildup in electronics and office equipment",
    "Customizable schedules — daily, weekly, or bi-weekly",
    "Discreet and respectful cleaning staff for minimal disruption",
    "Use of commercial-grade disinfectants for high-traffic zones",
    "Flexible timing — mornings, evenings, or weekends",
    "Add-on options like carpet or window cleaning available"
  ],
  preparation: [
    "Inform your team of the scheduled cleaning time",
    "Secure sensitive documents or equipment if needed",
    "Leave access instructions for locked rooms or cabinets",
    "Communicate any problem areas (e.g. stained carpet, odors)",
    "Let us know if you require after-hours service"
  ],
  faqs: [
    {
      question: "Can you clean during office hours without disrupting work?",
      answer:
        "Yes, our team is trained to work quietly and respectfully, or we can schedule outside working hours if preferred."
    },
    {
      question: "Do you provide cleaning supplies and tools?",
      answer:
        "Yes, we come fully equipped with commercial-grade products and tools. If you have preferences, let us know!"
    },
    {
      question: "Can we request cleaning of only specific areas?",
      answer:
        "Absolutely. We offer partial and full office cleaning depending on your needs and budget."
    },
    {
      question: "Is it safe for our electronics and documents?",
      answer:
        "Yes, our team is trained in safe cleaning practices, and we avoid direct contact with sensitive items unless instructed."
    }
  ],
  testimonials: [
    {
      quote: "Our office has never looked better. Staff morale went up instantly!",
      author: "- Adewale, HR Manager, Lekki",
      image: service2
    },
    {
      quote: "They clean after hours and everything smells fresh every morning.",
      author: "- Uche, Tech Startup Founder",
      image: service2
    },
    {
      quote: "Very reliable team — they’ve never missed a schedule.",
      author: "- Mrs. Dada, Law Firm Admin",
      image: service2
    },
    {
      quote: "From toilets to tables, everything is spotless. Highly recommended!",
      author: "- Tunde, Creative Agency Director",
      image: service2
    }
  ]
},
{
  id: "carpet-cleaning",
  title: "Carpet Cleaning",
  tagline: "Restore the softness under your feet.",
  duration: "1–3 hours depending on carpet size",
  pricing: "Starting from ₦10,000 per room",
  targetAudience: ["Homes", "Schools", "Religious centers", "Office spaces"],
  image: service3,
  outlistimage: service3,
  description:
    "Revive your carpets with deep-cleaning that lifts dirt, odors, and allergens. Whether it’s for a cozy home, a prayer hall, or your reception area, we leave your carpet fresh, fluffy, and free from hidden grime.",
  details: [
    "Vacuuming to remove surface debris and dust",
    "Pre-treatment of stains with targeted solutions",
    "Deep shampooing or steam cleaning (depending on fabric)",
    "Brushing and agitation to loosen deep-set dirt",
    "Hot water extraction or foam cleaning (as needed)",
    "Sanitization and odor neutralization",
    "Carpet drying with high-velocity air movers",
    "Edge and corner detailing",
    "Deodorizer application for a fresh scent",
    "Optional carpet protector for long-term stain resistance"
  ],
  benefits: [
    "Improves air quality by removing allergens and dust mites",
    "Restores color, fluffiness, and softness of carpets",
    "Eliminates stubborn stains, spills, and pet accidents",
    "Removes odors caused by humidity, pets, or spills",
    "Prevents mold growth with proper drying",
    "Safe for children and pets",
    "Extends the life of your carpets",
    "Ideal for homes, prayer rooms, conference halls, and more"
  ],
  preparation: [
    "Remove furniture and loose items from carpeted area if possible",
    "Vacuum visible debris if you prefer a quicker session",
    "Point out high-stain areas (coffee spills, pet stains, etc.)",
    "Inform us of carpet material if known (wool, synthetic, etc.)",
    "Keep children and pets away from wet carpet for several hours after cleaning"
  ],
  faqs: [
    {
      question: "How long does it take for the carpet to dry?",
      answer:
        "Usually 2–6 hours depending on ventilation and carpet type. We use air movers to speed it up where possible."
    },
    {
      question: "Do you clean rugs as well?",
      answer:
        "Yes! We clean area rugs, runners, and custom carpets either on-site or via pick-up and return service."
    },
    {
      question: "Can you remove old stains and odors?",
      answer:
        "Yes, our stain removers and deodorizing treatments are effective against most stubborn marks and smells."
    },
    {
      question: "Are your products safe for babies and pets?",
      answer:
        "Absolutely. We use child-safe, pet-safe, eco-friendly products on all carpets unless otherwise requested."
    }
  ],
  testimonials: [
    {
      quote: "Our church carpet looked brand new after cleaning. Amazing job!",
      author: "- Pastor Mike, Shomolu",
      image: service3
    },
    {
      quote: "The pet smell and stains disappeared completely. Highly impressed.",
      author: "- Rita, Dog Mom in Ikeja",
      image: service3
    },
    {
      quote: "Even my high-traffic hallway carpet looks revived. Thank you!",
      author: "- Mr. Jude, Victoria Island",
      image: service3
    },
    {
      quote: "They were super fast and careful with our woven rug. 10/10!",
      author: "- Zainab, Surulere",
      image: service3
    }
  ]
}
,
{
  id: "window-cleaning",
  title: "Window Cleaning",
  tagline: "Let the sunshine in — streak-free.",
  duration: "1–2 hours for standard apartments",
  pricing: "Starting from ₦8,000",
  targetAudience: ["Homes", "Showrooms", "Apartments", "Commercial spaces"],
  image: service4,
  outlistimage: service4,
  description:
    "Crystal-clear windows do more than brighten a room — they elevate your entire space. Our expert window cleaning removes grime, water stains, and dust from glass panes, frames, and sills for a flawless finish inside and out.",
  details: [
    "Interior and exterior window pane washing",
    "Frame and sill dusting and wiping",
    "Removal of water spots, smudges, and streaks",
    "Sliding door glass cleaning",
    "Louvre, jalousie, or horizontal window detailing",
    "Insect screen dusting or rinsing (where applicable)",
    "Safe use of extension poles and ladders for high windows",
    "Use of eco-friendly glass cleaning agents",
    "Mirror cleaning (optional)",
    "Protective gloves and no-drip technique for indoor areas"
  ],
  benefits: [
    "Improves light flow and brightens your interiors",
    "Enhances curb appeal and professionalism",
    "Removes built-up dust and pollutants on glass",
    "Safe methods for high or hard-to-reach windows",
    "No streaks, smudges, or cleaning residue left behind",
    "Flexible scheduling to avoid disruption",
    "Optional mirror and showcase glass polishing",
    "Ideal for homes, offices, stores, and apartments"
  ],
  preparation: [
    "Open curtains or blinds ahead of time for full access",
    "Remove breakables from window sills and ledges",
    "Inform us of fragile or stained glass features",
    "Secure pets or children away from cleaning zones",
    "Provide safe access to balconies or high windows (if any)"
  ],
  faqs: [
    {
      question: "Do you clean both inside and outside of the windows?",
      answer:
        "Yes, we clean both sides unless one is inaccessible (e.g. external panes on upper floors without safe access)."
    },
    {
      question: "Can you clean during rainy season?",
      answer:
        "We monitor the weather and may reschedule outdoor cleaning during rain, but interior windows can still be cleaned."
    },
    {
      question: "Do you remove paint or cement spots?",
      answer:
        "Yes, we can remove minor construction residues with care. Let us know in advance if it's a post-renovation job."
    },
    {
      question: "Is there a discount for regular window cleaning?",
      answer:
        "Yes! We offer discounts for monthly or bi-monthly service plans — perfect for showrooms or large properties."
    }
  ],
  testimonials: [
    {
      quote: "Our balcony glass hasn't been this clear in years. The view is amazing now!",
      author: "- Mrs. Ayo, Lekki Phase 1",
      image: service4
    },
    {
      quote: "No streaks at all. They even cleaned the window frames!",
      author: "- Chuka, Ikoyi",
      image: service4
    },
    {
      quote: "Our storefront windows sparkle — clients notice the difference!",
      author: "- Toyin, Boutique Owner",
      image: service4
    },
    {
      quote: "They brought their own ladders and were very safe and professional.",
      author: "- Mr. Dayo, 2nd-floor tenant, Yaba",
      image: service4
    }
  ]
},
{
  id: "move-cleaning",
  title: "In/Out Cleaning",
  tagline: "Start fresh or leave spotless.",
  duration: "4–8 hours depending on property size",
  pricing: "Starting from ₦25,000",
  targetAudience: ["Landlords", "Tenants", "Realtors", "New homeowners"],
  image: service5,
  outlistimage: service5,
  description:
    "Moving is stressful enough — let us handle the cleaning. Whether you're moving in or out, we deep-clean every inch of your property to leave it sparkling and ready. Perfect for end-of-lease, pre-sale, or post-construction cleanups.",
  details: [
    "Deep cleaning of all rooms including floors, windows, and doors",
    "Scrubbing of bathrooms, toilets, tiles, and fixtures",
    "Kitchen deep-clean: cabinets, drawers, countertops, sinks, and stoves",
    "Interior window and frame washing",
    "Removal of cobwebs and dust from ceilings and corners",
    "Light switch, socket, and door handle disinfection",
    "Cleaning of baseboards, ledges, and skirting",
    "Vacuuming and mopping of all floor surfaces",
    "Trash removal and deodorizing of space",
    "Optional extras: post-renovation residue removal, external sweeping"
  ],
  benefits: [
    "Leaves a great impression for landlords, buyers, or new tenants",
    "Removes construction dust, paint smudges, and packing residue",
    "Ensures sanitary conditions for move-in readiness",
    "Complies with end-of-tenancy agreements",
    "Perfect for real estate photo shoots or open houses",
    "Restores the 'like new' feel of your space",
    "Customizable based on apartment or full house",
    "Thorough attention to details often missed during regular cleaning"
  ],
  preparation: [
    "Ensure the space is mostly empty or notify us if some furniture remains",
    "Disconnect appliances if deep-cleaning is needed behind them",
    "Provide keys or arrange access with the landlord/agent",
    "Inform us of any areas with post-renovation paint or debris",
    "Let us know your move date so we can schedule accordingly"
  ],
  faqs: [
    {
      question: "Do I need to be present during the cleaning?",
      answer:
        "Not at all. As long as we have access, we’ll handle everything and send updates/photos if needed."
    },
    {
      question: "Can you clean after renovation or painting?",
      answer:
        "Yes, we offer post-construction cleaning as an add-on to handle paint, cement dust, and debris."
    },
    {
      question: "Is this service suitable before handing over keys?",
      answer:
        "Absolutely. We ensure the property meets top standards for inspection and handover."
    },
    {
      question: "Do you clean appliances too?",
      answer:
        "Yes! We clean inside ovens, fridges, and microwaves if requested. Please mention it during booking."
    }
  ],
  testimonials: [
    {
      quote: "The apartment was cleaner than when I moved in! I got my full deposit back.",
      author: "- Ngozi, Former Tenant in Magodo",
      image: service5
    },
    {
      quote: "They handled post-renovation dust like pros. No trace of cement left.",
      author: "- Femi, Realtor",
      image: service5
    },
    {
      quote: "We moved into a spotless home — smelled fresh and looked perfect.",
      author: "- Bukky & Tayo, New Homeowners",
      image: service5
    },
    {
      quote: "Even the kitchen drawers and light switches were sparkling. 100% worth it.",
      author: "- Tolu, Ikorodu",
      image: service5
    }
  ]
}
,
{
  id: "post-construction-cleaning",
  title: "Post-Construction Cleaning",
  tagline: "From dusty to dazzling.",
  duration: "6–10 hours depending on property size",
  pricing: "Starting from ₦35,000",
  targetAudience: ["Builders", "Renovation projects", "New homeowners", "Real estate agents"],
  image: service6,
  outlistimage: service6,
  description:
    "Construction leaves a mess — we make it disappear. Our post-construction cleaning removes fine dust, paint spots, cement residue, and debris to reveal the beauty of your new or renovated space. We bring out the final shine so your property is move-in ready.",
  details: [
    "Thorough dusting and vacuuming of all surfaces, walls, and floors",
    "Removal of paint splatter, cement smudges, and adhesives",
    "Polishing of tiles, countertops, windows, and doors",
    "Interior glass and mirror cleaning",
    "Detailed cleaning of light switches, sockets, and vents",
    "Scrubbing of bathroom fixtures, sinks, and grout lines",
    "Wiping of cabinets inside and out",
    "Debris removal and sweeping of entryways and balconies",
    "Air vent and ceiling fan dust removal",
    "Final floor cleaning (scrubbing, mopping, or polishing as needed)"
  ],
  benefits: [
    "Removes hazardous construction dust and debris",
    "Reveals the finished look of your construction work",
    "Prepares the space for move-in, inspection, or handover",
    "Protects new fixtures and finishes from dust buildup",
    "Boosts property value and visual appeal",
    "Includes attention to hard-to-reach or detailed areas",
    "Ideal for homes, offices, showrooms, and event halls",
    "Safe methods that won’t scratch delicate surfaces"
  ],
  preparation: [
    "Ensure all construction work is fully completed",
    "Clear major debris or notify us if removal is required",
    "Turn on ventilation to help with dust removal and drying",
    "Provide access to water and electricity for equipment use",
    "Highlight fragile surfaces or newly installed items"
  ],
  faqs: [
    {
      question: "Can you remove cement and paint from tiles?",
      answer:
        "Yes, we use safe methods and products to remove tough residues without damaging your tiles or finishes."
    },
    {
      question: "Do you offer debris removal?",
      answer:
        "We can help with small debris removal. For large-scale waste, we recommend booking our cleaning alongside a haulage service."
    },
    {
      question: "How long should I wait after construction ends to clean?",
      answer:
        "We recommend cleaning immediately after the project is fully completed to avoid dust settling deeper over time."
    },
    {
      question: "Is it safe for new surfaces and appliances?",
      answer:
        "Absolutely. We use soft cloths and non-abrasive products designed for new fixtures and surfaces."
    }
  ],
  testimonials: [
    {
      quote: "They turned our dusty renovation mess into a sparkling clean home. Couldn’t believe the difference.",
      author: "- Dunni, Gbagada",
      image: service6
    },
    {
      quote: "No scratches, no streaks — just flawless finishing after our office fit-out.",
      author: "- Mr. Lanre, Facility Manager",
      image: service6
    },
    {
      quote: "Our showroom looked photo-ready after their cleaning. Highly detailed work.",
      author: "- Grace, Interior Decorator",
      image: service6
    },
    {
      quote: "Paint stains gone, cement dust gone — they did it all in a day.",
      author: "- Hassan, Contractor, Agege",
      image: service6
    }
  ]
},
{
  id: "sanitization-service",
  title: "Sanitization Service",
  tagline: "Invisible threats, visible care.",
  duration: "1–2 hours depending on property size",
  pricing: "Starting from ₦20,000",
  targetAudience: ["Homes", "Churches", "Gyms", "Schools", "Offices", "Salons"],
  image: service6,
  outlistimage: service6,
  description:
    "Protect your space from invisible threats. Our Sanitization Service targets harmful germs, bacteria, and viruses on surfaces and in the air. Whether you're recovering from illness, hosting guests, or simply upgrading your hygiene standards, we use advanced disinfection methods trusted in hospitals and public health facilities. Safe, thorough, and tailored for Lagos living.",
  details: [
    "Fogging of rooms with medical-grade disinfectants that kill 99.9% of germs and viruses",
    "Spraying and wiping of high-touch points like light switches, door handles, and remotes",
    "Sanitization of furniture, surfaces, electronics, and appliances (non-corrosive application)",
    "Airborne misting to disinfect hard-to-reach corners and reduce air-based pathogens",
    "Special attention to kitchens, bathrooms, and children's play areas",
    "Optional deep sanitization after parties, illnesses, or known contamination",
    "Pet- and child-safe application using approved disinfectants",
    "Protective gear worn by all team members for safety and assurance",
    "Recommended for homes, schools, churches, gyms, salons, and offices",
    "Flexible scheduling — one-time service or regular sanitization plans"
  ],
  benefits: [
    "Reduces risk of illness and cross-contamination in your space",
    "Gives peace of mind after recovery, travel, or exposure events",
    "Ideal for environments with children, elderly, or immune-compromised individuals",
    "Eliminates odors caused by bacteria and mildew buildup",
    "Helps maintain a professional, health-conscious image for businesses",
    "Quick-drying formula allows fast re-entry with minimal downtime",
    "Disinfects areas that regular cleaning can’t reach",
    "Trusted by families and businesses across Lagos for reliable hygiene care"
  ],
  preparation: [
    "Keep pets and children out of the space during and shortly after service",
    "Secure open food containers and personal hygiene products",
    "Inform us of allergies or sensitivities to disinfectant scents",
    "Clear countertops, desks, and cluttered surfaces for better reach",
    "Let us know of any electronic equipment needing special handling"
  ],
  faqs: [
    {
      question: "Is your sanitization service safe for babies and pets?",
      answer:
        "Yes, we use eco-friendly, hospital-grade disinfectants that are safe for children and pets once the space is ventilated after treatment."
    },
    {
      question: "How long before I can re-enter the space?",
      answer:
        "Most areas can be safely re-entered 30–60 minutes after fogging, depending on ventilation. We'll guide you based on your space."
    },
    {
      question: "Do I still need regular cleaning after sanitization?",
      answer:
        "Yes. Sanitization complements regular cleaning by targeting germs and pathogens that normal surface wiping may miss."
    },
    {
      question: "Can you sanitize after a COVID case or flu outbreak?",
      answer:
        "Absolutely. We follow WHO-compliant disinfection procedures to restore safe environments after illness exposure."
    }
  ],
  testimonials: [
    {
      quote: "After my son recovered from malaria, they sanitized our whole house. I slept with peace of mind.",
      author: "- Mojisola, Magodo",
      image: service6
    },
    {
      quote: "They came after our office staff tested positive. Fast, professional, and very respectful.",
      author: "- HR Manager, Victoria Island",
      image: service6
    },
    {
      quote: "Even my kids' toys and playmats were disinfected with care. So glad I found this team!",
      author: "- Chidera, Surulere",
      image: service6
    },
    {
      quote: "As a pastor, I call them every month to sanitize the church hall. Reliable and spirit-led in their service.",
      author: "- Pastor Femi, Egbeda",
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
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlay">
        <h1>{service.title}</h1>
        <p className="tagline">{service.tagline}</p>
        <p>{service.description}</p>

        {/* 🔥 Optional quick info row */}
        <div className="quick-info">
          <span><i className="fa-regular fa-clock"></i> {service.duration}</span>
          <span><i className="fa-solid fa-money-bill-wave"></i> {service.pricing}</span>
          {service.targetAudience && (
            <span>
              <i className="fa-solid fa-users"></i>{" "}
              {service.targetAudience.slice(0, 3).join(", ")}{service.targetAudience.length > 3 && " + more"}
            </span>
          )}
        </div>
      </div>
    </section>

    {[
      "detail-content",
      "why-section",
      "prep-section",
      "testimonial-section",
      "faq-section",
      "cta-section",
    ].map((cls, i) => (
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
                  <div
                    className="faq-question"
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  >
                    <span>{faq.question}</span>
                    <i
                      className={`fa-solid ${
                        openFAQ === idx
                          ? "fa-chevron-up"
                          : "fa-chevron-down"
                      }`}
                    ></i>
                  </div>
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
            <p>
              We're ready to bring excellence to your doorstep. Reach out now!
            </p>
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
