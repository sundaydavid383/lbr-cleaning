// filepath: ibrfront/src/component/toast/ToastProvider.jsx
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { transformApiError } from "../../utils/apiErrors";

export const ToastProvider = ({ children }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .Toastify__toast-container {
        z-index: 99999 !important;
      }
      .Toastify__toast {
        border-radius: 12px !important;
        padding: 14px 18px !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        font-weight: 600 !important;
        font-size: 0.95rem !important;
        box-shadow: 0 12px 40px rgba(0,0,0,0.18) !important;
        min-height: 48px !important;
      }
      .Toastify__toast--success {
        background: linear-gradient(135deg, #16a34a 0%, #15803d 100%) !important;
        color: #fff !important;
      }
      .Toastify__toast--error {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
        color: #fff !important;
      }
      .Toastify__toast--warning {
        background: linear-gradient(135deg, #d97706 0%, #b45309 100%) !important;
        color: #fff !important;
      }
      .Toastify__toast--info {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
        color: #fff !important;
      }
      .Toastify__close-button {
        color: #fff !important;
        opacity: 0.8 !important;
      }
      .Toastify__progress-bar {
        height: 3px !important;
      }
      .Toastify__toast--success .Toastify__progress-bar {
        background: #4ade80 !important;
      }
      .Toastify__toast--error .Toastify__progress-bar {
        background: #f87171 !important;
      }
      .Toastify__toast--warning .Toastify__progress-bar {
        background: #fbbf24 !important;
      }
      .Toastify__toast--info .Toastify__progress-bar {
        background: #60a5fa !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {children}
    </>
  );
};
