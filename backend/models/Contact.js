const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  organization: { type: String, trim: true },
  service: {
    type: String,
    enum: ['cybersecurity', 'it-digital', 'management-professional', 'healthcare', 'workforce-training', 'facilities', 'other'],
    default: 'other'
  },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  ipAddress: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
