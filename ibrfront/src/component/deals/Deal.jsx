import React, { useEffect } from 'react'
import "./deal.css"
import { Link } from 'react-router-dom'


const Deal = ({deal_Intro, plans}) => {
    useEffect(() => {
       console.log(deal_Intro);
    }, [])
    

  return (
    <div className='deal'>
        <div className="deal_Intro">
          <h2>{deal_Intro.h2}</h2>
          <img src={deal_Intro.image} alt="" />
        <a
  className="btn"
  target="_blank"
  href={deal_Intro.email ? `mailto:${deal_Intro.email}` : `tel:${deal_Intro.phone}`}
>
  <p>{deal_Intro.email ? `Email: ${deal_Intro.email}` : `Call: ${deal_Intro.phone}`}</p>
</a></div>
        <div className="main_deal">
        <div className="title ">
          <span className="priamry">Pricing Plan</span>
          <h2 className="bright">Easy Steps to Works</h2>
        </div> 
           <div className="main_deal_holder container">
            {plans.map((plan,index)=>(
              <div key={index} className="deal_card">
                <div className="deal_hover"></div>
                <div className="monthly_price"><div className="monthly_hover"></div><div className='monthly_price_upper'><small>{plan.price[0]}</small><h2>{plan.price.split("/")[1].slice(0,2)}</h2></div><p>{plan.price.split("/")[1].slice(2)}</p></div>
              <div className='plan'>{plan.name}</div>
              <ul className='featues'>
               {plan.features.map((feature,idx)=>(
                <li key={idx}><i className="fa-solid fa-check"></i> {feature}</li>
               ))}
              </ul>
              
              </div>
              
            ))}
              
           </div>
        </div>
    </div>
  )
}

export default Deal
