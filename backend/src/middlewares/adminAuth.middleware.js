const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIError');
const Admin = require('../models/admin.model');

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new APIError(401, "Not authenticated"));

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return next(new APIError(401, "Invalid or expired token"));
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) return next(new APIError(401, "Admin not found"));

    req.admin = admin;
    next();

  } catch (err) {
    next(err);
  }
};
