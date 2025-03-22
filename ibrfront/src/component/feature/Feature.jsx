import React from 'react'
import "./feature.css"

const Feature = () => {
  return (
    <div className='features container'>
<div className="feature">
<div className="icon"><i class="fa-solid fa-pump-medical"></i></div>
  <div>
    <h2>Residential Cleaning</h2>
    <p>We ensure your home is spotless with services like dusting, vacuuming, and cleaning high-touch areas.</p>
  </div>
  <div className="feature_loader"></div>
</div>

<div className="feature">
  <div className="icon"><i class="fa-solid fa-broom"></i></div>
  <div>
    <h2>Commercial Cleaning</h2>
    <p>We offer cleaning services for offices and commercial spaces, ensuring a clean and healthy environment for everyone.</p>
  </div>
  <div className="feature_loader"></div>
</div>

<div className="feature">
<div className="icon"><i class="fa-brands fa-pagelines"></i></div>
  <div>
    <h2>Eco-Friendly Products</h2>
    <p>Our eco-friendly, non-toxic cleaning products are safe for your family, pets, and the environment.</p>
  </div>
  <div className="feature_loader"></div>
</div>
      
    </div>
  )
}

export default Feature
