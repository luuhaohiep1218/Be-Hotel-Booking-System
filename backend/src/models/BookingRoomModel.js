const mongoose = require("mongoose");

const BookingRoomSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true, trim: true }, // Mã đặt phòng duy nhất
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Liên kết với User
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    }, // Liên kết với Room
    checkInDate: { type: Date, required: true }, // Ngày nhận phòng
    checkOutDate: { type: Date, required: true }, // Ngày trả phòng
    totalPrice: { type: Number, required: true }, // Tổng tiền
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"], // Trạng thái thanh toán
      default: "Pending",
    },
  },
  { timestamps: true }
);

const BookingRoom = mongoose.model("BookingRoom", BookingRoomSchema);
module.exports = BookingRoom;
