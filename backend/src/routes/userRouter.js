const express = require("express");
const {
  protect,
  adminMiddleware,
  roleMiddleware,
} = require("../middlewares/Auth");
const {
  getUsers,
  updateUserProfile,
  getProfileUser,
  changePassword,
  getUserById,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/", protect, adminMiddleware, getUsers);
router.get("/profile", protect, getProfileUser);
router.get("/:userId", protect, roleMiddleware("STAFF"), getUserById);

router.patch("/update-profile", protect, updateUserProfile);
router.patch("/change-password", protect, changePassword);

module.exports = router;
