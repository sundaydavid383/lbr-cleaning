import React, { useState } from "react";
import axios from "axios";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import "./notifySubscribers.css";

const NotifySubscribers = () => {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim().length < 5) {
      setAlert({ message: "Message must be at least 5 characters.", type: "danger" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(apiUrl("/api/notify-subscribers"), { message });

      setAlert({
        message: res.data.message || "Message sent successfully",
        type: "success",
      });

      setMessage("");
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Something went wrong",
        type: "danger",
      });
    } finally {
      setMessage("")
      setLoading(false);
    }
  };

  return (
    <div className="notify-subscribers-page">
      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "success" })}
      />

      {loading && <Loading message="Sending message to subscribers..." />}

      <div className="notify-hero">
        <div className="notify-hero-content">
          <span className="notify-tag">Admin Tool</span>
          <h1>Broadcast Message</h1>
          <p>
            Send a message to all active newsletter subscribers. Use this to share
            promotions, updates, or important announcements.
          </p>
        </div>
      </div>

      <div className="notify-guidelines">
        <h3>Best Practices</h3>
        <ul>
          <li>Keep messages concise and actionable</li>
          <li>Include a clear call-to-action or next step</li>
          <li>Send during business hours for better engagement</li>
          <li>Avoid sending too frequently to prevent unsubscribes</li>
        </ul>
      </div>

      <div className="notify-card">
        <h2>Compose Your Message</h2>
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          aria-label="Message to subscribers"
        ></textarea>
        <div className="notify-actions">
          <button onClick={handleSend} disabled={loading || !message.trim()}>
            {loading ? "Sending..." : "Send to All Subscribers"}
          </button>
          <span className="char-count">{message.length} characters</span>
        </div>
      </div>
    </div>
  );
};

export default NotifySubscribers;
