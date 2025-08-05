import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css";
import axios from "axios";
import Loading from "../../component/loading/Loading";
import Hero from "../../component/hero/Hero";
import bgImage from "../../assets/cleaningbackground.jpg";
import CustomAlert from "../../component/customAlert/CustomAlert";
import backgroundVideo from "../../assets/cleaningvideo1.mp4";
import star from  "../../assets/star.png"
import spark from  "../../assets/spark.png"
import heroimage1 from "../../assets/cleaner3.png"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const validateInputs = () => {
    const { name, email, subject, message, whatsapp } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+234\d{10}$/;

    if (name.trim().length < 2) return "Please enter a valid name";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (!subject.trim()) return "Subject cannot be empty";
    if (message.trim().length < 10) return "Message is too short";
    if (!phoneRegex.test(whatsapp))
      return "WhatsApp number must start with +234 and be 13 digits";

    return null;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "whatsapp") {
      value = value.replace(/\D/g, "");

      if (value.startsWith("234")) {
        value = `+${value}`;
      } else if (value.startsWith("0")) {
        value = `+234${value.slice(1)}`;
      } else if (!value.startsWith("+234")) {
        value = `+234${value}`;
      }

      value = value.slice(0, 14);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setAlertMessage(error);
      setAlertType("danger");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}api/contact`, formData);
      setAlertMessage("Your message has been sent!");
      setAlertType("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        whatsapp: "",
      });
    } catch (err) {
      console.error(err);
      setAlertMessage("Failed to send message. Please try again later.");
      setAlertType("danger");
    }
    finally {
      setLoading(false);
    }
  };

  const contactHeroSection = [
    {
      questions: "Have a question, request, or feedback?",
      header: "We’d Love to",
      headerspan: "Hear from You!",
      ps: [
        "Our friendly team is ready to assist you with quotes, service info, scheduling, or anything else you need.",
        "Reach out via phone, email, or WhatsApp – we respond quickly and professionally.",
      ],
      sectionimage: heroimage1,
      sectionimageStar: star,
      sectionimageSpark: spark,
     talks: [
  "Messy home?",
  "We’re on it!",
],
      talksReport: "+234 813 456 7890",
    },
  ];

  const contactPageFeatures = [
    {
      icon: "fas fa-envelope",
      title: "Quick Email Replies",
      description: "We respond to every email within 24 hours — often much faster on .",
    },
    {
      icon: "fas fa-phone-alt",
      title: "Call Us Directly",
      description: "Have something urgent? Call and speak with a real person instantly on +1 (234) 567-890.",
    },
    {
      icon: "fab fa-whatsapp",
      title: "Chat via WhatsApp",
      description: "Send us a message on WhatsApp and get real-time answers and updates on +234 901 488 6853.",
    },
  ];

  

  return (
    
    <main className="contact-page">
      {loading && <Loading message="Sending request..." />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage("")}
      />
      
      <Hero
        section={contactHeroSection}
        features={contactPageFeatures}
        backgroundImage={bgImage}
      />

      <section className="contact-info">
        <a
          href="https://www.google.com/maps/search/?api=1&query=123+Sparkle+Dr,+Freshville,+Cleanstate"
          className="info-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-map-marker-alt"></i>
          <h3>Office Address</h3>
          <p>123 Sparkle Dr, Freshville, Cleanstate</p>
        </a>

        <a href="mailto:info@lbrcleaning.com" className="info-card">
          <i className="fas fa-envelope"></i>
          <h3>Email Us</h3>
          <p>info@lbrcleaning.com</p>
        </a>

        <a href="tel:+1234567890" className="info-card">
          <i className="fas fa-phone"></i>
          <h3>Call Us</h3>
          <p>+1 (234) 567-890</p>
        </a>
      </section>

      <section className="contact-map">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=3.35%2C6.62%2C3.37%2C6.64&layer=mapnik&marker=6.63%2C3.36"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="LBR Cleaning Location"
        ></iframe>
        <small>
          <a
            href="https://www.google.com/maps/dir/6.5568768,3.3685504/5,+6+Amadasun+Street,+Lagos/@6.5851421,3.3519511,13z"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Larger Map
          </a>
        </small>
      </section>

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

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>How soon will I get a reply?</h4>
          <p>We respond to all inquiries within 24 hours. WhatsApp replies are usually instant during working hours.</p>
        </div>
        <div className="faq-item">
          <h4>Can I request same-day service?</h4>
          <p>Yes! If available in your area, we’ll try to fit you in. Contact us early in the day.</p>
        </div>
        <div className="faq-item">
          <h4>Do you offer services outside Lagos?</h4>
          <p>We serve most of Lagos. Contact us to check for availability in your location.</p>
        </div>
      </section>

      <section className="encouragement-banner">
        <h3>Not sure where to start?</h3>
        <p>Don’t worry — we’ll walk with you every step of the way. Just send us a message, and let’s talk!</p>
        <Link to="/service" className="explore-btn">Explore Our Services</Link>
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
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
