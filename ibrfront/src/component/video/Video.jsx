import React, { useEffect } from "react";
import "./video.css";
import { FaTimes } from "react-icons/fa";
import { useCms } from "../../hooks/useCmsContent";
import { toEmbedUrl } from "../../utils/highlight";

const Video = ({ setSeeVideo, cmsKey = "about.video_url", fallback = "https://www.youtube.com/embed/pUWXTY_lmns" }) => {
  const url = toEmbedUrl(useCms(cmsKey, fallback) || fallback);
  const src = url + (url.includes("?") ? "&" : "?") + "autoplay=1";
  useEffect(() => {
  document.body.style.overflow = "hidden";
  const handleKey = (e) => e.key === "Escape" && setSeeVideo(false);
  window.addEventListener("keydown", handleKey);
  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKey);
  };
}, [setSeeVideo]);
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
        onClick={(e) => e.stopPropagation()}
        width="800"
        height="427"
        src={src}
        title="Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        
      ></iframe>
    </div>
  );
};

export default Video;
