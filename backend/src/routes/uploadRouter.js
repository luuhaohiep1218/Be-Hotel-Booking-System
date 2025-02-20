const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { protect, adminMiddleware } = require("../middlewares/Auth");

const router = express.Router();

// Đảm bảo thư mục "uploads" tồn tại
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API hỗ trợ cả single & multiple file upload
router.post("/", protect, (req, res, next) => {
  const uploadHandler = upload.array("files", 3); // Cho phép tối đa 5 file

  uploadHandler(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Lỗi Multer!", error: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi server!", error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Không có file nào được upload" });
    }

    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ message: "Upload thành công!", files: filePaths });
  });
});

module.exports = router;
