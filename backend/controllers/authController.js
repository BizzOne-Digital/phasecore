const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    success: true,
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// @desc    Create admin (superadmin only, or first-time setup)
// @route   POST /api/auth/register
// @access  Private/SuperAdmin
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const count = await Admin.countDocuments();

  // Allow first admin creation without auth
  if (count > 0 && (!req.admin || req.admin.role !== 'superadmin')) {
    res.status(403);
    throw new Error('Only superadmin can create new admins');
  }

  const admin = await Admin.create({
    name,
    email,
    password,
    role: count === 0 ? 'superadmin' : (role || 'admin'),
  });

  res.status(201).json({
    success: true,
    token: generateToken(admin._id),
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id);

  if (!(await admin.matchPassword(currentPassword))) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ success: true, message: 'Password updated successfully' });
});

module.exports = { login, getMe, register, changePassword };
