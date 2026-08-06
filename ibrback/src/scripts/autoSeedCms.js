// filepath: ibrback/src/scripts/autoSeedCms.js
require("dotenv").config();
const { repositories } = require("../repositories");
const { cmsContentRepository } = repositories;

const defaultContent = [
  {
    key: "home.hero_slides",
    type: "array",
    category: "homepage",
    label: "Homepage Hero Slides",
    description: "Hero slider content for the homepage",
    value: [
      {
        questions: "Professional Cleaning Services",
        header: "We Clean and",
        headerspan: "prioritize your satisfaction",
        ps: [
          "Welcome to LBR Cleaning! We provide top-quality professional cleaning services across Nigeria.",
          "Explore our services and discover how we can transform your space into a spotless, healthy environment."
        ],
        talks: ["Call now", "We've got you"],
        talksReport: "+234 801 234 5678"
      },
      {
        questions: "Nigeria's Most Trusted Cleaners",
        header: "Need cleaning?",
        headerspan: "call us today",
        ps: [
          "Our vision is to be the leading cleaning company in Nigeria and across Africa.",
          "We deliver excellent, innovative, and value-driven cleaning solutions to homes and businesses."
        ],
        talks: ["Book clean", "Clean now"],
        talksReport: "+234 801 234 5678"
      },
      {
        questions: "Our Commitment to Excellence",
        header: "Why choose us?",
        headerspan: "We go the extra mile",
        ps: [
          "Our mission is to provide excellent, high-quality cleaning services that consistently meet your needs.",
          "We ensure a clean and healthy environment through highly trained staff and exceptional customer service."
        ],
        talks: ["Learn more", "free estimate"],
        talksReport: "+234 801 234 5678"
      },
      {
        questions: "About Us",
        header: "Who are we?",
        headerspan: "about our company",
        ps: [
          "Our values guide everything: Excellence, Integrity, Innovation, Professionalism, Commitment, and Trust.",
          "We uphold these principles daily to deliver reliable, meaningful, and quality-driven cleaning services."
        ],
        talks: ["Contact us", "Get a quote"],
        talksReport: "+234 801 234 5678"
      }
    ]
  },
  {
    key: "home.features",
    type: "array",
    category: "homepage",
    label: "Homepage Features",
    description: "Feature cards below the hero",
    value: [
      {
        icon: "fa-solid fa-pump-medical",
        title: "Residential Cleaning",
        description: "We keep your home spotless with dusting, vacuuming, and sanitizing key areas."
      },
      {
        icon: "fa-solid fa-broom",
        title: "Commercial Cleaning",
        description: "We clean offices and commercial spaces, creating a healthier work environment."
      },
      {
        icon: "fa-brands fa-pagelines",
        title: "Eco-Friendly Products",
        description: "Our non-toxic, eco-friendly products are safe for your family, pets, and environment."
      }
    ]
  },
  {
    key: "home.how_it_works",
    type: "object",
    category: "how_it_works",
    label: "How It Works Section",
    description: "Step-by-step process section on homepage",
    value: {
      tag: "Simple Process",
      title: "How It Works",
      subtitle: "Booking a cleaning service with LBR is fast, simple, and stress-free.",
      steps: [
        { title: "Book Online", description: "Fill out our simple booking form with your service preference, date, and contact details.", icon: "fa-solid fa-calendar-check" },
        { title: "Get Confirmed", description: "Our team calls you within 24 hours to confirm details, answer questions, and schedule your cleaning.", icon: "fa-solid fa-phone" },
        { title: "We Clean", description: "Our trained professionals arrive on time with eco-friendly products and transform your space.", icon: "fa-solid fa-broom" },
        { title: "Enjoy & Review", description: "Inspect our work, enjoy your spotless space, and share your feedback with us.", icon: "fa-solid fa-star" }
      ]
    }
  },
  {
    key: "home.coverage_areas",
    type: "object",
    category: "coverage_areas",
    label: "Coverage Areas Section",
    description: "Areas served section on homepage",
    value: {
      tag: "Service Coverage",
      title: "Areas We Serve",
      subtitle: "We provide professional cleaning services across Nigeria.",
      note: "Don't see your area?",
      note_link_text: "Contact us",
      list: ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kaduna", "Enugu", "Calabar", "Benin City", "Kano", "Warri"]
    }
  },
  {
    key: "home.guarantee",
    type: "object",
    category: "guarantee",
    label: "Guarantee Section",
    description: "Satisfaction guarantee section on homepage",
    value: {
      tag: "Our Promise",
      title: "100% Satisfaction Guaranteed",
      description: "If you're not completely satisfied with our cleaning service, we'll re-clean the affected areas for free within 24 hours — no questions asked.",
      items: [
        "Trained & vetted professionals",
        "Eco-friendly, non-toxic products",
        "Fully insured & bonded",
        "Transparent pricing — no hidden fees",
        "Same-day service available"
      ],
      cta_text: "Book with Confidence"
    }
  },
  {
    key: "homepage_stats.stats",
    type: "array",
    category: "homepage_stats",
    label: "Homepage Statistics",
    description: "Stats counter section on homepage",
    value: [
      { label: "Years Experience", value: 8, suffix: "+" },
      { label: "Happy Clients", value: 2500, suffix: "+" },
      { label: "Cleaning Projects", value: 15000, suffix: "+" },
      { label: "Team Members", value: 120, suffix: "+" }
    ]
  },
  {
    key: "trust_badges.badges",
    type: "array",
    category: "trust_badges",
    label: "Trust Badges",
    description: "Trust and safety badges",
    value: [
      { icon: "fa-solid fa-shield-halved", label: "Licensed & Insured" },
      { icon: "fa-solid fa-leaf", label: "Eco Certified" },
      { icon: "fa-solid fa-clock", label: "24/7 Support" },
      { icon: "fa-solid fa-medal", label: "5-Star Rated" },
      { icon: "fa-solid fa-hand-holding-heart", label: "Satisfaction Guarantee" },
      { icon: "fa-solid fa-user-shield", label: "Background-Checked Staff" }
    ]
  },
  {
    key: "home.cta_banner",
    type: "object",
    category: "homepage",
    label: "CTA Banner",
    description: "Call-to-action banner on homepage",
    value: {
      tag: "Get Started Today",
      title: "Ready for a Spotless Space?",
      subtitle: "Book your cleaning appointment in under 60 seconds. Professional cleaners, eco-friendly products, and a satisfaction guarantee — every time.",
      features: ["Free consultation & quote", "No hidden fees", "Satisfaction guaranteed"],
      primary_button: "Book Now",
      secondary_button: "Call Us"
    }
  },
  {
    key: "site.name",
    type: "text",
    category: "site_settings",
    label: "Site Name",
    description: "The name of the company",
    value: "LBR Cleaning",
    isPublic: true
  },
  {
    key: "site.tagline",
    type: "text",
    category: "site_settings",
    label: "Tagline",
    description: "Short tagline for the site",
    value: "Professional Cleaning Services Across Nigeria",
    isPublic: true
  },
  {
    key: "site.phone",
    type: "text",
    category: "site_settings",
    label: "Phone Number",
    description: "Primary contact phone number",
    value: "+234 801 234 5678",
    isPublic: true
  },
  {
    key: "site.email",
    type: "text",
    category: "site_settings",
    label: "Email Address",
    description: "Primary contact email",
    value: "hello@lbrcleaning.com",
    isPublic: true
  },
  {
    key: "site.address",
    type: "text",
    category: "site_settings",
    label: "Address",
    description: "Business address",
    value: "Lagos, Nigeria",
    isPublic: true
  },
  {
    key: "site.whatsapp",
    type: "text",
    category: "site_settings",
    label: "WhatsApp Number",
    description: "WhatsApp contact number (without + or spaces)",
    value: "2348012345678",
    isPublic: true
  },
  {
    key: "site.hours",
    type: "text",
    category: "site_settings",
    label: "Business Hours",
    description: "Operating hours",
    value: "Monday - Friday: 8:00 AM - 7:00 PM, Saturday: 9:00 AM - 5:00 PM, Sunday: 10:00 AM - 4:00 PM",
    isPublic: true
  },
  {
    key: "about_page.intro",
    type: "object",
    category: "about_page",
    label: "About Page Intro",
    description: "Introduction section on the about page",
    value: {
      heading: "Who We Are",
      paragraphs: [
        "LBR Cleaning Services is a registered Nigerian company offering quality cleaning solutions across Nigeria. Our services include janitorial and office cleaning, housekeeping, post-construction cleaning, floor care, residential cleaning, worship centers, fumigation, pest control, and disinfection.",
        "We create clean, safe spaces that add value to your business and home. With modern technology and skilled professionals, we handle dirt and dust to keep your operations smooth and your home sparkling."
      ]
    }
  },
  {
    key: "about_page.team",
    type: "array",
    category: "about_page",
    label: "Team Members",
    description: "Team members displayed on the about page",
    value: [
      { name: "Funke Adeyemi", role: "Lead Cleaning Specialist", image: "/assets/user1.jpg" },
      { name: "Chidi Okafor", role: "Operations Manager", image: "/assets/user2.jpg" },
      { name: "Aisha Bello", role: "Sanitation Consultant", image: "/assets/user3.jpg" },
      { name: "Emeka Okoro", role: "Customer Relations", image: "/assets/user4.jpg" }
    ]
  },
  {
    key: "about_page.values",
    type: "array",
    category: "about_page",
    label: "Core Values",
    description: "Core values displayed on the about page",
    value: [
      { icon: "fas fa-broom", title: "Excellence", description: "We strive to deliver spotless cleaning with attention to detail and high standards." },
      { icon: "fas fa-handshake", title: "Trust", description: "We build long-term relationships with clients based on honesty and reliability." },
      { icon: "fas fa-leaf", title: "Eco-Friendliness", description: "We use environmentally friendly products that are safe for your family and pets." },
      { icon: "fas fa-users", title: "Teamwork", description: "Our united team works together to ensure you always get the best results." }
    ]
  },
  {
    key: "about_page.video_url",
    type: "text",
    category: "about_page",
    label: "Video URL",
    description: "YouTube embed URL for the about page video",
    value: "https://www.youtube.com/embed/1Bsgv6DnTiI",
    isPublic: true
  },
  {
    key: "about_page.video_heading",
    type: "text",
    category: "about_page",
    label: "Video Section Heading",
    description: "Heading for the video section on the about page",
    value: "Why Choose LBR Cleaning?",
    isPublic: true
  },
  {
    key: "about_page.video_paragraphs",
    type: "array",
    category: "about_page",
    label: "Video Section Paragraphs",
    description: "Paragraphs for the video section on the about page",
    value: [
      `At <strong>LBR Cleaning</strong>, we go beyond surface-level sparkle. We are a trusted, eco-conscious cleaning company dedicated to making homes and offices shine—inside and out.`,
      `With years of expertise, highly trained staff, and a deep commitment to excellence, LBR Cleaning has earned a reputation for transforming spaces into healthy, inviting environments. Whether it's daily maintenance or deep cleaning, our solutions are personalized and reliable.`,
      `Choose LBR Cleaning—where precision meets passion, and your peace of mind is our priority.`
    ],
    isPublic: true
  },
  {
    key: "service_page.deal_heading",
    type: "text",
    category: "service_page",
    label: "Deal Section Heading",
    description: "Heading for the pricing/deal section on the service page",
    value: "Professional Cleaning, Transparent Pricing",
    isPublic: true
  },
  {
    key: "service_page.plans",
    type: "array",
    category: "service_page",
    label: "Pricing Plans",
    description: "Pricing plans displayed on the service page",
    value: [
      {
        price: "15,000",
        period: "per session",
        description: "Essential home cleaning",
        name: "Basic Clean",
        details: "Ideal for 1-2 bedroom apartments. Covers all essential cleaning tasks to keep your home fresh and tidy.",
        features: [
          "Dusting and surface cleaning",
          "Vacuuming and mopping floors",
          "Bathroom and kitchen sanitization",
          "Trash removal",
          "Weekly or bi-weekly scheduling",
        ],
        btnText: "Book Basic Clean",
      },
      {
        price: "30,000",
        period: "per session",
        description: "Most popular — deep clean + extras",
        name: "Standard Deep Clean",
        details: "Perfect for 3-4 bedroom homes. Includes deep cleaning services to maintain hygiene and freshness throughout your space.",
        features: [
          "Everything in Basic Clean",
          "Carpet and upholstery vacuuming",
          "Interior window cleaning",
          "Appliance exterior cleaning",
          "Inside cabinet wiping",
          "Bi-weekly or monthly scheduling",
        ],
        btnText: "Book Standard Clean",
        popular: true,
      },
      {
        price: "50,000",
        period: "per session",
        description: "Full property sanitization",
        name: "Premium Deep Clean",
        details: "Comprehensive cleaning for large homes, duplexes, and commercial spaces. Includes sanitization and specialized attention.",
        features: [
          "Everything in Standard Clean",
          "Wall and ceiling dusting",
          "Disinfection and sanitization",
          "Window frames and sills",
          "Post-construction cleanup ready",
          "Customized cleaning schedule",
        ],
        btnText: "Book Premium Clean",
      },
    ],
    isPublic: true
  },
  {
    key: "contact.hero",
    type: "array",
    category: "contact",
    label: "Contact Page Hero",
    description: "Hero section on the contact page",
    value: [
      {
        questions: "Have a question, request, or feedback?",
        header: "We'd Love to",
        headerspan: "Hear from You!",
        ps: [
          "Our friendly team is ready to assist you with quotes, service info, scheduling, or anything else you need.",
          "Reach out via phone, email, or WhatsApp – we respond quickly and professionally."
        ],
        talks: ["Messy home?", "We're on it!"],
        talksReport: "+234 801 234 5678"
      }
    ]
  },
  {
    key: "contact.features",
    type: "array",
    category: "contact",
    label: "Contact Page Features",
    description: "Feature cards on the contact page",
    value: [
      {
        icon: "fas fa-envelope",
        title: "Quick Email Replies",
        description: "We respond to every email within 24 hours. Reach us at hello@lbrcleaning.com."
      },
      {
        icon: "fas fa-phone-alt",
        title: "Call Us Directly",
        description: "Have something urgent? Call and speak with a real person instantly on +234 801 234 5678."
      },
      {
        icon: "fab fa-whatsapp",
        title: "Chat via WhatsApp",
        description: "Send us a message on WhatsApp and get real-time answers and updates."
      }
    ]
  },
  {
    key: "contact.business_hours",
    type: "array",
    category: "contact",
    label: "Business Hours",
    description: "Business hours displayed on the contact page",
    value: [
      { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 4:00 PM" },
      { days: "Sunday", hours: "Closed" }
    ]
  },
  {
    key: "contact.faq",
    type: "array",
    category: "contact",
    label: "Contact Page FAQs",
    description: "FAQ items on the contact page",
    value: [
      { question: "How soon will I get a reply?", answer: "We respond to all inquiries within 24 hours. WhatsApp replies are usually instant during working hours." },
      { question: "Can I request same-day service?", answer: "Yes! If available in your area, we'll try to fit you in. Contact us early in the day." },
      { question: "Do you offer services outside Lagos?", answer: "We serve major cities across Nigeria including Lagos, Abuja, Port Harcourt, Ibadan, and more. Contact us to confirm availability in your location." },
      { question: "What payment methods do you accept?", answer: "We accept bank transfers, cash, and online payments. Payment details are provided when we confirm your booking." },
      { question: "Is there a satisfaction guarantee?", answer: "Yes! If you're not 100% satisfied, we'll re-clean the area for free within 24 hours." }
    ]
  },
  {
    key: "testimonials.list",
    type: "array",
    category: "testimonials",
    label: "Customer Testimonials",
    description: "Testimonial cards displayed across the site",
    value: [
      {
        name: "Funke Adeyemi",
        image: "/assets/user1.jpg",
        ratings: 5,
        testimony: "LBR Cleaning transformed my 3-bedroom apartment in Lekki. The team arrived on time, worked thoroughly, and left every corner spotless.",
        instagramLink: "https://www.instagram.com/",
        facebookLink: "https://www.facebook.com/"
      },
      {
        name: "Chidi Okafor",
        image: "/assets/user2.jpg",
        ratings: 5,
        testimony: "We hired LBR for our office in Victoria Island and the difference was immediate. Our workspace is cleaner, fresher, and our staff morale has improved.",
        instagramLink: "https://www.instagram.com/",
        facebookLink: "https://www.facebook.com/"
      },
      {
        name: "Aisha Bello",
        image: "/assets/user3.jpg",
        ratings: 5,
        testimony: "After my move to Ikoyi, I needed a deep clean before moving in. LBR did an incredible job — the bathrooms were immaculate, the windows streak-free.",
        instagramLink: "https://www.instagram.com/",
        facebookLink: "https://www.facebook.com/"
      },
      {
        name: "Tunde Bakare",
        image: "/assets/user4.jpg",
        ratings: 4,
        testimony: "I've tried several cleaning services in Lagos, but LBR stands out. Their sanitization service gave me peace of mind, especially with kids around.",
        instagramLink: "https://www.instagram.com/",
        facebookLink: "https://www.facebook.com/"
      },
      {
        name: "Ngozi Eze",
        image: "/assets/user5.jpg",
        ratings: 5,
        testimony: "LBR's carpet cleaning brought my living room carpets back to life. They removed stains I thought were permanent. Worth every naira!",
        instagramLink: "https://www.instagram.com/",
        facebookLink: "https://www.facebook.com/"
      },
      {
        name: "Oluwaseun Adeyinka",
        image: "/assets/user6.jpg",
        ratings: 5,
        testimony: "As a property manager in Surulere, I need reliable cleaners for my apartments. LBR has been consistent for over a year now. They're my go-to cleaning partners.",
        instagramLink: "https://www.instagram.com/",
        facebookLink: "https://www.facebook.com/"
      }
    ]
  },
  {
    key: "blog.articles",
    type: "array",
    category: "blog",
    label: "Blog Articles",
    description: "Blog articles displayed on the blog page",
    value: [
      {
        title: "Why Clean Spaces Are the Foundation of Global Wellness",
        summary: `Across cultures and continents, people are waking up to a powerful truth: a clean space is more than just visually appealing — it's a cornerstone of emotional balance, physical health, and spiritual clarity. In Scandinavian countries, the philosophy of "lagom" influences how people approach their homes. Cleanliness is part of the balance, contributing to calmness and focus. Meanwhile, in Nigeria and other parts of Africa, cleanliness is tied to honor and respect.`,
        image_url: "/assets/blog1.jpg",
        pubDate: "2025-08-04",
        author: "LBR Editorial",
        readTime: "8 min read",
        tags: ["Wellness", "Mental Clarity", "Clean Living"],
        source_id: "LBR Manual"
      },
      {
        title: "How Experts Are Educating the World",
        summary: `Across the globe, cleaning blogs have become the digital classrooms for a more hygienic world. These platforms have evolved into major drivers of public health awareness, eco-conscious living, and domestic efficiency. From the skyscrapers of New York to the streets of Accra, experts, brands, and cleaning enthusiasts are reshaping how we think about cleanliness.`,
        image_url: "/assets/blog2.jpg",
        pubDate: "2025-08-03",
        author: "LBR Editorial",
        readTime: "9 min read",
        tags: ["Cleaning", "Blogging", "Global Trends"],
        source_id: "LBR Manual"
      },
      {
        title: "The Quiet Rise of Community-Based Cleaning Movements",
        summary: `In neighborhoods across the globe, a quiet movement is sweeping through — one broom, one blog post, and one volunteer at a time. It's called community-based cleaning, and it's gaining traction as people reclaim pride and health in the spaces they share. From Manila to Mombasa, cleaning is no longer just a private act.`,
        image_url: "/assets/blog3.jpg",
        pubDate: "2025-08-02",
        author: "LBR Editorial",
        readTime: "7 min read",
        tags: ["Community", "Sustainability", "Global Trends"],
        source_id: "LBR Manual"
      }
    ],
    isPublic: true
  },
  {
    key: "footer.about",
    type: "text",
    category: "footer",
    label: "Footer About Text",
    description: "About text in the footer",
    value: "At LBR Cleaning, we offer professional, reliable, and affordable cleaning services tailored to meet your needs. From residential homes to commercial offices, our trained staff ensures every space shines with excellence. Your satisfaction is our top priority.",
    isPublic: true
  },
  {
    key: "footer.subscribe_heading",
    type: "text",
    category: "footer",
    label: "Subscribe Heading",
    description: "Heading for the newsletter subscription section",
    value: "Stay in Touch",
    isPublic: true
  },
  {
    key: "footer.subscribe_placeholder",
    type: "text",
    category: "footer",
    label: "Subscribe Placeholder",
    description: "Placeholder text for the email input",
    value: "Enter Your Email",
    isPublic: true
  },
  {
    key: "footer.explore_links",
    type: "array",
    category: "footer",
    label: "Explore Links",
    description: "Navigation links in the footer",
    value: [
      { label: "Blog", to: "/blog", icon: "fa-solid fa-blog" },
      { label: "About Us", to: "/about", icon: "fa-solid fa-address-card" },
      { label: "Services", to: "/services", icon: "fa-brands fa-servicestack" },
      { label: "Contact", to: "/contact", icon: "fa-solid fa-phone" }
    ],
    isPublic: true
  },
  {
    key: "footer.social_links",
    type: "array",
    category: "footer",
    label: "Social Links",
    description: "Social media links in the footer",
    value: [
      { url: "https://www.facebook.com/lbrcleaning", icon: "fa-brands fa-facebook-f" },
      { url: "https://www.instagram.com/lbrcleaning", icon: "fa-brands fa-instagram" },
      { url: "https://www.youtube.com/@lbrcleaning", icon: "fa-brands fa-youtube" }
    ],
    isPublic: true
  },
  {
    key: "service_page.features",
    type: "array",
    category: "service_page",
    label: "Service Page Features",
    description: "Feature cards on the service page",
    value: [
      {
        icon: "fa-solid fa-building",
        title: "Post-Construction Cleaning",
        description: "Finished a project? We remove debris, dust, and sanitize to leave your space move-in ready across Nigeria."
      },
      {
        icon: "fa-solid fa-truck-ramp-box",
        title: "Move In/Out Cleaning",
        description: "Moving? We clean thoroughly so your old place is spotless and your new one fresh and ready for inspection."
      },
      {
        icon: "fa-solid fa-calendar-check",
        title: "Custom & Scheduled Plans",
        description: "Need regular cleaning? Choose weekly, bi-weekly, or monthly plans with reliable quality and punctual staff."
      }
    ]
  },
  {
    key: "service_page.hero_slides",
    type: "array",
    category: "service_page",
    label: "Service Page Hero Slides",
    description: "Hero slider content for the service page",
    value: [
      {
        questions: "Professional Cleaning Services",
        header: "We Clean and",
        headerspan: "prioritize your satisfaction",
        ps: [
          "Our vision is to be the leading cleaning company in Nigeria and across Africa.",
          "We deliver excellent, innovative, and value-driven cleaning solutions to homes and businesses."
        ],
        talks: ["Book clean", "Clean now"],
        talksReport: "+234 801 234 5678"
      }
    ]
  },
{
    key: "service_page.services",
    type: "array",
    category: "service_page",
    label: "Service Cards",
    description: "Service cards shown in the 'What We Offer' section on the service page",
    value: [
      {
        id: "home-cleaning",
        title: "Home Cleaning",
        image: "/assets/cleaner19.jpeg",
        icon: "fa-solid fa-house",
        details: [
          "Living room vacuuming, mopping, and dusting",
          "Bathroom and kitchen sanitization"
        ]
      },
      {
        id: "office-cleaning",
        title: "Office Cleaning",
        image: "/assets/cleaner20.jpg",
        icon: "fa-solid fa-building",
        details: [
          "Workstation dusting and desk sanitization",
          "Restroom and breakroom cleaning"
        ]
      },
      {
        id: "carpet-cleaning",
        title: "Carpet Cleaning",
        image: "/assets/cleaner21.jpg",
        icon: "fa-solid fa-rug",
        details: [
          "Deep shampooing and stain pre-treatment",
          "Odor neutralization and sanitization"
        ]
      },
      {
        id: "window-cleaning",
        title: "Window Cleaning",
        image: "/assets/cleaner25.jpg",
        icon: "fa-solid fa-table-cells",
        details: [
          "Interior and exterior window pane washing",
          "Frame, sill, and track detailing"
        ]
      },
      {
        id: "move-cleaning",
        title: "Move In/Out Cleaning",
        image: "/assets/cleaner24.jpg",
        icon: "fa-solid fa-truck-ramp-box",
        details: [
          "Deep clean of all rooms, floors, and doors",
          "Kitchen and bathroom deep sanitization"
        ]
      },
      {
        id: "post-construction-cleaning",
        title: "Post-Construction Cleaning",
        image: "/assets/cleaner22.jpg",
        icon: "fa-solid fa-broom",
        details: [
          "Removal of paint splatter and cement residue",
          "Full dusting and polishing of surfaces"
        ]
      },
      {
        id: "sanitization-service",
        title: "Sanitization Service",
        image: "/assets/cleaner22.jpg",
        icon: "fa-solid fa-spray-can-sparkles",
        details: [
          "Hospital-grade fogging and disinfection",
          "High-touch point sanitization"
        ]
      }
    ],
    isPublic: true
  },
  {
    key: "service_details.home-cleaning",
    type: "object",
    category: "service_details",
    label: "Home Cleaning — Details",
    description: "Home cleaning content for service details",
    value: {
      description: "Restore the sparkle and peace of your home with our professional residential cleaning. From living rooms to bedrooms, kitchens to windows — we give your home the glow it deserves with attention to every detail.",
      faqs: [
        {
          question: "Do you clean behind and under furniture?",
          answer: "Yes, we move light furniture like chairs and small tables. For heavy items, we clean around and under them where possible."
        },
        {
          question: "What cleaning products do you use?",
          answer: "We use eco-friendly, child-safe, and pet-safe cleaning products unless you prefer specific brands."
        },
        {
          question: "Do I need to be home during the cleaning?",
          answer: "Not necessarily. Many of our clients prefer to schedule cleaning while they're away. Just provide access and clear instructions."
        },
        {
          question: "Can I book recurring home cleaning?",
          answer: "Absolutely! We offer weekly, bi-weekly, and monthly cleaning plans tailored to your needs."
        }
      ],
      testimonials: [
        {
          quote: "My home feels like a hotel after every session. They even cleaned under my bed!",
          author: "- Ifeoma, Lagos",
          image: "https://i.pravatar.cc/150?u=home-cleaning-0"
        },
        {
          quote: "Best cleaning team I've ever hired. Professional and punctual!",
          author: "- Damilola, Surulere",
          image: "https://i.pravatar.cc/150?u=home-cleaning-1"
        },
        {
          quote: "The attention to detail blew me away. Even my bookshelf was dust-free.",
          author: "- Mr. Sola, Ogudu",
          image: "https://i.pravatar.cc/150?u=home-cleaning-2"
        },
        {
          quote: "They used natural products as I requested, and the result was amazing!",
          author: "- Chinyere, Ikeja GRA",
          image: "https://i.pravatar.cc/150?u=home-cleaning-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "service_details.office-cleaning",
    type: "object",
    category: "service_details",
    label: "Office Cleaning — Details",
    description: "Office cleaning content for service details",
    value: {
      description: "Boost productivity and first impressions with a spotless workplace. Our tailored office cleaning services cover everything from workstations to reception areas, ensuring a fresh and hygienic space that inspires daily excellence.",
      faqs: [
        {
          question: "Can you clean during office hours without disrupting work?",
          answer: "Yes, our team is trained to work quietly and respectfully, or we can schedule outside working hours if preferred."
        },
        {
          question: "Do you provide cleaning supplies and tools?",
          answer: "Yes, we come fully equipped with commercial-grade products and tools. If you have preferences, let us know!"
        },
        {
          question: "Can we request cleaning of only specific areas?",
          answer: "Absolutely. We offer partial and full office cleaning depending on your needs and budget."
        },
        {
          question: "Is it safe for our electronics and documents?",
          answer: "Yes, our team is trained in safe cleaning practices, and we avoid direct contact with sensitive items unless instructed."
        }
      ],
      testimonials: [
        {
          quote: "Our office has never looked better. Staff morale went up instantly!",
          author: "- Adewale, HR Manager, Lekki",
          image: "https://i.pravatar.cc/150?u=office-cleaning-0"
        },
        {
          quote: "They clean after hours and everything smells fresh every morning.",
          author: "- Uche, Tech Startup Founder",
          image: "https://i.pravatar.cc/150?u=office-cleaning-1"
        },
        {
          quote: "Very reliable team — they've never missed a schedule.",
          author: "- Mrs. Dada, Law Firm Admin",
          image: "https://i.pravatar.cc/150?u=office-cleaning-2"
        },
        {
          quote: "From toilets to tables, everything is spotless. Highly recommended!",
          author: "- Tunde, Creative Agency Director",
          image: "https://i.pravatar.cc/150?u=office-cleaning-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "service_details.carpet-cleaning",
    type: "object",
    category: "service_details",
    label: "Carpet Cleaning — Details",
    description: "Carpet cleaning content for service details",
    value: {
      description: "Revive your carpets with deep-cleaning that lifts dirt, odors, and allergens. Whether it's for a cozy home, a prayer hall, or your reception area, we leave your carpet fresh, fluffy, and free from hidden grime.",
      faqs: [
        {
          question: "How long does it take for the carpet to dry?",
          answer: "Usually 2–6 hours depending on ventilation and carpet type. We use air movers to speed it up where possible."
        },
        {
          question: "Do you clean rugs as well?",
          answer: "Yes! We clean area rugs, runners, and custom carpets either on-site or via pick-up and return service."
        },
        {
          question: "Can you remove old stains and odors?",
          answer: "Yes, our stain removers and deodorizing treatments are effective against most stubborn marks and smells."
        },
        {
          question: "Are your products safe for babies and pets?",
          answer: "Absolutely. We use child-safe, pet-safe, eco-friendly products on all carpets unless otherwise requested."
        }
      ],
      testimonials: [
        {
          quote: "Our church carpet looked brand new after cleaning. Amazing job!",
          author: "- Pastor Mike, Shomolu",
          image: "https://i.pravatar.cc/150?u=carpet-cleaning-0"
        },
        {
          quote: "The pet smell and stains disappeared completely. Highly impressed.",
          author: "- Rita, Dog Mom in Ikeja",
          image: "https://i.pravatar.cc/150?u=carpet-cleaning-1"
        },
        {
          quote: "Even my high-traffic hallway carpet looks revived. Thank you!",
          author: "- Mr. Jude, Victoria Island",
          image: "https://i.pravatar.cc/150?u=carpet-cleaning-2"
        },
        {
          quote: "They were super fast and careful with our woven rug. 10/10!",
          author: "- Zainab, Surulere",
          image: "https://i.pravatar.cc/150?u=carpet-cleaning-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "service_details.window-cleaning",
    type: "object",
    category: "service_details",
    label: "Window Cleaning — Details",
    description: "Window cleaning content for service details",
    value: {
      description: "Crystal-clear windows do more than brighten a room — they elevate your entire space. Our expert window cleaning removes grime, water stains, and dust from glass panes, frames, and sills for a flawless finish inside and out.",
      faqs: [
        {
          question: "Do you clean both inside and outside of the windows?",
          answer: "Yes, we clean both sides unless one is inaccessible (e.g. external panes on upper floors without safe access)."
        },
        {
          question: "Can you clean during rainy season?",
          answer: "We monitor the weather and may reschedule outdoor cleaning during rain, but interior windows can still be cleaned."
        },
        {
          question: "Do you remove paint or cement spots?",
          answer: "Yes, we can remove minor construction residues with care. Let us know in advance if it's a post-renovation job."
        },
        {
          question: "Is there a discount for regular window cleaning?",
          answer: "Yes! We offer discounts for monthly or bi-monthly service plans — perfect for showrooms or large properties."
        }
      ],
      testimonials: [
        {
          quote: "Our balcony glass hasn't been this clear in years. The view is amazing now!",
          author: "- Mrs. Ayo, Lekki Phase 1",
          image: "https://i.pravatar.cc/150?u=window-cleaning-0"
        },
        {
          quote: "No streaks at all. They even cleaned the window frames!",
          author: "- Chuka, Ikoyi",
          image: "https://i.pravatar.cc/150?u=window-cleaning-1"
        },
        {
          quote: "Our storefront windows sparkle — clients notice the difference!",
          author: "- Toyin, Boutique Owner",
          image: "https://i.pravatar.cc/150?u=window-cleaning-2"
        },
        {
          quote: "They brought their own ladders and were very safe and professional.",
          author: "- Mr. Dayo, 2nd-floor tenant, Yaba",
          image: "https://i.pravatar.cc/150?u=window-cleaning-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "service_details.move-cleaning",
    type: "object",
    category: "service_details",
    label: "Move In/Out Cleaning — Details",
    description: "Move cleaning content for service details",
    value: {
      description: "Moving is stressful enough — let us handle the cleaning. Whether you're moving in or out, we deep-clean every inch of your property to leave it sparkling and ready. Perfect for end-of-lease, pre-sale, or post-construction cleanups.",
      faqs: [
        {
          question: "Do I need to be present during the cleaning?",
          answer: "Not at all. As long as we have access, we'll handle everything and send updates/photos if needed."
        },
        {
          question: "Can you clean after renovation or painting?",
          answer: "Yes, we offer post-construction cleaning as an add-on to handle paint, cement dust, and debris."
        },
        {
          question: "Is this service suitable before handing over keys?",
          answer: "Absolutely. We ensure the property meets top standards for inspection and handover."
        },
        {
          question: "Do you clean appliances too?",
          answer: "Yes! We clean inside ovens, fridges, and microwaves if requested. Please mention it during booking."
        }
      ],
      testimonials: [
        {
          quote: "The apartment was cleaner than when I moved in! I got my full deposit back.",
          author: "- Ngozi, Former Tenant in Magodo",
          image: "https://i.pravatar.cc/150?u=move-cleaning-0"
        },
        {
          quote: "They handled post-renovation dust like pros. No trace of cement left.",
          author: "- Femi, Realtor",
          image: "https://i.pravatar.cc/150?u=move-cleaning-1"
        },
        {
          quote: "We moved into a spotless home — smelled fresh and looked perfect.",
          author: "- Bukky & Tayo, New Homeowners",
          image: "https://i.pravatar.cc/150?u=move-cleaning-2"
        },
        {
          quote: "Even the kitchen drawers and light switches were sparkling. 100% worth it.",
          author: "- Tolu, Ikorodu",
          image: "https://i.pravatar.cc/150?u=move-cleaning-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "service_details.post-construction-cleaning",
    type: "object",
    category: "service_details",
    label: "Post-Construction Cleaning — Details",
    description: "Post-construction cleaning content for service details",
    value: {
      description: "Construction leaves a mess — we make it disappear. Our post-construction cleaning removes fine dust, paint spots, cement residue, and debris to reveal the beauty of your new or renovated space. We bring out the final shine so your property is move-in ready.",
      faqs: [
        {
          question: "Can you remove cement and paint from tiles?",
          answer: "Yes, we use safe methods and products to remove tough residues without damaging your tiles or finishes."
        },
        {
          question: "Do you offer debris removal?",
          answer: "We can help with small debris removal. For large-scale waste, we recommend booking our cleaning alongside a haulage service."
        },
        {
          question: "How long should I wait after construction ends to clean?",
          answer: "We recommend cleaning immediately after the project is fully completed to avoid dust settling deeper over time."
        },
        {
          question: "Is it safe for new surfaces and appliances?",
          answer: "Absolutely. We use soft cloths and non-abrasive products designed for new fixtures and surfaces."
        }
      ],
      testimonials: [
        {
          quote: "They turned our dusty renovation mess into a sparkling clean home. Couldn't believe the difference.",
          author: "- Dunni, Gbagada",
          image: "https://i.pravatar.cc/150?u=post-construction-cleaning-0"
        },
        {
          quote: "No scratches, no streaks — just flawless finishing after our office fit-out.",
          author: "- Mr. Lanre, Facility Manager",
          image: "https://i.pravatar.cc/150?u=post-construction-cleaning-1"
        },
        {
          quote: "Our showroom looked photo-ready after their cleaning. Highly detailed work.",
          author: "- Grace, Interior Decorator",
          image: "https://i.pravatar.cc/150?u=post-construction-cleaning-2"
        },
        {
          quote: "Paint stains gone, cement dust gone — they did it all in a day.",
          author: "- Hassan, Contractor, Agege",
          image: "https://i.pravatar.cc/150?u=post-construction-cleaning-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "service_details.sanitization-service",
    type: "object",
    category: "service_details",
    label: "Sanitization Service — Details",
    description: "Sanitization service content for service details",
    value: {
      description: "Protect your space from invisible threats. Our Sanitization Service targets harmful germs, bacteria, and viruses on surfaces and in the air. Whether you're recovering from illness, hosting guests, or simply upgrading your hygiene standards, we use advanced disinfection methods trusted in hospitals and public health facilities. Safe, thorough, and tailored for Lagos living.",
      faqs: [
        {
          question: "Is your sanitization service safe for babies and pets?",
          answer: "Yes, we use eco-friendly, hospital-grade disinfectants that are safe for children and pets once the space is ventilated after treatment."
        },
        {
          question: "How long before I can re-enter the space?",
          answer: "Most areas can be safely re-entered 30–60 minutes after fogging, depending on ventilation. We'll guide you based on your space."
        },
        {
          question: "Do I still need regular cleaning after sanitization?",
          answer: "Yes. Sanitization complements regular cleaning by targeting germs and pathogens that normal surface wiping may miss."
        },
        {
          question: "Can you sanitize after a COVID case or flu outbreak?",
          answer: "Absolutely. We follow WHO-compliant disinfection procedures to restore safe environments after illness exposure."
        }
      ],
      testimonials: [
        {
          quote: "After my son recovered from malaria, they sanitized our whole house. I slept with peace of mind.",
          author: "- Mojisola, Magodo",
          image: "https://i.pravatar.cc/150?u=sanitization-service-0"
        },
        {
          quote: "They came after our office staff tested positive. Fast, professional, and very respectful.",
          author: "- HR Manager, Victoria Island",
          image: "https://i.pravatar.cc/150?u=sanitization-service-1"
        },
        {
          quote: "Even my kids' toys and playmats were disinfected with care. So glad I found this team!",
          author: "- Chidera, Surulere",
          image: "https://i.pravatar.cc/150?u=sanitization-service-2"
        },
        {
          quote: "As a pastor, I call them every month to sanitize the church hall. Reliable and spirit-led in their service.",
          author: "- Pastor Femi, Egbeda",
          image: "https://i.pravatar.cc/150?u=sanitization-service-3"
        }
      ]
    },
    isPublic: true
  },
  {
    key: "homepage.features",
    type: "array",
    category: "homepage",
    label: "Homepage Feature Cards",
    description: "Feature cards on homepage",
    value: [
      {
        icon: "fa-solid fa-pump-medical",
        title: "Residential Cleaning",
        description: "We keep your home spotless with dusting, vacuuming, and sanitizing key areas."
      },
      {
        icon: "fa-solid fa-broom",
        title: "Commercial Cleaning",
        description: "We clean offices and commercial spaces, creating a healthier work environment."
      },
      {
        icon: "fa-brands fa-pagelines",
        title: "Eco-Friendly Products",
        description: "Our non-toxic, eco-friendly products are safe for your family, pets, and environment."
      }
    ]
  },
  {
    key: "why_choose_us.features",
    type: "array",
    category: "why_choose_us",
    label: "Why Choose Us Features",
    description: "Feature cards for Why Choose Us section",
    value: [
      {
        icon: "fa-solid fa-shield-halved",
        title: "Fully Insured & Bonded",
        description: "Every cleaning team is fully insured, giving you complete peace of mind with every service."
      },
      {
        icon: "fa-solid fa-leaf",
        title: "Eco-Friendly Products",
        description: "We use non-toxic, biodegradable cleaning solutions safe for children, pets, and the environment."
      },
      {
        icon: "fa-solid fa-clock",
        title: "Flexible Scheduling",
        description: "Book one-time deep cleans or recurring visits — mornings, evenings, or weekends at your convenience."
      },
      {
        icon: "fa-solid fa-star",
        title: "Satisfaction Guaranteed",
        description: "Not happy with the results? We'll re-clean the area for free within 24 hours. No questions asked."
      }
    ]
  },
  {
    key: "trust_section.badges",
    type: "array",
    category: "trust_section",
    label: "Trust Section Badges",
    description: "Badges for trust and safety section",
    value: [
      { icon: "fa-solid fa-shield-halved", label: "Licensed & Insured" },
      { icon: "fa-solid fa-leaf", label: "Eco Certified" },
      { icon: "fa-solid fa-clock", label: "24/7 Support" },
      { icon: "fa-solid fa-medal", label: "5-Star Rated" },
      { icon: "fa-solid fa-hand-holding-heart", label: "Satisfaction Guarantee" },
      { icon: "fa-solid fa-user-shield", label: "Background-Checked Staff" }
    ]
  },
  {
    key: "service_process.steps",
    type: "array",
    category: "service_process",
    label: "Service Process Steps",
    description: "Steps for how it works section",
    value: [
      {
        number: "01",
        title: "Book Online",
        description: "Choose your service, select a date and time, and tell us about your space. It takes less than a minute.",
        icon: "fa-solid fa-calendar-check"
      },
      {
        number: "02",
        title: "We Confirm",
        description: "Our team calls or messages you within minutes to confirm details, answer questions, and lock in your slot.",
        icon: "fa-solid fa-phone"
      },
      {
        number: "03",
        title: "We Clean",
        description: "A vetted, uniformed professional arrives on time with all supplies and equipment. We clean to our checklist.",
        icon: "fa-solid fa-broom"
      },
      {
        number: "04",
        title: "You Approve",
        description: "Inspect the work. If anything falls short, we re-clean it for free within 24 hours — guaranteed.",
        icon: "fa-solid fa-thumbs-up"
      }
    ]
  },
  {
    key: "service_guarantee.items",
    type: "array",
    category: "service_guarantee",
    label: "Service Guarantee Items",
    description: "Guarantee cards for service page",
    value: [
      {
        icon: "fa-solid fa-shield-halved",
        title: "Satisfaction Guarantee",
        description: "If you're not 100% satisfied, we'll re-clean the area for free within 24 hours."
      },
      {
        icon: "fa-solid fa-leaf",
        title: "Eco-Friendly Promise",
        description: "We use only non-toxic, biodegradable products safe for kids, pets, and the planet."
      },
      {
        icon: "fa-solid fa-clock",
        title: "On-Time Arrival",
        description: "Our teams arrive within the scheduled window or you get a 20% discount on your next service."
      },
      {
        icon: "fa-solid fa-medal",
        title: "Background-Checked Team",
        description: "Every cleaner is vetted, trained, and insured. Your home is in safe hands."
      }
    ]
  },
  {
    key: "cta_banner.data",
    type: "object",
    category: "cta_banner",
    label: "CTA Banner",
    description: "Call-to-action banner",
    value: {
      tag: "Get Started Today",
      title: "Ready for a <span class='highlight'>Spotless</span> Space?",
      subtitle: "Book your cleaning appointment in under 60 seconds. Our team is standing by to bring freshness back to your home or office.",
      features: ["Free consultation & quote", "No hidden fees", "Satisfaction guaranteed"],
      primary_button: "Book Now",
      secondary_button: "Call Us",
      phone: "+234 801 234 5678"
    }
  },
  {
    key: "newsletter.data",
    type: "object",
    category: "newsletter",
    label: "Newsletter Signup",
    description: "Newsletter signup section content",
    value: {
      title: "Stay in the <span class='highlight'>Loop</span>",
      subtitle: "Get weekly cleaning tips, exclusive offers, and helpful guides delivered straight to your inbox. No spam — just useful stuff.",
      placeholder: "Enter your email address",
      button_text: "Subscribe",
      success_message: "Thanks for subscribing! Check your inbox for a welcome surprise.",
      error_message: "Please enter your email address.",
      privacy_text: "We respect your privacy. Unsubscribe at any time."
    }
  },
  {
    key: "about_timeline.milestones",
    type: "array",
    category: "about_timeline",
    label: "About Timeline Milestones",
    description: "Company timeline milestones",
    value: [
      {
        year: "2018",
        icon: "fa-solid fa-flag",
        title: "Founded",
        description: "LBR Cleaning was founded with a simple mission: to bring professional, reliable cleaning to Nigerian homes and offices."
      },
      {
        year: "2020",
        icon: "fa-solid fa-star",
        title: "500+ Clients",
        description: "Reached our first 500 satisfied clients across Lagos. Expanded our team to 25 trained professionals."
      },
      {
        year: "2023",
        icon: "fa-solid fa-users",
        title: "Community Impact",
        description: "Launched community cleaning initiatives and trained over 50 women in eco-friendly cleaning practices."
      },
      {
        year: "2025",
        icon: "fa-solid fa-building",
        title: "Platform Launch",
        description: "Launching the digital platform to make booking, payments, and scheduling seamless for everyone."
      }
    ]
  }
];

async function ensureCmsPopulated() {
  try {
    console.log("[AUTO-SEED] Checking for missing CMS keys...");
    let created = 0;
    let skipped = 0;

    for (const item of defaultContent) {
      const existing = await cmsContentRepository.findByKey(item.key);

      if (existing) {
        skipped++;
        continue;
      }

      console.log(`[AUTO-SEED] Missing key, seeding: ${item.key} (${item.category})`);
      await cmsContentRepository.upsert({
        key: item.key,
        type: item.type,
        value: item.value,
        label: item.label,
        description: item.description,
        category: item.category,
        isPublic: item.isPublic !== undefined ? item.isPublic : true,
        updatedBy: "auto-seed",
      });
      created++;
    }

    console.log(`[AUTO-SEED] Done. Created ${created} missing key(s), ${skipped} already existed.`);
  } catch (error) {
    console.error("[AUTO-SEED] Failed:", error);
  }
}

module.exports = { ensureCmsPopulated, defaultContent };
