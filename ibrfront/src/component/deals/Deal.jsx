import React, { useEffect } from 'react'
import "./deal.css"
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useEditMode } from "../../context/EditModeContext"
import EditableText from "../editable/EditableText"

const Deal = ({ deal_Intro, plans, sectionTitle = "Our Pricing Plans" }) => {
  const { isEditMode } = useEditMode()

  return (
    <div className='deal'>
      <div className="deal_Intro">
        {isEditMode ? (
          <EditableText cmsKey="service_page.deal_heading" type="text" value={deal_Intro?.h2} as="h2" />
        ) : (
          <h2>{deal_Intro.h2}</h2>
        )}
        <img src={deal_Intro.image} alt="" />
        <a
          className="btn"
          target="_blank"
          href={deal_Intro.email ? `mailto:${deal_Intro.email}` : `tel:${deal_Intro.phone}`}
        >
          <p>{deal_Intro.email ? `Email: ${deal_Intro.email}` : `Call: ${deal_Intro.phone}`}</p>
        </a>
      </div>

      <div className="main_deal">
        <div className="title">
          <span className="priamry">Pricing Plan</span>
          {isEditMode ? (
            <EditableText cmsKey="service_page.deal_section_title" type="text" value={sectionTitle} as="h2" className="bright" />
          ) : (
            <h2 className="bright">{sectionTitle}</h2>
          )}
        </div>

        <div className="main_deal_holder container">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`deal_card${plan.popular ? ' popular' : ''}`}
            >
              {plan.popular && <span className="popular_badge">Most Popular</span>}

              <div className="deal_hover"></div>

              <div className="monthly_price">
                <div className="monthly_hover"></div>
                <div className="monthly_price_upper">
                  <small>₦</small>
                  <h2>{plan.price.split(",")[0].slice(0,-1)}</h2>
                </div>
                <p>,{plan.price.split(",")[1]}</p>
              </div>

              <div className='plan'>{plan.name}</div>

              <ul className='featues'>
                {plan.features.map((feature, idx) => (
                  <li key={idx}><FaCheck /> <span>{feature}</span></li>
                ))}
              </ul>

              <a
                className="btn"
                href={deal_Intro.email ? `mailto:${deal_Intro.email}` : `tel:${deal_Intro.phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <p>Get Started <i className="fa-solid fa-arrow-right-long"></i></p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deal