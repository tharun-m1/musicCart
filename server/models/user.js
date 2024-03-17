const mongoose = require("mongoose");
const cartSchema = require("./cartSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [cartSchema],
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
