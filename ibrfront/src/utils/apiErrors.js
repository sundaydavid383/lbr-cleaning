// filepath: ibrfront/src/utils/apiErrors.js

const FRIENDLY_MESSAGES = {
  NETWORK: "We couldn't reach our servers. Please check your internet connection and try again.",
  TIMEOUT: "The request took too long. Please try again in a moment.",
  UNAUTHORIZED: "Please sign in again. Your session may have expired.",
  FORBIDDEN: "You don't have permission to do that. Please contact support if this seems wrong.",
  NOT_FOUND: "We couldn't find what you were looking for.",
  VALIDATION: "Some details look incorrect. Please review the form and try again.",
  SERVER: "Something went wrong on our end. We're looking into it — please try again shortly.",
  CONFLICT: "That information is already in use. Please try a different value.",
  PAYMENT: "We couldn't process your payment. Please check your details and try again.",
  UNKNOWN: "Something unexpected happened. Please refresh the page and try again.",
};

const FRIENDLY_ACTIONS = {
  NETWORK: "Check your Wi-Fi or mobile data, then retry.",
  TIMEOUT: "Wait a few seconds and try again.",
  UNAUTHORIZED: "Log out and sign back in.",
  FORBIDDEN: "Contact our support team if you believe this is a mistake.",
  NOT_FOUND: "Go back and try again, or contact support.",
  VALIDATION: "Double-check the highlighted fields and correct any mistakes.",
  SERVER: "Wait a minute and try again. If it keeps failing, contact support.",
  CONFLICT: "Try using a different email or phone number.",
  PAYMENT: "Confirm your card details or try a different payment method.",
  UNKNOWN: "Refresh the page and try once more.",
};

function classifyError(status, message = "") {
  const lower = String(message).toLowerCase();

  if (status === 0 || lower.includes("network") || lower.includes("failed to fetch")) {
    return "NETWORK";
  }
  if (status === 408 || lower.includes("timeout")) {
    return "TIMEOUT";
  }
  if (status === 401) {
    return "UNAUTHORIZED";
  }
  if (status === 403) {
    return "FORBIDDEN";
  }
  if (status === 404) {
    return "NOT_FOUND";
  }
  if (status === 409) {
    return "CONFLICT";
  }
  if (status === 422 || status === 400 || lower.includes("validation") || lower.includes("invalid")) {
    return "VALIDATION";
  }
  if (status === 402 || status === 403 || lower.includes("payment") || lower.includes("transaction")) {
    return "PAYMENT";
  }
  if (status >= 500) {
    return "SERVER";
  }
  return "UNKNOWN";
}

export function transformApiError(error) {
  const status = error?.status ?? error?.response?.status ?? 0;
  const message =
    (typeof error === "string" && error) ||
    error?.data?.message ||
    error?.message ||
    "Something went wrong.";

  const category = classifyError(status, message);

  let friendly = message;

  if (status === 401 && message.toLowerCase().includes("token")) {
    friendly = "Please sign in again. Your session has expired.";
  } else if (status === 401) {
    friendly = "Please sign in again. Your session may have expired.";
  } else if (status === 403 && message.toLowerCase().includes("admin")) {
    friendly = "Only administrators can access that area.";
  } else if (status === 404) {
    friendly = "We couldn't find what you were looking for.";
  } else if (status === 409) {
    friendly = "That information is already in use. Please try a different value.";
  } else if (status === 422 || message.toLowerCase().includes("validation")) {
    friendly = "Some details look incorrect. Please review the form and try again.";
  } else if (status >= 500) {
    friendly = "Something went wrong on our end. We're looking into it — please try again shortly.";
  } else if (status === 0) {
    friendly = "We couldn't reach our servers. Please check your internet connection and try again.";
  }

  const action = FRIENDLY_ACTIONS[category] || FRIENDLY_ACTIONS.UNKNOWN;

  return `${friendly} ${action}`;
}

export function getErrorCategory(status, message = "") {
  return classifyError(status, message);
}
