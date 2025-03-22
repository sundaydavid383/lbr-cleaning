import React from "react";
import "./video.css";

const Video = ({ setSeeVideo }) => {
  return (
    <div className="video">
      <div
        onClick={() => {
          setSeeVideo(false);
        }}
        className="removevideo iconactive"
      >
        <i className="fas fa-times"></i>
      </div>
      <iframe
        width="853"
        height="480"
        src="https://www.youtube.com/embed/pUWXTY_lmns?autoplay=1"
        title="Cillit Bang The Mechanic HD"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        
      ></iframe>
    </div>
  );
};

export default Video;
