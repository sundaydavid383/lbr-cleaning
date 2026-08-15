const express = require("express");
const router = express.Router();
const { generatePresignedUploadUrl, deleteObject, normalizeKey } = require("../services/r2Service");
const { authenticate, requireAdmin } = require("../middleware/auth");

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024;

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

    const normalizedKey = normalizeKey(key);
    const result = await generatePresignedUploadUrl(normalizedKey, contentType);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("[R2] presign error:", error);
    res.status(500).json({ success: false, message: "Failed to generate upload URL" });
  }
});

router.delete("/object", authenticate, requireAdmin, async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ success: false, message: "key is required" });
    }

    const normalizedKey = normalizeKey(key);
    await deleteObject(normalizedKey);

    res.status(200).json({ success: true, message: "Object deleted" });
  } catch (error) {
    console.error("[R2] delete error:", error);
    res.status(500).json({ success: false, message: "Failed to delete object" });
  }
});

module.exports = router;
