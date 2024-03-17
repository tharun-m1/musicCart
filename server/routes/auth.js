const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middleware/isLoggedIn");
require("dotenv").config();
// =====================Sign up=================================================

router.post("/signup", async (req, res, next) => {
  try {
    const { name, mobile, email, password } = req.body;
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return next(errorHandler(409, "User already Exists"));
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
    const payload = {
      userId: user._id,
    };
    const jwToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    res.status(200).json({
      status: "OK",
      message: "account created successfully",
      jwToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ===========================================================================

// ===================================Login===================================
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return next(errorHandler(401, "incorrect credentials"));
    }
    const payload = {
      userId: user._id,
    };
    const jwToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    res.status(200).json({
      status: "OK",
      jwToken,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// ====================================================================

// ===============================verify ==============================
router.post("/verify", isLoggedIn, (req, res, next) => {
  return res.status(200).json({
    status: "OK",
  });
});
// ===================================================================
module.exports = router;
