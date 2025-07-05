// src/components/Loading/Loading.jsx

import React from "react";
import "./loading.css";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="bar-loader">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loading;