const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "The title already exists"],
      trim: true,
      maxLength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxLength: [200, "Author: Firstname Lastname exceed 200 characters"],
    },
    year: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be after 1000"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
