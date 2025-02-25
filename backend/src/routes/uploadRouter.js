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

// Cấu hình multer để lưu ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API Upload
router.post("/", protect, (req, res) => {
  const uploadHandler = upload.array("files", 5); // Tối đa 5 ảnh

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

    // ✅ Trả về URL đầy đủ của ảnh
    const fileUrls = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    res.json({ message: "Upload thành công!", imageUrls: fileUrls });
  });
});
router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  // Kiểm tra xem file có tồn tại không
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Ảnh không tồn tại" });
  }
});

module.exports = router;
