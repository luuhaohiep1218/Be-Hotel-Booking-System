const express = require("express");
const {
  protect,
  staffMiddleware,
  adminMiddleware,
} = require("../middlewares/Auth");
const {
  createRoom,
  updateInfoRoom,
  deleteRooms,
  getListRooms,
  getRoomDetailsById,
  addReviewAndUpdateRating,
} = require("../controllers/RoomController");

const router = express.Router();

router.get("/", getListRooms);
router.post("/", protect, staffMiddleware, createRoom);
router.put("/:_id", protect, staffMiddleware, updateInfoRoom);
router.delete("/", protect, adminMiddleware, deleteRooms);
router.get("/:roomId", getRoomDetailsById);
router.post("/:roomId/review", addReviewAndUpdateRating);
module.exports = router;
