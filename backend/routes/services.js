const express = require('express');
const router = express.Router();
const {
  getServices, getServicesAdmin, createService, updateService, deleteService,
  getFAQs, getFAQsAdmin, createFAQ, updateFAQ, deleteFAQ,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

// Services
router.get('/services', getServices);
router.get('/services/admin', protect, getServicesAdmin);
router.post('/services', protect, createService);
router.put('/services/:id', protect, updateService);
router.delete('/services/:id', protect, deleteService);

// FAQs
router.get('/faqs', getFAQs);
router.get('/faqs/admin', protect, getFAQsAdmin);
router.post('/faqs', protect, createFAQ);
router.put('/faqs/:id', protect, updateFAQ);
router.delete('/faqs/:id', protect, deleteFAQ);

module.exports = router;
