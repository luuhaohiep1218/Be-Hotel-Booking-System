const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
  getUsers,
  updateUserProfile,
  getProfileUser,
  changePassword,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/", protect, adminMiddleware, getUsers);
router.get("/profile", protect, getProfileUser);
router.patch("/update-profile", protect, updateUserProfile);
router.patch("/change-password", protect, changePassword);

module.exports = router;
