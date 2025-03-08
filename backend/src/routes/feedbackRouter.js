const express = require("express");
const { protect, mktMiddleware } = require("../middlewares/Auth");
const {
  requestFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
} = require("../controllers/FeedbackController");

const router = express.Router();

// ✅ Gửi feedback
router.post("/", protect, requestFeedback);

// ✅ Lấy tất cả feedback (chỉ Marketting mới được xem)
router.get("/", protect, mktMiddleware, getAllFeedbacks);

// ✅ Lấy feedback theo ID (chỉ Marketting mới được xem)
router.get("/:feedbackId", protect, mktMiddleware, getFeedbackById);

// ✅ Xóa feedback theo ID (chỉ Marketting mới được xóa)
router.delete("/:feedbackId", protect, mktMiddleware, deleteFeedback);

module.exports = router;
