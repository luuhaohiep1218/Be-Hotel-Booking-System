const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");

const {
  getAllBlog,
  createBlog,
  importBlogs,
  getBlogByCategory,
  getBlogById,
  getBlogProminent,
} = require("../controllers/BlogController");
const router = express.Router();

router.get("/", getAllBlog);
router.post("/import", importBlogs);
router.get("/category/:category", getBlogByCategory);
router.get("/prominent", getBlogProminent);
router.get("/:blogId", getBlogById);

module.exports = router;
