require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for admin seeding...');

  const email = (process.env.ADMIN_EMAIL || 'admin@phasecore.com').toLowerCase();
  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log(`Admin already exists for ${email} — skipping (password left unchanged).`);
    await mongoose.disconnect();
    return process.exit(0);
  }

  let password = process.env.ADMIN_PASSWORD;
  let generated = false;

  if (!password) {
    password = crypto.randomBytes(9).toString('base64').replace(/[+/=]/g, '') + 'A1!';
    generated = true;
    const envPath = path.join(__dirname, '..', '.env');
    fs.appendFileSync(envPath, `\nADMIN_PASSWORD=${password}\n`);
  }

  const admin = await Admin.create({
    name: process.env.ADMIN_NAME || 'PhaseCore Admin',
    email,
    password,
    role: 'superadmin',
  });

  console.log(`Admin created: ${admin.email} (role: ${admin.role})`);
  if (generated) {
    console.log(`Generated password saved to backend/.env as ADMIN_PASSWORD: ${password}`);
    console.log('Log in once, then change the password from the admin panel.');
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Admin seed failed:', err);
  process.exit(1);
});
