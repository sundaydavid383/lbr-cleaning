import React, { useState } from "react";
import "./about.css"
import image1 from "../../assets/cleaner5.jpg"
import image2 from "../../assets/cleaner6.jpg"
import spark from "../../assets/spark.png"
import Video from "../video/Video";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";

const About = () => {
  const [seeVideo, setSeeVideo] = useState(false)
  const { isEditMode } = useEditMode();
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
           {isEditMode ? (
	        <EditableText cmsKey="about.badge" type="text" value="ABOUT US" as="h4" />
	      ) : (
	        <h4>ABOUT US</h4>
	      )}
	      {isEditMode ? (
	        <EditableText cmsKey="about.heading" type="text" value="Making Your House Clean For Looks As a New" as="h1" />
	      ) : (
	        <h1>Making Your House Clean
	        For Looks As a New</h1>
	      )}
	      {isEditMode ? (
	        <EditableText cmsKey="about.description" type="rich_text" value={`LBR Cleaning Services is a cleaning service company registered in Nigeria. We provide excellent cleaning services.\n\nThe services rendered includes: Janitorial/Office Cleaning, Housekeeping/Guest House Managements, Post Construction Cleaning, Floor Maintenance and Restoration Services, Residential Cleaning, Place of worship cleaning, Fumigation & Pest Control and disinfection.\n\nWe build value for your business and making it easy for our clients to enjoy life by providing and enabling environment for business to strife and to also show your home as a direct representation of your life.\n\nWe combine today's technology with our innovative experience to address all your cleaning requirements. With our proven and well trained professionals, We tackle dirts, dust and grime to keep your Operations smooth and leave your home shining and sparkling.`} as="p" className="p1" />
	      ) : (
	        <p className="p1">
	      LBR Cleaning Services is a cleaning service company registered in Nigeria. We provide excellent
	      cleaning services.

	      The services rendered includes: Janitorial/Office Cleaning, Housekeeping/Guest House Managements,
	      Post Construction Cleaning, Floor Maintenance and Restoration Services, Residential Cleaning,
	      Place of worship cleaning, Fumigation & Pest Control and disinfection.

	      We build value for your business and making it easy for our clients to enjoy life by providing and
	      enabling environment for business to strife and to also show your home as a direct representation
	      of your life.

	      We combine today's technology with our innovative experience to address all your cleaning requirements.
	      With our proven and well trained professionals, We tackle dirts, dust and grime to keep your
	      Operations smooth and leave your home shining and sparkling.</p>
	      )}

      <div className="award">
        {isEditMode ? (
          <>
            <i className="fa-solid fa-trophy"></i>
            <EditableText cmsKey="about.award_number" type="text" value="12 +" as="h1" />
            <EditableText cmsKey="about.award_label" type="text" value="Years Experience" as="p" />
          </>
        ) : (
          <>
            <i className="fa-solid fa-trophy"></i>
            <h1>12 +</h1>
            <p>Years Experience</p>
          </>
        )}
      </div>
      <ul>
        {isEditMode ? (
          <>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <EditableText cmsKey="about.feature_1" type="text" value="Clean Your Home or Office" as="p" />
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <EditableText cmsKey="about.feature_2" type="text" value="24/7 Emmergency Quality Services" as="p" />
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <EditableText cmsKey="about.feature_3" type="text" value="Online Booking System available" as="p" />
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
      {isEditMode ? (
        <EditableText cmsKey="about.cta_text" type="text" value="about us" as="span" className="btn-cta-text" />
      ) : (
        <div className="btn">
          <p>
            about us <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default About;
