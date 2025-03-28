const asyncHandler = require("express-async-handler");
const Room = require("../models/RoomModel");
const aqp = require("api-query-params");
const { default: mongoose } = require("mongoose");

const getListRooms = asyncHandler(async (req, res) => {
  try {
    let { filter, limit, sort, skip, population } = aqp(req.query, {
      // Cấu hình thêm cho aqp để xử lý tốt hơn
      casters: {
        string: (val) => {
          if (val === 'true') return true;
          if (val === 'false') return false;
          return val;
        }
      },
      castParams: {
        $text: 'string',
        name: 'string',
        type: 'string',
        location: 'string',
        status: 'string'
      }
    });

    // Xử lý tìm kiếm text tổng quát
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Xử lý tìm kiếm theo tên riêng (nếu có)
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: 'i' }; // Không phân biệt hoa thường
    }

    // Xử lý tìm kiếm theo loại phòng
    if (req.query.type) {
      filter.type = { $regex: req.query.type, $options: 'i' };
    }

    // Xử lý tìm kiếm theo vị trí
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    // Xử lý tìm kiếm theo trạng thái
    if (req.query.status) {
      filter.status = req.query.status === 'trống' ? 'trống' : 'hết phòng';
    }

    // Xử lý filter price như cũ
    if (filter.price && typeof filter.price === "object") {
      const priceConditions = {};
      Object.keys(filter.price).forEach((key) => {
        const newKey = `$${key}`;
        priceConditions[newKey] = Number(filter.price[key]);
      });
      filter.price = priceConditions;
    } else if (filter.price) {
      filter.price = Number(filter.price);
    }

    // Thêm index cho các trường thường được tìm kiếm
    await Room.collection.createIndex({ name: 1 });
    await Room.collection.createIndex({ type: 1 });
    await Room.collection.createIndex({ location: 1 });

    const rooms = await Room.find(filter)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate(population);

    const totalRooms = await Room.countDocuments(filter);

    res.status(200).json({ 
      success: true,
      totalRooms, 
      rooms,
      filters: filter // Trả về thông tin filter để debug
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", {
      error: error.message,
      stack: error.stack,
      query: req.query
    });
    res.status(500).json({ 
      success: false,
      message: error.message || "Lỗi hệ thống",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const createRoom = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      type,
      services,
      location,
      beds,
      description,
      images,
      price,
      roomNumber = [] // Mặc định là mảng rỗng nếu không có
    } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    const requiredFields = {
      name: 'Tên phòng',
      type: 'Loại phòng',
      services: 'Dịch vụ',
      location: 'Vị trí',
      beds: 'Số giường',
      description: 'Mô tả',
      images: 'Hình ảnh',
      price: 'Giá phòng'
    };
    
    const missingFields = Object.keys(requiredFields).filter(
      field => !req.body[field]
    );
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(f => requiredFields[f]);
      return res.status(400).json({
        message: `Thiếu thông tin bắt buộc: ${missingFieldNames.join(', ')}`
      });
    }

    // Validate roomNumber
    if (!Array.isArray(roomNumber)) {
      return res.status(400).json({
        message: "roomNumber phải là mảng"
      });
    }

    // Validate từng phòng trong roomNumber
    for (const rn of roomNumber) {
      if (!rn.roomNumber || typeof rn.roomNumber !== 'number') {
        return res.status(400).json({
          message: `Số phòng ${rn.roomNumber} không hợp lệ`
        });
      }
    }

    // Kiểm tra phòng trùng tên và vị trí
    const existingRoom = await Room.findOne({ name, location });
    if (existingRoom) {
      return res.status(400).json({
        message: "Phòng này đã tồn tại tại địa điểm này!"
      });
    }

    // Tính toán quantity và quantityLeft
    const quantity = roomNumber.length;
    const quantityLeft = roomNumber.filter(
      rn => rn.status === "trống" && rn.isActivated !== false
    ).length;

    // Tạo phòng mới với giá trị mặc định
    const newRoom = new Room({
      name,
      type,
      services,
      location,
      beds,
      description,
      images,
      price,
      roomNumber,
      quantity,
      quantityLeft,
      // Các giá trị mặc định theo Schema
      status: "trống",
      active: true,
      comments: {
        rating: 0,
        total: 0,
        reviews: []
      },
      starRatings: [0, 0, 0, 0, 0]
    });

    // Lưu vào database
    const savedRoom = await newRoom.save();

    res.status(201).json({
      message: "Tạo phòng thành công!",
      room: savedRoom
    });

  } catch (error) {
    console.error("🔥 Lỗi khi tạo phòng:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    res.status(500).json({
      message: "Lỗi hệ thống khi tạo phòng",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
    const { roomIds } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0) {
      return res.status(400).json({
        message: "Vui lòng cung cấp danh sách ID phòng cần xóa!"
      });
    }

    // Validate từng ID
    const invalidIds = roomIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        message: `Các ID sau không hợp lệ: ${invalidIds.join(', ')}`
      });
    }

    // Kiểm tra các phòng có tồn tại không
    const existingRooms = await Room.find({ _id: { $in: roomIds } });
    const foundIds = existingRooms.map(room => room._id.toString());
    const notFoundIds = roomIds.filter(id => !foundIds.includes(id));

    if (notFoundIds.length > 0) {
      return res.status(404).json({
        message: `Không tìm thấy phòng với các ID: ${notFoundIds.join(', ')}`,
        existingRooms: foundIds
      });
    }

    // Thực hiện xóa
    const deleteResult = await Room.deleteMany({ 
      _id: { $in: roomIds } 
    });

    // Kiểm tra kết quả xóa
    if (deleteResult.deletedCount === 0) {
      return res.status(500).json({
        message: "Không có phòng nào được xóa dù đã tìm thấy phòng"
      });
    }

    res.status(200).json({
      message: `Xóa thành công ${deleteResult.deletedCount} phòng!`,
      deletedCount: deleteResult.deletedCount,
      deletedRooms: existingRooms.map(room => room._id)
    });

  } catch (error) {
    console.error("🔥 Lỗi khi xóa phòng:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    res.status(500).json({
      message: "Lỗi hệ thống khi xóa phòng",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
