const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Invalid file type. Only image files are allowed.", false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: { fileSize: 1024 * 1024 * 10 },
}); //10MB

module.exports = upload;
