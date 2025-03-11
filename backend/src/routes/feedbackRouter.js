const express = require("express");
const { protect, mktMiddleware } = require("../middlewares/Auth");
const {
  requestFeedback,
  getAllFeedback,
  deleteFeedback,
} = require("../controllers/FeedbackController");

const router = express.Router();

//  Gửi phản hồi (Ai cũng có thể gửi feedback)
router.post("/", protect, requestFeedback);

//  Lấy toàn bộ phản hồi (Chỉ Marketing mới được phép)
router.get("/", protect, mktMiddleware, getAllFeedback);

//  Xóa phản hồi theo ID (Chỉ Marketing mới được phép)
router.delete("/:feedbackId", protect, mktMiddleware, deleteFeedback);

module.exports = router;
