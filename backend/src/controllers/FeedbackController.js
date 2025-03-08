const asyncHandler = require("express-async-handler");
const Feedback = require("../models/FeedbackModel");

// ✅ Gửi feedback
const requestFeedback = asyncHandler(async (req, res) => {
  try {
    const { rating, comment, images } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Thiếu rating hoặc comment" });
    }

    const newFeedback = new Feedback({
      userId: req.user._id, // ✅ Lưu userId từ req.user
      rating,
      comment,
      images,
    });

    await newFeedback.save();
    res.json({ message: "Gửi đánh giá thành công!" });
  } catch (error) {
    console.error("🔥 Lỗi khi lưu feedback:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ✅ Lấy tất cả feedback
const getAllFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate(
      "userId",
      "username email"
    );
    res.status(200).json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy feedback", error: error.message });
  }
});

// ✅ Lấy feedback theo ID
const getFeedbackById = asyncHandler(async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findById(feedbackId).populate(
      "userId",
      "username email"
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback không tồn tại" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy feedback", error: error.message });
  }
});

// ✅ Xóa feedback theo ID
const deleteFeedback = asyncHandler(async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback không tồn tại" });
    }

    await feedback.deleteOne();
    res.status(200).json({ message: "Xóa feedback thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa feedback", error: error.message });
  }
});

module.exports = {
  requestFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
};
