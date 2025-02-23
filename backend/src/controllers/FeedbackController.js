const asyncHandler = require("express-async-handler");
const Feedback = require("../models/FeedbackModel");

const requestFeedback = asyncHandler(async (req, res) => {
  try {
    const { rating, comment, images } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Thiếu rating hoặc comment" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Người dùng chưa xác thực" });
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

module.exports = { requestFeedback };
