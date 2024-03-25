const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  },
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  colour: {
    type: String,
  },
  availability: {
    type: String,
  },
});

module.exports = cartSchema;
