// filepath: ibrback/src/scripts/seedCms.js
require("dotenv").config();
const { connect: connectMongo, disconnect: disconnectMongo } = require("../config/mongodb.js");
const { repositories } = require("../repositories");
const { cmsContentRepository } = repositories;

const seedData = [
  // Homepage Hero Slides
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
      talksReport: "+234 801 234 5678",
      sectionimage: "/assets/cleaner1.png",
      sectionimageStar: "/assets/star.png",
      sectionimageSpark: "/assets/spark.png"
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
      talksReport: "+234 801 234 5678",
      sectionimage: "/assets/cleaner1.png",
      sectionimageStar: "/assets/star.png",
      sectionimageSpark: "/assets/spark.png"
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
      talksReport: "+234 801 234 5678",
      sectionimage: "/assets/cleaner1.png",
      sectionimageStar: "/assets/star.png",
      sectionimageSpark: "/assets/spark.png"
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
      talksReport: "+234 801 234 5678",
      sectionimage: "/assets/cleaner1.png",
      sectionimageStar: "/assets/star.png",
      sectionimageSpark: "/assets/spark.png"
    }
    ]
  },
  {
    key: "home.background_image",
    type: "text",
    category: "homepage",
    label: "Homepage Background Image",
    description: "Background image URL for the homepage hero",
    value: "/assets/cleaningbackground.jpg",
    isPublic: true
  },
  {
    key: "home.background_video",
    type: "text",
    category: "homepage",
    label: "Homepage Background Video",
    description: "Background video URL for the homepage hero (leave empty for image)",
    value: "",
    isPublic: true
  },
  {
    key: "home.hero_heading_1",
    type: "text",
    category: "homepage",
    label: "Hero Heading Line 1",
    description: "First line of the hero heading (e.g. 'We Clean and')",
    value: "We Clean and",
    isPublic: true
  },
  {
    key: "home.hero_heading_2",
    type: "text",
    category: "homepage",
    label: "Hero Heading Line 2",
    description: "Second line of the hero heading (e.g. 'prioritize your satisfaction')",
    value: "prioritize your satisfaction",
    isPublic: true
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

  // How It Works
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

  // Coverage Areas
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

  // Guarantee
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

  // How It Works - flat editable fields
  {
    key: "how_it_works.tag",
    type: "text",
    category: "how_it_works",
    label: "How It Works Tag",
    description: "Small tag above the How It Works heading",
    value: "Simple Process",
    isPublic: true
  },
  {
    key: "how_it_works.title",
    type: "text",
    category: "how_it_works",
    label: "How It Works Title",
    description: "Main heading for the How It Works section",
    value: "How It Works",
    isPublic: true
  },
  {
    key: "how_it_works.subtitle",
    type: "text",
    category: "how_it_works",
    label: "How It Works Subtitle",
    description: "Subtitle text below the How It Works heading",
    value: "Booking a cleaning service with LBR is fast, simple, and stress-free.",
    isPublic: true
  },

  // Coverage Areas - flat editable fields
  {
    key: "coverage_areas.tag",
    type: "text",
    category: "coverage_areas",
    label: "Coverage Areas Tag",
    description: "Small tag above the Coverage Areas heading",
    value: "Service Coverage",
    isPublic: true
  },
  {
    key: "coverage_areas.title",
    type: "text",
    category: "coverage_areas",
    label: "Coverage Areas Title",
    description: "Main heading for the Coverage Areas section",
    value: "Areas We Serve",
    isPublic: true
  },
  {
    key: "coverage_areas.subtitle",
    type: "text",
    category: "coverage_areas",
    label: "Coverage Areas Subtitle",
    description: "Subtitle text below the Coverage Areas heading",
    value: "We provide professional cleaning services across Nigeria.",
    isPublic: true
  },

  // Guarantee - flat editable fields
  {
    key: "guarantee.tag",
    type: "text",
    category: "guarantee",
    label: "Guarantee Tag",
    description: "Small tag above the Guarantee heading",
    value: "Our Promise",
    isPublic: true
  },
  {
    key: "guarantee.title",
    type: "text",
    category: "guarantee",
    label: "Guarantee Title",
    description: "Main heading for the Guarantee section",
    value: "100% Satisfaction Guaranteed",
    isPublic: true
  },
  {
    key: "guarantee.description",
    type: "text",
    category: "guarantee",
    label: "Guarantee Description",
    description: "Description text for the Guarantee section",
    value: "If you're not completely satisfied with our cleaning service, we'll re-clean the affected areas for free within 24 hours — no questions asked.",
    isPublic: true
  },
  {
    key: "guarantee.cta_text",
    type: "text",
    category: "guarantee",
    label: "Guarantee CTA Text",
    description: "Call-to-action button text in the Guarantee section",
    value: "Book with Confidence",
    isPublic: true
  },

  // Site Settings
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
    key: "contact.address",
    type: "text",
    category: "contact",
    label: "Office Address",
    description: "Business address displayed on the contact page",
    value: "Lagos, Nigeria",
    isPublic: true
  },
  {
    key: "contact.email",
    type: "text",
    category: "contact",
    label: "Contact Email",
    description: "Email address displayed on the contact page",
    value: "hello@lbrcleaning.com",
    isPublic: true
  },
  {
    key: "contact.phone",
    type: "text",
    category: "contact",
    label: "Contact Phone",
    description: "Phone number displayed on the contact page",
    value: "+234 801 234 5678",
    isPublic: true
  },
  {
    key: "contact.hours_heading",
    type: "text",
    category: "contact",
    label: "Business Hours Heading",
    description: "Heading for the business hours section",
    value: "Business Hours",
    isPublic: true
  },
  {
    key: "contact.faq_heading",
    type: "text",
    category: "contact",
    label: "FAQ Heading",
    description: "Heading for the FAQ section",
    value: "Frequently Asked Questions",
    isPublic: true
  },
  {
    key: "contact.form_heading",
    type: "text",
    category: "contact",
    label: "Form Heading",
    description: "Heading for the contact form",
    value: "Send Us a Message",
    isPublic: true
  },
  {
    key: "contact.form_placeholder_name",
    type: "text",
    category: "contact",
    label: "Form Name Placeholder",
    description: "Placeholder text for the name input",
    value: "Your Name",
    isPublic: true
  },
  {
    key: "contact.form_placeholder_email",
    type: "text",
    category: "contact",
    label: "Form Email Placeholder",
    description: "Placeholder text for the email input",
    value: "Your Email",
    isPublic: true
  },
  {
    key: "contact.form_placeholder_whatsapp",
    type: "text",
    category: "contact",
    label: "Form WhatsApp Placeholder",
    description: "Placeholder text for the WhatsApp input",
    value: "Your WhatsApp Number (e.g. +2348012345678)",
    isPublic: true
  },
  {
    key: "contact.form_placeholder_subject",
    type: "text",
    category: "contact",
    label: "Form Subject Placeholder",
    description: "Placeholder text for the subject input",
    value: "Subject",
    isPublic: true
  },
  {
    key: "contact.form_placeholder_message",
    type: "text",
    category: "contact",
    label: "Form Message Placeholder",
    description: "Placeholder text for the message textarea",
    value: "Your Message",
    isPublic: true
  },
  {
    key: "contact.form_button",
    type: "text",
    category: "contact",
    label: "Form Button Text",
    description: "Text for the contact form submit button",
    value: "Send Message",
    isPublic: true
  },
  {
    key: "contact.encouragement_heading",
    type: "text",
    category: "contact",
    label: "Encouragement Heading",
    description: "Heading for the encouragement section",
    value: "Ready for a Cleaner Space?",
    isPublic: true
  },
  {
    key: "contact.encouragement_text",
    type: "text",
    category: "contact",
    label: "Encouragement Text",
    description: "Text for the encouragement section",
    value: "Our team is ready to help you with all your cleaning needs. Get in touch today!",
    isPublic: true
  },
  {
    key: "contact.encouragement_cta",
    type: "text",
    category: "contact",
    label: "Encouragement CTA Text",
    description: "Call-to-action text for the encouragement section",
    value: "Explore Our Services",
    isPublic: true
  },
  {
    key: "contact.hours_note",
    type: "text",
    category: "contact",
    label: "Hours Note",
    description: "Note about business hours on the contact page",
    value: "We're closed on Sundays but available for emergency cleanings.",
    isPublic: true
  },
  {
    key: "contact.map_embed",
    type: "text",
    category: "contact",
    label: "Map Embed URL",
    description: "Google Maps embed URL for the contact page",
    value: "",
    isPublic: true
  },

  // Contact Page
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

  // Testimonials
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

  // Stats
  {
    key: "home.stats",
    type: "array",
    category: "homepage",
    label: "Homepage Statistics",
    description: "Stats counter section on homepage",
    value: [
      { label: "Years Experience", value: 8, suffix: "+" },
      { label: "Happy Clients", value: 2500, suffix: "+" },
      { label: "Cleaning Projects", value: 15000, suffix: "+" },
      { label: "Team Members", value: 120, suffix: "+" }
    ]
  },

  // Trust Badges
  {
    key: "home.trust_badges",
    type: "array",
    category: "homepage",
    label: "Trust Badges",
    description: "Trust and safety badges",
    value: [
      "Licensed & Insured",
      "Eco Certified",
      "24/7 Support",
      "5-Star Rated",
      "Satisfaction Guarantee",
      "Background-Checked Staff"
    ]
  },

  // About Page
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
    key: "about_page.intro.heading",
    type: "text",
    category: "about_page",
    label: "Intro Heading",
    description: "Heading for the intro section on the about page",
    value: "Who We Are",
    isPublic: true
  },
  {
    key: "about_page.team_heading",
    type: "text",
    category: "about_page",
    label: "Team Heading",
    description: "Heading above the team members section",
    value: "Meet Our Dedicated Team",
    isPublic: true
  },
  {
    key: "about_page.values_heading",
    type: "text",
    category: "about_page",
    label: "Values Heading",
    description: "Heading above the core values section",
    value: "Our Core Values",
    isPublic: true
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
    key: "about_page.hero_slides",
    type: "array",
    category: "about_page",
    label: "About Page Hero Slides",
    description: "Hero slider content for the about page",
    value: [
      {
        questions: "Who We Are",
        header: "About",
        headerspan: "LBR Cleaning",
        ps: [
          "LBR Cleaning Services is a registered Nigerian company offering quality cleaning solutions across Nigeria.",
          "We create clean, safe spaces that add value to your business and home."
        ],
        talks: ["Our Services", "Contact Us"],
        talksReport: "+234 801 234 5678",
        sectionimage: "/assets/cleaner1.png",
        sectionimageStar: "/assets/star.png",
        sectionimageSpark: "/assets/spark.png"
      }
    ]
  },

  // Service Page
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
    key: "service_page.section_tag",
    type: "text",
    category: "service_page",
    label: "Services Section Tag",
    description: "Small tag above the services section heading",
    value: "What We Offer",
    isPublic: true
  },
  {
    key: "service_page.section_title",
    type: "text",
    category: "service_page",
    label: "Services Section Title",
    description: "Main heading for the services section",
    value: "Our Services",
    isPublic: true
  },
  {
    key: "service_page.section_subtitle",
    type: "text",
    category: "service_page",
    label: "Services Section Subtitle",
    description: "Subtitle text below the services heading",
    value: "Discover our professional cleaning solutions for every need.",
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

  // Apply / Booking Page
  {
    key: "apply.badge",
    type: "text",
    category: "apply",
    label: "Apply Badge",
    description: "Small badge above the apply page heading",
    value: "Book Now",
    isPublic: true
  },
  {
    key: "apply.heading_highlight",
    type: "text",
    category: "apply",
    label: "Apply Heading Highlight",
    description: "Highlighted word in the apply page heading",
    value: "Cleaning",
    isPublic: true
  },
  {
    key: "apply.subtitle",
    type: "text",
    category: "apply",
    label: "Apply Subtitle",
    description: "Subtitle text below the apply page heading",
    value: "Fill out the form below and our team will get back to you within 24 hours to confirm your appointment.",
    isPublic: true
  },
  {
    key: "apply.form_heading",
    type: "text",
    category: "apply",
    label: "Apply Form Heading",
    description: "Heading for the booking form",
    value: "Tell Us About Your Needs",
    isPublic: true
  },
  {
    key: "apply.form_subheading",
    type: "text",
    category: "apply",
    label: "Apply Form Subheading",
    description: "Subtitle for the booking form",
    value: "We'll match you with the perfect cleaning solution",
    isPublic: true
  },
  {
    key: "apply.success_heading",
    type: "text",
    category: "apply",
    label: "Success Heading",
    description: "Heading shown after successful booking",
    value: "Booking Received!",
    isPublic: true
  },
  {
    key: "apply.success_text",
    type: "text",
    category: "apply",
    label: "Success Text",
    description: "Text shown after successful booking",
    value: "Thank you for choosing LBR Cleaning. We've received your booking request and will contact you within 24 hours to confirm your appointment.",
    isPublic: true
  },

  // Blog
  {
    key: "blog.title",
    type: "text",
    category: "blog",
    label: "Blog Page Title",
    description: "Main heading for the blog page",
    value: "LBR Cleaning Insights",
    isPublic: true
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

  // Footer
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
  }
];

const run = async () => {
  try {
    await connectMongo();
    console.log("Connected to database. Seeding CMS content...\n");

    for (const item of seedData) {
      await cmsContentRepository.upsert({
        key: item.key,
        type: item.type,
        value: item.value,
        label: item.label,
        description: item.description,
        category: item.category,
        isPublic: item.isPublic !== undefined ? item.isPublic : true,
        updatedBy: "seed-script",
      });
      console.log(`  ✓ ${item.key}`);
    }

    console.log(`\n✅ Seeded ${seedData.length} CMS content items successfully.`);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await disconnectMongo();
  }
};

run();
