import React from 'react';
import "./feature.css";



const Feature = ({features}) => {
  return (
    <div className='features container'>
      {features.map((feature, index) => (
        <div className="feature" key={index}>
          <div className="icon">
            <i className={feature.icon}></i>
          </div>
          <div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
          <div className="feature_loader"></div>
        </div>
      ))}
    </div>
  );
};

export default Feature;