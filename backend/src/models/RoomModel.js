const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true, trim: true }, // Nội dung bình luận
    rating: { type: Number, required: true, min: 1, max: 5 }, // Đánh giá
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    
    services: { type: [String], required: true },
    location: { type: String, required: true },
    beds: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: ["trống", "hết phòng"] },
    active: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    quantityLeft: { type: Number, required: true },

    comments: {
      rating: { type: Number, required: true, default: 0 },
      total: { type: Number, required: true, default: 0 },
      reviews: { type: [CommentSchema], default: [] },
    },

    starRatings: {
      type: [Number],
      default: [0, 0, 0, 0, 0], // Mảng chứa số lượng đánh giá cho mỗi sao
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
