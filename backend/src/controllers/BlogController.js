const asyncHandler = require("express-async-handler");
const Blog = require("../models/BlogModel");

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {}
});

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { category, title, summary, sections, location, date } = req.body;

    const newBlog = new Blog({
      category,
      title,
      summary,
      sections,
      location,
      date,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo blog", error: error.message });
  }
});

const importBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = req.body; // Dữ liệu từ request (mảng các blog)
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    const savedBlogs = await Blog.insertMany(blogs);
    res
      .status(201)
      .json({ message: "Import dữ liệu thành công", data: savedBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi import blogs", error: error.message });
  }
});

const getBlogByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments({ category });
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find({ category })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      category,
      page,
      limit,
      totalBlogs,
      totalPages,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy blog theo category",
      error: error.message,
    });
  }
});

module.exports = { getAllBlog, createBlog, importBlogs, getBlogByCategory };
