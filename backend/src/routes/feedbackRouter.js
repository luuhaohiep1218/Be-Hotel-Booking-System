const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const { requestFeedback } = require("../controllers/FeedbackController");

const router = express.Router();

router.post("/", protect, requestFeedback);

module.exports = router;
