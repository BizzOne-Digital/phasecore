const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['cybersecurity', 'it-technology', 'project-management', 'business-consulting'],
    required: true
  },
  description: { type: String, required: true },
  outcome: { type: String },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
