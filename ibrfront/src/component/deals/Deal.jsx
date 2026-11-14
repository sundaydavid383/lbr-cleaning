import React from 'react'
import "./deal.css"
import { FaCheck } from 'react-icons/fa'
import { useEditMode } from "../../context/EditModeContext"
import EditableText from "../editable/EditableText"
import EditableImage from "../editable/EditableImage"
import EditableList from "../editable/EditableList"
import EditZone from "../editable/EditZone"

export const PLAN_FIELDS = [
  { key: "name", type: "text", label: "Plan name" },
  { key: "price", type: "text", label: "Price (numbers only, e.g. 15,000)" },
  { key: "period", type: "text", label: "Price note (e.g. per session)" },
  { key: "description", type: "text", label: "Short description" },
  { key: "features", type: "list", label: "What's included", itemLabel: "feature" },
  { key: "popular", type: "boolean", label: "Highlight as 'Most Popular'", onText: "Highlighted", offText: "Normal" },
  { key: "btnText", type: "text", label: "Button text" },
  { key: "details", type: "textarea", label: "Longer details (optional)" },
]

// Splits "15,000" into "15" (big) and ",000" (small), the way the design shows it.
const splitPrice = (price) => {
  const str = String(price ?? "").trim()
  const i = str.indexOf(",")
  return i === -1 ? [str, ""] : [str.slice(0, i), str.slice(i)]
}

/**
 * keys: { heading, image, sectionTitle, sectionTag, plans } CMS keys (optional)
 */
const Deal = ({ deal_Intro = {}, plans = [], sectionTitle = "Our Pricing Plans", keys = {} }) => {
  const { isEditMode } = useEditMode()
  const contactHref = deal_Intro.email ? `mailto:${deal_Intro.email}` : `tel:${deal_Intro.phone}`

  const text = (key, value, Tag, props = {}) =>
    key ? <EditableText cmsKey={key} value={value} as={Tag} {...props} /> : <Tag className={props.className}>{value}</Tag>

  const renderPlan = (plan, index) => {
    const [big, small] = splitPrice(plan.price)
    return (
      <div key={index} className={`deal_card${plan.popular ? ' popular' : ''}`}>
        {plan.popular && <span className="popular_badge">Most Popular</span>}

        <div className="deal_hover"></div>

        <div className="monthly_price">
          <div className="monthly_hover"></div>
          <div className="monthly_price_upper">
            <small>₦</small>
            <h2>{big}</h2>
          </div>
          <p>{small}{plan.period ? ` ${plan.period}` : ""}</p>
        </div>

        <div className='plan'>{plan.name}</div>

        <ul className='featues'>
          {(plan.features || []).map((feature, idx) => (
            <li key={idx}><FaCheck /> <span>{feature}</span></li>
          ))}
        </ul>

        <a className="btn" href={contactHref} target="_blank" rel="noreferrer">
          <p>{plan.btnText || "Get Started"} <i className="fa-solid fa-arrow-right-long"></i></p>
        </a>
      </div>
    )
  }

  return (
    <div className='deal'>
      <div className="deal_Intro">
        {text(keys.heading, deal_Intro.h2, "h2", { label: "Heading" })}
        {keys.image ? (
          <EditableImage cmsKey={keys.image} value={deal_Intro.image} alt="" label="Picture" />
        ) : (
          <img src={deal_Intro.image} alt="" />
        )}
        <EditZone as="span" site badge="Business info">
          <a className="btn" target="_blank" rel="noreferrer" href={contactHref}>
            <p>{deal_Intro.email ? `Email: ${deal_Intro.email}` : `Call: ${deal_Intro.phone}`}</p>
          </a>
        </EditZone>
      </div>

      <div className="main_deal">
        <div className="title">
          {text(keys.sectionTag, "Pricing Plan", "span", { className: "priamry", label: "Small tag" })}
          {text(keys.sectionTitle, sectionTitle, "h2", { className: "bright", label: "Heading" })}
        </div>

        <div className="main_deal_holder container">
          {keys.plans ? (
            <EditableList
              cmsKey={keys.plans}
              value={plans}
              itemLabel="plan"
              label="Pricing plans"
              help="Add, remove or change your prices. Turn on 'Most Popular' to highlight a plan."
              field={{
                type: "items",
                itemLabel: "plan",
                label: "",
                fields: PLAN_FIELDS,
                newItem: { name: "New plan", price: "10,000", period: "per session", description: "", features: [], popular: false, btnText: "Get Started", details: "" },
              }}
            >
              {renderPlan}
            </EditableList>
          ) : (
            plans.map(renderPlan)
          )}
        </div>
        {isEditMode && !keys.plans && (
          <p style={{ textAlign: "center", color: "#78716c" }}>These plans are edited on the Services page.</p>
        )}
      </div>
    </div>
  )
}

export default Deal
