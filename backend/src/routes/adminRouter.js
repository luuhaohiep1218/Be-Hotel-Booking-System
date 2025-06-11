const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  getRecentUsers,
  getFilteredUsers,
  getUsersThisMonth,
  getAllServices,
  deleteService,
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/users", protect, adminMiddleware, listUsers);

// Manage user accounts (create, delete, modify)
router.post("/users", protect, adminMiddleware, createUser);
router.put("/users/:id", protect, adminMiddleware, updateUser);
router.delete("/users/:id", protect, adminMiddleware, deleteUser);

// New routes for dashboard statistics and recent users
router.get("/users/stats", protect, adminMiddleware, getUserStats);
router.get("/users/recent", protect, adminMiddleware, getRecentUsers);
router.get("/users/filtered", protect, adminMiddleware, getFilteredUsers);

router.get("/users/this-month", protect, adminMiddleware, getUsersThisMonth);

// Lấy danh sách dịch vụ
router.get("/services", protect, adminMiddleware, getAllServices);

// Xóa dịch vụ
router.delete("/services/:id", protect, adminMiddleware, deleteService);
module.exports = router;
