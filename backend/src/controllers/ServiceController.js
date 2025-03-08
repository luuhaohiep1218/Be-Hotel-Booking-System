const asyncHandler = require("express-async-handler");
const Service = require("../models/ServiceModel");
const aqp = require("api-query-params");

const createService = asyncHandler(async (req, res) => {
  try {
    const { category, title, summary, description, price, images, reviews } =
      req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!category || !title || !summary || !description || !price || !images) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // Đảm bảo images là mảng hợp lệ
    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ message: "Hình ảnh phải là một mảng hợp lệ!" });
    }

    // Tính rating trung bình nếu có reviews
    let avgRating = 0;
    if (reviews && reviews.length > 0) {
      avgRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
    }

    // Tạo dịch vụ mới
    const newService = new Service({
      category,
      title,
      summary,
      description,
      price,
      images,
      reviews: reviews || [],
      rating: avgRating.toFixed(1), // Giữ 1 số thập phân
    });

    // Lưu vào database
    const savedService = await newService.save();
    res
      .status(201)
      .json({ message: "Dịch vụ đã được tạo!", service: savedService });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const addReview = asyncHandler(async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { customerName, comment, rating } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!customerName || !comment || !rating) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin đánh giá!" });
    }

    // Kiểm tra rating hợp lệ
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating phải từ 1 đến 5!" });
    }

    // Tìm dịch vụ cần thêm đánh giá
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
    }

    // Thêm đánh giá mới vào danh sách
    const newReview = { customerName, comment, rating };
    service.reviews.push(newReview);

    // Tính lại rating trung bình
    const totalRating = service.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    service.rating = (totalRating / service.reviews.length).toFixed(1);

    // Lưu cập nhật vào database
    await service.save();

    res.status(201).json({ message: "Đánh giá đã được thêm!", service });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});
const updateReview = asyncHandler(async (req, res) => {
  try {
    const { serviceId, reviewId } = req.params;
    const { customerName, comment, rating } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!customerName || !comment || !rating) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin đánh giá!" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating phải từ 1 đến 5!" });
    }

    // Tìm dịch vụ có review cần sửa
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
    }

    // Tìm review cần sửa
    const reviewIndex = service.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Đánh giá không tồn tại!" });
    }

    // Cập nhật nội dung review
    service.reviews[reviewIndex] = {
      _id: reviewId,
      customerName,
      comment,
      rating,
      date: new Date(), // Cập nhật ngày sửa
    };

    // Tính lại rating trung bình
    const totalRating = service.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    service.rating = (totalRating / service.reviews.length).toFixed(1);

    // Lưu cập nhật vào database
    await service.save();

    res.status(200).json({ message: "Đánh giá đã được cập nhật!", service });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { serviceId, reviewId } = req.params;

    // Tìm dịch vụ có review cần xóa
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
    }

    // Tìm review cần xóa
    const reviewIndex = service.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Đánh giá không tồn tại!" });
    }

    // Xóa review khỏi danh sách
    service.reviews.splice(reviewIndex, 1);

    // Tính lại rating trung bình sau khi xóa
    if (service.reviews.length > 0) {
      const totalRating = service.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      service.rating = (totalRating / service.reviews.length).toFixed(1);
    } else {
      service.rating = 0; // Nếu không còn review nào, rating về 0
    }

    // Lưu cập nhật vào database
    await service.save();

    res.status(200).json({ message: "Đánh giá đã được xóa!", service });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const updateService = asyncHandler(async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { category, title, summary, description, price, images } = req.body;

    // Tìm dịch vụ cần cập nhật
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
    }

    // Cập nhật chỉ những trường không liên quan đến rating và reviews
    service.category = category || service.category;
    service.title = title || service.title;
    service.summary = summary || service.summary;
    service.description = description || service.description;
    service.price = price || service.price;
    service.images = images || service.images;

    // Lưu thay đổi vào database
    await service.save();

    res.status(200).json({ message: "Dịch vụ đã được cập nhật!", service });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const deleteService = asyncHandler(async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Tìm dịch vụ cần xóa
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
    }

    // Xóa dịch vụ
    await service.deleteOne();

    res.status(200).json({ message: "Dịch vụ đã được xóa thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const getServiceDetail = asyncHandler(async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Tìm dịch vụ theo ID
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Dịch vụ không tồn tại!" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

const getListServices = asyncHandler(async (req, res) => {
  try {
    // Lấy page và limit trước để tránh bị đưa vào filter
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    // Parse query bằng aqp, loại bỏ page và limit khỏi filter
    const { filter, sort, population } = aqp(req.query, {
      whitelist: ["price", "rating", "category", "title"],
    });

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

    if (filter.rating && typeof filter.rating === "object") {
      const ratingConditions = {};
      Object.keys(filter.rating).forEach((key) => {
        const newKey = `$${key}`; // Chuyển "gt" thành "$gt"
        ratingConditions[newKey] = Number(filter.rating[key]);
      });
      filter.rating = ratingConditions;
    } else if (filter.rating) {
      filter.rating = Number(filter.rating);
    }

    const skip = (page - 1) * limit;

    // Truy vấn danh sách dịch vụ
    const services = await Service.find(filter)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate(population);

    // Đếm tổng số dịch vụ phù hợp
    const totalServices = await Service.countDocuments(filter);
    const totalPages = Math.ceil(totalServices / limit);

    res.status(200).json({
      totalServices,
      totalPages,
      currentPage: page,
      services,
    });
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
});

module.exports = {
  createService,
  addReview,
  updateReview,
  deleteReview,
  updateService,
  deleteService,
  getServiceDetail,
  getListServices,
};
