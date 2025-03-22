import React, { useEffect, useState } from "react";
import "./hero.css"
import star from  "../../assets/star.png"
import spark from  "../../assets/spark.png"
import image1 from "../../assets/cleaner1.png"
import image2 from "../../assets/cleaner2.png"
import image3 from "../../assets/cleaner3.png"
import image4 from "../../assets/cleaner4.png"
import imageBac from "../../assets/cleaningbackground.jpg"
import Feature from "../feature/Feature";

const Hero = () => {
  const [printedTalk, setPrintedTalk] = useState(0)
  const [printedSection, setPrintedSection] = useState(0)

  const section = [
    {
      questions: "Best cleeny Agency",
      header: "Need cleeny? call",
      headerspan: "us today",
      ps: [
        "Welcome to our website! We're glad you're here. Our goal is to provide you with the best services and resources to help you achieve your goals.",
        "Explore our various pages to learn more about what we offer, from professional services to engaging blog posts and helpful resources. Whether you're looking for advice, inspiration, or solutions, we've got you covered!"
      ],
      sectionimage: image1,
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
      sectionimage: image2,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Book a cleaning", "Contact us for pricing"],
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
      sectionimage: image3,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Learn more", "Get a free estimate"],
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
      sectionimage: image4,
      sectionimageStar: star,
      sectionimageSpark: spark,
      talks: ["Contact us", "Get a quote"],
      talksReport: "090987654"
    }
  ];

  let sectionTracker = 0
  let tracker = 0

useEffect(() => {
  
  const interval = setInterval(() => {
    tracker++
    setPrintedTalk(tracker % 2)
  }, 9000);

  const sectionInterval = setInterval(() => {
    sectionTracker++
    setPrintedSection(sectionTracker % 4)

    setTimeout(() => {
      console.log("tracker:",tracker,   "printedsection:",printedSection)
    }, 2000);
  
  }, 44000);



  return () => {
    clearInterval(interval);
    clearInterval(sectionInterval);
  }
}, [])
 
  
 
  return (
    section.map((page, index)=>(
      index === printedSection ? <div key={index} className="hero container">



{printedSection >= 1?<div onClick={()=>{setPrintedSection(prev=>prev-1)}} className="moveleft iconactive"><i className="fa-solid fa-arrow-left-long"></i></div>:null}
{printedSection <= 2?<div onClick={()=>{setPrintedSection(prev=>prev+1)}} className="moveright iconactive"><i className="fa-solid fa-arrow-right-long"></i></div>:null}

      <div className="bubble b1 "><small></small></div>
      <div className="bubble b2"><small></small></div>
      <div className="bubble b3"><small></small></div>
      <div className="bubble b4"><small></small></div>
      <div className="bubble b5"><small></small></div>
      <div className="bubble b6"><small></small></div>
      <div className="bubble b7"><small></small></div>
      <div className="bubble b8"><small></small></div>
      <div className="bubble b9"><small></small></div>
      <div className="bubble b10"><small></small></div>
      <div className="bubble b11"><small></small></div>
      <div className="text">
        <div className="question">{page.questions}</div>
        <h1>{page.header}<span> {page.headerspan}</span></h1>
        <div className="ps">
          {page.ps.map(p=><p key={p}>{p}</p>)} 
        </div>
        <div className="btn">
          <p>
            contact us <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
      </div>
      <div className="image">
        <img className="person" src={page.sectionimage} alt="" />
        <img className="stars" src={page.sectionimageStar} alt="" />
        <img className="spark" src={page.sectionimageSpark} alt="" />
        <div className="speech">
        <div className="circle">
       <p>{page.talks[printedTalk]}</p>
          <h3> <i className="fa-solid fa-phone-volume"></i>{page.talksReport}</h3>
        </div>
        <div className="cone">
          <div></div>
          <div></div>
          <div></div>
        </div>
        </div>
      </div>
      <Feature/>
    </div>:null 
        
    
    ))
  );
};

export default Hero;
