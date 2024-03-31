const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  colour: {
    type: String,
  },
  availability: {
    type: String,
  },
  image: {
    type: String,
  },
});
const invoiceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  items: [detailsSchema],
  totalCost: {
    type: Number,
  },
  //   details: [detailsSchema],
});

module.exports = invoiceSchema;
