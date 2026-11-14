// filepath: ibrfront/src/pages/payment/Payment.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./payment.css";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { apiUrl } from "../../utils/apiUrl";
import Txt from "../../component/editable/Txt";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [paymentResult, setPaymentResult] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const site = useSiteSettings();

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
      const response = await fetch(apiUrl(`/api/payment/verify?reference=${encodeURIComponent(ref)}&orderId=${encodeURIComponent(orderId)}`), {
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
      const response = await fetch(apiUrl("/api/payment/initialize"), {
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
          <p className="payment-verifying-text"><Txt k="payment.verifying_text" d="Please do not close this page while we confirm your payment." label="Message while checking payment" /></p>
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
            {isSuccess ? <Txt k="payment.success_title" d="Payment Successful!" label="Title when paid" /> : isFailed ? <Txt k="payment.failed_title" d="Payment Failed" label="Title when payment failed" /> : <Txt k="payment.pending_title" d="Payment Pending" label="Title while pending" />}
          </h1>

          <p className="payment-result-message">
            {isSuccess
              ? <Txt k="payment.success_text" d="Your booking has been confirmed. We'll send you a confirmation email shortly." label="Message when paid" />
              : isFailed
              ? <Txt k="payment.failed_text" d="We couldn't process your payment. Please try again or contact support." label="Message when payment failed" />
              : <Txt k="payment.pending_text" d="Your payment is being processed. Please check your email for updates." label="Message while pending" />}
          </p>

          <div className="payment-receipt">
            <div className="receipt-row">
              <span><Txt k="payment.service_label" d="Service" label="Service label" /></span>
              <span>{service || "Cleaning Service"}</span>
            </div>
            <div className="receipt-row">
              <span><Txt k="payment.amount_paid" d="Amount Paid" label="Amount paid label" /></span>
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
                  <span><i className="fa-solid fa-rotate-right"></i> <Txt k="payment.retry" d="Retry Payment" label="Retry button" /></span>
                )}
              </button>
            )}
            <Link to="/" className="btn-secondary"><Txt k="payment.back_home" d="Back to Home" label="Back to home button" /></Link>
            {isSuccess && <Link to="/dashboard" className="btn-primary"><Txt k="payment.go_dashboard" d="Go to Dashboard" label="Dashboard button" /></Link>}
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
          <Txt k="payment.invalid_title" d="Invalid Payment Link" label="Title for an invalid link" as="h1" />
          <Txt k="payment.invalid_text" d="This payment link is invalid or has expired. Please try booking again." label="Message for an invalid link" as="p" />
          <Link to="/apply" className="btn-primary"><Txt k="payment.book_again" d="Book Again" label="Book again button" /></Link>
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
            <span>{site.name}</span>
          </div>
          <div className="payment-secure-badge">
            <i className="fa-solid fa-shield-halved"></i>
            <Txt k="payment.secure_badge" d="Secure Payment" label="Secure badge" />
          </div>
        </div>

        <div className="payment-details">
          <Txt k="payment.checkout_title" d="Complete Your Booking" label="Checkout heading" as="h2" />
          <div className="payment-info-row">
            <span><Txt k="payment.service_label" d="Service" label="Service label" /></span>
            <span>{service || "Cleaning Service"}</span>
          </div>
          <div className="payment-info-row">
            <span><Txt k="payment.amount_label" d="Amount" label="Amount label" /></span>
            <span className="payment-amount">{formatNGN(amount)}</span>
          </div>
        </div>

        <div className="payment-gateway-info">
          <Txt k="payment.redirect_text" d="You will be redirected to our secure payment partner to complete your payment." label="Redirect message" as="p" />
          <div className="payment-methods">
            <span className="payment-method-badge"><i className="fa-solid fa-credit-card"></i> <Txt k="payment.method_card" d="Card" /></span>
            <span className="payment-method-badge"><i className="fa-solid fa-building-columns"></i> <Txt k="payment.method_bank" d="Bank" /></span>
            <span className="payment-method-badge"><i className="fa-solid fa-mobile-screen"></i> <Txt k="payment.method_mobile" d="Mobile Money" /></span>
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
              <Txt k="payment.pay_button" d="Pay" label="Pay button" /> {formatNGN(amount)} <i className="fa-solid fa-arrow-right"></i>
            </span>
          )}
        </button>

        <p className="payment-note">
          <Txt k="payment.note" d={`By clicking "Pay", you agree to our terms of service. Your payment is secured with 256-bit SSL encryption.`} label="Small print" />
        </p>

        <div className="payment-footer">
          <Link to="/apply" className="payment-cancel-link">
            <i className="fa-solid fa-arrow-left"></i> <Txt k="payment.cancel" d="Cancel and go back" label="Cancel link" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
