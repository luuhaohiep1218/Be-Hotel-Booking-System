const asyncHandler = require("express-async-handler");
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");

const Room = require("../models/RoomModel");
const bookService = asyncHandler(async (req, res) => {
  try {
    const { userId, serviceId, serviceQuantity, paymentMethod } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !serviceId || !serviceQuantity || !paymentMethod) {
      return res.status(400).json({ message: "Thiếu thông tin đặt dịch vụ" });
    }

    if (serviceQuantity < 1) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    // Tìm dịch vụ theo ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại" });
    }

    // Tính tổng tiền
    const totalPrice = service.price * serviceQuantity;

    // Tạo booking
    const booking = new Booking({
      userId,
      type: "service",
      serviceId,
      serviceQuantity,
      price: totalPrice,
      paymentMethod,
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

const bookRoom = asyncHandler(async (req, res) => {
  try {
    console.log("🟢 Gọi API bookRoom");
    const { userId, rooms, checkIn, checkOut, paymentMethod, transactionId } = req.body;

    if (
      !userId ||
      !rooms ||
      rooms.length === 0 ||
      !checkIn ||
      !checkOut ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Thiếu thông tin đặt phòng" });
    }

    // 🔍 Kiểm tra nếu giao dịch đã tồn tại để tránh thanh toán 2 lần
    if (transactionId) {
      const existingBooking = await Booking.findOne({ transactionId });
      if (existingBooking) {
        return res.status(400).json({ message: "Giao dịch đã được xử lý!" });
      }
    }

    let totalPrice = 0;
    const roomDetails = [];

    for (const { roomId, quantity } of rooms) {
      if (!roomId || quantity < 1) {
        return res.status(400).json({ message: "Dữ liệu phòng không hợp lệ" });
      }

      const room = await Room.findById(roomId);
      if (!room) {
        return res
          .status(404)
          .json({ message: `Phòng ${roomId} không tồn tại` });
      }

      totalPrice += room.price * quantity;
      roomDetails.push({ roomId, quantity });
    }

    // Xử lý trạng thái thanh toán
    let paymentStatus = "pending";
    if (paymentMethod === "vnpay") {
      paymentStatus = "paid"; // ✅ Chỉ cập nhật nếu VNPay xác nhận
    }
    // 🛑 Chặn đặt phòng trùng nếu user đã đặt cùng thời gian
    const duplicateBooking = await Booking.findOne({ userId, checkIn, checkOut, rooms: roomDetails });
    if (duplicateBooking) {
      return res.status(400).json({ message: "Bạn đã đặt phòng này trước đó!" });
    }

    // ✅ Lưu đơn đặt phòng
    const booking = new Booking({
      userId,
      type: "room",
      rooms: roomDetails,
      checkIn,
      checkOut,
      price: totalPrice, // Luôn lấy từ server
      paymentMethod,
      paymentStatus,
      status: "confirmed",
      transactionId, // ✅ Lưu transactionId để tránh trùng
    });

    await booking.save();
    console.log("✅ Booking đã lưu:", booking);

    res.status(201).json({
      message: "Đặt phòng thành công",
      booking,
    });
  } catch (error) {
    console.error("🚨 Lỗi khi đặt phòng:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

    // Xử lý trạng thái ban đầu dựa trên phương thức thanh toán
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
      booking.status = "confirmed"; // Cập nhật đơn hàng thành công
    } else {
      booking.paymentStatus = "failed";
      booking.status = "canceled"; // Hủy đơn nếu thanh toán thất bại
    }

    booking.transactionId = transactionId;
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


module.exports = {
  bookService,
  bookRoom,
  handleVnPayReturn,
  getServiceBookings,
};