import { toast } from "react-toastify";
import { transformApiError } from "../../utils/apiErrors";

export const showSuccess = (message) => toast.success(message, { icon: "✅" });

export const showError = (err) => {
  const friendly = typeof err === "string" ? err : transformApiError(err);
  toast.error(friendly, { icon: "❌" });
};

export const showWarning = (message) => toast.warning(message, { icon: "⚠️" });

export const showInfo = (message) => toast.info(message, { icon: "ℹ️" });
