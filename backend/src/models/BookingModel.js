const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["room", "service"], required: true },

    // Chỉ dùng cho đặt phòng
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: function () {
        return this.type === "room";
      },
    },
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

    // Chỉ dùng cho đặt dịch vụ
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: function () {
        return this.type === "service";
      },
    },
    quantity: {
      type: Number,
      min: 1,
      required: function () {
        return this.type === "service";
      },
    },

    // Dùng chung cho cả hai
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
