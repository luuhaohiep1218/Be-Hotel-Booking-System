const express = require("express");
const { protect, mktMiddleware } = require("../middlewares/Auth");

const {
  getAllBlog,
  createBlog,
  importBlogs,
  getBlogByCategory,
  getBlogById,
  getBlogProminent,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");

const router = express.Router();

// ✅ Lấy danh sách blog (Công khai)
router.get("/", getAllBlog);

// ✅ Lấy blog theo category (Công khai)
router.get("/category/:category", getBlogByCategory);

// ✅ Lấy blog nổi bật (Công khai)
router.get("/prominent", getBlogProminent);

// ✅ Lấy chi tiết blog theo ID (Công khai)
router.get("/:blogId", getBlogById);

// 🔒 Import blogs (Chỉ cho phép Marketing)
router.post("/import", protect, mktMiddleware, importBlogs);

// 🔒 Tạo blog mới (Chỉ cho phép Marketing)
router.post("/", protect, mktMiddleware, createBlog);

// 🔒 Cập nhật blog (Chỉ cho phép Marketing)
router.put("/:blogId", protect, mktMiddleware, updateBlog);

// 🔒 Xóa blog (Chỉ cho phép Marketing)
router.delete("/:blogId", protect, mktMiddleware, deleteBlog);

module.exports = router;
