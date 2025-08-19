import React from 'react'
import "./workingprocess.css"
import img1 from "../../assets/cleaner5.png"
import img2 from "../../assets/cleaner6.png"

const Workingprocess = () => {
  return (
    <div className='workingprocess'>
       <div className="title ">
          <span className="priamry">working process</span>
          <h2 className="bright">Easy Steps to Works</h2>
        </div> 
        <div className="workingProcessHolder">
          <h2 className="semititle">Competently repurpose go forward benefits without goal-oriented ROI conveniently target e-business opportunities whereas</h2>
         <div className="workingProcess_container container">
         <div className="workingprocess_card">
  <p className="icon">
    <small><i className="fa-solid fa-earth-americas"></i></small>
    <span>1</span>
    <small className='number'></small>
  </p>
  <h2>Find Us Online</h2>
  <div className="header_line"></div>
  <p>Visit our website to explore our professional cleaning services and learn how we can keep your space spotless.</p>
</div>

<div className="workingprocess_card">
  <p className="icon">
    <small><i className="fa-solid fa-spa"></i></small>
    <span>2</span>
    <small className='number'></small>
  </p>
  <h2>Choose a Service</h2>
  <div className="header_line"></div>
  <p>Select from our wide range of cleaning services, including residential, commercial, deep cleaning, and more.</p>
</div>

<div className="workingprocess_card">
  <p className="icon">
    <small><i className="fa-solid fa-calendar-check"></i></small>
    <span>3</span>
    <small className='number'></small>
  </p>
  <h2>Book an Appointment</h2>
  <div className="header_line"></div>
  <p>Schedule a convenient cleaning appointment with us and enjoy a fresh, spotless environment.</p>
</div>
         </div>
         <img  className='right' src={img1} alt="" /><img className='left'   src={img2} alt="" />
        </div>
      
    </div>
  )
}

export default Workingprocess
