import React from 'react'
import Hero from '../../component/hero/Hero'
import About from '../../component/about/About'
import Contact from '../../component/contact/Contact'
import Workingprocess from '../../component/workingprocess/Workingprocess'
import Portfolio from '../../component/portfolio/Portfolio'
import Deal from '../../component/deals/Deal'
import Testimonial from '../../component/testimonials/Testimonials'
import Articles from '../../component/article/Articles'
import imgi1 from "../../assets/cleaner12.jpeg";
import imgi2 from "../../assets/cleaner15.jpeg";
import imgi3 from "../../assets/cleaner14.jpeg";
import image1 from "../../assets/cleaner1.jpg"
import image2 from "../../assets/cleaner10.jpg"
import image3 from "../../assets/cleaner24.jpeg"
import image4 from "../../assets/cleaner9.jpg"
import image5 from "../../assets/cleaner7.jpeg"
import imageBac from "../../assets/cleaningbackground.jpg"
import backgroundVideo from "../../assets/cleaningvideo1.mp4";
import star from "../../assets/star.png"
import spark from "../../assets/spark.png"
import heroimage1 from "../../assets/cleaner1.png"
import heroimage2 from "../../assets/cleaner2.png"
import heroimage3 from "../../assets/cleaner3.png"
import heroimage4 from "../../assets/cleaner4.png"
import dealimage1 from "../../assets/cleaner4.png"


