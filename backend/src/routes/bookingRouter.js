const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");

const { bookService } = require("../controllers/BookingController");

const router = express.Router();

router.post("/service", protect, bookService);

module.exports = router;
