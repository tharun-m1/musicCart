const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const router = express.Router();

router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const userData = await User.findOne({ _id: userId });
    if (!userData) {
      return next(errorHandler(404, "User not found"));
    }
    const { name, cart } = userData;
    const data = {
      name,
      cart,
    };
    return res.status(200).json({
      status: "OK",
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
