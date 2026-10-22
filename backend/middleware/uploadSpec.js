const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const ALLOWED_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg', 'image/png', 'image/webp',
];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'phasecore/quote-specs',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'webp'],
  }),
});

const uploadSpec = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, Word, Excel, or image files are allowed'), false);
    }
  },
});

module.exports = uploadSpec;
