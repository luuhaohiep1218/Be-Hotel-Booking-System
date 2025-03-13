const asyncHandler = require("express-async-handler");
const Feedback = require("../models/FeedbackModel");
const aqp = require("api-query-params");

/**
 * ✅ Người dùng gửi feedback
 */
const requestFeedback = asyncHandler(async (req, res) => {
  try {
    const { rating, comment, images, userId } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Thiếu rating hoặc comment" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Người dùng chưa xác thực" });
    }

    const newFeedback = new Feedback({
      userId,
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

const getListFeedbacks = asyncHandler(async (req, res) => {
  try {
    const { filter, sort } = aqp(req.query, {
      whitelist: ["userId", "rating", "createdAt"],
    });

    if (filter.rating && typeof filter.rating === "object") {
      const ratingConditions = {};
      Object.keys(filter.rating).forEach((key) => {
        const newKey = `$${key}`;
        ratingConditions[newKey] = Number(filter.rating[key]);
      });
      filter.rating = ratingConditions;
    } else if (filter.rating) {
      filter.rating = Number(filter.rating);
    }

    // Truy vấn danh sách feedback và populate user để lấy tên
    const feedbacks = await Feedback.find(filter)
      .sort(sort)
      .populate({ path: "userId", select: "full_name" }); // Chỉ lấy `name` của user

    // Chuyển đổi userId thành name trước khi trả về
    const formattedFeedbacks = feedbacks.map((feedback) => ({
      _id: feedback._id,
      user: feedback.userId?.full_name || "Unknown User", // Nếu user bị xóa, hiển thị "Unknown User"
      rating: feedback.rating,
      comment: feedback.comment,
      images: feedback.images,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    }));

    res.status(200).json({
      totalFeedbacks: formattedFeedbacks.length,
      feedbacks: formattedFeedbacks,
    });
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

module.exports = {
  requestFeedback,
  getAllFeedback,
  deleteFeedback,
  getFeedbackSummary,
  getListFeedbacks,
};
