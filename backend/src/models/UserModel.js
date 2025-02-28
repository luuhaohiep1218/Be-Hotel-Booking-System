const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    full_name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    phone: {
      type: String,
      validate(value) {
        if (!/^\d{10}$/.test(value)) {
          throw new Error("Phone number must be exactly 10 digits");
        }
      },
    },
    password_hash: {
      type: String,
      trim: true,
      require: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    role: { type: String, default: "USER" },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
