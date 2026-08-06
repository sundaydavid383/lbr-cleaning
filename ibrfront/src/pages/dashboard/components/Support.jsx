// filepath: ibrfront/src/pages/dashboard/components/Support.jsx
import React, { useState } from "react";
import "./support.css";

const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const faqs = [
    { id: 1, question: "How do I reschedule a booking?", answer: "You can reschedule your booking from the 'My Bookings' page. Click on the booking you want to reschedule and select 'Reschedule'. Choose a new date and time that works for you." },
    { id: 2, question: "What is your cancellation policy?", answer: "You can cancel bookings up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may incur a 50% charge." },
    { id: 3, question: "Are your cleaning products safe?", answer: "Absolutely. We use eco-friendly, non-toxic, and biodegradable products that are safe for children, pets, and the environment." },
    { id: 4, question: "How do I report an issue with a cleaning?", answer: "Please contact us within 24 hours of the cleaning service. You can use the contact form below or call our support line for immediate assistance." },
  ];

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support ticket submitted! We'll get back to you within 24 hours.");
    setFormData({ subject: "", message: "" });
  };

  return (
    <div className="support">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="dashboard-section-title">
            <i className="fa-solid fa-circle-question" /> Frequently Asked Questions
          </h3>
          <div className="support-faqs">
            {faqs.map((faq) => (
              <div key={faq.id} className={`support-faq-item ${activeFaq === faq.id ? "active" : ""}`}>
                <button className="support-faq-question" onClick={() => toggleFaq(faq.id)}>
                  <span>{faq.question}</span>
                  <i className={`fa-solid fa-chevron-down`} />
                </button>
                {activeFaq === faq.id && (
                  <div className="support-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-section-title">
            <i className="fa-solid fa-envelope" /> Contact Support
          </h3>
          <form onSubmit={handleSubmit} className="support-form">
            <div className="dashboard-form-group">
              <label className="dashboard-form-label">Subject</label>
              <input
                type="text"
                className="dashboard-form-input"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of your issue"
                required
              />
            </div>
            <div className="dashboard-form-group">
              <label className="dashboard-form-label">Message</label>
              <textarea
                className="dashboard-form-input"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your issue in detail..."
                required
              />
            </div>
            <button type="submit" className="dashboard-btn dashboard-btn-primary">
              <i className="fa-solid fa-paper-plane" /> Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
