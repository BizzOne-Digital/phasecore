const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');

// =================== SERVICES ===================

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isPublished: true }).sort({ order: 1 });
  res.json({ success: true, services });
});

const getServicesAdmin = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json({ success: true, services });
});

const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, service });
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) { res.status(404); throw new Error('Service not found'); }
  res.json({ success: true, service });
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) { res.status(404); throw new Error('Service not found'); }
  res.json({ success: true, message: 'Service deleted' });
});

// =================== FAQs ===================

const getFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find({ isPublished: true }).sort({ order: 1 });
  res.json({ success: true, faqs });
});

const getFAQsAdmin = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find().sort({ order: 1 });
  res.json({ success: true, faqs });
});

const createFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ success: true, faq });
});

const updateFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!faq) { res.status(404); throw new Error('FAQ not found'); }
  res.json({ success: true, faq });
});

const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) { res.status(404); throw new Error('FAQ not found'); }
  res.json({ success: true, message: 'FAQ deleted' });
});

module.exports = {
  getServices, getServicesAdmin, createService, updateService, deleteService,
  getFAQs, getFAQsAdmin, createFAQ, updateFAQ, deleteFAQ,
};
