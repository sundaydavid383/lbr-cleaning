import React from "react";
import "./video.css";
import { FaTimes } from 'react-icons/fa';

const Video = ({ setSeeVideo }) => {
  return (
    <div className="video">
      <div
        onClick={() => {
          setSeeVideo(false);
        }}
        className="removevideo iconactive"
      >
        <FaTimes />
      </div>
      <iframe
        width="800"
        height="427"
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
