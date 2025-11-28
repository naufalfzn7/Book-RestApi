const cloudinary = require("../configs/cloudinary");
const asyncHandler = require("../middlewares/asyncHandler");
const uploadToCloudinary = require("../helpers/cloudinary-helper");

const uploadFileToCloudinary = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const result = await uploadToCloudinary(req.file.path);
  res.status(200).json({ message: "File uploaded successfully", data: result });
});

module.exports = { uploadFileToCloudinary };
