const express = require("express");
const { protect, mktMiddleware } = require("../middlewares/Auth");
const {
  requestFeedback,
  getAllFeedback,
  deleteFeedback,
  getFeedbackSummary,
  getListFeedbacks,
} = require("../controllers/FeedbackController");
const upload = require("../middlewares/uploadImage");

const router = express.Router();

//  Gửi phản hồi (Ai cũng có thể gửi feedback)
router.post("/", upload.array("images", 5), requestFeedback);

router.get("/mktDashboardFeedback", getFeedbackSummary); //mkt
router.get("/list-feedbacks", getListFeedbacks);

//  Lấy toàn bộ phản hồi (Chỉ Marketing mới được phép)
router.get("/mktgetfeedback", protect, mktMiddleware, getAllFeedback); //mkt

//  Xóa phản hồi theo ID (Chỉ Marketing mới được phép)
router.delete("/:feedbackId", protect, mktMiddleware, deleteFeedback); //mkt

module.exports = router;
