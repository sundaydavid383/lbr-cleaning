import React,{useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import {Link} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
import axios from "axios";
import Hero from "../../component/hero/Hero";
import bgImage from "../../assets/cleaningbackground.jpg";


const Contact = () => {
const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
  whatsapp: "",  // ✅ Add this line
});

const [status, setStatus] = useState("");
const [statusType, setStatusType] = useState("success");
 const validateInputs = () => {
    const { name, email, subject, message, whatsapp } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+234\d{10}$/;

    if (name.trim().length < 2) return "Please enter a valid name";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (!subject.trim()) return "Subject cannot be empty";
    if (message.trim().length < 10) return "Message is too short";
    if (!phoneRegex.test(whatsapp)) return "WhatsApp number must start with +234 and be 13 digits";

    return null;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Auto-format WhatsApp number
    if (name === "whatsapp") {
      // Remove any non-digit characters
      value = value.replace(/\D/g, "");

      // Ensure it starts with +234
      if (value.startsWith("234")) {
        value = `+${value}`;
      } else if (value.startsWith("0")) {
        value = `+234${value.slice(1)}`;
      } else if (!value.startsWith("+234")) {
        value = `+234${value}`;
      }

      // Trim to +234 followed by 10 digits
      value = value.slice(0, 14);
    }

    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

   const error = validateInputs();
  if (error) {
    toast.error(error); // ❌ Show error as toast
    return;
  }

    try {
      const res = await axios.post("http://localhost:5100/api/contact", formData);
      toast.success("Your message has been sent!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        whatsapp: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(error)
    }
  };
const contactPageFeatures = [
  {
    icon: "fas fa-envelope",
    title: "Quick Email Replies",
    description: "We respond to every email within 24 hours — often much faster.",
  },
  {
    icon: "fas fa-phone-alt",
    title: "Call Us Directly",
    description: "Have something urgent? Call and speak with a real person instantly.",
  },
  {
    icon: "fab fa-whatsapp",
    title: "Chat via WhatsApp",
    description: "Send us a message on WhatsApp and get real-time answers and updates.",
  },
];
const contactHeroSection = [
  {
    questions: "Have a question, request, or feedback?",
    header: "We’d Love to",
    headerspan: "Hear from You!",
    ps: [
      "Our friendly team is ready to assist you with quotes, service info, scheduling, or anything else you need.",
      "Reach out via phone, email, or WhatsApp – we respond quickly and professionally."
    ],
    sectionimage: "/images/contact-hero-person.png", // Replace with your actual image
    sectionimageStar: "/images/contact-stars.png",   // Optional sparkle/star effect
    sectionimageSpark: "/images/contact-spark.png",  // Optional extra spark graphic
    talks: [
      "Need a custom cleaning plan? Just ask!",
      "We offer flexible scheduling for busy lives."
    ],
    talksReport: "+234 813 456 7890", // Replace with your actual contact number
  },
];
  return (
    <><ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} />
      <main className="contact-page">
    <Hero
        section={contactHeroSection}
        features={contactPageFeatures}
        backgroundImage={bgImage}
      />

      <section className="contact-info">
        <div className="info-card">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Office Address</h3>
          <p>123 Sparkle Dr, Freshville, Cleanstate</p>
        </div>
        <div className="info-card">
          <i className="fas fa-envelope"></i>
          <h3>Email Us</h3>
          <p>
            <a href="mailto:info@lbrcleaning.com">info@lbrcleaning.com</a>
          </p>
        </div>
        <div className="info-card">
          <i className="fas fa-phone"></i>
          <h3>Call Us</h3>
          <p>
            <a href="tel:+1234567890">+1 (234) 567-890</a>
          </p>
        </div>
      </section>
      
      {/* Map Section */}
<section className="contact-map">
<iframe
    src="https://www.openstreetmap.org/export/embed.html?bbox=3.35%2C6.62%2C3.37%2C6.64&amp;layer=mapnik&amp;marker=6.63%2C3.36"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    title="LBR Cleaning Location"
  ></iframe>
  <small>
    <a href="https://www.google.com/maps/dir/6.5568768,3.3685504/5,+6+Amadasun+Street,+Lagos/@6.5851421,3.3519511,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x103b93264e484a03:0xacae5bda08d77197!2m2!1d3.406899!2d6.6128127?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
      View Larger Map
    </a>
  </small>
</section>


{/* Business Hours Section */}
<section className="business-hours">
  <div className="hours-wrapper">
    <h2>Business Hours</h2>
    <ul>
      <li><strong>Monday – Friday:</strong> 8:00 AM – 6:00 PM</li>
      <li><strong>Saturday:</strong> 9:00 AM – 4:00 PM</li>
      <li><strong>Sunday:</strong> Closed</li>
    </ul>
    <p>If you contact us outside business hours, we’ll respond the next working day.</p>
  </div>
</section>

{/* FAQ Section */}
<section className="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div className="faq-item">
    <h4>How soon will I get a reply?</h4>
    <p>We respond to all inquiries within 24 hours. For WhatsApp messages, replies are often instant during business hours.</p>
  </div>
  <div className="faq-item">
    <h4>Can I request same-day service?</h4>
    <p>Yes! If we have availability in your area, we’ll do our best to fit you in. Contact us early in the day for the best chance.</p>
  </div>
  <div className="faq-item">
    <h4>Do you offer services outside Lagos?</h4>
    <p>Currently, we serve most locations within Lagos. For outside-Lagos requests, please reach out to confirm availability.</p>
  </div>
</section>

{/* Encouragement Section */}
<section className="encouragement-banner">
  <h3>Not sure where to start?</h3>
  <p>Don’t worry — we’ll walk with you every step of the way. Just send us a message, and let’s talk!</p>
  <Link to="/service" className="explore-btn">
    Explore Our Services
  </Link>
</section>

      <section className="contact-form-section">
        <div className="form-wrapper">
          <h2>Send Us a Message</h2>
             <form className="contact-form" onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <input
    type="tel"
    name="whatsapp"
    placeholder="Your WhatsApp Number (e.g. +2348012345678)"
    value={formData.whatsapp}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="subject"
    placeholder="Subject"
    value={formData.subject}
    onChange={handleChange}
    required
  />
  <textarea
    name="message"
    placeholder="Your Message"
    rows="6"
    value={formData.message}
    onChange={handleChange}
    required
  ></textarea>
  <button type="submit" className="submit-btn">
    Send Message
  </button>
  {status && <p className={`status-message ${statusType}`}>{status}</p>}
</form>
        </div>
      </section>
    </main></>
  
  );
};

export default Contact;