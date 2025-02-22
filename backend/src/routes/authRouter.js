const express = require("express");
const asyncHandler = require("express-async-handler");

const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
  register,
  login,
  refreshAccessToken,
  logout,
  googleAuth,
} = require("../controllers/AuthController");
const passport = require("passport");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh-token", refreshAccessToken);
router.get("/logout", logout);
router.get("/test", protect, (req, res) => {
  res.send("test accessToken nhe");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleAuth
);

module.exports = router;
