import React from 'react'
import "./deal.css"
import { Link } from 'react-router'
import image1 from "../../assets/cleaner4.png"

const Deal = () => {
  const plans = [
    {
      price: "$/19monthly",
      description: "Affordable cleaning ",
      name: "Basic Cleaning",
      details: "Ideal for apartments and small offices. Get essential cleaning services at an affordable price.",
      features: [
        "Dusting and surface cleaning",
        "Vacuuming and mopping floors",
        "Bathroom and kitchen sanitization",
        "Trash removal",
        "Weekly scheduled cleaning"
      ],
      btnText: "Choose Plan"
    },
    {
      price: "$/29monthly",
      description: "Best value ",
      name: "Standard Cleaning",
      details: "Perfect for medium-sized homes and offices. Includes deep cleaning services to maintain hygiene and freshness.",
      features: [
        "Everything in Basic Cleaning",
        "Carpet and upholstery cleaning",
        "Window cleaning (interior)",
        "Appliance exterior cleaning",
        "Bi-weekly deep cleaning"
      ],
      btnText: "Choose Plan"
    },
    {
      price: "$/49monthly",
      description: "Premium service ",
      name: "Premium Cleaning",
      details: "Comprehensive cleaning for large homes, offices, and commercial spaces. Includes additional premium services.",
      features: [
        "Everything in Standard Cleaning",
        "Exterior window and glass cleaning",
        "Wall and ceiling dusting",
        "Disinfection and sanitization",
        "Customized cleaning schedule"
      ],
      btnText: "Choose Plan"
    }
  ];
  return (
    <div className='deal'>
        <div className="deal_Intro">
          <h2>Please Call Us to Take the
          Extraordinary Service!</h2>
          <img src={image1} alt="" />
          <Link className='btn' to={"/contact"}><p>Call:+123 934 43845</p></Link>
        </div>
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
              <div className="btn">
          <p>
            {plan.btnText} <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
              </div>
              
            ))}
              
           </div>
        </div>
    </div>
  )
}

export default Deal
