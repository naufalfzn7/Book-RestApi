const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((e) => {
      const statusCode = e.statusCode || 500;
      res.status(statusCode).json({
        success: false,
        message: e.message || "Internal Server Error",
      });
    });
  };
};

module.exports = asyncHandler; // Logic to get all books
