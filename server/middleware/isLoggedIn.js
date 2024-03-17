const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
require("dotenv").config();

const isLoggedIn = (req, res, next) => {
  try {
    const jwToken = req.headers.authorization;
    if (!jwToken) {
      return next(errorHandler(500, "You are not Logged In."));
    }
    const { userId } = jwt.verify(jwToken, process.env.JWT_SECRET_KEY);
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = isLoggedIn;
