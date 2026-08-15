const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const { sendContactNotification, sendAutoReply } = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, organization, service, message } = req.body;

  const contact = await Contact.create({
    name, email, phone, organization, service, message,
    ipAddress: req.ip,
  });

  // Send notifications (non-blocking)
  try {
    await sendContactNotification(contact);
    await sendAutoReply(contact);
  } catch (err) {
    console.error('Email error:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been received. We will respond within 1–2 business days.',
  });
});

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const total = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ success: true, total, page: Number(page), contacts });
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private
const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!contact) { res.status(404); throw new Error('Contact not found'); }
  res.json({ success: true, contact });
});

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) { res.status(404); throw new Error('Contact not found'); }
  res.json({ success: true, message: 'Contact deleted' });
});

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };
