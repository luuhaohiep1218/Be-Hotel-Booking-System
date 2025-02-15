const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { generateToken, generateRefreshToken } = require("../middlewares/Auth");

const register = asyncHandler(async (req, res) => {
  const { full_name, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password_hash: hashedPassword, // Đúng key của database
      phone,
    });

    if (user) {
      // Tạo Access Token và Refresh Token
      const accessToken = generateToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Lưu Refresh Token vào database
      user.refreshToken = refreshToken;
      await user.save();

      // Trả refreshToken qua cookie HTTPOnly (bảo mật hơn)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 7 ngày
      });

      res.status(201).json({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        accessToken,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const accessToken = generateToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Xóa refreshToken cũ và cập nhật refreshToken mới
      user.refreshToken = refreshToken;
      await user.save();

      // Trả refreshToken qua cookie HTTPOnly
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 7 ngày
      });

      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Tạo mới Access Token
    const newAccessToken = generateToken(user._id);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
});

module.exports = {
  register,
  login,
  refreshAccessToken,
};
