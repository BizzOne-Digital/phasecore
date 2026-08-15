const asyncHandler = require('express-async-handler');
const Portfolio = require('../models/Portfolio');
const cloudinary = require('../config/cloudinary');

// Accepts either a comma-separated string ("NIST, CMMC") or a JSON array string.
const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return parsed;
  } catch (_) { /* not JSON — treat as comma-separated */ }
  return tags.split(',').map(t => t.trim()).filter(Boolean);
};

// @desc    Get all published portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolio = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = { isPublished: true };
  if (category && category !== 'all') filter.category = category;

  const items = await Portfolio.find(filter).sort({ isFeatured: -1, order: 1, createdAt: -1 });
  res.json({ success: true, count: items.length, items });
});

// @desc    Get all portfolio items (admin)
// @route   GET /api/portfolio/admin
// @access  Private
const getPortfolioAdmin = asyncHandler(async (req, res) => {
  const items = await Portfolio.find().sort({ createdAt: -1 });
  res.json({ success: true, count: items.length, items });
});

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private
const createPortfolio = asyncHandler(async (req, res) => {
  if (!req.file) { res.status(400); throw new Error('Image is required'); }

  const { title, category, description, outcome, tags, isFeatured, order } = req.body;

  const item = await Portfolio.create({
    title, category, description, outcome,
    image: { url: req.file.path, publicId: req.file.filename },
    tags: parseTags(tags),
    isFeatured: isFeatured === 'true',
    order: Number(order) || 0,
  });

  res.status(201).json({ success: true, item });
});

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private
const updatePortfolio = asyncHandler(async (req, res) => {
  let item = await Portfolio.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Portfolio item not found'); }

  const updates = { ...req.body };
  if (updates.tags !== undefined) updates.tags = parseTags(updates.tags);
  if (updates.isFeatured) updates.isFeatured = updates.isFeatured === 'true';

  if (req.file) {
    // Delete old image from Cloudinary
    if (item.image.publicId) {
      try { await cloudinary.uploader.destroy(item.image.publicId); } catch (_) { /* asset may not exist in Cloudinary */ }
    }
    updates.image = { url: req.file.path, publicId: req.file.filename };
  }

  item = await Portfolio.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  res.json({ success: true, item });
});

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private
const deletePortfolio = asyncHandler(async (req, res) => {
  const item = await Portfolio.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Portfolio item not found'); }

  if (item.image.publicId) {
    await cloudinary.uploader.destroy(item.image.publicId);
  }
  await item.deleteOne();
  res.json({ success: true, message: 'Portfolio item deleted' });
});

module.exports = { getPortfolio, getPortfolioAdmin, createPortfolio, updatePortfolio, deletePortfolio };
