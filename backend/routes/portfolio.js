const express = require('express');
const router = express.Router();
const { getPortfolio, getPortfolioAdmin, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getPortfolio);
router.get('/admin', protect, getPortfolioAdmin);
router.post('/', protect, upload.single('image'), createPortfolio);
router.put('/:id', protect, upload.single('image'), updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

module.exports = router;
