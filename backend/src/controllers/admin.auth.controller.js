const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIError');
const APIResponse = require('../utils/APIResponse');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new APIError(400, "Email and password are required"));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return next(new APIError(401, "Invalid credentials"));

    const match = await admin.comparePassword(password);
    if (!match) return next(new APIError(401, "Invalid credentials"));

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return res.status(200).json(
      new APIResponse(
        200,
        {
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name
          }
        },
        "Login successful"
      )
    );

  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return res.json(new APIResponse(200, null, "Logged out successfully"));
};

exports.getAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin; 

    return res.status(200).json(
      new APIResponse(
        200,
        {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          createdAt: admin.createdAt
        },
        "Admin profile fetched successfully"
      )
    );
  } catch (err) {
    next(err);
  }
};
