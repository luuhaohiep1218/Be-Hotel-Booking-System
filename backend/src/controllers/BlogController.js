const asyncHandler = require("express-async-handler");

const Blog = require("../models/BlogModel");

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const { category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filter = category
      ? { category: { $regex: new RegExp(category, "i") } }
      : {};

    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);

    // ✅ Lấy danh sách blog theo filter
    const blogs = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      page,
      limit,
      totalBlogs,
      totalPages,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách blog",
      error: error.message,
    });
  }
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
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy blog theo category",
      error: error.message,
    });
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params; // Lấy blogId từ params

    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    // Tìm và cập nhật số lượt xem
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { views: 1 } }, // Tăng `views` lên 1
      { new: true, runValidators: true } // Trả về document đã cập nhật
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

const getBlogProminent = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findOne({ views: { $exists: true } }).sort({
      views: -1,
    });

    if (!blog) {
      return res.status(404).json({ message: "No blogs with views found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = {
  getAllBlog,
  createBlog,
  importBlogs,
  getBlogByCategory,
  getBlogById,
  getBlogProminent,
};
