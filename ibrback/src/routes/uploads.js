const express = require("express");
const router = express.Router();
const { generateUploadAuth, getPublicUrl, getImageKitInstance } = require("../services/imagekitService");
const { authenticate, requireAdmin } = require("../middleware/auth");

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024;

// Public avatar upload for signup (no auth required)
router.post("/avatar", async (req, res) => {
  try {
    const { avatar, fileName } = req.body;

    if (!avatar) {
      return res.status(400).json({ success: false, message: "Avatar is required" });
    }

    // Check if it's a data URL
    if (!avatar.startsWith("data:")) {
      return res.status(400).json({ success: false, message: "Invalid avatar format" });
    }

    const mimeMatch = avatar.match(/^data:([^;]+);base64,/);
    if (!mimeMatch) {
      return res.status(400).json({ success: false, message: "Invalid avatar format" });
    }

    const contentType = mimeMatch[1];
    if (!ALLOWED_TYPES.has(contentType)) {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    // Estimate size
    const base64Data = avatar.split(",")[1];
    const size = (base64Data.length * 3) / 4;
    if (size > MAX_SIZE) {
      return res.status(400).json({ success: false, message: "File size exceeds 5MB limit" });
    }

    const ext = contentType.split("/").pop();
    const name = fileName || `avatar_${Date.now()}.${ext}`;

    const imagekit = getImageKitInstance();
    const result = await imagekit.upload({
      file: avatar, // base64 or buffer
      fileName: name,
      folder: "/lbr-avatars",
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.url,
        fileId: result.fileId,
      },
    });
  } catch (error) {
    console.error("[ImageKit] avatar upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload avatar" });
  }
});

router.post("/presign", authenticate, requireAdmin, async (req, res) => {
  try {
    const { key, contentType, size } = req.body;

    if (!key || !contentType) {
      return res.status(400).json({ success: false, message: "key and contentType are required" });
    }

    if (!ALLOWED_TYPES.has(contentType)) {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    if (size && size > MAX_SIZE) {
      return res.status(400).json({ success: false, message: "File size exceeds 5MB limit" });
    }

    const ext = contentType.split("/").pop();
    const fileName = `${key.replace(/\./g, "/")}_${Date.now()}.${ext}`;

    const auth = generateUploadAuth(fileName, contentType);

    res.status(200).json({
      success: true,
      data: {
        ...auth,
        uploadEndpoint: "https://upload.imagekit.io/api/v1/files/upload",
      },
    });
  } catch (error) {
    console.error("[ImageKit] presign error:", error);
    res.status(500).json({ success: false, message: "Failed to generate upload URL" });
  }
});

router.delete("/object", authenticate, requireAdmin, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, message: "url is required" });
    }

    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
    let fileId = url;

    if (url.startsWith(urlEndpoint)) {
      fileId = url.slice(urlEndpoint.length + 1);
    }

    const imagekit = getImageKitInstance();
    await imagekit.deleteFile(fileId);

    res.status(200).json({ success: true, message: "Object deleted" });
  } catch (error) {
    console.error("[ImageKit] delete error:", error);
    res.status(500).json({ success: false, message: "Failed to delete object" });
  }
});

module.exports = router;
