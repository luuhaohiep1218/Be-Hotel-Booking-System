const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["room", "service"], required: true },

    // 🏨 Đặt nhiều phòng
    rooms: [
      {
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: function () {
            return this.type === "room";
          },
        },
        quantity: {
          type: Number,
          min: 1,
          required: function () {
            return this.type === "room";
          },
        },
      },
    ],

    checkIn: {
      type: Date,
      required: function () {
        return this.type === "room";
      },
    },
    checkOut: {
      type: Date,
      required: function () {
        return this.type === "room";
      },
    },

    // 🛎 Chỉ dùng cho đặt dịch vụ
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: function () {
        return this.type === "service";
      },
    },
    serviceQuantity: {
      type: Number,
      min: 1,
      required: function () {
        return this.type === "service";
      },
    },

    // 💰 Thông tin thanh toán
    price: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["counter", "vnpay"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionId: { type: String,unique: true }, // Mã giao dịch VNPay (nếu có)
    discountCode: { type: String }, // Mã giảm giá (nếu có)

    // ✍ Thông tin bổ sung
    notes: { type: String },
    status: {
      type: String,
      enum: ["failed", "pending", "confirmed"],
      default: "pending",
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
