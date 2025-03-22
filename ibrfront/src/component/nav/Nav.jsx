import React from "react";
import "./nav.css"
import houseimage from "../../assets/house-cleaning.png";
import { Link } from "react-router";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-upper">
      <div className="media">
            <p className="phone">
              <i className="fa-solid fa-phone-volume"></i>+16102458976
            </p>
            <p className="email">
              <i className="fa-solid fa-envelope"></i>klanohelp@gmail.com
            </p>
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
        <div className="links">
        <Link to="/"><p>HOME</p><div></div></Link>
<Link to="/service"><p>SERVICE</p><div></div></Link>
<Link to="/pages"><p>PAGES</p><div></div></Link>
<Link to="/blog"><p>BLOG</p><div></div></Link>
        </div>
        <div className="btn">
          <p>
            contact us <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
