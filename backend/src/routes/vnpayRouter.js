const express = require("express");
const {
  createVNPayPayment,
  handleVNPayReturn,
} = require("../controllers/vnpayController");

const router = express.Router();

router.post("/create-payment", createVNPayPayment);
router.get("/vnpay-return", handleVNPayReturn);

module.exports = router;
