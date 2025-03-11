const asyncHandler = require("express-async-handler");
const Room = require("../models/RoomModel");
const aqp = require("api-query-params");

const getListRooms = asyncHandler(async (req, res) => {
  try {
    let { filter, limit, sort, skip, population } = aqp(req.query);

    // Chuyển đổi gt, gte, lt, lte thành $gt, $gte, $lt, $lte để Mongoose hiểu
    if (filter.price && typeof filter.price === "object") {
      const priceConditions = {};
      Object.keys(filter.price).forEach((key) => {
        const newKey = `$${key}`; // Chuyển "gt" thành "$gt"
        priceConditions[newKey] = Number(filter.price[key]);
      });
      filter.price = priceConditions;
    } else if (filter.price) {
      filter.price = Number(filter.price);
    }

    const rooms = await Room.find(filter)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate(population);

    const totalRooms = await Room.countDocuments(filter);

    res.status(200).json({ totalRooms, rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Lỗi hệ thống" });
  }
});

const createRoom = asyncHandler(async (req, res) => {
  try {
    const {
      roomName,
      roomType,
      services,
      location,
      beds,
      description,
      images,
      price,
      status,
    } = req.body;

    // Kiểm tra nếu thiếu thông tin
    if (
      !roomName ||
      !roomType ||
      !services ||
      !location ||
      !beds ||
      !description ||
      !images ||
      !price ||
      !status
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin phòng!" });
    }

    // Kiểm tra nếu phòng đã tồn tại
    const existingRoom = await Room.findOne({ roomName, location });
    if (existingRoom) {
      return res
        .status(400)
        .json({ message: "Phòng này đã tồn tại tại địa điểm này!" });
    }

    // Tạo phòng mới
    const newRoom = new Room({
      roomName,
      roomType,
      services,
      location,
      beds,
      description,
      images,
      price,
      status,
    });

    // Lưu vào database
    await newRoom.save();

    res.status(201).json({
      message: "Tạo phòng thành công!",
      room: newRoom,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi tạo phòng:", error);
    res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại!" });
  }
});

const updateInfoRoom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID phòng từ URL
    const updateData = req.body; // Dữ liệu cập nhật từ client

    // Kiểm tra phòng có tồn tại không
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Không tìm thấy phòng!" });
    }

    // Cập nhật thông tin phòng
    Object.assign(room, updateData);
    const updatedRoom = await room.save();

    res.status(200).json({
      message: "Cập nhật thông tin phòng thành công!",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi cập nhật phòng:", error);
    res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại!" });
  }
});

const deleteRooms = asyncHandler(async (req, res) => {
  try {
    const { roomIds } = req.body; // Nhận danh sách ID phòng cần xóa

    if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp danh sách phòng cần xóa!" });
    }

    // Kiểm tra các phòng có tồn tại không
    const existingRooms = await Room.find({ _id: { $in: roomIds } });

    if (existingRooms.length !== roomIds.length) {
      return res
        .status(404)
        .json({ message: "Một hoặc nhiều phòng không tồn tại!" });
    }

    // Xóa các phòng
    await Room.deleteMany({ _id: { $in: roomIds } });

    res.status(200).json({
      message: `Xóa thành công ${existingRooms.length} phòng!`,
      deletedRooms: existingRooms,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi xóa phòng:", error);
    res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại!" });
  }
});

module.exports = { createRoom, updateInfoRoom, deleteRooms, getListRooms };
