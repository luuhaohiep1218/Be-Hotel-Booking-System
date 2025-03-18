const express = require("express");
const { protect, adminMiddleware } = require("../middlewares/Auth");
const {
    listUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/users", protect, adminMiddleware, listUsers);

// Manage user accounts (create, delete, modify)
router.post("/users", protect, adminMiddleware, createUser);
router.put("/users/:id", protect, adminMiddleware, updateUser);
router.delete("/users/:id", protect, adminMiddleware, deleteUser);

module.exports = router;
