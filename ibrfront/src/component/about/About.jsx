import React, { useState } from "react";
import "./about.css"
import image1 from "../../assets/cleaner5.jpg"
import image2 from "../../assets/cleaner6.jpg"
import spark from "../../assets/spark.png"
import Video from "../video/Video";

const About = () => {
  const [seeVideo, setSeeVideo] = useState(false)
  return (
    <div className="about container">
      <div className="about_image">
        <div onClick={()=>{setSeeVideo(true)}} className="videoicon iconactive">
        <i className="fa-solid fa-circle-play"></i>
        </div>
        <img className="image1" src={image1} alt="" />
        <img className="image2" src={image2} alt="" />
      </div>
      {seeVideo ? <Video setSeeVideo={setSeeVideo}/>:null}
      <div className="about_text">
        <img src={spark} alt="" />
      <h4>ABOUT US</h4>
      <h1>Making Your House Clean
      For Looks As a New</h1>
      <p className="p1">
LBR Cleaning Services is a cleaning service company registered in Nigeria. We provide excellent
cleaning services.

The services rendered includes: Janitorial/Office Cleaning, Housekeeping/Guest House Managements,
Post Construction Cleaning, Floor Maintenance and Restoration Services, Residential Cleaning,
Place of worship cleaning, Fumigation & Pest Control and disinfection.

We build value for your business and making it easy for our clients to enjoy life by providing and
enabling environment for business to strife and to also show your home as a direct representation
of your life.

We combine today’s technology with our innovative experience to address all your cleaning requirements.
With our proven and well trained professionals, We tackle dirts, dust and grime to keep your
Operations smooth and leave your home shining and sparkling.</p>

      <div className="award">
      <i className="fa-solid fa-trophy"></i>
        <h1>12 +</h1>
        <p>Years Experience</p>
      </div>
      <ul>
        <li>
          <i className="fa-solid fa-circle-check"></i>
          <p>Clean Your Home or Office</p>
        </li>
        <li>
        <i className="fa-solid fa-circle-check"></i>
          <p>24/7 Emmergency Quality Services</p>
        </li>
        <li>
          <i className="fa-solid fa-circle-check"></i>
          <a href="#contact"><p>Online Booking System available</p></a>
          
        </li>
      </ul>
      <div className="btn">
          <p>
            about us <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
    </div>
    </div>
  );
};

export default About;
