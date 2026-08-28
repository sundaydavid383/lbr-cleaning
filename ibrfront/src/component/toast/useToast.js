import { toast } from "react-toastify";
import { transformApiError } from "../../utils/apiErrors";

const activeToasts = new Set();

const getFriendlyMessage = (err) => {
  if (typeof err === "string") return err;
  return transformApiError(err);
};

const getToastId = (message, type = "error") => {
  const normalized = message.trim().toLowerCase();
  return `${type}:${normalized}`;
};

export const showSuccess = (message) => {
  const id = getToastId(message, "success");
  if (activeToasts.has(id)) return;
  activeToasts.add(id);
  toast.success(message, {
    icon: "✅",
    onOpen: () => activeToasts.add(id),
    onClose: () => activeToasts.delete(id),
    onDismiss: () => activeToasts.delete(id),
  });
};

export const showError = (err) => {
  const friendly = getFriendlyMessage(err);
  const id = getToastId(friendly, "error");
  if (activeToasts.has(id)) return;
  activeToasts.add(id);
  toast.error(friendly, {
    icon: "❌",
    onOpen: () => activeToasts.add(id),
    onClose: () => activeToasts.delete(id),
    onDismiss: () => activeToasts.delete(id),
  });
};

export const showWarning = (message) => {
  const id = getToastId(message, "warning");
  if (activeToasts.has(id)) return;
  activeToasts.add(id);
  toast.warning(message, {
    icon: "⚠️",
    onOpen: () => activeToasts.add(id),
    onClose: () => activeToasts.delete(id),
    onDismiss: () => activeToasts.delete(id),
  });
};

export const showInfo = (message) => {
  const id = getToastId(message, "info");
  if (activeToasts.has(id)) return;
  activeToasts.add(id);
  toast.info(message, {
    icon: "ℹ️",
    onOpen: () => activeToasts.add(id),
    onClose: () => activeToasts.delete(id),
    onDismiss: () => activeToasts.delete(id),
  });
};
