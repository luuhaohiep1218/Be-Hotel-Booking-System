const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const { getUsers } = require("../controllers/UserController");

const router = express.Router();

router.get("/", protect, adminMiddleware, getUsers);

module.exports = router;
