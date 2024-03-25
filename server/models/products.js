const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  colour: {
    type: String,
  },
  type: {
    type: String,
  },
  brand: {
    type: String,
  },
  aboutProduct: {
    type: [String],
  },
  overview: {
    type: String,
  },
  images: {
    type: [String],
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: String,
  },
  availability: {
    type: String,
  },
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
