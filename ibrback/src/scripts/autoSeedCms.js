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
    key: "how_it_works.tag",
    type: "text",
    category: "how_it_works",
    label: "How It Works Tag",
    description: "Tag text for the how it works section",
    value: "Simple Process",
    isPublic: true
  },
  {
    key: "how_it_works.title",
    type: "text",
    category: "how_it_works",
    label: "How It Works Title",
    description: "Title for the how it works section",
    value: "How It Works",
    isPublic: true
  },
  {
    key: "how_it_works.subtitle",
    type: "text",
    category: "how_it_works",
    label: "How It Works Subtitle",
    description: "Subtitle for the how it works section",
    value: "Booking a cleaning service with LBR is fast, simple, and stress-free.",
    isPublic: true
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
    key: "coverage_areas.tag",
    type: "text",
    category: "coverage_areas",
    label: "Coverage Areas Tag",
    description: "Tag text for the coverage areas section",
    value: "Service Coverage",
    isPublic: true
  },
  {
    key: "coverage_areas.title",
    type: "text",
    category: "coverage_areas",
    label: "Coverage Areas Title",
    description: "Title for the coverage areas section",
    value: "Areas We Serve",
    isPublic: true
  },
  {
    key: "coverage_areas.subtitle",
    type: "text",
    category: "coverage_areas",
    label: "Coverage Areas Subtitle",
    description: "Subtitle for the coverage areas section",
    value: "We provide professional cleaning services across Nigeria.",
    isPublic: true
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
    key: "guarantee.tag",
    type: "text",
    category: "guarantee",
    label: "Guarantee Tag",
    description: "Tag text for the guarantee section",
    value: "Our Promise",
    isPublic: true
  },
  {
    key: "guarantee.title",
    type: "text",
    category: "guarantee",
    label: "Guarantee Title",
    description: "Title for the guarantee section",
    value: "100% Satisfaction Guaranteed",
    isPublic: true
  },
  {
    key: "guarantee.description",
    type: "text",
    category: "guarantee",
    label: "Guarantee Description",
    description: "Description for the guarantee section",
    value: "If you're not completely satisfied with our cleaning service, we'll re-clean the affected areas for free within 24 hours — no questions asked.",
    isPublic: true
  },
  {
    key: "guarantee.cta_text",
    type: "text",
    category: "guarantee",
    label: "Guarantee CTA Text",
    description: "Call-to-action text for the guarantee section",
    value: "Book with Confidence",
    isPublic: true
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
    key: "about_page.intro.heading",
    type: "text",
    category: "about_page",
    label: "About Page Intro Heading",
    description: "Heading for the intro section on the about page",
    value: "Who We Are",
    isPublic: true
  },
  {
    key: "about_page.team_heading",
    type: "text",
    category: "about_page",
    label: "Team Heading",
    description: "Heading for the team section on the about page",
    value: "Meet Our Dedicated Team",
    isPublic: true
  },
  {
    key: "about_page.values_heading",
    type: "text",
    category: "about_page",
    label: "Values Heading",
    description: "Heading for the values section on the about page",
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
    label: "Service Page Section Tag",
    description: "Tag text for the service page section",
    value: "What We Offer",
    isPublic: true
  },
  {
    key: "service_page.section_title",
    type: "text",
    category: "service_page",
    label: "Service Page Section Title",
    description: "Title for the service page section",
    value: "Our Services",
    isPublic: true
  },
  {
    key: "service_page.section_subtitle",
    type: "text",
    category: "service_page",
    label: "Service Page Section Subtitle",
    description: "Subtitle for the service page section",
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
    description: "Heading for the business hours section on the contact page",
    value: "Business Hours",
    isPublic: true
  },
  {
    key: "contact.faq_heading",
    type: "text",
    category: "contact",
    label: "FAQ Heading",
    description: "Heading for the FAQ section on the contact page",
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
    key: "blog.title",
    type: "text",
    category: "blog",
    label: "Blog Page Title",
    description: "Title displayed on the blog page",
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
        talksReport: "+234 801 234 5678",
        sectionimage: "/assets/cleaner1.png",
        sectionimageStar: "/assets/star.png",
        sectionimageSpark: "/assets/spark.png"
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
    key: "apply.badge",
    type: "text",
    category: "apply",
    label: "Apply Badge",
    description: "Badge text for the apply section",
    value: "Book Now",
    isPublic: true
  },
  {
    key: "apply.heading_highlight",
    type: "text",
    category: "apply",
    label: "Apply Heading Highlight",
    description: "Highlight text for the apply heading",
    value: "Cleaning",
    isPublic: true
  },
  {
    key: "apply.subtitle",
    type: "text",
    category: "apply",
    label: "Apply Subtitle",
    description: "Subtitle for the apply section",
    value: "Fill out the form below and our team will get back to you within 24 hours to confirm your appointment.",
    isPublic: true
  },
  {
    key: "apply.form_heading",
    type: "text",
    category: "apply",
    label: "Apply Form Heading",
    description: "Heading for the apply form",
    value: "Tell Us About Your Needs",
    isPublic: true
  },
  {
    key: "apply.form_subheading",
    type: "text",
    category: "apply",
    label: "Apply Form Subheading",
    description: "Subheading for the apply form",
    value: "We'll match you with the perfect cleaning solution",
    isPublic: true
  },
  {
    key: "apply.success_heading",
    type: "text",
    category: "apply",
    label: "Apply Success Heading",
    description: "Heading shown after successful form submission",
    value: "Booking Received!",
    isPublic: true
  },
  {
    key: "apply.success_text",
    type: "text",
    category: "apply",
    label: "Apply Success Text",
    description: "Text shown after successful form submission",
    value: "Thank you for choosing LBR Cleaning. We've received your booking request and will contact you within 24 hours to confirm your appointment.",
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
      title: "Ready for a Spotless Space?",
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
      title: "Stay in the Loop",
      subtitle: "Get weekly cleaning tips, exclusive offers, and helpful guides delivered straight to your inbox. No spam — just useful stuff.",
      placeholder: "Enter your email address",
      button_text: "Subscribe",
      success_message: "Thanks for subscribing! Check your inbox for a welcome surprise.",
      error_message: "Please enter your email address.",
      privacy_text: "We respect your privacy. Unsubscribe at any time."
    }
  },
  {
    key: "information.how_it_works.tag",
    type: "text",
    category: "information",
    label: "How It Works Tag",
    description: "Small tag above How It Works heading",
    value: "Simple Process",
    isPublic: true
  },
  {
    key: "information.how_it_works.title",
    type: "text",
    category: "information",
    label: "How It Works Title",
    description: "Main heading for How It Works section",
    value: "How It Works",
    isPublic: true
  },
  {
    key: "information.how_it_works.subtitle",
    type: "text",
    category: "information",
    label: "How It Works Subtitle",
    description: "Subtitle for How It Works section",
    value: "Booking a cleaning service with LBR is fast, simple, and stress-free",
    isPublic: true
  },
  {
    key: "information.portfolio.tag",
    type: "text",
    category: "information",
    label: "Portfolio Tag",
    description: "Small tag above Portfolio heading",
    value: "Our Work",
    isPublic: true
  },
  {
    key: "information.portfolio.title",
    type: "text",
    category: "information",
    label: "Portfolio Title",
    description: "Main heading for Portfolio section",
    value: "Portfolio",
    isPublic: true
  },
  {
    key: "information.portfolio.subtitle",
    type: "text",
    category: "information",
    label: "Portfolio Subtitle",
    description: "Subtitle for Portfolio section",
    value: "A glimpse into our completed projects",
    isPublic: true
  },
  {
    key: "portfolio.tag",
    type: "text",
    category: "portfolio",
    label: "Portfolio Tag",
    description: "Small tag in portfolio heading",
    value: "our work",
    isPublic: true
  },
  {
    key: "portfolio.title",
    type: "text",
    category: "portfolio",
    label: "Portfolio Title",
    description: "Main heading for portfolio component",
    value: "Portfolio",
    isPublic: true
  },
  {
    key: "portfolio.subtitle",
    type: "text",
    category: "portfolio",
    label: "Portfolio Subtitle",
    description: "Subtitle for portfolio component",
    value: "A glimpse into our completed projects",
    isPublic: true
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
  },
  {
    key: "about_timeline.tag",
    type: "text",
    category: "about_timeline",
    label: "About Timeline Tag",
    description: "Small tag above timeline heading",
    value: "Our Journey",
    isPublic: true
  },
  {
    key: "about_timeline.title",
    type: "text",
    category: "about_timeline",
    label: "About Timeline Title",
    description: "Main heading for timeline section",
    value: "From Local Trust to Digital Innovation",
    isPublic: true
  },
  {
    key: "about_timeline.subtitle",
    type: "text",
    category: "about_timeline",
    label: "About Timeline Subtitle",
    description: "Subtitle for timeline section",
    value: "Every milestone reflects our commitment to quality, community, and growth.",
    isPublic: true
  },
  {
    key: "working_process.tag",
    type: "text",
    category: "working_process",
    label: "Working Process Tag",
    description: "Small tag above working process heading",
    value: "working process",
    isPublic: true
  },
  {
    key: "working_process.title",
    type: "text",
    category: "working_process",
    label: "Working Process Title",
    description: "Main heading for working process section",
    value: "How It Works",
    isPublic: true
  },
  {
    key: "working_process.subtitle",
    type: "text",
    category: "working_process",
    label: "Working Process Subtitle",
    description: "Subtitle for working process section",
    value: "Competently repurpose go forward benefits without goal-oriented ROI conveniently target e-business opportunities whereas",
    isPublic: true
  },
  {
    key: "working_process.step1_title",
    type: "text",
    category: "working_process",
    label: "Step 1 Title",
    description: "Title for first step",
    value: "Find Us Online",
    isPublic: true
  },
  {
    key: "working_process.step1_desc",
    type: "text",
    category: "working_process",
    label: "Step 1 Description",
    description: "Description for first step",
    value: "Visit our website to explore our professional cleaning services and learn how we can keep your space spotless.",
    isPublic: true
  },
  {
    key: "working_process.step2_title",
    type: "text",
    category: "working_process",
    label: "Step 2 Title",
    description: "Title for second step",
    value: "Book an Appointment",
    isPublic: true
  },
  {
    key: "working_process.step2_desc",
    type: "text",
    category: "working_process",
    label: "Step 2 Description",
    description: "Description for second step",
    value: "Schedule a convenient cleaning session with our team at the time that works best for you.",
    isPublic: true
  },
  {
    key: "working_process.step3_title",
    type: "text",
    category: "working_process",
    label: "Step 3 Title",
    description: "Title for third step",
    value: "We Will Reach Out to You",
    isPublic: true
  },
  {
    key: "working_process.step3_desc",
    type: "text",
    category: "working_process",
    label: "Step 3 Description",
    description: "Description for third step",
    value: "Our team will contact you instantly to confirm your appointment and finalize all details.",
    isPublic: true
  },
  {
    key: "why_choose_us.tag",
    type: "text",
    category: "why_choose_us",
    label: "Why Choose Us Tag",
    description: "Small tag above why choose us heading",
    value: "Why LBR Cleaning",
    isPublic: true
  },
  {
    key: "why_choose_us.subtitle",
    type: "text",
    category: "why_choose_us",
    label: "Why Choose Us Subtitle",
    description: "Subtitle for why choose us section",
    value: "We combine professional expertise with eco-conscious products to deliver results that exceed expectations every single time.",
    isPublic: true
  },
  {
    key: "service_guarantee.tag",
    type: "text",
    category: "service_guarantee",
    label: "Service Guarantee Tag",
    description: "Small tag above guarantee heading",
    value: "Our Promise",
    isPublic: true
  },
  {
    key: "trust_section.tag",
    type: "text",
    category: "trust_section",
    label: "Trust Section Tag",
    description: "Small tag above trust heading",
    value: "Trust & Safety",
    isPublic: true
  },
  {
    key: "trust_section.footer_text",
    type: "text",
    category: "trust_section",
    label: "Trust Section Footer Text",
    description: "Footer text for trust section",
    value: "With over 8+ years of experience and 2,500+ satisfied clients, LBR Cleaning is the name Lagos homes and offices trust for spotless, reliable service.",
    isPublic: true
  },
  {
    key: "homepage_stats.tag",
    type: "text",
    category: "homepage_stats",
    label: "Stats Section Tag",
    description: "Small tag above stats heading",
    value: "By the Numbers",
    isPublic: true
  },
  {
    key: "homepage_stats.subtitle",
    type: "text",
    category: "homepage_stats",
    label: "Stats Section Subtitle",
    description: "Subtitle for stats section",
    value: "Our track record speaks for itself. Here's what we've built through consistent, quality service.",
    isPublic: true
  },
  {
    key: "newsletter.title",
    type: "text",
    category: "newsletter",
    label: "Newsletter Title",
    description: "Heading for newsletter section",
    value: "Stay in the Loop",
    isPublic: true
  },
  {
    key: "newsletter.subtitle",
    type: "text",
    category: "newsletter",
    label: "Newsletter Subtitle",
    description: "Subtitle for newsletter section",
    value: "Get weekly cleaning tips, exclusive offers, and helpful guides delivered straight to your inbox. No spam — just useful stuff.",
    isPublic: true
  },
  {
    key: "testimonials.tag",
    type: "text",
    category: "testimonials",
    label: "Testimonials Tag",
    description: "Small tag above testimonials heading",
    value: "our services",
    isPublic: true
  },
  {
    key: "testimonials.title",
    type: "text",
    category: "testimonials",
    label: "Testimonials Title",
    description: "Main heading for testimonials section",
    value: "What Our Clients Say",
    isPublic: true
  },
  {
    key: "about.badge",
    type: "text",
    category: "about",
    label: "About Badge",
    description: "Small badge above about heading",
    value: "ABOUT US",
    isPublic: true
  },
  {
    key: "about.heading",
    type: "text",
    category: "about",
    label: "About Heading",
    description: "Main heading for about section",
    value: "Making Your House Clean For Looks As a New",
    isPublic: true
  },
  {
    key: "about.description",
    type: "rich_text",
    category: "about",
    label: "About Description",
    description: "Full description for about section",
    value: "LBR Cleaning Services is a cleaning service company registered in Nigeria. We provide excellent cleaning services.\n\nThe services rendered includes: Janitorial/Office Cleaning, Housekeeping/Guest House Managements, Post Construction Cleaning, Floor Maintenance and Restoration Services, Residential Cleaning, Place of worship cleaning, Fumigation & Pest Control and disinfection.\n\nWe build value for your business and making it easy for our clients to enjoy life by providing and enabling environment for business to strife and to also show your home as a direct representation of your life.\n\nWe combine today's technology with our innovative experience to address all your cleaning requirements. With our proven and well trained professionals, We tackle dirts, dust and grime to keep your Operations smooth and leave your home shining and sparkling.",
    isPublic: true
  },
  {
    key: "emergency_banner.tag",
    type: "text",
    category: "emergency_banner",
    label: "Emergency Banner Tag",
    description: "Urgent label in emergency banner",
    value: "Emergency Cleaning Available",
    isPublic: true
  },
  {
    key: "emergency_banner.subtitle",
    type: "text",
    category: "emergency_banner",
    label: "Emergency Banner Subtitle",
    description: "Detail text in emergency banner",
    value: "Need emergency cleaning? We're available 7 days a week",
    isPublic: true
  },
  {
    key: "emergency_banner.phone",
    type: "text",
    category: "emergency_banner",
    label: "Emergency Banner Phone",
    description: "Phone number in emergency banner",
    value: "+234 813 456 7890",
    isPublic: true
  },
  {
    key: "emergency_banner.button",
    type: "text",
    category: "emergency_banner",
    label: "Emergency Banner Button",
    description: "Button text in emergency banner",
    value: "Call Now",
    isPublic: true
  },
  {
    key: "blog_modal.cta_heading",
    type: "text",
    category: "blog_modal",
    label: "Blog Modal CTA Heading",
    description: "Heading in blog modal CTA banner",
    value: "Ready for a spotless space?",
    isPublic: true
  },
  {
    key: "blog_modal.cta_text",
    type: "text",
    category: "blog_modal",
    label: "Blog Modal CTA Text",
    description: "Text in blog modal CTA banner",
    value: "Book your cleaning service today and experience the LBR difference.",
    isPublic: true
  },
  {
    key: "blog_modal.cta_button",
    type: "text",
    category: "blog_modal",
    label: "Blog Modal CTA Button",
    description: "Button text in blog modal CTA banner",
    value: "Book a Cleaning",
    isPublic: true
  },
  {
    key: "featured_post.tag",
    type: "text",
    category: "featured_post",
    label: "Featured Post Tag",
    description: "Tag above featured post",
    value: "Latest Article",
    isPublic: true
  },
  {
    key: "cta_banner.tag",
    type: "text",
    category: "cta_banner",
    label: "CTA Banner Tag",
    description: "Small tag in CTA banner",
    value: "Get Started Today",
    isPublic: true
  },
  {
    key: "cta_banner.title",
    type: "text",
    category: "cta_banner",
    label: "CTA Banner Title",
    description: "Main heading for CTA banner",
    value: "Ready for a Spotless Space?",
    isPublic: true
  },
  {
    key: "cta_banner.subtitle",
    type: "text",
    category: "cta_banner",
    label: "CTA Banner Subtitle",
    description: "Subtitle for CTA banner",
    value: "Book your cleaning appointment in under 60 seconds. Our team is standing by to bring freshness back to your home or office.",
    isPublic: true
  },
  {
    key: "service_details.included.tag",
    type: "text",
    category: "service_details",
    label: "Service Details Included Tag",
    description: "Tag for What's Included section",
    value: "Service Details",
    isPublic: true
  },
  {
    key: "service_details.included.title",
    type: "text",
    category: "service_details",
    label: "Service Details Included Title",
    description: "Title for What's Included section",
    value: "What's Included",
    isPublic: true
  },
  {
    key: "service_details.included.subtitle",
    type: "text",
    category: "service_details",
    label: "Service Details Included Subtitle",
    description: "Subtitle for What's Included section",
    value: "Every cleaning service comes with this complete checklist",
    isPublic: true
  },
  {
    key: "service_details.gallery.tag",
    type: "text",
    category: "service_details",
    label: "Service Details Gallery Tag",
    description: "Tag for Gallery section",
    value: "Gallery",
    isPublic: true
  },
  {
    key: "service_details.gallery.title",
    type: "text",
    category: "service_details",
    label: "Service Details Gallery Title",
    description: "Title for Gallery section",
    value: "Our Work in Action",
    isPublic: true
  },
  {
    key: "service_details.gallery.subtitle",
    type: "text",
    category: "service_details",
    label: "Service Details Gallery Subtitle",
    description: "Subtitle for Gallery section",
    value: "See the quality and attention to detail we bring to every job",
    isPublic: true
  },
  {
    key: "service_details.why_us.tag",
    type: "text",
    category: "service_details",
    label: "Service Details Why Us Tag",
    description: "Tag for Why Us section",
    value: "Why Us",
    isPublic: true
  },
  {
    key: "service_details.why_us.title",
    type: "text",
    category: "service_details",
    label: "Service Details Why Us Title",
    description: "Title for Why Us section",
    value: "Why Choose Our Cleaning Service?",
    isPublic: true
  },
  {
    key: "service_details.why_us.subtitle",
    type: "text",
    category: "service_details",
    label: "Service Details Why Us Subtitle",
    description: "Subtitle for Why Us section",
    value: "The difference is in the details",
    isPublic: true
  },
  {
    key: "service_details.preparation.tag",
    type: "text",
    category: "service_details",
    label: "Service Details Preparation Tag",
    description: "Tag for Preparation section",
    value: "Preparation",
    isPublic: true
  },
  {
    key: "service_details.preparation.title",
    type: "text",
    category: "service_details",
    label: "Service Details Preparation Title",
    description: "Title for Preparation section",
    value: "How to Prepare",
    isPublic: true
  },
  {
    key: "service_details.preparation.subtitle",
    type: "text",
    category: "service_details",
    label: "Service Details Preparation Subtitle",
    description: "Subtitle for Preparation section",
    value: "A few simple steps to get the best results",
    isPublic: true
  },
  {
    key: "service_details.testimonials.tag",
    type: "text",
    category: "service_details",
    label: "Service Details Testimonials Tag",
    description: "Tag for Testimonials section",
    value: "Testimonials",
    isPublic: true
  },
  {
    key: "service_details.testimonials.title",
    type: "text",
    category: "service_details",
    label: "Service Details Testimonials Title",
    description: "Title for Testimonials section",
    value: "What Our Clients Say",
    isPublic: true
  },
  {
    key: "service_details.testimonials.subtitle",
    type: "text",
    category: "service_details",
    label: "Service Details Testimonials Subtitle",
    description: "Subtitle for Testimonials section",
    value: "Real feedback from real customers",
    isPublic: true
  },
  {
    key: "service_details.faq.tag",
    type: "text",
    category: "service_details",
    label: "Service Details FAQ Tag",
    description: "Tag for FAQ section",
    value: "FAQ",
    isPublic: true
  },
  {
    key: "service_details.faq.title",
    type: "text",
    category: "service_details",
    label: "Service Details FAQ Title",
    description: "Title for FAQ section",
    value: "Frequently Asked Questions",
    isPublic: true
  },
  {
    key: "service_details.faq.subtitle",
    type: "text",
    category: "service_details",
    label: "Service Details FAQ Subtitle",
    description: "Subtitle for FAQ section",
    value: "Everything you need to know before booking",
    isPublic: true
  },
  {
    key: "information.faqs",
    type: "array",
    category: "information_hub",
    label: "Information Hub FAQs",
    description: "FAQ items displayed on the information hub page",
    value: [
      { question: "How do I book a cleaning service?", answer: "Booking is simple! Click the 'Apply Now' button on our homepage, fill out the form with your details and service preference, and our team will contact you within 24 hours to confirm your appointment." },
      { question: "What areas do you service?", answer: "We currently service Lagos State and surrounding areas in Nigeria. Contact us to confirm if we cover your specific location." },
      { question: "Are your cleaning products safe?", answer: "Absolutely. We use eco-friendly, non-toxic, and biodegradable cleaning products that are safe for children, pets, and the environment." },
      { question: "Do I need to be present during cleaning?", answer: "No, you don't need to be present. Many of our clients schedule cleaning while they're away at work. Just provide access and any special instructions." },
      { question: "What payment methods do you accept?", answer: "We accept bank transfers, cash, and online payments. Payment details will be provided when we confirm your booking." },
      { question: "Is there a satisfaction guarantee?", answer: "Yes! If you're not 100% satisfied with our service, we'll re-clean the area for free within 24 hours. Your satisfaction is our top priority." }
    ],
    isPublic: true
  },
  {
    key: "information.services",
    type: "array",
    category: "information_hub",
    label: "Information Hub Services",
    description: "Service cards displayed on the information hub page",
    value: [
      {
        id: 1,
        title: "Home Cleaning",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
        icon: "fa-solid fa-house-chimney",
        description: "Professional residential cleaning for sparkling homes",
        features: [
          { icon: "fa-solid fa-broom", text: "Deep vacuuming and mopping" },
          { icon: "fa-solid fa-spray-can", text: "Kitchen and bathroom sanitization" },
          { icon: "fa-solid fa-window-maximize", text: "Interior window cleaning" }
        ]
      },
      {
        id: 2,
        title: "Office Cleaning",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
        icon: "fa-solid fa-briefcase",
        description: "Hygienic workspace solutions for modern offices",
        features: [
          { icon: "fa-solid fa-desktop", text: "Workstation sanitization" },
          { icon: "fa-solid fa-toilet", text: "Restroom deep cleaning" },
          { icon: "fa-solid fa-mug-hot", text: "Breakroom cleanup" }
        ]
      },
      {
        id: 3,
        title: "Carpet Cleaning",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
        icon: "fa-solid fa-rug",
        description: "Deep carpet cleaning that removes stains and odors",
        features: [
          { icon: "fa-solid fa-pump-soap", text: "Deep shampoo treatment" },
          { icon: "fa-solid fa-wind", text: "Fast-drying extraction" },
          { icon: "fa-solid fa-leaf", text: "Eco-friendly solutions" }
        ]
      },
      {
        id: 4,
        title: "Window Cleaning",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
        icon: "fa-solid fa-window-maximize",
        description: "Streak-free crystal clear windows",
        features: [
          { icon: "fa-solid fa-sun", text: "Interior and exterior cleaning" },
          { icon: "fa-solid fa-ruler", text: "Frame and sill detailing" },
          { icon: "fa-solid fa-shield-halved", text: "Safe access methods" }
        ]
      },
      {
        id: 5,
        title: "Move In/Out Cleaning",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
        icon: "fa-solid fa-truck-moving",
        description: "Thorough cleaning for stress-free moves",
        features: [
          { icon: "fa-solid fa-boxes-stacked", text: "Complete property sweep" },
          { icon: "fa-solid fa-oven", text: "Appliance interior cleaning" },
          { icon: "fa-solid fa-spray-can-sparkles", text: "Deodorizing and sanitizing" }
        ]
      },
      {
        id: 6,
        title: "Sanitization Service",
        image: "https://images.unsplash.com/photo-1584463717955-2d3c3c3c3c3c?w=600&h=400&fit=crop",
        icon: "fa-solid fa-hand-sparkles",
        description: "Hospital-grade disinfection for your space",
        features: [
          { icon: "fa-solid fa-virus-slash", text: "99.9% germ elimination" },
          { icon: "fa-solid fa-spray-can", text: "Fogging and misting" },
          { icon: "fa-solid fa-baby", text: "Child and pet safe" }
        ]
      },
      {
        id: 7,
        title: "Post-Construction Cleaning",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
        icon: "fa-solid fa-building",
        description: "Remove construction dust and debris",
        features: [
          { icon: "fa-solid fa-dust", text: "Fine dust removal" },
          { icon: "fa-solid fa-paint-roller", text: "Paint and cement cleanup" },
          { icon: "fa-solid fa-gem", text: "Surface polishing" }
        ]
      }
    ],
    isPublic: true
  },
  {
    key: "information.articles",
    type: "array",
    category: "information_hub",
    label: "Information Hub Articles",
    description: "Blog articles displayed on the information hub page",
    value: [
      {
        id: 38,
        title: "Engaging Clients with Quality Cleaning Services",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
        date: "2025-12-05",
        author: "Cleaning Experts Team",
        quote: "Clean spaces create healthy lives.",
        gist1: "Providing professional cleaning services is more than just tidying up—it's about creating a space where people feel comfortable, safe, and productive.",
        gist2: "Effective cleaning involves understanding the unique needs of each client and space. By tailoring our approach to specific requirements, we ensure maximum cleanliness and hygiene.",
        advice: [
          "Always use the right cleaning tools and eco-friendly products",
          "Understand the client's needs and tailor your approach",
          "Focus on high-touch areas to maintain hygiene",
          "Maintain consistency to build trust"
        ]
      },
      {
        id: 39,
        title: "Showcasing the Benefits of Professional Cleaning",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
        date: "2025-12-05",
        author: "Cleaning Experts Team",
        quote: "A clean space is a productive space.",
        gist1: "Professional cleaning is more than aesthetics—it contributes to health, comfort, and efficiency.",
        gist2: "The goal of our cleaning services is to create spaces that are not only visually appealing but also safe and healthy.",
        advice: [
          "Prioritize deep cleaning for high-use areas",
          "Use safe, effective cleaning solutions",
          "Pay attention to visible and hidden areas",
          "Communicate with clients to meet expectations"
        ]
      },
      {
        id: 40,
        title: "Handling Challenging Cleaning Situations",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
        date: "2025-12-05",
        author: "Cleaning Experts Team",
        quote: "Attention to detail makes all the difference.",
        gist1: "Some cleaning challenges require more than routine methods—they demand expertise and specialized equipment.",
        gist2: "Managing complex cleaning tasks requires preparation, knowledge, and the right products.",
        advice: [
          "Identify areas needing special attention",
          "Use specialized tools for difficult tasks",
          "Plan your workflow for efficiency",
          "Educate clients on maintenance tips"
        ]
      }
    ],
    isPublic: true
  },
  {
    key: "login.badge",
    type: "text",
    category: "login",
    label: "Login Badge",
    description: "Badge text on login page",
    value: "Member Login",
    isPublic: true
  },
  {
    key: "login.heading",
    type: "text",
    category: "login",
    label: "Login Heading",
    description: "Main heading on login page",
    value: "Welcome Back",
    isPublic: true
  },
  {
    key: "login.subtitle",
    type: "text",
    category: "login",
    label: "Login Subtitle",
    description: "Subtitle on login page",
    value: "Sign in to manage your bookings, track cleaning schedules, and access exclusive member offers.",
    isPublic: true
  },
  {
    key: "login.info_badge",
    type: "text",
    category: "login",
    label: "Login Info Badge",
    description: "Badge in login info panel",
    value: "Trusted by 2,500+ customers",
    isPublic: true
  },
  {
    key: "login.info_heading",
    type: "text",
    category: "login",
    label: "Login Info Heading",
    description: "Heading in login info panel",
    value: "Your Cleaning Dashboard Awaits",
    isPublic: true
  },
  {
    key: "login.info_text",
    type: "text",
    category: "login",
    label: "Login Info Text",
    description: "Text in login info panel",
    value: "Book, reschedule, and track your cleaning services — all from one place. Join thousands of Lagos residents who trust LBR Cleaning.",
    isPublic: true
  },
  {
    key: "signup.badge",
    type: "text",
    category: "signup",
    label: "Signup Badge",
    description: "Badge text on signup page",
    value: "New Account",
    isPublic: true
  },
  {
    key: "signup.badge_count",
    type: "text",
    category: "signup",
    label: "Signup Badge Count",
    description: "Step badge on signup page",
    value: "Step 1 of 1",
    isPublic: true
  },
  {
    key: "signup.heading",
    type: "text",
    category: "signup",
    label: "Signup Heading",
    description: "Main heading on signup page",
    value: "Create Your Account",
    isPublic: true
  },
  {
    key: "signup.subtitle",
    type: "text",
    category: "signup",
    label: "Signup Subtitle",
    description: "Subtitle on signup page",
    value: "Join 2,500+ happy customers across Lagos. Tell us a bit about yourself so we can personalize your cleaning experience.",
    isPublic: true
  },
  {
    key: "signup.avatar_section",
    type: "text",
    category: "signup",
    label: "Signup Avatar Section",
    description: "Avatar section title",
    value: "Profile Picture",
    isPublic: true
  },
  {
    key: "signup.avatar_label",
    type: "text",
    category: "signup",
    label: "Signup Avatar Label",
    description: "Avatar upload label",
    value: "Add a profile picture",
    isPublic: true
  },
  {
    key: "signup.avatar_hint",
    type: "text",
    category: "signup",
    label: "Signup Avatar Hint",
    description: "Avatar upload hint",
    value: "JPG, PNG or GIF. Max 5MB.",
    isPublic: true
  },
  {
    key: "signup.personal_section",
    type: "text",
    category: "signup",
    label: "Signup Personal Section",
    description: "Personal information section title",
    value: "Personal Information",
    isPublic: true
  },
  {
    key: "signup.location_section",
    type: "text",
    category: "signup",
    label: "Signup Location Section",
    description: "Location details section title",
    value: "Location Details",
    isPublic: true
  },
  {
    key: "signup.service_section",
    type: "text",
    category: "signup",
    label: "Signup Service Section",
    description: "Service preferences section title",
    value: "Service Preferences",
    isPublic: true
  },
  {
    key: "signup.security_section",
    type: "text",
    category: "signup",
    label: "Signup Security Section",
    description: "Security section title",
    value: "Security",
    isPublic: true
  },
  {
    key: "signup.footer",
    type: "text",
    category: "signup",
    label: "Signup Footer",
    description: "Footer text on signup page",
    value: "Already have an account? Sign In",
    isPublic: true
  },
  {
    key: "signup.info_badge",
    type: "text",
    category: "signup",
    label: "Signup Info Badge",
    description: "Badge in signup info panel",
    value: "Trusted by 2,500+ customers",
    isPublic: true
  },
  {
    key: "signup.info_heading",
    type: "text",
    category: "signup",
    label: "Signup Info Heading",
    description: "Heading in signup info panel",
    value: "Your Spotless Space Is Just a Few Clicks Away",
    isPublic: true
  },
  {
    key: "signup.info_text",
    type: "text",
    category: "signup",
    label: "Signup Info Text",
    description: "Text in signup info panel",
    value: "LBR Cleaning is Lagos' most trusted professional cleaning company. From Victoria Island to Lekki, we deliver premium, eco-friendly cleaning services tailored to your home or business.",
    isPublic: true
  },
  {
    key: "apply.price_label",
    type: "text",
    category: "apply",
    label: "Apply Price Label",
    description: "Label for price preview",
    value: "Estimated starting price",
    isPublic: true
  },
  {
    key: "apply.price_note",
    type: "text",
    category: "apply",
    label: "Apply Price Note",
    description: "Note under price preview",
    value: "Final price may vary based on space size and requirements",
    isPublic: true
  },
  {
    key: "apply.payment_heading",
    type: "text",
    category: "apply",
    label: "Apply Payment Heading",
    description: "Payment preference heading",
    value: "Payment Preference",
    isPublic: true
  },
  {
    key: "apply.pay_after_title",
    type: "text",
    category: "apply",
    label: "Apply Pay After Title",
    description: "Pay after service option title",
    value: "Pay After Service",
    isPublic: true
  },
  {
    key: "apply.pay_after_desc",
    type: "text",
    category: "apply",
    label: "Apply Pay After Description",
    description: "Pay after service option description",
    value: "Pay once the job is done to your satisfaction",
    isPublic: true
  },
  {
    key: "apply.pay_before_title",
    type: "text",
    category: "apply",
    label: "Apply Pay Before Title",
    description: "Pay before service option title",
    value: "Pay Now to Secure Booking",
    isPublic: true
  },
  {
    key: "apply.pay_before_desc",
    type: "text",
    category: "apply",
    label: "Apply Pay Before Description",
    description: "Pay before service option description",
    value: "Secure your slot instantly with instant payment",
    isPublic: true
  },
  {
    key: "apply.message_heading",
    type: "text",
    category: "apply",
    label: "Apply Message Heading",
    description: "Message textarea heading",
    value: "Tell Us More",
    isPublic: true
  },
  {
    key: "apply.form_note",
    type: "text",
    category: "apply",
    label: "Apply Form Note",
    description: "Note below submit button",
    value: "By submitting, you agree to our terms. We'll never share your information.",
    isPublic: true
  },
  {
    key: "about.award_number",
    type: "text",
    category: "about",
    label: "About Award Number",
    description: "Award number in about component",
    value: "12 +",
    isPublic: true
  },
  {
    key: "about.award_label",
    type: "text",
    category: "about",
    label: "About Award Label",
    description: "Award label in about component",
    value: "Years Experience",
    isPublic: true
  },
  {
    key: "about.feature_1",
    type: "text",
    category: "about",
    label: "About Feature 1",
    description: "First feature in about component",
    value: "Clean Your Home or Office",
    isPublic: true
  },
  {
    key: "about.feature_2",
    type: "text",
    category: "about",
    label: "About Feature 2",
    description: "Second feature in about component",
    value: "24/7 Emmergency Quality Services",
    isPublic: true
  },
  {
    key: "about.feature_3",
    type: "text",
    category: "about",
    label: "About Feature 3",
    description: "Third feature in about component",
    value: "Online Booking System available",
    isPublic: true
  },
  {
    key: "about.cta_text",
    type: "text",
    category: "about",
    label: "About CTA Text",
    description: "CTA button text in about component",
    value: "about us",
    isPublic: true
  },
  {
    key: "information.about.tag",
    type: "text",
    category: "information",
    label: "Information About Tag",
    description: "Tag for About section in information hub",
    value: "About Us",
    isPublic: true
  },
  {
    key: "information.about.title",
    type: "text",
    category: "information",
    label: "Information About Title",
    description: "Title for About section in information hub",
    value: "About LBR Cleaning",
    isPublic: true
  },
  {
    key: "information.about.subtitle",
    type: "text",
    category: "information",
    label: "Information About Subtitle",
    description: "Subtitle for About section in information hub",
    value: "Professional cleaning services you can trust",
    isPublic: true
  },
  {
    key: "information.pricing.tag",
    type: "text",
    category: "information",
    label: "Information Pricing Tag",
    description: "Tag for Pricing section in information hub",
    value: "Our Plans",
    isPublic: true
  },
  {
    key: "information.pricing.title",
    type: "text",
    category: "information",
    label: "Information Pricing Title",
    description: "Title for Pricing section in information hub",
    value: "Simple, Transparent Pricing",
    isPublic: true
  },
  {
    key: "information.pricing.subtitle",
    type: "text",
    category: "information",
    label: "Information Pricing Subtitle",
    description: "Subtitle for Pricing section in information hub",
    value: "Choose the plan that fits your needs",
    isPublic: true
  },
  {
    key: "blog.toggle_text",
    type: "text",
    category: "blog",
    label: "Blog Toggle Text",
    description: "Text on blog source toggle button",
    value: "Showing CMS Blogs",
    isPublic: true
  },
  {
    key: "blog.empty_state",
    type: "text",
    category: "blog",
    label: "Blog Empty State",
    description: "Text shown when no blog articles are found",
    value: "No CMS articles found. Add blog articles in the CMS admin panel.",
    isPublic: true
  },
  {
    key: "home.no_content",
    type: "text",
    category: "homepage",
    label: "Home No Content Message",
    description: "Message shown when homepage has no CMS content",
    value: "No content available. Please configure the CMS.",
    isPublic: true
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
    // If homepage stats exist but show all zeros, try to populate them from live DB counts
    try {
      const statsKey = "homepage_stats.stats";
      const statsItem = await cmsContentRepository.findByKey(statsKey);

      if (statsItem && Array.isArray(statsItem.value)) {
        const allZero = statsItem.value.every((s) => Number(s.value) === 0);
        if (allZero) {
          console.log("[AUTO-SEED] Detected zeroed homepage stats, populating from live DB counts...");

          const orderCount = typeof repositories.orderRepository.count === "function"
            ? await repositories.orderRepository.count()
            : 0;
          const userCount = typeof repositories.userRepository.count === "function"
            ? await repositories.userRepository.count()
            : 0;
          const subscriberCount = typeof repositories.subscriberRepository.count === "function"
            ? await repositories.subscriberRepository.count()
            : 0;

          const newStats = statsItem.value.map((s) => {
            const label = (s.label || "").toString().toLowerCase();
            if (label.includes("years")) return { ...s, value: s.value || 8 };
            if (label.includes("happy") || label.includes("clients")) return { ...s, value: subscriberCount || orderCount || s.value || 0 };
            if (label.includes("cleaning") || label.includes("projects")) return { ...s, value: orderCount || s.value || 0 };
            if (label.includes("team")) return { ...s, value: userCount || s.value || 0 };
            return s;
          });

          await cmsContentRepository.updateByKey(statsKey, { value: newStats, updatedBy: "auto-seed" });
          console.log("[AUTO-SEED] homepage_stats.stats updated with live counts");
        }
      }
    } catch (err) {
      console.error("[AUTO-SEED] Failed to populate homepage stats from DB:", err);
    }
  } catch (error) {
    console.error("[AUTO-SEED] Failed:", error);
  }
}

module.exports = { ensureCmsPopulated, defaultContent };
