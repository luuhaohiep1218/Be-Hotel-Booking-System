const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { generateToken } = require("../middlewares/Auth");

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
  try {
    const user = await User.findById(req.user._id);

    if (bcrypt.compare(oldPassword, user.password) && user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Change password successful" });
    } else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      authProvider: user.authProvider,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = {
  updateUserProfile,
  deleteUser,
  changePassword,
  getUsers,
  getProfileUser,
};
