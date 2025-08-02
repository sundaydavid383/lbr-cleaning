import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./customAlert.css";

const CustomAlert = ({ message, type = "success", onClose }) => {
  const bgColors = {
    success: "rgba(46, 204, 113, 0.95)",  // green
    warning: "rgba(241, 196, 15, 0.95)", // yellow
    danger: "rgba(231, 76, 60, 0.95)",   // red
  };

  return (
    <AnimatePresence>
      {message && (
        <div className="custom-alert-holder">
          <motion.div
            className="custom-alert"
            style={{ backgroundColor: bgColors[type] || bgColors.success }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <p>{message}</p>
            <button onClick={onClose} className="alert-close">×</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;