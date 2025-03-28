const express = require("express");
const {
  protect,
  staffMiddleware,
  roleMiddleware
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
router.delete("/", protect, roleMiddleware("STAFF", "ADMIN"), deleteRooms);
router.get("/:roomId", getRoomDetailsById);
router.post("/:roomId/review", addReviewAndUpdateRating);
module.exports = router;