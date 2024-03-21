const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const errorHandler = require("../utils/errorHandler");
// =============================== Featured ===============================

router.get("/products/featured", async (req, res, next) => {
  try {
    const featured = await Product.find({});
    return res.status(200).json({
      status: "OK",
      data: featured,
    });
  } catch (err) {
    next(err);
  }
});
// ========================================================================

// ========================= View Product =================================

router.get("/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const data = await Product.findOne({ _id: productId });
    if (!data) {
      return next(errorHandler(404, "Product not found"));
    }
    return res.status(200).json({
      status: "OK",
      data,
    });
  } catch (err) {
    next(err);
  }
});
// ========================================================================

module.exports = router;
