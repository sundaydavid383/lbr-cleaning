import React, { useState, useEffect } from 'react'
import "./contact.css"


const Contact = ({services}) => {
const onSubmit = async()=>{
   try {
      const response = fetch("http://localhost:5100/sendmessage/oncreated",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({})
      })
   } catch (error) {
     alert("an error occured");
     console.log("this is the error that occured:", error.message)
   }
}
  const [translate, setTranslate] = useState(0)
useEffect(() => {
      document.querySelector(".service_holder").style.transform = `translateX(${translate}px)`
}, [translate])


    
  
  return (
    <div className='contact'>
      {translate < 0?<div onClick={()=>{setTranslate(prev=>prev+480)}} className="moveleft iconactive"><i className="fa-solid fa-arrow-left-long"></i></div>:null}
      {translate > -1350?<div onClick={()=>{setTranslate(prev=>prev-480)}} className="moveright iconactive"><i className="fa-solid fa-arrow-right-long"></i></div>:null}
   <div className="bubble b1 "><small></small></div>
      <div className="bubble b2"><small></small></div>
      <div className="bubble b3"><small></small></div>
      <div className="bubble b4"><small></small></div>
      <div className="bubble b5"><small></small></div>
      <div className="bubble b6"><small></small></div>
      <div className="bubble b7"><small></small></div>
      <div className="bubble b8"><small></small></div>
      <div className="bubble b9"><small></small></div>
      <div className="bubble b10"><small></small></div>
      <div className="bubble b11"><small></small></div>
       <div className="main_contact">
        <h1>Get A Free Appoinmnet</h1>
        <form onSubmit={onSubmit}>
          <input  type="text" placeholder='name' /><input  type="text" placeholder='phone number'/>
          <select name="cleaning_service" id="cleaning_service" >
  <option value="residential">Residential Cleaning</option>
  <option value="commercial">Commercial Cleaning</option>
  <option value="deep_cleaning">Deep Cleaning</option>
  <option value="move_in_move_out">Move In/Move Out Cleaning</option>
  <option value="post_construction">Post-Construction Cleaning</option>
  <option value="carpet_cleaning">Carpet Cleaning</option>
  <option value="window_cleaning">Window Cleaning</option>
           <option value="office_cleaning">Office Cleaning</option></select>
           <div className="btn">
          <p>
            Book Now <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
        </form>
       </div>
       <div className="contact_service">
        <div className="title">
          <span>our services</span>
          <h2>Professional Cleaning Services</h2>
        </div> 

        <div className="service_holder container">
          {services.map((service,index)=>(
  <div key={index} className="service">
  <img src={service.image} alt="Residential Cleaning" />
<div className='text'><div className='text_span'></div>
    
    .<i className={`${service.icon} text_decription iconactive`}></i> 

    <div className='h2'>{service.title}</div>
    <ul>
      {service.features.map((feature,feaindx)=>(
         <li key={feaindx}>
         <i className={feature.icon}></i> 
         <p>{feature.text}</p>
       </li>
      ))}
    </ul>
    <div className="btn">
        <p>
          {service.btnText} <i className="fa-solid fa-arrow-right-long"></i>
        </p>
      </div>
  </div>
</div>
          ))}


</div>
       </div>

    </div>
  )
}

export default Contact
