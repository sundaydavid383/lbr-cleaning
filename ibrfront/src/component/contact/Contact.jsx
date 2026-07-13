import React, { useState, useRef, useEffect } from "react";
import "./contact.css";
import validator from "validator";
import CustomAlert from "../customAlert/CustomAlert";
import Loading from "../loading/Loading";

const Contact = ({ services }) => {
  const [service, setService] = useState("Select a cleaning service");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [lastSubmitTime, setLastSubmitTime] = useState(null);
  const scrollContainerRef = useRef(null);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 5000);
  };

  const nextService = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 380;
      const nextIndex = (activeIndex + 1) % services.length;
      setActiveIndex(nextIndex);
      container.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevService = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 380;
      const prevIndex = activeIndex - 1 < 0 ? services.length - 1 : activeIndex - 1;
      setActiveIndex(prevIndex);
      container.scrollTo({
        left: prevIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.offsetWidth || 380;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const selectlabel = document.getElementById("selectlabel");
    const phonelabel = document.getElementById("phonelabel");
    const emaillabel = document.getElementById("emaillabel");
    const select = document.getElementById("cleaning_service");
    const phoneinput = document.querySelector(".input_phone");
    const nameinput = document.querySelector(".input_name");
    const emailinput = document.querySelector(".input_email");

    try {
        setLoading(true);
        
        // Rate limiting check
        const now = Date.now();
        if (lastSubmitTime && now - lastSubmitTime < 2 * 60 * 1000) {
          showAlert("Please wait 2 minutes before submitting another request. We appreciate your patience!", "warning");
          return;
        }

        // Name validation
        const names = name.trim().split(/\s+/);
        if (names.length < 2 || names.some(n => n.length < 2)) {
          nameinput?.classList.add("alert");
          showAlert("Please enter both your first and last name", "warning");
          setTimeout(() => nameinput?.classList.remove("alert"), 2000);
          return;
        }
        
        // Phone validation
        if (phone.trim() === "") {
          phoneinput?.classList.add("alert");
          showAlert("Please provide your phone number so we can reach you", "warning");
          setTimeout(() => phoneinput?.classList.remove("alert"), 2000);
          return;
        }
        
        if (!validator.isMobilePhone(phone, "any")) {
          phoneinput?.classList.add("alert");
          phonelabel.textContent = "Please enter a valid phone number";
          showAlert("Please enter a valid phone number", "danger");
          setTimeout(() => {
            phoneinput?.classList.remove("alert");
            phonelabel.textContent = "";
          }, 2000);
          return;
        }
        
        // Email validation
        if (email.trim() === "") {
          emailinput?.classList.add("alert");
          showAlert("Please provide your email address", "warning");
          setTimeout(() => emailinput?.classList.remove("alert"), 2000);
          return;
        }
        
        if (!validator.isEmail(email)) {
          emailinput?.classList.add("alert");
          emaillabel.textContent = "Please enter a valid email";
          showAlert("Please enter a valid email address", "danger");
          setTimeout(() => {
            emailinput?.classList.remove("alert");
            emaillabel.textContent = "";
          }, 2000);
          return;
        }
        
        // Service validation
        if (service === "Select a cleaning service" || service === "Kind of cleaning service") {
          selectlabel.textContent = "Please select a service";
          select?.classList.add("alert");
          showAlert("Please select the type of cleaning service you need", "warning");
          setTimeout(() => {
            select?.classList.remove("alert");
            selectlabel.textContent = "";
          }, 2000);
          return;
        }

      // Submit booking
      const response = await fetch(`${import.meta.env.VITE_API_URL}appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service }),
      });
      
      const data = await response.json();
      
      setLastSubmitTime(Date.now());
      
      if (response.ok) {
        showAlert("🎉 Fantastic! Your booking request has been sent successfully! We'll contact you within 24 hours to confirm your appointment.", "success");
        // Clear form
        setName("");
        setPhone("");
        setEmail("");
        setService("Select a cleaning service");
      } else {
        showAlert(data.data || "Something went wrong. Please try again or call us directly.", "danger");
      }
      
    } catch (error) {
      showAlert("We're having trouble connecting. Please check your internet and try again, or call us directly!", "danger");
      console.log("Error:", error.message);
    }
    finally {
      setLoading(false);
    };
  }

  return (
    <div className="contact" id="contact">
        {loading && <Loading message="We're processing your booking request..." />}
        
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      {/* Decorative bubbles */}
      {[...Array(11)].map((_, i) => (
        <div className={`bubble b${i + 1}`} key={i}>
          <small></small>
        </div>
      ))}

      <div className="main_contact">
        <h1>Book Your Cleaning Appointment</h1>
        
        <p style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: '2rem' }}>
          Fill out the form below and we'll get back to you within 24 hours
        </p>
        
        <form onSubmit={onSubmit}>
          <div className="inputlabel">
            <label id="namelabel" htmlFor="input_name">Your Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your full name"
              className="input_name"
              id="input_name"
              name="full name"
              aria-label="Full name"
            />
          </div>
          
          <div className="inputlabel">
            <label id="phonelabel" htmlFor="input_phone">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Your phone number"
              className="input_phone"
              id="input_phone"
              name="phone number"
              aria-label="Phone number"
            />
          </div>
          
          <div className="inputlabel">
            <label id="emaillabel" htmlFor="input_email">Email Address</label>
            <input
              type="email"
              value={email}
              placeholder="your.email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="input_email"
              id="input_email"
              name="email address"
              aria-label="Email address"
            />
          </div>
          
          <div className="inputlabel">
            <label id="selectlabel" htmlFor="cleaning_service">Cleaning Service</label>
            <select
              onChange={(e) => setService(e.target.value)}
              value={service}
              id="cleaning_service"
              aria-label="Select cleaning service"
            >
              <option value="Select a cleaning service">Select a cleaning service</option>
              <option value="residential">Residential Cleaning</option>
              <option value="commercial">Commercial Cleaning</option>
              <option value="deep_cleaning">Deep Cleaning</option>
              <option value="move_in_move_out">Move In/Move Out Cleaning</option>
              <option value="post_construction">Post-Construction Cleaning</option>
              <option value="carpet_cleaning">Carpet Cleaning</option>
              <option value="window_cleaning">Window Cleaning</option>
              <option value="office_cleaning">Office Cleaning</option>
            </select>
          </div>
           
          {(name || phone || email) && (
            <button type="submit" className="btn">
              <p>
                Book Now <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </button>
          )}
        </form>
      </div>

      {/* Services Carousel */}
      <div className="contact_service">
        <div className="title">
          <span>Our Services</span>
          <h2>Professional Cleaning Services</h2>
        </div>

        <div className="service-holder-wrapper">
          <button onClick={prevService} className="carousel-btn left" aria-label="Previous service">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="services-container" ref={scrollContainerRef}>
            {services.map((serviceItem, index) => (
              <div className={`single_service_display ${index === activeIndex ? 'active' : ''}`} key={index}>
                <div className="service">
                  <img
                    src={serviceItem.image}
                    alt={serviceItem.title}
                    loading="lazy"
                  />
                  <div className="text">
                    <div className="h2">{serviceItem.title}</div>
                    <ul>
                      {serviceItem.features?.slice(0, 4).map((f, i) => (
                        <li key={i}>
                          <i className={f.icon}></i>
                          <p>{f.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="btn">
                      <p>
                        {serviceItem.btnText || "Book Now"}{" "}
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextService} className="carousel-btn right" aria-label="Next service">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
