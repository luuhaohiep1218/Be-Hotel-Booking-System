const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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
      password_hash: hashedPassword,
      phone,
    });

    if (user) {
      const accessToken = generateToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
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

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("🔍 Refresh Token từ cookie:", refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: "Không tìm thấy refresh token" });
    }

    const user = await User.findOne({ refreshToken });
    console.log("🔍 User tìm thấy:", user);
    if (!user) {
      return res.status(403).json({ message: "Refresh token không hợp lệ" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ JWT Verify lỗi:", err);
        return res.status(403).json({ message: "Refresh token không hợp lệ" });
      }

      console.log("✅ Token decoded:", decoded);
      if (user._id.toString() !== decoded.id) {
        return res.status(403).json({ message: "Refresh token không hợp lệ" });
      }

      const newAccessToken = generateToken(user._id);
      console.log("✅ Access Token mới:", newAccessToken);
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("❌ Lỗi trong refreshAccessToken:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({ message: "Bạn đã đăng xuất" });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(200).json({ message: "Bạn đã đăng xuất" });
    }

    user.refreshToken = null;
    await user.save(); // Xóa refreshToken khỏi DB

    req.logOut((err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi logout" });
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      return res.json({ message: "Logout thành công" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server khi logout" });
  }
});

const googleAuth = asyncHandler(async (req, res) => {
  try {
    const { email, full_name } = req.user;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        full_name,
        email,
        authProvider: "google",
      });
    }

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.redirect(
      `http://localhost:3000/login-success?token=${accessToken}`
    );
  } catch (error) {
    return res.redirect("http://localhost:3000/login?error=google_auth_failed");
  }
});

const sendEmail = ({ recipient_email, newPassword }) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MAIL_USER,
      to: recipient_email,
      subject: "Password Recovery - KODING 101",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <title>Password Recovery</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #FAFAFA; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
              <h2 style="color: #0070f3; text-align: center;">Password Reset Request</h2>
              <p>Hello,</p>
              <p>You have requested to reset your password. Your new password is:</p>
              <h3 style="text-align: center; background: #f3f3f3; padding: 10px; border-radius: 5px;">${newPassword}</h3>
              <p>Please change your password after logging in for security reasons.</p>
              <p>If you did not request this change, please ignore this email or contact support.</p>
              <p style="text-align: center;"><a href="http://localhost:3000" style="color: #0070f3;">Go to Login</a></p>
              <hr />
              <p style="font-size: 12px; color: #555;">This is an automated email, please do not reply.</p>
          </div>
      </body>
      </html>`,
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        console.error(error);
        return reject({ message: "An error occurred while sending email." });
      }
      return resolve({ message: "Email sent successfully." });
    });
  });
};

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    const newPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password_hash = hashedPassword;

    const updatedUser = await user.save();
    if (!updatedUser) {
      return res.status(500).json({ message: "Lỗi khi cập nhật mật khẩu!" });
    }

    await sendEmail({ recipient_email: email, newPassword });

    res.json({ message: "Mật khẩu mới đã được gửi qua email." });
  } catch (error) {
    console.error("🔥 Lỗi khi xử lý quên mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại!" });
  }
});

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  googleAuth,
  forgotPassword,
};
