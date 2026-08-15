const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Admin not found' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
};

const superAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'SuperAdmin access required' });
  }
};

module.exports = { protect, superAdmin };
