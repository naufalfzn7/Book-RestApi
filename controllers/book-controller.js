const Book = require("../models/Book");

const asyncHandler = require("../middlewares/asyncHandler");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  if (books.length === 0) {
    const error = new Error("No books found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    count: books.length,
    data: books,
  });
});

const getSingleBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

const addNewBook = asyncHandler(async (req, res) => {
  const newBook = req.body;

  if (!newBook) {
    const error = new Error("Book data is required");
    error.statusCode = 400;
    throw error;
  }

  if (!newBook.title || !newBook.author || !newBook.year) {
    const error = new Error("Title, author, and year fields are required");
    error.statusCode = 400;
    throw error;
  }

  const newBookInstance = new Book(newBook);
  const createdBook = await newBookInstance.save();

  if (!createdBook) {
    const error = new Error("Failed to create the book");
    error.statusCode = 500;
    throw error;
  }

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: createdBook,
  });
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedData = req.body;

  if (!updatedData) {
    const error = new Error("Updated data is required");
    error.statusCode = 400;
    throw error;
  }

  if (!updatedData.title && !updatedData.author && !updatedData.year) {
    const error = new Error(
      "At least one field (title, author, or year) must be provided for update"
    );
    error.statusCode = 400;
    throw error;
  }

  const checkBook = await Book.findById(id);

  if (updatedData.title && checkBook.title !== updatedData.title) {
    const existingBook = await Book.findOne({ title: updatedData.title });
    if (existingBook) {
      const error = new Error("The title already exists");
      error.statusCode = 400;
      throw error;
    }
  }

  const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!updatedBook) {
    const error = new Error("Book not found or failed to update");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook) {
    const error = new Error("Book not found or failed to delete");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: deletedBook,
  });
});

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
