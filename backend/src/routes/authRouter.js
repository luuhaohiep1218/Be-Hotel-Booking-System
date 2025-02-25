const express = require("express");
const asyncHandler = require("express-async-handler");

const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
  register,
  login,
  refreshAccessToken,
  logout,
  googleAuth,
  forgotPassword,
} = require("../controllers/AuthController");
const passport = require("passport");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh-token", protect, refreshAccessToken);
router.get("/logout", protect, logout);
router.post("/forgot-password", forgotPassword);

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
