const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Người bình luận
    content: { type: String, required: true, trim: true }, // Nội dung bình luận
    rating: { type: Number, required: true, min: 1, max: 5 }, // Đánh giá từ 1 đến 5
    createdAt: { type: Date, default: Date.now }, // Ngày bình luận
  },
  { _id: false }
);

const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true, trim: true },
    roomType: { type: String, required: true, trim: true },
    services: { type: [String], required: true },
    location: { type: String, required: true, trim: true },
    beds: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: ["trống", "hết phòng"] },// thay đổi thành hết phòng để hiển thị trên giao diện
    isActive: { type: Boolean, default: true },
    quantity: { type: Number, required: true, default: 1 }, // Số
    // Số lượng phòng còn lại
    quantityLeft: { type: Number, required: true, default: 0 }, 
    comments: { type: [CommentSchema], default: [] }, // Mảng chứa các bình luận
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
