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
// ========================== Add Invoice =================================
router.patch("/add-invoice", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const userData = await User.findOne({ _id: userId });
    if (!userData) {
      return next(errorHandler(404, "User not found"));
    }
    const name = userData.name;
    const { address, paymentMode, items, totalCost } = req.body;
    userData.invoices.push({ name, address, paymentMode, items, totalCost });
    await userData.save();
    return res.status(200).json({
      status: "OK",
      message: "Invoice added",
    });
  } catch (err) {
    next(err);
  }
});
// ========================================================================
// =========================== get invoices ===============================
router.get("/invoices", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const userData = await User.findOne({ _id: userId });
    if (!userData) {
      return next(errorHandler(404, "User not found"));
    }
    const invoices = userData.invoices;
    return res.status(200).json({
      status: "OK",
      data: invoices,
    });
  } catch (err) {
    next(err);
  }
});
// ========================================================================
module.exports = router;
