import React, { useState, useEffect } from "react";
import "./contact.css";
import validator from "validator";

const Contact = ({ services }) => {
  const [service, setService] = useState("Kind of cleaning service");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault()
    const selectlabel = document.getElementById('selectlabel')
    const phonelabel = document.getElementById("phonelabel")
    const emaillabel = document.getElementById("emaillabel")
    const select = document.getElementById("cleaning_service")
    const phoneinput = document.querySelector(".input_phone")
    const nameinput = document.querySelector(".input_name")
    const emailinput = document.querySelector(".input_email")
    try {
      if(name.trim() == ""){
        nameinput.classList.add("alert");
        setTimeout(() => {
          nameinput.classList.remove("alert"); 
        }, 2000);
        return;
      }
      if(phone.trim() == "" ){
        phoneinput.classList.add("alert");
        setTimeout(() => {
          phoneinput.classList.remove("alert"); 
        }, 2000);
        return;
      }
      if(!validator.isMobilePhone(phone, "any") ){
        phoneinput.classList.add("alert");
        phonelabel.textContent = "invalid phone number"
        setTimeout(() => {
          phoneinput.classList.remove("alert"); 
          phonelabel.textContent = ""
        }, 2000);
        return;
      }
      if(email.trim()==""){
        emailinput.classList.add("alert");
        setTimeout(() => {
          emailinput.classList.remove("alert"); 
        }, 2000);
        return;
      }
      if(!validator.isEmail(email) ){
        emailinput.classList.add("alert");
        emaillabel.textContent = "invalid email address"
        setTimeout(() => {
          emailinput.classList.remove("alert");
          emaillabel.textContent = "" 
        }, 2000);
        return;
      }
      if(service == "Kind of cleaning service"){
        selectlabel.textContent = "choose a cleaning service"
        select.classList.add("alert");
        setTimeout(() => {
          select.classList.remove("alert");
          selectlabel.textContent = "" 
        }, 2000);
        return
      }


      const response = await fetch("http://localhost:5100/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, email, phone, service})
      });
      const data = await response.json();
      alert(data.data)
    } catch (error) {
      alert("an error occured");
      console.log("this is the error that occured:", error.message);
    }
  };
  const [translate, setTranslate] = useState(0);
  useEffect(() => {
    document.querySelector(
      ".service_holder"
    ).style.transform = `translateX(${translate}px)`;
  }, [translate]);

  return (
    <div className="contact">
      {translate < 0 ? (
        <div
          onClick={() => {
            setTranslate((prev) => prev + 377);
          }}
          className="moveleft iconactive"
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </div>
      ) : null}
      {translate > -1350 ? (
        <div
          onClick={() => {
            setTranslate((prev) => prev - 377);
          }}
          className="moveright iconactive"
        >
          <i className="fa-solid fa-arrow-right-long"></i>
        </div>
      ) : null}
      <div className="bubble b1 ">
        <small></small>
      </div>
      <div className="bubble b2">
        <small></small>
      </div>
      <div className="bubble b3">
        <small></small>
      </div>
      <div className="bubble b4">
        <small></small>
      </div>
      <div className="bubble b5">
        <small></small>
      </div>
      <div className="bubble b6">
        <small></small>
      </div>
      <div className="bubble b7">
        <small></small>
      </div>
      <div className="bubble b8">
        <small></small>
      </div>
      <div className="bubble b9">
        <small></small>
      </div>
      <div className="bubble b10">
        <small></small>
      </div>
      <div className="bubble b11">
        <small></small>
      </div>
      <div className="main_contact">
        <h1>Get A Free Appoinmnet</h1>
        <form onSubmit={onSubmit}>
          <input value={name}  onChange={(e)=>{setName(e.target.value); console.log(name)}} type="text" placeholder="name" className="input_name" />
         <div className="inputlabel">
         <label id="phonelabel" htmlFor="input_phone"></label>
          <input value={phone} onChange={(e)=>{setPhone(e.target.value); console.log(phone)}} type="tel" placeholder="phone number" className="input_phone" />
         </div>  
         <div className="inputlabel"> <label id="emaillabel" htmlFor="input_email"></label>
          <input type="email" value={email} placeholder="example@gmail.com" onChange={(e)=>{setEmail(e.target.value)}} name="email" className="input_email" />  
          </div>
          <div className="inputlabel"><label id="selectlabel" htmlFor="cleaning_service"></label>
          <select onChange={(e)=>{setService(e.target.value);console.log(e.target.value)} } value={service} name="cleaning_service" id="cleaning_service">
            <option value="Kind of cleaning service">Kind of cleaning service</option>
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
          <button type="submit" className="btn">
            <p>
              Book Now <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </button>
          
        </form>
      </div>
      <div className="contact_service">
        <div className="title">
          <span>our services</span>
          <h2>Professional Cleaning Services</h2>
        </div>

        <div className="service_holder container">
          {services.map((service, index) => (
            <div key={index} className="service">
              <img src={service.image} alt="Residential Cleaning" />
              <div className="text">
                <div className="text_span"></div>.
                <i className={`${service.icon} text_decription iconactive`}></i>
                <div className="h2">{service.title}</div>
                <ul>
                  {service.features.map((feature, feaindx) => (
                    <li key={feaindx}>
                      <i className={feature.icon}></i>
                      <p>{feature.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="btn">
                  <p>
                    {service.btnText}{" "}
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
