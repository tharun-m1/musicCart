const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

module.exports = cartSchema;
