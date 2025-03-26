const User = require("../models/UserModel")
const Service = require("../models/ServiceModel");


// List all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password") // Loại bỏ password để bảo mật
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { email } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const newUser = new User(req.body)
    await newUser.save()

    res.status(201).json({ message: "User created successfully", newUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    Object.assign(user, req.body)
    await user.save()
    res.status(200).json({ message: "User updated successfully", user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    await user.deleteOne()
    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get user statistics (total, active, distribution)
exports.getUserStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments()

    // Get active users count
    const activeUsers = await User.countDocuments({ isActive: true })

    // Get user distribution by role
    const userDistribution = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ])

    // Calculate percentages for each role
    const distribution = {}
    let totalRoleCounts = 0

    // First get total count to calculate percentages
    userDistribution.forEach((role) => {
      totalRoleCounts += role.count
    })

    // Then calculate percentages
    userDistribution.forEach((role) => {
      distribution[role._id] = Math.round((role.count / totalRoleCounts) * 100)
    })

    // Ensure all roles are represented, even if 0%
    const allRoles = ["USER", "STAFF", "MARKETING", "ADMIN"]
    allRoles.forEach((role) => {
      if (!distribution[role]) {
        distribution[role] = 0
      }
    })

    // Get monthly growth data (for percentage indicators)
    const currentDate = new Date()
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const currentMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth, $lte: currentDate },
    })

    const twoMonthsAgo = new Date()
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)

    const previousMonthUsers = await User.countDocuments({
      createdAt: { $gte: twoMonthsAgo, $lte: lastMonth },
    })

    // Calculate growth percentage
    let growthPercentage = 0
    if (previousMonthUsers > 0) {
      growthPercentage = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100
    }

    res.status(200).json({
      totalUsers,
      activeUsers,
      userDistribution: distribution,
      growth: {
        percentage: Number.parseFloat(growthPercentage.toFixed(1)),
        isPositive: growthPercentage >= 0,
      },
    })
  } catch (error) {
    console.error("Error fetching user statistics:", error)
    res.status(500).json({ message: error.message })
  }
}

// Get recent users
exports.getRecentUsers = async (req, res) => {
  try {
    const limit = Number.parseInt(req.query.limit) || 5

    const recentUsers = await User.find()
      .select("full_name email role isActive createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)

    // Format the data for the frontend
    const formattedUsers = recentUsers.map((user) => ({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      status: user.isActive ? "active" : "inactive",
      created_at: user.createdAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
    }))

    res.status(200).json({ recentUsers: formattedUsers })
  } catch (error) {
    console.error("Error fetching recent users:", error)
    res.status(500).json({ message: error.message })
  }
}

// Get filtered users with pagination
exports.getFilteredUsers = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const role = req.query.role
    const search = req.query.search

    // Build query
    const query = {}

    // Filter by role if provided
    if (role && role !== "ALL") {
      query.role = role
    }

    // Search by name or email if provided
    if (search) {
      query.$or = [{ full_name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    // Get users with pagination
    const users = await User.find(query)
      .select("_id full_name email role isActive createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get total count for pagination
    const total = await User.countDocuments(query)

    res.status(200).json({
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching filtered users:", error)
    res.status(500).json({ message: error.message })
  }
}

// Get users registered this month
exports.getUsersThisMonth = async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of this month

    const usersThisMonth = await User.countDocuments({
      createdAt: { $gte: firstDayOfMonth },
    });

    res.status(200).json({ usersThisMonth });
  } catch (error) {
    console.error("Error fetching users registered this month:", error);
    res.status(500).json({ message: error.message });
  }
};



// Lấy danh sách tất cả dịch vụ
exports.getAllServices = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const services = await Service.find({ title: { $regex: searchQuery, $options: "i" } });
    res.status(200).json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Xóa dịch vụ theo ID
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
