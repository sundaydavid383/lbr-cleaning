import React, { useState, useEffect } from "react";
import "./nav.css"
import houseimage from "../../assets/house-cleaning.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const [linkActive, setLinkActive] = useState(false)
  const [active, setActive] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
   
  return (
    <div className={`nav ${active ? "active" : ""}`}>
      <div className="nav-upper">
      <div className="media">
            <p className="phone">
              <i className="fa-solid fa-phone-volume"></i>+16102458976
            </p>
            <a href="mailto:sundayudoh383@gmail.com" className="email">
              <i className="fa-solid fa-envelope"></i>klanohelp@gmail.com
            </a>
          </div>
        <div className="social-platforms">
        <Link className="iconactive" to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-facebook-f"></i>
</Link>
<Link className="iconactive" to="https://twitter.com" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-twitter"></i>
</Link>
<Link className="iconactive" to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-linkedin"></i>
</Link>
<Link className="iconactive" to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-instagram"></i>
</Link>
<Link className="iconactive" to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-youtube"></i>
</Link>
        </div>
      
      </div>
      <div className="nav-lower">
        <div className="logo">
          <img src={houseimage} alt="" />
          <p>LBR Cleaning</p>
        </div>
        <i onClick={()=>setLinkActive(prev=>!prev)} class="fa-solid fa-bars-staggered"></i>
        <div className={`links ${linkActive?"active":""}`}>
        <Link onClick={()=>setLinkActive(false)} to="/"><p>HOME</p><div></div></Link>
        <Link onClick={()=>setLinkActive(false)} to="/service"><p>SERVICE</p><div></div></Link>
        <Link onClick={()=>setLinkActive(false)} to="/about"><p>ABOUT</p><div></div></Link>
        <Link onClick={()=>setLinkActive(false)} to="/blog"><p>BLOG</p><div></div></Link>
        </div>
        <Link  to={"/contact"} className="btn">
          <p>
            contact us <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
