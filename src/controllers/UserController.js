const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../middlewares/Auth");

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = name || user.name;
      user.phone = phone || user.phone;
      const updateUser = await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isAdmin) {
    res.status(403); // 403 Forbidden for restricted action
    throw new Error("Can't delete admin user");
  }

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (bcrypt.compare(oldPassword, user.password) && user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Change password successful" });
    } else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getFollowMovies = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("followMovies");
    if (user) {
      res.json(user.followMovies);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const followMovies = asyncHandler(async (req, res) => {
  const { movieId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const isMovieFollow = user.followMovies.some(
        (movie) => movie.toString() === movieId
      );

      if (isMovieFollow) {
        // Remove movieId from followMovies array
        user.followMovies = user.followMovies.filter(
          (movie) => movie.toString() !== movieId
        );
      } else {
        // Add movieId to followMovies array
        user.followMovies.push(movieId);
      }

      await user.save();

      res.status(200).json({
        message: isMovieFollow ? "Movie unfollowed" : "Movie followed",
        followMovies: user.followMovies,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  updateUserProfile,
  deleteUser,
  changePassword,
  getFollowMovies,
  followMovies,
  getUsers,
};
