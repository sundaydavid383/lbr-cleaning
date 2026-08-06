// filepath: ibrfront/src/pages/payment/Payment.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./payment.css";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import { useAuth } from "../../context/AuthContext";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [paymentResult, setPaymentResult] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const service = searchParams.get("service");

  useEffect(() => {
    if (reference && orderId) {
      verifyPayment(reference);
    }
  }, [reference, orderId]);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 6000);
  };

  const verifyPayment = async (ref) => {
    try {
      setVerifying(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/payment/verify?reference=${encodeURIComponent(ref)}&orderId=${encodeURIComponent(orderId)}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPaymentResult({
          status: data.payment?.status || "PENDING",
          amount: data.payment?.amount || amount,
          message: data.message,
        });
      } else {
        showAlert(data.message || "Payment verification failed. Please try again.", "danger");
      }
    } catch (error) {
      showAlert("We're having trouble verifying your payment. Please contact support.", "danger");
    } finally {
      setVerifying(false);
      setLoading(false);
    }
  };

  const initializePayment = async () => {
    if (!orderId || !amount) {
      showAlert("Missing payment details. Please try booking again.", "danger");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/payment/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount,
          email: user?.email || "customer@example.com",
          customerName: user?.name || "Customer",
          phone: user?.phone || "",
          service: service || "Cleaning Service",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.payment?.authorizationUrl) {
        window.location.href = data.payment.authorizationUrl;
      } else {
        showAlert(data.message || "Failed to initialize payment. Please try again.", "danger");
        setLoading(false);
      }
    } catch (error) {
      showAlert("We're having trouble connecting to the payment gateway. Please try again.", "danger");
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!reference) return;
    setRetrying(true);
    await verifyPayment(reference);
    setRetrying(false);
  };

  const formatNGN = (val) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(Number(val || 0));

  if (verifying) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <Loading message="Verifying your payment..." />
          <p className="payment-verifying-text">Please do not close this page while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (paymentResult) {
    const isSuccess = paymentResult.status === "PAID";
    const isFailed = paymentResult.status === "FAILED";

    return (
      <div className="payment-page">
        <div className="payment-card">
          <div className={`payment-result-icon ${isSuccess ? "success" : isFailed ? "failed" : "pending"}`}>
            <i className={`fa-solid ${isSuccess ? "fa-check" : isFailed ? "fa-times" : "fa-clock"}`}></i>
          </div>

          <h1 className="payment-result-title">
            {isSuccess ? "Payment Successful!" : isFailed ? "Payment Failed" : "Payment Pending"}
          </h1>

          <p className="payment-result-message">
            {isSuccess
              ? "Your booking has been confirmed. We'll send you a confirmation email shortly."
              : isFailed
              ? "We couldn't process your payment. Please try again or contact support."
              : "Your payment is being processed. Please check your email for updates."}
          </p>

          <div className="payment-receipt">
            <div className="receipt-row">
              <span>Service</span>
              <span>{service || "Cleaning Service"}</span>
            </div>
            <div className="receipt-row">
              <span>Amount Paid</span>
              <span className="receipt-amount">{formatNGN(paymentResult.amount)}</span>
            </div>
            <div className="receipt-row">
              <span>Status</span>
              <span className={`receipt-status status-${paymentResult.status.toLowerCase()}`}>{paymentResult.status}</span>
            </div>
            {reference && (
              <div className="receipt-row">
                <span>Reference</span>
                <span className="receipt-ref">{reference}</span>
              </div>
            )}
          </div>

          <div className="payment-actions">
            {isFailed && (
              <button className="btn-primary payment-retry-btn" onClick={handleRetry} disabled={retrying}>
                {retrying ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Retrying...
                  </span>
                ) : (
                  <span><i className="fa-solid fa-rotate-right"></i> Retry Payment</span>
                )}
              </button>
            )}
            <Link to="/" className="btn-secondary">Back to Home</Link>
            {isSuccess && <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>}
          </div>
        </div>
      </div>
    );
  }

  if (!reference && (!orderId || !amount)) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <div className="payment-result-icon failed">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h1>Invalid Payment Link</h1>
          <p>This payment link is invalid or has expired. Please try booking again.</p>
          <Link to="/apply" className="btn-primary">Book Again</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      {loading && <Loading message="Redirecting to payment..." />}

      <div className="payment-card">
        <div className="payment-card-header">
          <div className="payment-logo">
            <i className="fa-solid fa-broom"></i>
            <span>LBR Cleaning</span>
          </div>
          <div className="payment-secure-badge">
            <i className="fa-solid fa-shield-halved"></i>
            Secure Payment
          </div>
        </div>

        <div className="payment-details">
          <h2>Complete Your Booking</h2>
          <div className="payment-info-row">
            <span>Service</span>
            <span>{service || "Cleaning Service"}</span>
          </div>
          <div className="payment-info-row">
            <span>Amount</span>
            <span className="payment-amount">{formatNGN(amount)}</span>
          </div>
        </div>

        <div className="payment-gateway-info">
          <p>You will be redirected to our secure payment partner to complete your payment.</p>
          <div className="payment-methods">
            <span className="payment-method-badge"><i className="fa-solid fa-credit-card"></i> Card</span>
            <span className="payment-method-badge"><i className="fa-solid fa-building-columns"></i> Bank</span>
            <span className="payment-method-badge"><i className="fa-solid fa-mobile-screen"></i> Mobile Money</span>
          </div>
        </div>

        <button
          className="btn-primary payment-pay-btn"
          disabled={loading}
          onClick={initializePayment}
        >
          {loading ? (
            <span className="btn-loading">
              <span className="spinner"></span>
              Redirecting...
            </span>
          ) : (
            <span>
              Pay {formatNGN(amount)} <i className="fa-solid fa-arrow-right"></i>
            </span>
          )}
        </button>

        <p className="payment-note">
          By clicking "Pay", you agree to our terms of service. Your payment is secured with 256-bit SSL encryption.
        </p>

        <div className="payment-footer">
          <Link to="/apply" className="payment-cancel-link">
            <i className="fa-solid fa-arrow-left"></i> Cancel and go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
