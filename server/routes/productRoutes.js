const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const errorHandler = require("../utils/errorHandler");
// ============================== Searching ===============================
router.get("/products/search", async (req, res, next) => {
  try {
    const { name } = req.query;
    const allProducts = await Product.find({});
    const result = allProducts.filter((product) => {
      return product.productName.toLowerCase().includes(name.toLowerCase());
    });
    return res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
// ========================================================================
// =============================== Filtering ===============================

router.get("/products/filter", async (req, res, next) => {
  try {
    const { type, colour, company, price, sortby } = req.query;

    const filter = {};
    const conditions = [];
    if (type) {
      conditions.push({ type: type });
    }
    if (colour) {
      conditions.push({ colour: { $regex: colour, $options: "i" } });
    }
    if (company) {
      conditions.push({ brand: company });
    }
    if (price) {
      if (price === "0-1000") {
        conditions.push({
          $and: [{ price: { $gte: 0 } }, { price: { $lte: 1000 } }],
        });
      } else if (price === "1000-10000") {
        conditions.push({
          $and: [{ price: { $gte: 1000 } }, { price: { $lte: 10000 } }],
        });
      } else if (price === "10000-20000") {
        conditions.push({
          $and: [{ price: { $gte: 10000 } }, { price: { $lte: 20000 } }],
        });
      }
    }
    if (conditions.length === 0 && !sortby) {
      const allProducts = await Product.find({});
      return res.status(200).json({
        message: "No filters",
        status: "OK",
        data: allProducts,
      });
    }
    if (conditions.length > 0) {
      filter.$and = conditions;
    }
    if (sortby) {
      let feild = null;
      let order = null;
      let collation = { locale: "en", strength: 2 };
      if (sortby === "za" || sortby === "az") {
        feild = "productName";
        order = sortby === "az" ? 1 : -1;
      } else if (sortby === "lo" || sortby === "hi") {
        feild = "price";
        order = sortby === "lo" ? 1 : -1;
      }
      const allProducts = await Product.find(filter)
        .collation(collation)
        .sort({ [feild]: order });
      return res.status(200).json({
        status: "OK",
        data: allProducts,
      });
    }
    const allProducts = await Product.find(filter);
    return res.status(200).json({
      status: "OK",
      data: allProducts,
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
