const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  organization: { type: String, trim: true },
  itemsNeeded: { type: String, required: true },
  quantity: { type: String, trim: true },
  deliveryLocation: { type: String, trim: true },
  deadline: { type: String, trim: true },
  notes: { type: String },
  specFile: {
    url: String,
    publicId: String,
    originalName: String,
  },
  status: { type: String, enum: ['new', 'reviewed', 'quoted', 'closed'], default: 'new' },
  ipAddress: String,
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
