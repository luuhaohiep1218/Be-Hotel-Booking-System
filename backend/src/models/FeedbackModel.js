const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false, trim: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);
const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
