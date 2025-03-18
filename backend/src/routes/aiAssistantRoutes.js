const express = require("express");
const { getAIResponse } = require("../controllers/aiAssitantController");

const router = express.Router();

router.post("/ask", getAIResponse);

module.exports = router;
