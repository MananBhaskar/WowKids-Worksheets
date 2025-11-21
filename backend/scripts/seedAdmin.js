// scripts/seedAdmin.js
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Admin = require('../src/models/admin.model');

(async function seed() {
  try {
    if (!process.env.MONGO_URI || !process.env.DB_NAME) {
      console.error('Set MONGO_URI and DB_NAME in .env');
      process.exit(1);
    }

    const mongoUri =`${process.env.MONGO_URI}/${process.env.DB_NAME}`;

    await mongoose.connect(mongoUri);

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
      process.exit(1);
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    const admin = new Admin({ email, password, name: 'Admin' });
    await admin.save();
    console.log('Admin created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Seed admin error', err);
    process.exit(1);
  }
})();
