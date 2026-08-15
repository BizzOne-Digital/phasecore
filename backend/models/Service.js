const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'shield' },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  features: [String],
  frameworks: [String],
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
