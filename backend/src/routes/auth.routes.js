const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { login, logout, getAdminProfile } = require('../controllers/admin.auth.controller');
const adminAuth = require('../middlewares/adminAuth.middleware');

router.post('/admin/login', asyncHandler(login));
router.post('/admin/logout', asyncHandler(logout));
router.get('/admin/me', adminAuth,asyncHandler(getAdminProfile));

module.exports = router;
