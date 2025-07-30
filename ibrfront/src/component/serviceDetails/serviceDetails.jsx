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
  image: service2,
  outlistimage: service2,
  description:
    "Maintain a spotless and healthy workplace that fuels productivity and leaves a great impression on clients and staff. Our customizable office cleaning services cater to startups, agencies, banks, and everything in between.",
  details: [
    "Dusting of desks, chairs, and computer monitors",
    "Keyboard and mouse sanitization (on request)",
    "Emptying and sanitizing waste bins",
    "Vacuuming and mopping of all flooring types",
    "Glass partitions and surface polishing",
    "Restroom cleaning, scrubbing, and restocking supplies",
    "Break room and kitchenette cleaning",
    "Sanitization of shared spaces: meeting rooms, lobbies, lounges",
    "Door handles, elevator buttons, and switch disinfection",
    "Reception desk polishing and paper organization"
  ],
  benefits: [
    "Creates a healthy work environment with fewer sick days",
    "Enhances your company’s professionalism and credibility",
    "Boosts employee focus and satisfaction",
    "Tailored cleaning plans based on your working hours and office size",
    "Reduces dust buildup on electronics and work equipment",
    "Quiet and respectful staff trained for office settings",
    "Increases hygiene in high-traffic zones",
    "Flexible daily, weekly, or custom frequency options"
  ],
  preparation: [
    "Notify your staff of the cleaning schedule to avoid disruptions",
    "Secure sensitive files and electronics if desired",
    "Clear personal items from desks when possible",
    "List priority areas such as executive rooms or restrooms",
    "Inform us of access procedures (keys, entry cards, security protocols)"
  ],
  faqs: [
    {
      question: "Can cleaning be done after business hours?",
      answer:
        "Yes! We offer after-hours or weekend cleaning to ensure zero interruption to your workflow."
    },
    {
      question: "Do you provide cleaning supplies?",
      answer:
        "Yes, we bring all necessary eco-friendly supplies unless you prefer to use your own."
    },
    {
      question: "How many staff do you assign per cleaning session?",
      answer:
        "It depends on your office size. Small offices may have 1–2 staff, while large corporate spaces get a full team."
    },
    {
      question: "Do you offer deep cleaning for offices?",
      answer:
        "Yes, we offer one-time deep cleaning for special occasions, renovations, or end-of-lease transitions."
    }
  ],
  testimonials: [
    {
      quote: "Our office looks and smells amazing every week. Staff are friendlier in a clean space!",
      author: "- Mr. Ade, Victoria Island",
      image: service2
    },
    {
      quote: "Their consistency is unmatched. Every Monday, the place is spotless!",
      author: "- HR Manager, Yaba",
      image: service2
    },
    {
      quote: "Clients notice the difference. We've had compliments on how clean our reception area is!",
      author: "- Beauty Studio Admin, Lekki",
      image: service2
    },
    {
      quote: "We’ve never missed a cleaning day. Reliable, responsive, and affordable.",
      author: "- IT Startup CEO, Ikeja",
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
    "Revive your carpets and rugs with our professional deep-cleaning service. Whether it’s dirt, stains, or lingering odors — we tackle it all using safe, fast-drying techniques that leave your floors spotless and refreshed.",
  details: [
    "Pre-inspection of carpet material and stain types",
    "Pre-treatment of tough stains and high-traffic areas",
    "Steam cleaning or low-moisture methods based on fabric type",
    "Deep shampooing using child-safe and eco-friendly products",
    "Hot water extraction for dirt, bacteria, and odor removal",
    "Deodorizing and fiber-refreshing treatment",
    "Edge-to-edge cleaning, including corners and edges",
    "Furniture base spot cleaning and perimeter wipe-down",
    "Drying enhancement with air movers for faster walk-ready time",
    "Ideal for homes, offices, religious centers, and schools"
  ],
  benefits: [
    "Removes embedded dirt, pet hair, and allergens",
    "Restores carpet softness and vibrancy",
    "Eliminates odors from spills, pets, or dampness",
    "Prevents long-term damage and fiber breakdown",
    "Reduces the risk of mold and mildew growth",
    "Improves overall indoor air quality",
    "Safe for homes with children, elderly, and pets",
    "Protective treatment options available (e.g. stain guard)"
  ],
  preparation: [
    "Lightly vacuum the carpet before our team arrives (optional)",
    "Remove small items, toys, or personal belongings from the carpeted area",
    "Push furniture aside if you'd like full-area coverage",
    "Point out any specific stains you’d like us to target",
    "Ensure availability of water and electricity",
    "Keep pets and children away from wet areas during drying time"
  ],
  faqs: [
    {
      question: "How long does it take for carpets to dry?",
      answer:
        "Typically 2–4 hours with proper ventilation. We also use air movers for quicker drying."
    },
    {
      question: "Can you remove wine, grease, or pet stains?",
      answer:
        "Yes, we have specific treatments for common stains like wine, ink, grease, and pet accidents."
    },
    {
      question: "Is the cleaning process safe for all carpet types?",
      answer:
        "Absolutely. We adjust our methods based on your carpet's material — whether synthetic, wool, or blended fibers."
    },
    {
      question: "Do I need to move furniture?",
      answer:
        "We can clean around larger items, but for a full-area clean, moving small and medium furniture is recommended."
    }
  ],
  testimonials: [
    {
      quote: "They saved my favorite rug — looks brand new again!",
      author: "- Chuka, Ajah",
      image: service3
    },
    {
      quote: "Fast, professional, and no chemical smell. Highly recommend.",
      author: "- Blessing, Ikeja",
      image: service3
    },
    {
      quote: "I didn’t think the juice stains could come out. But they did!",
      author: "- Adaora, Surulere",
      image: service3
    },
    {
      quote: "This is the only carpet service that made my kids’ playroom feel fresh and safe.",
      author: "- Mummy Tolu, Gbagada",
      image: service3
    }
  ]
}
,
  {
  id: "window-cleaning",
  title: "Window Cleaning",
  image: service4,
  outlistimage: service4,
  description:
    "Let the light shine in with crystal-clear windows that transform your space. Our professional window cleaning removes dirt, streaks, and buildup—indoors and outdoors—leaving you with a flawless, gleaming view.",
  details: [
    "Exterior and interior window glass cleaning",
    "Frame and sill dusting and wiping",
    "Track vacuuming and dirt removal",
    "Screen removal, washing, and reinstalling",
    "Streak-free drying with microfiber cloths",
    "Sliding glass door and patio door washing",
    "Gutter edge and skylight frame wiping (optional)",
    "Extension poles or ladders used for tall windows",
    "Bird droppings and hard water stain treatment",
    "Ideal for homes, apartments, showrooms, and offices"
  ],
  benefits: [
    "Maximizes natural light and brightens interiors",
    "Enhances your property's curb appeal",
    "Improves mood and energy by reducing window grime",
    "Safe cleaning with professional equipment—no ladder risk for you",
    "Regular cleaning extends window lifespan by preventing corrosion",
    "Clean windows improve real estate value and first impressions",
    "Eco-friendly, non-abrasive solutions that leave no residue",
    "Flexible scheduling for recurring or one-time cleanings"
  ],
  preparation: [
    "Remove decorations, plants, or breakables from window sills",
    "Open blinds or curtains before our arrival",
    "Inform us of fragile or cracked windows beforehand",
    "Ensure access to exterior windows (gates unlocked, balconies cleared)",
    "Let us know if any windows are hard to open or tilt"
  ],
  faqs: [
    {
      question: "Do you clean multi-story or high-rise buildings?",
      answer:
        "Yes, we have equipment for upper floors and can clean up to several stories high safely."
    },
    {
      question: "What’s the difference between regular and deep window cleaning?",
      answer:
        "Regular cleaning includes glass and frame wiping. Deep cleaning adds screen washing, track vacuuming, and stain removal."
    },
    {
      question: "Do you clean during rainy weather?",
      answer:
        "We avoid cleaning during heavy rain for safety and effectiveness, but light showers don’t affect the quality."
    },
    {
      question: "Will the cleaning leave streaks or water marks?",
      answer:
        "No — we use professional squeegees and lint-free cloths for a sparkling, streak-free finish every time."
    }
  ],
  testimonials: [
    {
      quote: "I didn’t realize how dirty my windows were until they cleaned them—what a difference!",
      author: "- Mrs. Joy, Gwarinpa",
      image: service4
    },
    {
      quote: "Professional, respectful, and efficient. My windows look amazing.",
      author: "- Kingsley, Festac",
      image: service4
    },
    {
      quote: "They handled our tall stairwell windows with ease. No smears, no mess left behind.",
      author: "- School Admin, Agege",
      image: service4
    },
    {
      quote: "After their service, I had more sunlight in my living room than ever before.",
      author: "- Sarah, Lekki",
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
    "Moving in or moving out? Let us handle the mess. Our In/Out Cleaning service ensures your space is deeply cleaned and fully refreshed, whether you're settling into a new place or handing one over. From kitchen cabinets to bathroom grout, we scrub, sweep, and sanitize every inch so the space is ready for what’s next.",
  details: [
    "Thorough cleaning of all rooms including bedrooms, kitchen, living areas, and bathrooms",
    "Inside and outside of kitchen cabinets and drawers wiped and sanitized",
    "Scrubbing and descaling of bathroom tiles, sinks, tubs, and toilets",
    "Deep cleaning behind and beneath appliances (where accessible)",
    "Floor mopping, vacuuming, and baseboard detailing",
    "Dusting of ceiling fans, light fixtures, and vents",
    "Interior window washing, track cleaning, and sill dusting",
    "Wall spot cleaning for smudges, fingerprints, and mild stains",
    "Light switch, doorknob, and handle disinfection",
    "Final touch: air freshening to leave a clean scent behind"
  ],
  benefits: [
    "Leaves your old home spotless and ready for inspection or turnover",
    "Prepares your new space with a fresh, hygienic start before move-in",
    "Reduces stress during relocation and helps avoid cleaning disputes",
    "Increases the value and appeal of your property for sale or rent",
    "Ensures every corner, cabinet, and surface is move-in or move-out ready",
    "Ideal for landlords, tenants, property managers, and real estate agents",
    "Service available for apartments, homes, offices, and short lets",
    "Done by a trained team familiar with Lagos housing standards and layouts"
  ],
  preparation: [
    "Clear out all personal belongings and trash from the space (unless arranged otherwise)",
    "Unplug and defrost any refrigerators or freezers at least 24 hours before cleaning",
    "Ensure access to running water, power, and all rooms in the property",
    "Inform us of any areas needing extra attention (e.g., stained walls, damaged tiles)",
    "Secure your keys or entry codes for smooth access if you're not present"
  ],
  faqs: [
    {
      question: "Do you bring your own cleaning supplies and tools?",
      answer:
        "Yes, we come fully equipped with professional cleaning products, brushes, vacuums, and disinfectants."
    },
    {
      question: "Can you clean a completely empty apartment?",
      answer:
        "Absolutely. In fact, empty homes allow for deeper access to corners, cabinets, and appliances."
    },
    {
      question: "How long does in/out cleaning take?",
      answer:
        "It depends on the size and condition of the space, but most jobs take between 3 to 6 hours for standard 2–4 bedroom properties."
    },
    {
      question: "Do you offer same-day or urgent move-out cleaning?",
      answer:
        "Yes, subject to availability. We understand that Lagos moves can happen quickly—reach out and we’ll do our best to fit you in."
    }
  ],
  testimonials: [
    {
      quote: "They cleaned every inch of my apartment before I moved out—I got my full deposit back!",
      author: "- Tolu, Lekki Phase 1",
      image: service5
    },
    {
      quote: "The flat was spotless by the time I moved in. Smelled fresh, looked brand new.",
      author: "- Ijeoma, Yaba",
      image: service5
    },
    {
      quote: "This team saved me during a last-minute move-out. Efficient and thorough.",
      author: "- Bayo, Surulere",
      image: service5
    },
    {
      quote: "I always use this service for my short-let properties. Guests love how clean everything is.",
      author: "- Property Manager, Ikeja GRA",
      image: service5
    }
  ]
}
,
 {
  id: "sanitization-service",
  title: "Sanitization Service",
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
