const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackType: {
    type: String,
    enum: ["bugs", "feedback", "query"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Feedback = new mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
