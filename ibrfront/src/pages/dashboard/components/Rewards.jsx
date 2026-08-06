// filepath: ibrfront/src/pages/dashboard/components/Rewards.jsx
import React from "react";
import "./rewards.css";

const Rewards = () => {
  const rewards = [
    { id: 1, title: "10% Off Next Cleaning", points: 500, description: "Get 10% discount on your next booking", icon: "fa-solid fa-percent", color: "green" },
    { id: 2, title: "Free Carpet Cleaning", points: 1200, description: "Redeem for a free carpet cleaning session", icon: "fa-solid fa-gift", color: "gold" },
    { id: 3, title: "₦5,000 Credit", points: 2000, description: "Add ₦5,000 credit to your account", icon: "fa-solid fa-coins", color: "blue" },
    { id: 4, title: "Premium Service Upgrade", points: 3500, description: "Upgrade to premium for one session", icon: "fa-solid fa-crown", color: "purple" },
  ];

  const userPoints = 2450;
  const nextTier = 3000;
  const progress = (userPoints / nextTier) * 100;

  return (
    <div className="rewards">
      <div className="rewards-progress-card dashboard-card">
        <div className="rewards-progress-header">
          <div>
            <h3 className="dashboard-section-title" style={{ margin: 0 }}>Loyalty Points</h3>
            <p className="rewards-progress-points">{userPoints.toLocaleString()} points</p>
          </div>
          <div className="rewards-tier-badge">Gold Member</div>
        </div>
        <div className="rewards-progress-bar">
          <div className="rewards-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="rewards-progress-text">{nextTier - userPoints} points to Platinum tier</p>
      </div>

      <h3 className="dashboard-section-title" style={{ marginTop: "2rem" }}>
        <i className="fa-solid fa-trophy" /> Available Rewards
      </h3>
      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div key={reward.id} className={`rewards-card rewards-card-${reward.color}`}>
            <div className="rewards-card-icon">
              <i className={reward.icon} />
            </div>
            <div className="rewards-card-content">
              <h4>{reward.title}</h4>
              <p>{reward.description}</p>
              <div className="rewards-card-footer">
                <span className="rewards-card-points">{reward.points} pts</span>
                <button className="dashboard-btn dashboard-btn-primary dashboard-btn-sm" disabled={userPoints < reward.points}>
                  {userPoints >= reward.points ? "Redeem" : "Not Enough Points"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
