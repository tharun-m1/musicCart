const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const feedbackRoute = require("./routes/feedback");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    serverName: "Music Cart",
    status: "Active",
  });
});

// ===================== routes ===================================
app.use("/", authRoutes);
app.use("/", feedbackRoute);
app.use("/", cartRoutes);
app.use("/", productRoutes);
app.use("/", userRoutes);
// ====================Error Handler===============================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    status,
    message,
  });
});
// ================================================================
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
      console.log(`server running at http://localhost:${process.env.PORT}`);
    })
    .catch((err) => {
      console.log("Connection Error \n", err.message);
    });
});
