// filepath: ibrback/src/controllers/cmsController.js
const { repositories } = require("../repositories");
const { cmsContentRepository } = repositories;

exports.listContent = async (req, res) => {
  try {
    const { category } = req.query;
    const isPublic = req.query.isPublic === "false" ? false : true;

    console.log(`[CMS] GET /api/cms/content | category=${category || "all"} | isPublic=${isPublic}`);

    const items = category
      ? await cmsContentRepository.findByCategory(category)
      : await cmsContentRepository.findAll({ isPublic });

    console.log(`[CMS] listContent: found ${items.length} items`);
    if (items.length > 0) {
      console.log(`[CMS] sample keys:`, items.slice(0, 5).map(i => i.key));
    }

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("[CMS] listContent error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch content" });
  }
};

exports.listByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`[CMS] GET /api/cms/content/category/${category}`);

    const items = await cmsContentRepository.findByCategory(category);

    console.log(`[CMS] listByCategory: category=${category} | found ${items.length} items`);

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("[CMS] listByCategory error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch content" });
  }
};

exports.getContent = async (req, res) => {
  try {
    const { key } = req.params;
    console.log(`[CMS] GET /api/cms/content/${encodeURIComponent(key)}`);

    const item = await cmsContentRepository.findByKey(key);

    console.log(`[CMS] getContent key=${key} | found=${!!item}`);

    if (!item) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    console.log(`[CMS] getContent returning:`, { key: item.key, type: item.type, category: item.category });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("[CMS] getContent error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch content" });
  }
};

exports.upsertContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { type, value, label, description, category, isPublic, updatedBy } = req.body;

    console.log(`[CMS] PUT /api/cms/content/${encodeURIComponent(key)}`, { type, category, label, updatedBy: updatedBy || req.user?.email });

    if (!key) {
      return res.status(400).json({ success: false, message: "Key is required" });
    }

    if (!type) {
      return res.status(400).json({ success: false, message: "Type is required" });
    }

    const allowedTypes = ["text", "rich_text", "array", "object", "image", "boolean", "number", "json"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid type. Allowed: ${allowedTypes.join(", ")}`,
      });
    }

    const item = await cmsContentRepository.upsert({
      key,
      type,
      value: value ?? null,
      label: label || null,
      description: description || null,
      category: category || null,
      isPublic: isPublic !== undefined ? isPublic : true,
      updatedBy: updatedBy || req.user?.email || null,
    });

    console.log(`[CMS] upsertContent success:`, { key: item.key, type: item.type, category: item.category });

    res.status(200).json({
      success: true,
      message: "Content saved successfully",
      data: item,
    });
  } catch (error) {
    console.error("[CMS] upsertContent error:", error);
    res.status(500).json({ success: false, message: "Failed to save content" });
  }
};

exports.batchUpsert = async (req, res) => {
  try {
    const { items } = req.body;
    console.log(`[CMS] POST /api/cms/content/batch | count=${items?.length || 0}`);

    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Items must be an array" });
    }

    const results = [];
    for (const item of items) {
      const { key, ...rest } = item;
      if (!key) continue;

      const saved = await cmsContentRepository.upsert({
        key,
        ...rest,
        updatedBy: req.user?.email || null,
      });
      results.push(saved);
    }

    console.log(`[CMS] batchUpsert success: ${results.length} items saved`);

    res.status(200).json({
      success: true,
      message: `${results.length} items saved successfully`,
      data: results,
    });
  } catch (error) {
    console.error("[CMS] batchUpsert error:", error);
    res.status(500).json({ success: false, message: "Failed to batch save content" });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { key } = req.params;
    console.log(`[CMS] DELETE /api/cms/content/${encodeURIComponent(key)}`);

    const item = await cmsContentRepository.findByKey(key);

    if (!item) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    await cmsContentRepository.deleteByKey(key);

    console.log(`[CMS] deleteContent success: ${key}`);

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("[CMS] deleteContent error:", error);
    res.status(500).json({ success: false, message: "Failed to delete content" });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const items = await cmsContentRepository.findAll({ limit: 1000 });
    const categories = [...new Set(items.map((item) => item.category).filter(Boolean))];

    console.log(`[CMS] listCategories: ${categories.length} categories:`, categories);

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("[CMS] listCategories error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};
