import React, { useState } from "react";
import "./contact.css";
import validator from "validator";
import CustomAlert from "../customAlert/CustomAlert"; // ✅ Importing custom alert
import Loading from "../loading/Loading";

const Contact = ({ services }) => {
  const [service, setService] = useState("Kind of cleaning service");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [alertData, setAlertData] = useState({ message: "", type: "success" }); // ✅ Store message and type
  const [lastSubmitTime, setLastSubmitTime] = useState(null); // 🕒 Track last time submitted

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 23000);
  };

  const nextService = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setActiveIndex((prev) => (prev - 1 < 0 ? services.length - 1 : prev - 1));
  };

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
      setLoading(true)
        const now = Date.now();
      if (lastSubmitTime && now - lastSubmitTime < 2 * 60 * 1000) {
        showAlert("Please wait at least 2 minutes before submitting again.", "warning");
        return;
      }
      if (name.trim() === "") {
        nameinput.classList.add("alert");
        showAlert("Please enter your name", "warning");
        setTimeout(() => nameinput.classList.remove("alert"), 2000);
        return;
      }
      if (phone.trim() === "") {
        phoneinput.classList.add("alert");
        showAlert("Phone number is required", "warning");
        setTimeout(() => phoneinput.classList.remove("alert"), 2000);
        return;
      }
      if (!validator.isMobilePhone(phone, "any")) {
        phoneinput.classList.add("alert");
        phonelabel.textContent = "invalid phone number";
        showAlert("Invalid phone number", "danger");
        setTimeout(() => {
          phoneinput.classList.remove("alert");
          phonelabel.textContent = "";
        }, 2000);
        return;
      }
      if (email.trim() === "") {
        emailinput.classList.add("alert");
        showAlert("Email is required", "warning");
        setTimeout(() => emailinput.classList.remove("alert"), 2000);
        return;
      }
      if (!validator.isEmail(email)) {
        emailinput.classList.add("alert");
        emaillabel.textContent = "invalid email address";
        showAlert("Invalid email address", "danger");
        setTimeout(() => {
          emailinput.classList.remove("alert");
          emaillabel.textContent = "";
        }, 2000);
        return;
      }
      if (service === "Kind of cleaning service") {
        selectlabel.textContent = "choose a cleaning service";
        select.classList.add("alert");
        showAlert("Please select a cleaning service", "warning");
        setTimeout(() => {
          select.classList.remove("alert");
          selectlabel.textContent = "";
        }, 2000);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service }),
      });
      const data = await response.json();
      setLastSubmitTime(Date.now()); // Update last submit time
      showAlert(data.data || "Appointment booked successfully!", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "danger");
      console.log("Error:", error.message);
    }
    finally {
      setLoading(false)
      setName("");
      setPhone("");
      setEmail("");
      setService("Kind of cleaning service");
  };
}

  return (
    <div className="contact" id="contact">
        {loading && <Loading message="Sending request for booking an appointment..." />}
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      {[...Array(11)].map((_, i) => (
        <div className={`bubble b${i + 1}`} key={i}>
          <small></small>
        </div>
      ))}

      <div className="main_contact">
        <h1>Get A Free Appointment</h1>
        <form onSubmit={onSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="first and last name"
            className="input_name"
          />
          <div className="inputlabel">
            <label id="phonelabel" htmlFor="input_phone"></label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="phone number"
              className="input_phone"
            />
          </div>
          <div className="inputlabel">
            <label id="emaillabel" htmlFor="input_email"></label>
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="input_email"
            />
          </div>
          <div className="inputlabel">
            <label id="selectlabel" htmlFor="cleaning_service"></label>
            <select
              onChange={(e) => setService(e.target.value)}
              value={service}
              id="cleaning_service"
            >
              <option>Kind of cleaning service</option>
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
           {(name || phone || email) && <button type="submit" className="btn">
            <p>
              Book Now <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </button>}
          
        </form>
      </div>

      <div className="contact_service">
        <div className="title">
          <span>Our Services</span>
          <h2>Professional Cleaning Services</h2>
        </div>

        <div className="service-holder-wrapper one-by-one">
          <button onClick={prevService} className="carousel-btn left">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="single_service_display">
            <div className="service">
              <img
                src={services[activeIndex].image}
                alt={services[activeIndex].title}
              />
              <div className="text">
                <div className="h2">{services[activeIndex].title}</div>
                <ul>
                  {services[activeIndex].features.slice(0, 4).map((f, i) => (
                    <li key={i}>
                      <i className={f.icon}></i>
                      <p>{f.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="btn">
                  <p>
                    {services[activeIndex].btnText} {" "}
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button onClick={nextService} className="carousel-btn right">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
