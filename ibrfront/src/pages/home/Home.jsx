import React from 'react'
import Hero from '../../component/hero/Hero'
import About from '../../component/about/About'
import Contact from '../../component/contact/Contact'
import Workingprocess from '../../component/workingprocess/Workingprocess'
import Portfolio from '../../component/portfolio/Portfolio'
import Deal from '../../component/deals/Deal'
import Testimonial from '../../component/testimonials/Testimonials'
import Articles from '../../component/article/Articles'
import imgi1 from "../../assets/cleaner12.jpg";
import imgi2 from "../../assets/cleaner15.jpg";
import imgi3 from "../../assets/cleaner14.jpg";
import image1 from "../../assets/cleaner1.jpg"
import image2 from "../../assets/cleaner10.jpg"
import image3 from "../../assets/cleaner8.jpg"
import image4 from "../../assets/cleaner9.jpg"
import image5 from "../../assets/cleaner7.jpg"
import imageBac from "../../assets/cleaningbackground.jpg"
import backgroundVideo from "../../assets/cleaningvideo1.mp4";
import star from  "../../assets/star.png"
import spark from  "../../assets/spark.png"
import heroimage1 from "../../assets/cleaner1.png"
import heroimage2 from "../../assets/cleaner2.png"
import heroimage3 from "../../assets/cleaner3.png"
import heroimage4 from "../../assets/cleaner4.png"
import dealimage1 from "../../assets/cleaner4.png"


