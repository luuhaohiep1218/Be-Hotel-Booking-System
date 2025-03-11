const asyncHandler = require("express-async-handler");
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");
const Room = require("../models/RoomModel");
const bookService = asyncHandler(async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;

    if (!userId || !serviceId || !quantity) {
      return res.status(400).json({ message: "Thiếu thông tin đặt dịch vụ" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại" });
    }

    const totalPrice = service.price * quantity;

    const booking = new Booking({
      userId,
      type: "service",
      serviceId,
      quantity,
      price: totalPrice,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({
      message: "Đặt dịch vụ thành công",
      booking,
    });
  } catch (error) {
    console.error("Lỗi khi đặt dịch vụ:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const getServiceBookings = asyncHandler(async (req, res) => {
  try {
    // Parse query bằng aqp, loại bỏ page và limit khỏi filter
    const { filter, sort, population } = aqp(req.query, {
      whitelist: [
        "userId",
        "serviceId",
        "status",
        "price",
        "quantity",
        "createdAt",
      ],
    });

    // Chỉ lấy những booking có type là "service"
    filter.type = "service";

    // Lấy limit & page từ query params
    const limit = parseInt(req.query.limit) || 10; // Mặc định 10 booking mỗi trang
    const page = parseInt(req.query.page) || 1; // Mặc định trang 1
    const skip = (page - 1) * limit;

    // Truy vấn danh sách booking dịch vụ có phân trang
    const totalBookings = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .sort(sort)
      .populate(population)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: page,
      limit,
      bookings,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách booking dịch vụ:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

 // 📌 API đặt phòng (book room)
const bookRoom = asyncHandler(async (req, res) => {
  try {
    const { userId, rooms, checkIn, checkOut, paymentMethod } = req.body;

    if (!userId || !rooms || rooms.length === 0 || !checkIn || !checkOut || !paymentMethod) {
      return res.status(400).json({ message: "Thiếu thông tin đặt phòng" });
    }

    let totalPrice = 0;
    const roomDetails = [];

    for (const { roomId, quantity } of rooms) {
      if (!roomId || quantity < 1) {
        return res.status(400).json({ message: "Dữ liệu phòng không hợp lệ" });
      }

      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: `Phòng ${roomId} không tồn tại` });
      }

      totalPrice += room.price * quantity;
      roomDetails.push({ roomId, quantity });
    }

    const booking = new Booking({
      userId,
      type: "room",
      rooms: roomDetails,
      checkIn,
      checkOut,
      price: totalPrice,
      paymentMethod,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({
      message: "Đặt phòng thành công",
      booking,
    });
  } catch (error) {
    console.error("Lỗi khi đặt phòng:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});
// 📌 Xử lý kết quả thanh toán từ VNPay
const handleVnPayReturn = asyncHandler(async (req, res) => {
  try {
    const vnpParams = req.query;

    console.log("VNPay Response:", vnpParams);

    const orderId = vnpParams.vnp_TxnRef;
    const transactionStatus = vnpParams.vnp_ResponseCode;
    const transactionId = vnpParams.vnp_TransactionNo;

    const booking = await Booking.findById(orderId);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (transactionStatus === "00") {
      booking.paymentStatus = "paid";
      booking.transactionId = transactionId;
      booking.status = "confirmed";
    } else {
      booking.paymentStatus = "failed";
      booking.status = "canceled";
    }

    await booking.save();

    res.status(200).json({
      message: "Cập nhật trạng thái thanh toán thành công",
      booking,
    });
  } catch (error) {
    console.error("Lỗi xử lý thanh toán VNPay:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

module.exports = { bookService,bookRoom, handleVnPayReturn, getServiceBookings };
