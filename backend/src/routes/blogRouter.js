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

//  Lấy tất cả blog
router.get("/", getAllBlog);

//  Nhập nhiều blog cùng lúc
router.post("/import", protect, mktMiddleware, importBlogs);

//  Lấy blog theo danh mục
router.get("/category/:category", getBlogByCategory);

//  Lấy blog nổi bật
router.get("/prominent", getBlogProminent);

//  Lấy chi tiết blog theo ID
router.get("/:blogId", getBlogById);

//  Thêm blog mới (chỉ Marketing có quyền)
router.post("/", protect, mktMiddleware, createBlog);

//  Cập nhật blog (chỉ Marketing có quyền)
router.put("/:blogId", protect, mktMiddleware, updateBlog);

//  Xóa blog (chỉ Marketing có quyền)
router.delete("/:blogId", protect, mktMiddleware, deleteBlog);

module.exports = router;
