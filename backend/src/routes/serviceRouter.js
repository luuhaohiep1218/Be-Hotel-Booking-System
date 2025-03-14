const express = require("express");
const {
  protect,
  adminMiddleware,
  staffMiddleware,
} = require("../middlewares/Auth");

const {
  createService,
  addReview,
  updateReview,
  deleteReview,
  updateService,
  deleteService,
  getListServices,
  getServiceDetail,
  getUniqueCategories,
  getTopRatedService,
} = require("../controllers/ServiceController");

const router = express.Router();

router.get("/", getListServices);
router.get("/top-rated", getTopRatedService); //mkt
router.get("/categories", getUniqueCategories);
router.get("/:serviceId", getServiceDetail);

router.post("/", protect, staffMiddleware, createService);
router.put("/:serviceId", protect, staffMiddleware, updateService);
router.delete("/:serviceId", protect, staffMiddleware, deleteService);

router.post("/:serviceId/reviews", protect, staffMiddleware, addReview);
router.put(
  "/:serviceId/reviews/:reviewId",
  protect,
  staffMiddleware,
  updateReview
);
router.delete(
  "/:serviceId/reviews/:reviewId",
  protect,
  staffMiddleware,
  deleteReview
);

module.exports = router;
