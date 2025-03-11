const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const { bookService, bookRoom, handleVnPayReturn } = require("../controllers/BookingController");

const router = express.Router();
router.post("/rooms", bookRoom);
router.get("/vnpay-return", handleVnPayReturn);
router.post("/service", protect, bookService);

module.exports = router;