const Home = () => {
  const deal_Intro = {
    image: dealimage1,
    h2: "Please Call Us to Take the Extraordinary Service!",
    email: null,
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
  const features = [
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
  ];
  const backgroundImage = imageBac
  const section = [
    {
      questions: "Best cleeny Agency",
      header: "Need cleeny? call",
      headerspan: "us today",
      ps: [
        "Welcome to our website! We’re here to provide top-quality services and helpful resources to support your goals.",
        "Explore our pages to discover professional services, advice, and solutions designed to meet your needs."
      ],
      sectionimage: heroimage1,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Call now", "We’ve got you"],
      talksReport: "+234 813 456 7890"
    },
    {
      questions: "Our Professional Cleaning Services",
      header: "We Clean and Protize",
      headerspan: " your satisfaction",
      ps: [
        "Our vision is to be recognized as the leading commercial cleaning company in Nigeria and across Africa.",
        "We are committed to delivering excellent, innovative, and value-driven cleaning solutions to all our customers."
      ]
      ,
      sectionimage: heroimage2,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Book clean", "Clean now"],
      talksReport: "+234 813 456 7890"
    },
    {
      questions: "Our Commitment to Excellence",
      header: "Choose because?",
      headerspan: "We go the extra mile",
      ps: [
        "Our mission is to provide excellent, high-quality cleaning services that consistently meet the needs of our customers.",
        "We ensure a clean and healthy environment through highly trained staff and a great customer service experience."
      ]
      ,
      sectionimage: heroimage3,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Learn more", "free estimate"],
      talksReport: "+234 813 456 7890"
    },
    {
      questions: "About Us",
      header: "Who are we?",
      headerspan: "about our company",
      ps: [
        "Our values guide everything we do: Excellence, Integrity, Innovation, Professionalism, Commitment, and Trust.",
        "We uphold these principles daily to deliver reliable, meaningful, and quality-driven cleaning services to all our customers."
      ]
      ,
      sectionimage: heroimage4,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Contact us", "Get a quote"],
      talksReport: "+234 813 456 7890"
    }
  ];

  const services = [
{
  id: 1,
  title: "Janitorial / Office Cleaning Services",
  image: image5,
  icon: "fas fa-briefcase", // fits office context
  description: "We are experts in office cleaning, providing our services with a full guarantee of confidence and security.",
  features: [
    { icon: "fas fa-broom", text: "Dust all furniture and clean the reception desk." },
    { icon: "fas fa-window-maximize", text: "Clean and polish all glass frames and tables in the area." } // window icon fits glass cleaning
  ],
  btnText: "Book Now"
},
{
  id: 2,
  title: "Place of Worship Cleaning",
  image: image4,
  icon: "fas fa-church", // fits place of worship
  description: "We understand the unique challenges of maintaining places of worship and provide thorough cleaning with care and respect.",
  features: [
    { icon: "fas fa-magic", text: "Maintenance of both resilient and non-resilient flooring." }, // magic wand for transformation/cleaning
    { icon: "fas fa-window-restore", text: "Cleaning of interior and exterior windows." } // window icon for windows
  ],
  btnText: "Book Now"
},
{
  id: 3,
  title: "Residential Cleaning",
  image: image3,
  icon: "fas fa-home", // fits home
  description: "We help ease the burden of constant home maintenance while ensuring a safe, clean, and comfortable living space.",
  features: [
    { icon: "fas fa-th-large", text: "Thorough cleaning of tiles and grout" }, // tiles/grid icon
    { icon: "fas fa-couch", text: "Deep cleaning of carpets and upholstery" } // couch icon fits upholstery
  ],
  btnText: "Book Now"
}

,
{
  id: 4,
  title: "Floor Maintenance & Restoration",
  image: image2,
  icon: "fas fa-layer-group", // represents layers/floor
  description: "We specialize in floor care, offering waxing, polishing, and full restoration to keep your floors looking pristine.",
  features: [
    { icon: "fas fa-gem", text: "Marble floor cleaning and polishing" }, // gem to represent shiny floors
    { icon: "fas fa-spray-can", text: "Stripping, waxing, and buffing all types of flooring" } // spray-can for cleaning/maintenance
  ],
  btnText: "Book Now"
},
{
  id: 5,
  title: "Post-Construction Cleaning",
  image: image1,
  icon: "fas fa-building", // represents buildings/construction
  description: "Specially designed for newly built or remodeled properties, we remove dust, debris, and leftover construction materials to make your space spotless and ready to use.",
  features: [
    { icon: "fas fa-window-restore", text: "Window cleaning and stain removal for a sparkling finish" },
    { icon: "fas fa-broom", text: "Floor cleaning, polishing, and waxing services" }
  ],
  btnText: "Book Now"
}


  ];
const articles = [
  {
    id: 38,
    title: "Engaging Clients with Quality Cleaning Services",
    image: imgi1,
    date: "2025-12-05",
    author: "Cleaning Experts Team",
    quote: "Clean spaces create healthy lives.",
    gist1: "Providing professional cleaning services is more than just tidying up—it’s about creating a space where people feel comfortable, safe, and productive. With the right tools, techniques, and attention to detail, our cleaning team ensures that every area, from homes to offices, is spotless and inviting. Delivering consistent results builds trust and keeps our clients satisfied.",
    gist2: "Effective cleaning involves understanding the unique needs of each client and space. By tailoring our approach to specific requirements, we ensure maximum cleanliness and hygiene. From dusting and disinfecting to polishing and organizing, our team transforms spaces into healthy environments where people can thrive.",
    advice: [
      "Always use the right cleaning tools and eco-friendly products for every surface.",
      "Understand the client’s needs and tailor your cleaning approach accordingly.",
      "Focus on high-touch areas to maintain hygiene and prevent contamination.",
      "Maintain consistency to build trust and ensure client satisfaction."
    ]
  },
  {
    id: 39,
    title: "Showcasing the Benefits of Professional Cleaning",
    image: imgi3,
    date: "2025-12-05",
    author: "Cleaning Experts Team",
    quote: "A clean space is a productive space.",
    gist1: "Professional cleaning is more than aesthetics—it contributes to health, comfort, and efficiency. Many spaces are improperly maintained because people underestimate the impact of thorough cleaning. Our team addresses these challenges by providing specialized services that enhance both appearance and hygiene. Well-maintained environments reflect professionalism and care.",
    gist2: "The goal of our cleaning services is to create spaces that are not only visually appealing but also safe and healthy. From routine maintenance to deep cleaning, we handle every aspect with precision and attention to detail, ensuring clients enjoy the full benefits of a professionally cleaned environment.",
    advice: [
      "Prioritize deep cleaning for areas that see heavy use.",
      "Use safe, effective cleaning solutions for every type of surface.",
      "Pay attention to both visible and hidden areas during cleaning.",
      "Communicate with clients to ensure their expectations are met."
    ]
  },
  {
    id: 40,
    title: "Handling Challenging Cleaning Situations Effectively",
    image: imgi2,
    date: "2025-12-05",
    author: "Cleaning Experts Team",
    quote: "Attention to detail makes all the difference.",
    gist1: "Some cleaning challenges require more than routine methods—they demand expertise, specialized equipment, and strategic planning. From post-construction dust to stubborn stains and high-traffic areas, our team applies tested solutions that restore spaces efficiently and safely. Thoughtful cleaning enhances both appearance and hygiene.",
    gist2: "Managing complex cleaning tasks requires preparation, knowledge, and the right products. Our professionals are trained to handle tough situations with care, ensuring that every corner of your property meets the highest standards. A well-executed cleaning plan makes spaces more welcoming, safe, and comfortable for everyone.",
    advice: [
      "Identify areas that require special attention before starting.",
      "Use specialized tools and cleaning products for difficult tasks.",
      "Plan your cleaning workflow for maximum efficiency and safety.",
      "Educate clients on maintenance tips to prolong cleanliness and hygiene."
    ]
  }
];

  return (
    <div>
      <Hero section={section} features={features} backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} />
      <About />
      <Contact services={services} />
      <Workingprocess />
      <Portfolio />
      <Deal deal_Intro={deal_Intro} plans={plans} />
      <Testimonial />
      <Articles articles={articles} />

    </div>
  )
}

export default Home
