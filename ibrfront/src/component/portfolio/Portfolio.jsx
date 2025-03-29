import React, { useEffect, useState } from 'react';
import "./portfolio.css"
import img1 from "../../assets/cleaner11.jpg"
import img2 from "../../assets/cleaner12.jpg"
import img4 from "../../assets/cleaner13.jpg"
import img3 from "../../assets/cleaner14.jpg"
import img5 from "../../assets/cleaner15.jpg"
import img6 from "../../assets/cleaner16.jpg"
import img7 from "../../assets/cleaner17.jpg"
import img8 from "../../assets/cleaner18.jpg"

const Portfolio = () => {
    const [translate, setTranslate] = useState(0)
    const [moveVlaue, setMoveValue] = useState(585)
  useEffect(() => {
        document.querySelector(".portfolio_container").style.transform = `translateX(${translate}px)`
  }, [translate])
//   useEffect(() => {
//     const handleResize = () => {
//         const width = window.innerWidth;

//         if (width < 658) {
//             setMoveValue(1162); // 755%
//         } else if (width < 868) {
//             setMoveValue(1008); // 655%
//         } else if (width < 668) {
//             setMoveValue(854); // 555%
//         } else {
//             setMoveValue(600); // Default for 390%
//         }
//     };

//     // Call initially
//     handleResize();

//     // Listen for window resize
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
// }, []);
  
  return (
    <div className='portfolio'>
            {translate < 0?<div onClick={()=>{setTranslate(prev=>prev+moveVlaue)}} className="moveleft iconactive"><i className="fa-solid fa-arrow-left-long"></i></div>:null}
            {translate > -4015?<div onClick={()=>{setTranslate(prev=>prev-moveVlaue)}} className="moveright iconactive"><i className="fa-solid fa-arrow-right-long"></i></div>:null}
       <div className="portfolio_heading">
       <div className="title">
          <span className='priamry'>our services</span>
          <h2 className='bright'>Professional Cleaning Services</h2>
        </div> 
        <div className="btn">
          <p>
          View all works<i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
       </div>
       <div className="portfolio_holder">
       <div className="portfolio_container container">
  <div className="portfolio_card">
    <div className="person">John Doe</div>
    <img src={img1} alt="John Doe" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>New York, USA</span>
      <p>John Doe - Residential Cleaning Specialist</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">Jane Smith</div>
    <img src={img2} alt="Jane Smith" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>London, UK</span>
      <p>Jane Smith - Office Cleaning Expert</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">Michael Johnson</div>
    <img src={img3} alt="Michael Johnson" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>Toronto, Canada</span>
      <p>Michael Johnson - Deep Cleaning Specialist</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">Alice Brown</div>
    <img src={img4} alt="Alice Brown" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>Sydney, Australia</span>
      <p>Alice Brown - Post-Construction Cleaning</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">David Wilson</div>
    <img src={img5} alt="David Wilson" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>Berlin, Germany</span>
      <p>David Wilson - Move-in/Move-out Cleaning</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">Emma Davis</div>
    <img src={img6} alt="Emma Davis" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>Paris, France</span>
      <p>Emma Davis - Carpet and Upholstery Cleaning</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">Chris Lee</div>
    <img src={img7} alt="Chris Lee" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>Tokyo, Japan</span>
      <p>Chris Lee - Window and Glass Cleaning</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
  <div className="portfolio_card">
    <div className="person">Mr Love</div>
    <img src={img8} alt="Chris Lee" />
    <div className="place">
      <span><i className='fas fa-location-dot'></i>Newcastle British</span>
      <p>Chris Lee - Window and Glass Cleaning</p>
      <i className="fa-solid fa-circle-arrow-right"></i>
    </div>
  </div>
</div>

</div>
       </div>
   
  )
}

export default Portfolio
