import React, { useEffect, useState } from "react";
import "./hero.css";
import Feature from "../feature/Feature";
import { Link } from "react-router-dom";
import fallbackImage from "../../assets/about-intro.jpg";

const Hero = ({ section, features, backgroundImage, backgroundVideo }) => {
  const [printedTalk, setPrintedTalk] = useState(0);
  const [printedSection, setPrintedSection] = useState(0);

  useEffect(() => {
    const talkInterval = setInterval(() => {
      setPrintedTalk((prev) => (prev + 1) % 2);
    }, 9000);

    const sectionInterval = setInterval(() => {
      setPrintedSection((prev) => (prev + 1) % section.length);
    }, 44000);

    return () => {
      clearInterval(talkInterval);
      clearInterval(sectionInterval);
    };
  }, [section.length]);

  const handleNext = () => {
    setPrintedSection((prev) => (prev + 1) % section.length);
  };

  const handlePrev = () => {
    setPrintedSection((prev) =>
      (prev - 1 + section.length) % section.length
    );
  };

  return section.map((page, index) =>
    index === printedSection ? (
      <div key={index} className="hero container">
        {backgroundVideo ? (
          <div className="background-video-wrapper">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="background-video"
              src={backgroundVideo}
              poster={fallbackImage} // replace with your fallback image path
            />
          </div>
        ) : (
          <div
            className="background-image"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {section.length > 1 && (
          <>
            <div onClick={handlePrev} className="moveleft iconactive">
              <i className="fa-solid fa-arrow-left-long"></i>
            </div>
            <div onClick={handleNext} className="moveright iconactive">
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
          </>
        )}

        {/* Bubbles */}
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

        <div className="text">
          <div className="question">{page.questions}</div>
          <h1>
            {page.header}
            <span> {page.headerspan}</span>
          </h1>
          <div className="ps">
            {page.ps.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link to={"/contact"} className="btn">
            <p>
              contact us <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </Link>
        </div>

        <div className="image">
          <img className="person" src={page.sectionimage} alt="" />
          <img className="stars" src={page.sectionimageStar} alt="" />
          <img className="spark" src={page.sectionimageSpark} alt="" />
          <div className="speech">
            <div className="circle">
              <p>{page.talks[printedTalk]}</p>
              <h3>
                <i className="fa-solid fa-phone-volume"></i>
                {page.talksReport}
              </h3>
            </div>
            <div className="cone">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        <Feature features={features} />
      </div>
    ) : null
  );
};

export default Hero;
