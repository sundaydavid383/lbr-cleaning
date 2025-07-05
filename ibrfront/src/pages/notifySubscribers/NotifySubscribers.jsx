import React, { useState } from "react";
import axios from "axios";
import CustomAlert from "../customAlert/CustomAlert";
import Loading from "../component/loading/Loading";
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
      const res = await axios.post("http://localhost:5100/api/notify-subscribers", { message });
      setAlert({ message: res.data.message, type: "success" });
      setMessage("");
    } catch (err) {
      setAlert({ message: err.response?.data?.message || "Something went wrong", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notify-subscribers">
      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "success" })}
      />
      {loading && <Loading message="Sending message to subscribers..." />}

      <h2>Notify All Subscribers</h2>
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
      ></textarea>
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};

export default NotifySubscribers;