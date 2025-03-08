const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  comment: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
});

const ServiceSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: false, min: 1, max: 5, default: 0 },
    images: { type: [String], required: true, trim: true },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
