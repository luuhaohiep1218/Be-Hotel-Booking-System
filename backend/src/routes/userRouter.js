const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
  getUsers,
  updateUserProfile,
  getProfileUser,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/", protect, adminMiddleware, getUsers);
router.get("/profile", protect, getProfileUser);
router.patch("/update-profile", protect, updateUserProfile);

module.exports = router;
