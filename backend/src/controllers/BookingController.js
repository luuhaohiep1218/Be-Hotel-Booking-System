const asyncHandler = require("express-async-handler");
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");

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

module.exports = { bookService, getServiceBookings };
