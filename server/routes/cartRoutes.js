const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const router = express.Router();

// ========================= Adding to cart ============================
router.patch("/add-to-cart/:productId", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { newQuantity } = req.body;
    const userData = await User.findOne({ _id: userId });
    if (!userData) {
      return next(errorHandler(404, "user not found"));
    }

    const productIdx = userData.cart.findIndex(
      (prod) => prod.productId === productId
    );
    if (productIdx === -1) {
      userData.cart.push({ productId, quantity: 1 });
    } else {
      let prevQuant = userData.cart[productIdx].quantity;
      userData.cart[productIdx].quantity = newQuantity
        ? newQuantity
        : prevQuant + 1;
    }
    await userData.save();
    return res.status(200).json({
      status: "OK",
      message: "product added to cart",
    });
  } catch (err) {
    next(err);
  }
});
// =================================================================
// =========================== Reset Cart ===========================
router.delete("/delete-cart", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const userData = await User.findOne({ _id: userId });
    if (!userData) {
      return next(errorHandler(404, "user not found"));
    }
    userData.cart = [];
    await userData.save();
    return res.status(200).json({
      status: "OK",
      message: "cart deleted",
    });
  } catch (err) {
    next(err);
  }
});
// ==================================================================
// ================================ View Cart =======================
router.get("/view-cart", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const userData = await User.findOne({ _id: userId });
    const { cart } = userData;
    return res.status(200).json({
      status: "OK",
      cart,
    });
  } catch (err) {
    next(err);
  }
});
// =================================================================
module.exports = router;
