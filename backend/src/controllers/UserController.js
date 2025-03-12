const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const updateUserProfile = asyncHandler(async (req, res) => {
  const { full_name, phone } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cập nhật chỉ những trường hợp lệ
    const updatedFields = {};
    if (full_name) updatedFields.full_name = full_name;
    if (phone) {
      if (!/^\d{10}$/.test(phone)) {
        return res
          .status(400)
          .json({ message: "Phone number must be exactly 10 digits" });
      }
      updatedFields.phone = phone;
    }

    // Chỉ update những trường hợp lệ, tránh ảnh hưởng password_hash
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      {
        new: true, // Trả về user sau khi cập nhật
        runValidators: true, // Kiểm tra validate trong model
      }
    );

    res.json({
      _id: updatedUser._id,
      full_name: updatedUser.full_name,
      phone: updatedUser.phone,
      email: updatedUser.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isAdmin) {
    res.status(403); // 403 Forbidden for restricted action
    throw new Error("Can't delete admin user");
  }

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // 🔍 Kiểm tra dữ liệu đầu vào
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    if (!user.password_hash) {
      return res
        .status(500)
        .json({ message: "Lỗi hệ thống: Không tìm thấy mật khẩu" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu cũ không đúng" });
    }

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Thay đổi mật khẩu thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi đổi mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server, thử lại sau" });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getProfileUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password_hash -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      authProvider: user.authProvider,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password_hash -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      authProvider: user.authProvider,
      createdAt: user.createdAt,
    });
  } catch (error) {}
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments({ role: "USER" });
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find({ role: "USER" })
      .skip(skip) // ✅ Phân trang đúng
      .limit(limit)
      .sort({ createdAt: -1 });

    // Trả về dữ liệu đúng định dạng
    res.json({
      page,
      limit,
      totalUsers,
      totalPages,
      users: users.map((user) => ({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        authProvider: user.authProvider,
        isActive: user.isActive ? "Active" : "Inactive",
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách người dùng",
      error: error.message,
    });
  }
});

module.exports = {
  updateUserProfile,
  deleteUser,
  changePassword,
  getUsers,
  getProfileUser,
  getUserById,
  getAllUser,
};