const Home = () => {
    const deal_Intro  = {
    image:dealimage1,
    h2: "Please Call Us to Take the Extraordinary Service!",
    email:null,
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
    description: "We ensure your home is spotless with services like dusting, vacuuming, and cleaning high-touch areas."
  },
  {
    icon: "fa-solid fa-broom",
    title: "Commercial Cleaning",
    description: "We offer cleaning services for offices and commercial spaces, ensuring a clean and healthy environment for everyone."
  },
  {
    icon: "fa-brands fa-pagelines",
    title: "Eco-Friendly Products",
    description: "Our eco-friendly, non-toxic cleaning products are safe for your family, pets, and the environment."
  }
];
  const backgroundImage = imageBac
  const section = [
    {
      questions: "Best cleeny Agency",
      header: "Need cleeny? call",
      headerspan: "us today",
      ps: [
        "Welcome to our website! We're glad you're here. Our goal is to provide you with the best services and resources to help you achieve your goals.",
        "Explore our various pages to learn more about what we offer, from professional services to engaging blog posts and helpful resources. Whether you're looking for advice, inspiration, or solutions, we've got you covered!"
      ],
      sectionimage: heroimage1,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["call us", "Help us"],
      talksReport: "090125434"
    },  {
      questions: "Our Professional Cleaning Services",
      header: "We Clean and Protize",
      headerspan: " your satisfaction",
      ps: [
        "Our professional cleaning team uses state-of-the-art equipment and eco-friendly cleaning solutions to ensure the best results.",
        "From homes to offices, we deliver comprehensive cleaning services that meet your specific needs, leaving your space sparkling clean."
      ],
      sectionimage: heroimage2,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Book a cleaning", "clean today"],
      talksReport: "090876543"
    },
    {
      questions: "Our Commitment to Excellence",
      header: "Choose because?",
      headerspan: "We go the extra mile",
      ps: [
        "We believe in providing exceptional cleaning services that not only meet but exceed your expectations.",
        "Our dedicated team is always ready to help you with personalized services tailored to your specific cleaning needs."
      ],
      sectionimage: heroimage3,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Learn more", "free estimate"],
      talksReport: "090112233"
    },
    {
      questions: "About Us",
      header: "Who are we?",
      headerspan: "about our company",
      ps: [
        "We are a leading cleaning service provider committed to offering top-quality cleaning solutions tailored to your needs.",
        "Our team is passionate about delivering exceptional services with a focus on customer satisfaction and eco-friendly practices."
      ],
      sectionimage: heroimage4,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Contact us", "Get a quote"],
      talksReport: "090987654"
    }
  ];

    const services = [
      {
        id: 1,
        title: "Residential Cleaning",
        image: image5,
        icon: "fas fa-home",
        description: "We offer professional cleaning for homes, ensuring every room is spotless.",
        features: [
          { icon: "fas fa-broom", text: "We offer professional cleaning for homes, ensuring every room is spotless." },
          { icon: "fa-solid fa-hand-sparkles", text: "From dusting to vacuuming, we handle all aspects of your home’s cleanliness." }
        ],
        btnText: "Book Now"
      },
      {
        id: 2,
        title: "Commercial Cleaning",
        image: image4,
        icon: "fas fa-building",
        description: "Specialized cleaning for office spaces, shops, and business premises.",
        features: [
          { icon: "fas fa-spray-can", text: "Specialized cleaning for office spaces, shops, and business premises." },
          { icon: "fa-solid fa-cloud-sun", text: "We ensure a clean, professional environment for both employees and clients." }
        ],
        btnText: "Book Now"
      },
      {
        id: 3,
        title: "Deep Cleaning",
        image: image3,
        icon: "fas fa-spa",
        description: "Thorough cleaning for hard-to-reach areas, such as behind furniture and appliances.",
        features: [
          { icon: "fas fa-clipboard-list", text: "Thorough cleaning for hard-to-reach areas, such as behind furniture and appliances." },
          { icon: "fa-solid fa-toilet-paper", text: "Our deep cleaning services leave your home sparkling and fresh with detailed attention." }
        ],
        btnText: "Book Now"
      },
      {
        id: 4,
        title: "Move-In/Move-Out Cleaning",
        image: image2,
        icon: "fas fa-truck",
        description: "We help you clean your space before or after moving, ensuring a fresh start.",
        features: [
          { icon: "fas fa-broom", text: "We help you clean your space before or after moving, ensuring a fresh start." },
          { icon: "fa-solid fa-list-check", text: "Our team handles all cleaning tasks, from removing debris to scrubbing every corner." }
        ],
        btnText: "Book Now"
      },
      {
        id: 5,
        title: "Window Cleaning",
        image: image1,
        icon: "fas fa-window-maximize",
        description: "We provide expert window cleaning services, ensuring your windows are streak-free and clear.",
        features: [
          { icon: "fa-brands fa-windows", text: "We provide expert window cleaning services, ensuring your windows are streak-free and clear." },
          { icon: "fas fa-sun", text: "Let the sunlight in with windows that shine, both inside and out." }
        ],
        btnText: "Book Now"
      }
    ];
  const articles = [
    {
           id: 38,
           title: "Engaging Skeptics with Truth and Respect",
           image: imgi1,
           date: "2024-09-10",
           author: "Dr. James Turner",
           quote: "Sanctify Christ as Lord in your hearts, always being ready to make a defense. - 1 Peter 3:15",
           gist1: "Apologetics equips Christians to engage with skeptics in a way that demonstrates the rationality and truth of the Christian faith. In a world filled with skepticism and challenges to traditional beliefs, it’s crucial that we are prepared to respond with clarity, respect, and knowledge. Apologetics helps us show that faith and reason are not mutually exclusive and provides answers to life's big questions. Engaging skeptics requires patience, listening, and the ability to present the Gospel in a compelling way that draws people closer to the truth.",
           gist2: "When engaging with skeptics, it’s important to approach conversations with humility and a desire to listen and understand. Apologetics is not about arguing to win but about engaging in meaningful dialogue that points to the truth of the Gospel. By understanding the worldview of those we engage with, we can offer answers that are both intellectually satisfying and compassionate. Always remember that apologetics is a tool to bring others to Christ, not just to prove them wrong.",
           advice: [
             "Understand the philosophical foundations of Christianity.",
             "Engage with contemporary issues through a Biblical worldview.",
             "Be patient and listen to the concerns of others before offering an answer.",
             "Use apologetics as a tool to point others to Jesus, not just to win arguments."
           ]
         },
         {
           id: 39,
           title: "Presenting Christianity as Rational and Transformative",
           image: imgi3,
           date: "2024-09-15",
           author: "Dr. Emily Roberts",
           quote: "You will know the truth, and the truth will set you free. - John 8:32",
           gist1: "Christian apologetics is about more than just defending doctrine—it’s about showing the world that the Christian faith is both rational and transformative. Many objections to Christianity are rooted in misunderstandings or misconceptions about the faith. Apologists work to break down these barriers by presenting evidence and addressing doubts in a way that highlights the coherence and beauty of the Christian worldview. In a secular society, apologetics provides a means of sharing the timeless truth of the Gospel with those who may not be open to traditional methods of evangelism.",
           gist2: "The goal of Christian apologetics is to present Christianity as a rational, life-changing faith. By addressing common objections and presenting logical and intellectual arguments for the truth of Christianity, apologists help people see that the Christian faith is not only true but also transformative. As Christians, we should approach apologetics with humility and compassion, always seeking to point others to Christ through our words and actions.",
           advice: [
             "Familiarize yourself with the major worldviews and philosophies that challenge Christianity.",
             "Always approach apologetics with love and compassion.",
             "Be confident in your faith, but also open to learning from others.",
             "Remember that the goal is to point people to Christ, not to prove them wrong."
           ]
         },
         {
           id: 40,
           title: "Responding Thoughtfully to Life's Hard Questions",
           image: imgi2,
           date: "2024-09-20",
           author: "Dr. David Harris",
           quote: "For the word of the Lord is right and true; He is faithful in all He does. - Psalm 33:4",
           gist1: "Apologetics is not just for defending abstract theological concepts—it’s also about answering life’s tough questions with integrity and reason. Christianity provides satisfying answers to questions about suffering, morality, and existence, and apologetics helps us articulate these answers in a way that respects both the believer and the skeptic. By understanding the heart of our faith and the logic behind it, we can respond to difficult questions thoughtfully and with confidence, pointing to the truth of God's Word.",
           gist2: "Responding to life’s hard questions requires both knowledge and humility. As Christians, we are equipped with the truth of God’s Word to respond to the doubts and challenges that arise in our own lives and in the lives of others. Apologetics allows us to engage with tough topics in a way that is intellectually satisfying and spiritually nurturing. It’s not about having all the answers, but about being willing to engage honestly and thoughtfully with the hard questions of life and faith.",
           advice: [
             "Take time to develop a biblical worldview to answer tough questions.",
             "Stay humble in your approach, knowing you don’t have all the answers.",
             "Embrace the journey of learning and growing in knowledge of Scripture.",
             "Use apologetics as an opportunity to glorify God and share His truth."
           ]
         }  
];
  return (
    <div>
        <Hero section={section} features={features} backgroundImage={backgroundImage} backgroundVideo={backgroundVideo}/>
         <About/>
         <Contact services={services}/>
         <Workingprocess/>
         <Portfolio/>
         <Deal deal_Intro={deal_Intro} plans={plans}/>
         <Testimonial/>
         <Articles articles={articles}/>

    </div>
  )
}

export default Home
