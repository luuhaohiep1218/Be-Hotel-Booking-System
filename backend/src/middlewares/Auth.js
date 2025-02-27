const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
};

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("🔍 Decoded Token:", decoded);

    if (!decoded || (!decoded.id && !decoded._id)) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    req.user = await User.findById(decoded.id || decoded._id)
      .select("-password")
      .exec();

    if (!req.user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token đã hết hạn, vui lòng đăng nhập lại" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    console.error("🔥 Lỗi bảo vệ route:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
});

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next(); // User is admin, proceed to the next middleware
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = {
  generateToken,
  protect,
  adminMiddleware,
  generateRefreshToken,
};
