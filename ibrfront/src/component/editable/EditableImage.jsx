import React, { useState, useRef } from "react";
import { useEditMode } from "../../context/EditModeContext";
import { apiUrl } from "../../utils/api";
import "./editable.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024;

const EditableImage = ({ cmsKey, type = "image", value, alt = "", className = "" }) => {
  const { isEditMode, saveField, getOverride } = useEditMode();
  const displayValue = getOverride(cmsKey, value);
  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState(displayValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  if (!isEditMode) {
    return <img src={displayValue} alt={alt} className={className} />;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, WebP, and SVG images are allowed.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    try {
      setUploading(true);

      const presignRes = await fetch(apiUrl("/api/uploads/presign"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(await import("../../context/AuthContext")).useAuth().token || ""}`,
        },
        body: JSON.stringify({ key: cmsKey, contentType: file.type, size: file.size }),
      });

      const presignData = await presignRes.json();
      if (!presignRes.ok || !presignData.success) {
        throw new Error(presignData.message || "Failed to get upload URL");
      }

      const { uploadEndpoint, token, expire, signature, publicKey, fileName } = presignData.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("publicKey", publicKey);
      formData.append("token", token);
      formData.append("expire", expire);
      formData.append("signature", signature);
      formData.append("useUniqueFilename", "false");

      const uploadRes = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadResult.message || "Upload to ImageKit failed");
      }

      const uploadedUrl = uploadResult.url || uploadResult.filePath;
      await saveField(cmsKey, uploadedUrl, type);
      setDraftUrl(uploadedUrl);
      setOpen(false);
    } catch (err) {
      console.error("[EDIT-IMAGE] upload error:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async () => {
    await saveField(cmsKey, draftUrl, type);
    setOpen(false);
  };

  return (
    <div className="editable-image-wrap">
      <img
        src={displayValue}
        alt={alt}
        className={`${className} editable-field editable-image`}
        onClick={() => {
          setDraftUrl(displayValue);
          setOpen(true);
          setError("");
        }}
      />
      {open && (
        <div className="editable-popover">
          <label>Current Image</label>
          {draftUrl && <img src={draftUrl} alt="Preview" className="editable-popover-preview" />}

          <label>Replace Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading && <p className="editable-uploading">Uploading…</p>}
          {error && <p className="editable-error">{error}</p>}

          <div className="editable-popover-actions">
            <button type="button" onClick={() => setOpen(false)} disabled={uploading}>Cancel</button>
            <button type="button" className="primary" onClick={handleSave} disabled={uploading}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;
