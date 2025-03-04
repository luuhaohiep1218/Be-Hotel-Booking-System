const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  image: { type: String, required: false },
});

const BlogSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    sections: [SectionSchema],
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    validUntil: { type: String, required: false },
    customerName: { type: String, required: false, trim: true },
    rating: { type: Number, required: false, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
