const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")                // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w.-]+/g, "");           // Loại bỏ ký tự đặc biệt
    cb(null, uniqueSuffix + "-" + sanitizedFilename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

module.exports = upload;
