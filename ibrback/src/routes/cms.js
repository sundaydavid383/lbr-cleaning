const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const { authenticate, requireAdmin } = require("../middleware/auth");

// Public read endpoints — frontend fetches content from here
router.get("/content", cmsController.listContent);
router.get("/content/category/:category", cmsController.listByCategory);
router.get("/content/:key", cmsController.getContent);

// Admin write endpoints
router.put("/content/:key", authenticate, requireAdmin, cmsController.upsertContent);
router.post("/content/batch", authenticate, requireAdmin, cmsController.batchUpsert);
router.delete("/content/:key", authenticate, requireAdmin, cmsController.deleteContent);
router.get("/categories", authenticate, requireAdmin, cmsController.listCategories);

module.exports = router;