import React, { useState, useEffect } from "react";
import "./adminMessagePage.css";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import { apiFetch } from "../../utils/api";

const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in ms

const AdminMessagePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // If we already have a token from a previous session, skip the login screen
  useEffect(() => {
    if (token) setAuthenticated(true);
  }, [token]);

  // Check lockout on mount
  useEffect(() => {
    const lockoutTime = localStorage.getItem("adminLockoutTime");

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
          localStorage.removeItem("adminLockoutTime");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const login = async () => {
    if (disabled) return;

    setLoading(true);
    try {
      const { data } = await apiFetch("/api/admin-login", {
        method: "POST",
        body: { email, password },
      });

      if (data.success) {
        setAuthenticated(true);
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
        setAlert({ message: "Authentication successful!", type: "success" });
      } else {
        if (data.inputDisable) {
          setDisabled(true);
          localStorage.setItem("adminLockoutTime", Date.now().toString());
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
      const { data } = await apiFetch("/api/send-message", {
        method: "POST",
        body: { message },
        token,
      });

      if (data.success) {
        setAlert({ message: data.message, type: "success" });
        setMessage("");
      } else {
        if (data.message === "Invalid or expired token") {
          // Session expired — send back to the login screen
          setAuthenticated(false);
          setToken(null);
          localStorage.removeItem("adminToken");
        }
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
          <h2>Enter Admin Credentials</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            disabled={disabled}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={disabled}
          />
          <button onClick={login} disabled={disabled}>Login</button>
          {disabled && (
            <p style={{ color: "red" }}>
              Wrong attempts locked input. Try again in {minutes}m {seconds}s.
            </p>
          )}
        </div>
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
