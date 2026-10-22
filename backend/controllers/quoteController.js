const asyncHandler = require('express-async-handler');
const Quote = require('../models/Quote');
const cloudinary = require('../config/cloudinary');
const { sendQuoteNotification, sendQuoteAutoReply } = require('../utils/sendEmail');

// @desc    Submit a request for quote
// @route   POST /api/quotes
// @access  Public
const submitQuote = asyncHandler(async (req, res) => {
  const { name, email, phone, organization, itemsNeeded, quantity, deliveryLocation, deadline, notes } = req.body;

  const quote = await Quote.create({
    name, email, phone, organization, itemsNeeded, quantity, deliveryLocation, deadline, notes,
    specFile: req.file ? {
      url: req.file.path,
      publicId: req.file.filename,
      originalName: req.file.originalname,
    } : undefined,
    ipAddress: req.ip,
  });

  try {
    await sendQuoteNotification(quote);
  } catch (err) {
    console.error('[email] Quote notification FAILED:', err);
  }
  try {
    await sendQuoteAutoReply(quote);
  } catch (err) {
    console.error('[email] Quote auto-reply FAILED:', err);
  }

  res.status(201).json({
    success: true,
    message: 'Your request for quote has been received. We will respond within 1–2 business days.',
  });
});

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Private
const getQuotes = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const total = await Quote.countDocuments(filter);
  const quotes = await Quote.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ success: true, total, page: Number(page), quotes });
});

// @desc    Update quote status
// @route   PUT /api/quotes/:id
// @access  Private
const updateQuoteStatus = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!quote) { res.status(404); throw new Error('Quote not found'); }
  res.json({ success: true, quote });
});

// @desc    Delete quote
// @route   DELETE /api/quotes/:id
// @access  Private
const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) { res.status(404); throw new Error('Quote not found'); }

  if (quote.specFile?.publicId) {
    try { await cloudinary.uploader.destroy(quote.specFile.publicId, { resource_type: 'raw' }); } catch (_) { /* asset may not exist */ }
  }
  await quote.deleteOne();
  res.json({ success: true, message: 'Quote deleted' });
});

module.exports = { submitQuote, getQuotes, updateQuoteStatus, deleteQuote };
