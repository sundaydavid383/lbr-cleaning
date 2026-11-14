import { apiUrl } from "./apiUrl";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// Friendly validation message, or "" if the file is fine.
export const checkImageFile = (file) => {
  if (!file) return "Please choose a picture.";
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "That file type isn't supported. Please use a JPG, PNG, WebP, GIF or SVG picture.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return `That picture is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please use one under 5 MB.`;
  }
  return "";
};

// Uploads a picture to ImageKit through our server and returns its public URL.
// `nameHint` is used to build a readable file name (e.g. the CMS key).
export const uploadImage = async (file, token, nameHint = "image") => {
  const problem = checkImageFile(file);
  if (problem) throw new Error(problem);

  const safeHint = String(nameHint).replace(/[^a-z0-9_.-]/gi, "_").slice(0, 80) || "image";

  const presignRes = await fetch(apiUrl("/api/uploads/presign"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
    body: JSON.stringify({ key: safeHint, contentType: file.type, size: file.size }),
  });
  const presignData = await presignRes.json().catch(() => ({}));
  if (!presignRes.ok || !presignData.success) {
    throw new Error(
      presignRes.status === 401 || presignRes.status === 403
        ? "Your login has expired. Please log in again."
        : presignData.message || "Could not start the upload."
    );
  }

  const { uploadEndpoint, token: uploadToken, expire, signature, publicKey, fileName } = presignData.data;
  const form = new FormData();
  form.append("file", file);
  form.append("fileName", fileName);
  form.append("publicKey", publicKey);
  form.append("token", uploadToken);
  form.append("expire", expire);
  form.append("signature", signature);
  form.append("useUniqueFilename", "false");

  const uploadRes = await fetch(uploadEndpoint, { method: "POST", body: form });
  const result = await uploadRes.json().catch(() => ({}));
  if (!uploadRes.ok) throw new Error(result.message || "The picture could not be uploaded.");
  return result.url || result.filePath;
};
