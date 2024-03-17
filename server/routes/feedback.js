const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Feedback = require("../models/feedback");

router.post("/feedback", isLoggedIn, async (req, res, next) => {
  try {
    const { feedbackType, description } = req.body;
    const userId = req.userId;
    await Feedback.create({ userId, feedbackType, description });
    res.status(200).json({
      status: "OK",
      message: "Feedback added.",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
