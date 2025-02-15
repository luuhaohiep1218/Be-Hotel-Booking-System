const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
  register,
  login,
  refreshAccessToken,
} = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh-token", refreshAccessToken);
router.get("/test", protect, (req, res) => {
  res.send("test accessToken nhe");
});

module.exports = router;
