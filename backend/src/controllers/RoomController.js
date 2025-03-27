const asyncHandler = require("express-async-handler");
const Room = require("../models/RoomModel");
const aqp = require("api-query-params");
const { default: mongoose } = require("mongoose");

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
    const { _id } = req.params;
    const updateData = req.body;

    console.log("Dữ liệu nhận được:", JSON.stringify(updateData, null, 2));

    // Kiểm tra phòng có tồn tại không
    const room = await Room.findById(_id);
    if (!room) {
      return res.status(404).json({ message: "Không tìm thấy phòng!" });
    }

    // Nếu có cập nhật roomNumber
    if (updateData.roomNumber && Array.isArray(updateData.roomNumber)) {
      // Tạo một bản đồ để dễ dàng truy cập các roomNumber hiện tại
      const currentRoomMap = new Map();
      room.roomNumber.forEach(rn => {
        currentRoomMap.set(rn.roomNumber.toString(), rn);
      });

      // Tạo mảng roomNumber mới
      const newRoomNumbers = updateData.roomNumber.map(roomNumUpdate => {
        const existingRoom = currentRoomMap.get(roomNumUpdate.roomNumber.toString());
        
        if (existingRoom) {
          // Cập nhật roomNumber đã tồn tại
          return {
            roomNumber: roomNumUpdate.roomNumber,
            status: roomNumUpdate.status || existingRoom.status,
            isActivated: roomNumUpdate.isActivated !== undefined 
              ? roomNumUpdate.isActivated 
              : existingRoom.isActivated
          };
        } else {
          // Thêm roomNumber mới
          return {
            roomNumber: roomNumUpdate.roomNumber,
            status: roomNumUpdate.status || "trống",
            isActivated: roomNumUpdate.isActivated !== false
          };
        }
      });

      // Cập nhật lại trường roomNumber
      updateData.roomNumber = newRoomNumbers;
      
      // Tính toán lại quantity và quantityLeft
      updateData.quantity = newRoomNumbers.length;
      updateData.quantityLeft = newRoomNumbers.filter(
        rn => rn.status === "trống" && rn.isActivated
      ).length;
    }

    // Sử dụng findOneAndUpdate thay vì findByIdAndUpdate để đảm bảo cập nhật chính xác
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: _id },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    );

    console.log("Dữ liệu sau khi cập nhật:", updatedRoom);

    res.status(200).json({
      message: "Cập nhật thông tin phòng thành công!",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi cập nhật phòng:", {
      message: error.message,
      stack: error.stack,
      details: error
    });
    res.status(500).json({ 
      message: "Lỗi hệ thống, vui lòng thử lại!",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
// lấy thông tin chi tiết của các phòng 
const getRoomDetailsById = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log("Received roomId:", roomId);  // Log the roomId

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid room ID format!" });
    }

    const room = await Room.findById(roomId);
    console.log("Room found:", room);  // Log the result from the database

    if (!room) {
      return res.status(404).json({ message: "Phòng không tồn tại!" });
    }

    res.status(200).json({
      message: "Lấy thông tin phòng thành công!",
      room,
    });
  } catch (error) {
    console.error("🔥 Lỗi khi lấy thông tin phòng:", error);
    res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại!" });
  }
});

const addReviewAndUpdateRating = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;
    const { comment, rating, userId } = req.body; // Lấy comment, rating và userId từ request body

    // Kiểm tra dữ liệu đầu vào
    if (!comment || !rating || !userId) {
      return res.status(400).json({ message: "Vui lòng nhập bình luận, đánh giá và userId!" });
    }

    // Tìm phòng theo roomId
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Phòng không tồn tại!" });
    }

    // Thêm review vào mảng reviews của phòng
    room.comments.reviews.push({ content: comment, rating, userId });

    // Tính lại tổng số bình luận và tổng điểm rating
    const totalComments = room.comments.reviews.length;
    const totalRatings = room.comments.reviews.reduce((sum, review) => sum + review.rating, 0);

    // Tính lại điểm trung bình (averageRating)
    const averageRating = totalRatings / totalComments;

    // Cập nhật lại rating và tổng bình luận
    room.comments.rating = averageRating.toFixed(2); // Làm tròn đến 2 chữ số thập phân
    room.comments.total = totalComments;

    // Cập nhật starRatings array cho mỗi rating
    room.starRatings[rating - 1] += 1; // Tăng số lượng đánh giá cho rating tương ứng (1 sao, 2 sao, ..., 5 sao)

    // Lưu lại phòng với review mới và các giá trị đã cập nhật
    await room.save();

    // Trả về thông tin phòng đã cập nhật
    res.status(200).json({
      message: "Cập nhật bình luận và đánh giá thành công!",
      averageRating: room.comments.rating, // Điểm trung bình
      starRatings: room.starRatings,       // Số lượng đánh giá cho từng sao
      totalComments: room.comments.total,  // Tổng số bình luận
    });
  } catch (error) {
    console.error("Error when adding review and updating rating:", error);
    res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại!" });
  }
});




module.exports = { createRoom, updateInfoRoom, deleteRooms, getListRooms, getRoomDetailsById, addReviewAndUpdateRating};
