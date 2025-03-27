const express = require("express");
const { protect, adminMiddleware, staffMiddleware } = require("../middlewares/Auth");
const { bookService, bookRoom, handleVnPayReturn, getListBooking, updateBooking } = require("../controllers/BookingController");
const router = express.Router();

router.get("/", getListBooking);
router.patch("/:id", protect, staffMiddleware, updateBooking);
router.post("/rooms", bookRoom);
router.get("/vnpay-return", handleVnPayReturn);
router.post("/service", protect, bookService);

module.exports = router;
