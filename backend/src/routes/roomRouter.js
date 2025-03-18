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
  getRoomDetailsById
} = require("../controllers/RoomController");

const router = express.Router();

router.get("/", getListRooms);
router.post("/", protect, staffMiddleware, createRoom);
router.put("/:id", protect, staffMiddleware, updateInfoRoom);
router.delete("/", protect, adminMiddleware, deleteRooms);
router.post("/room-detail ")
module.exports = router;
