// filepath: ibrfront/src/pages/dashboard/components/Favorites.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./favorites.css";

const Favorites = () => {
  const favorites = [
    { id: 1, title: "Home Deep Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop", icon: "fa-solid fa-house-chimney", description: "Professional residential cleaning", lastBooked: "2 weeks ago" },
    { id: 2, title: "Office Cleaning", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", icon: "fa-solid fa-briefcase", description: "Hygienic workspace solutions", lastBooked: "1 month ago" },
    { id: 3, title: "Carpet Cleaning", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", icon: "fa-solid fa-rug", description: "Deep carpet cleaning", lastBooked: "3 months ago" },
  ];

  return (
    <div className="favorites">
      <h3 className="dashboard-section-title">
        <i className="fa-solid fa-heart" /> Your Favorite Services
      </h3>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <div key={fav.id} className="favorites-card">
              <div className="favorites-card-image">
                <img src={fav.image} alt={fav.title} loading="lazy" />
                <div className="favorites-card-overlay">
                  <i className={fav.icon} />
                </div>
              </div>
              <div className="favorites-card-content">
                <h4>{fav.title}</h4>
                <p>{fav.description}</p>
                <p className="favorites-card-last"><i className="fa-regular fa-clock" /> Last booked: {fav.lastBooked}</p>
                <Link to="/apply" className="dashboard-btn dashboard-btn-primary dashboard-btn-sm" style={{ marginTop: "1rem", width: "100%" }}>
                  Book Again <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-card">
          <div className="dashboard-empty">
            <i className="fa-regular fa-heart" />
            <h3>No favorites yet</h3>
            <p>Save your favorite services for quick rebooking.</p>
            <Link to="/service" className="dashboard-btn dashboard-btn-primary">Browse Services</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
