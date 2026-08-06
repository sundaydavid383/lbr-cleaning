import React from "react";
import "./loyaltyProgram.css";

const tiers = [
  {
    name: "Bronze",
    threshold: "₦50K spent",
    icon: "fa-solid fa-shield-halved",
    color: "#cd7f32",
    benefits: [
      "5% discount on every clean",
      "Priority booking queue",
      "Free sanitization add-on",
      "Quarterly progress report",
    ],
  },
  {
    name: "Silver",
    threshold: "₦100K spent",
    icon: "fa-solid fa-medal",
    color: "#a8a29e",
    benefits: [
      "10% discount on every clean",
      "Priority booking queue",
      "Free sanitization add-on",
      "Quarterly progress report",
      "Free interior detail once/year",
      "Dedicated account manager",
    ],
  },
  {
    name: "Gold",
    threshold: "₦200K spent",
    icon: "fa-solid fa-crown",
    color: "#ca8a04",
    benefits: [
      "15% discount on every clean",
      "Priority booking queue",
      "Free sanitization add-on",
      "Quarterly progress report",
      "Free interior detail once/year",
      "Dedicated account manager",
      "Free window cleaning quarterly",
      "Exclusive seasonal offers",
    ],
  },
];

const LoyaltyProgram = () => {
  return (
    <section className="loyalty-program">
      <div className="loyalty-container">
        <div className="loyalty-header">
          <h2 className="loyalty-title">LBR Rewards</h2>
          <p className="loyalty-subtitle">Every clean counts towards rewards</p>
        </div>

        <div className="loyalty-grid">
          {tiers.map((tier, index) => (
            <div key={index} className="loyalty-card" style={{ "--tier-color": tier.color }}>
              <div className="tier-icon">
                <i className={tier.icon}></i>
              </div>
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-threshold">{tier.threshold}</p>
              <ul className="tier-benefits">
                {tier.benefits.map((benefit, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-check"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-tier">
                <p>Learn More</p>
              </button>
            </div>
          ))}

          <div className="loyalty-card referral-card">
            <div className="referral-icon">
              <i className="fa-solid fa-gift"></i>
            </div>
            <h3 className="tier-name">Refer a Friend</h3>
            <p className="tier-threshold">Share the clean</p>
            <div className="referral-amount">
              <span className="amount">₦5,000</span>
              <span className="amount-label">for you and your friend</span>
            </div>
            <ul className="tier-benefits referral-benefits">
              <li><i className="fa-solid fa-check"></i><span>Both get ₦5,000 credit</span></li>
              <li><i className="fa-solid fa-check"></i><span>No limit on referrals</span></li>
              <li><i className="fa-solid fa-check"></i><span>Credit applied instantly</span></li>
            </ul>
            <button className="btn btn-referral">
              <p>Start Referring</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;