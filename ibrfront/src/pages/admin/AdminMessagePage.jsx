import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./adminMessagePage.css";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import { useAuth } from "../../context/AuthContext";

const AdminMessagePage = () => {
  const { isAuthenticated, user, token, adminLogin, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="admin-container">
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "success" })}
        />

        <div className="login-box">
          <h2>Enter Admin Credentials</h2>
          {error && (
            <div className="auth-error" style={{ marginBottom: "1rem" }}>
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            disabled={locked}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={locked}
          />
          <button
            className="auth-submit-btn"
            onClick={async () => {
              setError("");
              if (!email || !password) {
                setError("Please enter your email and password.");
                return;
              }
              setLoading(true);
              const result = await adminLogin(email, password);
              setLoading(false);
              if (!result.success) {
                setError(result.message || "Login failed");
                setLocked(!!result.inputDisable);
              }
            }}
            disabled={loading || locked}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
          {locked && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>
              Too many failed attempts. The input is temporarily locked.
            </p>
          )}
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-secondary, #64748b)" }}>
            <a href="/admin/login" onClick={(e) => { e.preventDefault(); logout(); }}>Go to Admin Sign In</a>
          </p>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!message.trim()) {
      return setAlert({ message: "Please enter a message.", type: "error" });
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ message: data.message, type: "success" });
        setMessage("");
      } else {
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

      <div className="message-box">
        <h2>Broadcast Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendMessage} disabled={loading}>Send to All Subscribers</button>
      </div>
    </div>
  );
};

export default AdminMessagePage;
