const express = require('express');
const router = express.Router();
const { submitQuote, getQuotes, updateQuoteStatus, deleteQuote } = require('../controllers/quoteController');
const { protect } = require('../middleware/auth');
const uploadSpec = require('../middleware/uploadSpec');

router.post('/', uploadSpec.single('specFile'), submitQuote);
router.get('/', protect, getQuotes);
router.put('/:id', protect, updateQuoteStatus);
router.delete('/:id', protect, deleteQuote);

module.exports = router;
