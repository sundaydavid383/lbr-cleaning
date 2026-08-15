// filepath: ibrfront/src/component/customAlert/CustomAlert.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./customAlert.css";

const CustomAlert = ({ message, type = "success", onClose, duration = 5000 }) => {
  useEffect(() => {
    if (!message || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  const icons = {
    success: "fa-solid fa-circle-check",
    warning: "fa-solid fa-triangle-exclamation",
    danger: "fa-solid fa-circle-xmark",
    info: "fa-solid fa-circle-info",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`custom-alert-holder custom-alert custom-alert-${type}`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="alert"
          aria-live="assertive"
        >
          <div className="custom-alert-icon">
            <i className={icons[type] || icons.info} />
          </div>
          <p className="custom-alert-message">{message}</p>
          {onClose && (
            <button onClick={onClose} className="custom-alert-close" aria-label="Dismiss">
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
