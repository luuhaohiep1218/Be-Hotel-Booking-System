const asyncHandler = require("express-async-handler");
const Feedback = require("../models/FeedbackModel");

/**
 * ✅ Người dùng gửi feedback
 */
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

/**
 * ✅ Lấy toàn bộ phản hồi (Chỉ Marketing mới được phép)
 */
const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Lấy danh sách phản hồi thành công!",
      total: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi lấy phản hồi:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

/**
 * ❌ Xóa phản hồi theo ID (Chỉ Marketing mới được phép)
 */
const deleteFeedback = asyncHandler(async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: "Không tìm thấy phản hồi" });
    }

    await feedback.deleteOne();
    res.status(200).json({ message: "Xóa phản hồi thành công!" });
  } catch (error) {
    console.error("🔥 Lỗi khi xóa phản hồi:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

const getFeedbackSummary = asyncHandler(async (req, res) => {
  try {
    const summary = await Feedback.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }, // Sắp xếp theo rating (1 -> 5)
    ]);

    // Chuyển đổi thành object { "1": count, "2": count, ..., "5": count }
    const feedbackSummary = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    summary.forEach((item) => {
      feedbackSummary[item._id] = item.count;
    });

    res.status(200).json({
      message: "Lấy thống kê feedback thành công!",
      data: feedbackSummary,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi lấy tổng hợp feedback:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = {
  requestFeedback,
  getAllFeedback,
  deleteFeedback,
  getFeedbackSummary,
};
