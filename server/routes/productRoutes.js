const express = require("express");
const router = express.Router();
const Product = require("../models/products");
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

module.exports = router;
