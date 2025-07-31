import React, { useState, useEffect } from "react";
import "./adminMessagePage.css";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in ms

const AdminMessagePage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);


  // Check lockOut on mount
useEffect(() => {
  const lockoutTime = localStorage.getItem('adminLockoutTime');

  if (lockoutTime) {
    const interval = setInterval(() => {
      const timePassed = Date.now() - parseInt(lockoutTime);
      const remaining = LOCKOUT_DURATION - timePassed;

      if (remaining > 0) {
        setTimeLeft(remaining);
        setDisabled(true);
      } else {
        clearInterval(interval);
        setTimeLeft(0);
        setDisabled(false);
        localStorage.removeItem('adminLockoutTime');
      }
    }, 1000); // update every second

    return () => clearInterval(interval);
  }
}, []);

const minutes = Math.floor(timeLeft / 60000);
const seconds = Math.floor((timeLeft % 60000) / 1000);


  const login = async () => {
    if (disabled) return

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5100/api/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, disabled }),
      });

      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        setAlert({ message: "Authentication successful!", type: "success" });
      }
      else {
        if (data && data.inputDisable) {
          setDisabled(true);
          localStorage.setItem('adminLockoutTime', Date.now().toString());
          setAlert({ message: "Too many failed attempts, please try again later", type: "error" });
        }
        setAlert({ message: data.message || "Wrong password!", type: "error" });
      }
    } catch (err) {
      setAlert({ message: "Server error during login.", type: "error" });
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      return setAlert({ message: "Please enter a message.", type: "error" });
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, password }),
      });

      const data = await res.json();
      if (data.success) {
        setAlert({ message: `Message sent to ${data.count} people.`, type: "success" });
        setMessage("");
      }
      else {
        setAlert({ message: data.message || "Failed to send message.", type: "error" });
      }
    } catch (err) {
      setAlert({ message: "Network error while sending message.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="admin-container">
      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "success" })}
      />

      {loading && <Loading message="Please wait..." />}

      {!authenticated ? (
        <div className="login-box">
          <h2>Enter Admin Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={disabled}
          />
          <button onClick={login} disabled={disabled}>Login</button>
        {disabled && (
  <p style={{ color: 'red' }}>
  Wrong attempts locked input. Try again in {minutes}m {seconds}s.
</p>
)}</div>
      ) : (
        <div className="message-box">
          <h2>Broadcast Message</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage}>Send to All Subscribers</button>
        </div>
      )}
    </div>
  );
};

export default AdminMessagePage;
