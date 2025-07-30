import React, { useState, useEffect } from "react";
import "./adminMessagePage.css";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import useNavigate from "react-router-dom";
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in ms

const AdminMessagePage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  // Check lockOut on mount
  useEffect(() => {
     const lockoutTime = localStorage.getItem('adminLockoutTime');
      if(lockoutTime){
        const timeLeft = Date.now() - parseInt(lockoutTime);
        if (timeLeft < LOCKOUT_DURATION) { 
            setDisabled(true);
            const timer = setTimeout(()=>{
                setDisabled(false);
                localStorage.removeItem('adminLockoutTime');

            }, LOCKOUT_DURATION - timeLeft);
            return () => clearTimeout(timer);
        }
        else{
            localStorage.removeItem('adminLockoutTime');
        }
      }
  }, []);

  const login = async () => {
    if (disabled) return 

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        setAlert({ message: "Authentication successful!", type: "success" });
      } 
      if(data && data.inputDisable) {
        setDisabled(true);
        setAlert({ message: "Too many failed attempts, please try again later", type: "error" });
        setTimeout(()=>{
        navigate('/')
        },3000)
      }else {
        setAlert({ message: data.message || "Wrong password!", type: "error" });
      }
    } catch (err) {
      setAlert({ message: "Server error during login.", type: "error" });
        if(err.data && err.data.inputDisable) {
            setDisabled(true);
        setAlert({ message: "Too many failed attempts, please try again later", type: "error" });
        setTimeout(()=>{
        navigate('/')
        },3000)
      }
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
          />
          <button onClick={login}>Login</button>
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
