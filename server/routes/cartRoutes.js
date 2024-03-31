const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const Product = require("../models/products");
const router = express.Router();

// ========================= Adding to cart ============================
router.patch("/add-to-cart/:productId", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { newQuantity } = req.body;
    const userData = await User.findOne({ _id: userId });
    const productData = await Product.findOne({ _id: productId });
    if (!productData) {
      return next(errorHandler(404, "Product doesn't exist"));
    }
    if (!userData) {
      return next(errorHandler(404, "user not found"));
    }

    const productIdx = userData.cart.findIndex(
      (prod) => prod.productId.toString() === productId.toString()
    );
    if (productIdx === -1) {
      const newItem = {
        productId,
        quantity: 1,
        image: productData.images[0],
        productName: productData.productName,
        price: productData.price,
        colour: productData.colour,
        availability: productData.availability,
      };
      userData.cart.push(newItem);
    } else {
      let prevQuant = userData.cart[productIdx].quantity;
      if (newQuantity && newQuantity <= 8) {
        userData.cart[productIdx].quantity = newQuantity;
      } else {
        if (newQuantity > 8) {
          return next(errorHandler(412, "Limit Exceeded"));
        }
        if (prevQuant + 1 <= 8) {
          userData.cart[productIdx].quantity = prevQuant + 1;
        } else {
          return next(errorHandler(412, "Limit Exceeded"));
        }
      }
    }
    await userData.save();
    const data = userData.cart;
    return res.status(200).json({
      status: "OK",
      message: "product added to cart",
      data,
    });
  } catch (err) {
    console.log(err);
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
      data: userData.cart,
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
