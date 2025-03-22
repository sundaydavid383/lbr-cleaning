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
        <i class="fa-solid fa-circle-play"></i>
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
  Competently repurpose go forward benefits without goal-oriented ROI, conveniently target e-business opportunities, and leverage parallel task multimedia-based web services. We strategically align your business objectives with cutting-edge technology solutions to maximize growth and productivity. Our expertise in streamlining complex workflows ensures that your company stays ahead of the competition by implementing robust digital strategies. By integrating innovative tools and resources, we help drive sustained performance, scalability, and long-term success across various sectors.
</p>

      <div className="award">
      <i className="fa-solid fa-trophy"></i>
        <h1>12 +</h1>
        <p>Years Experience</p>
      </div>
      <ul>
        <li>
          <i class="fa-solid fa-circle-check"></i>
          <p>Cleeny Your Home or Office</p>
        </li>
        <li>
        <i class="fa-solid fa-circle-check"></i>
          <p>24/7 Emmergency Quality Services</p>
        </li>
        <li>
          <i class="fa-solid fa-circle-check"></i>
          <p>Online Booking System available
          </p>
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
