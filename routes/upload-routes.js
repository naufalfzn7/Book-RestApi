const { uploadFileToCloudinary } = require("../controllers/file-controller");
const upload = require("../middlewares/uploadMiddleware");

const express = require("express");

const router = express.Router();

router.post("/", upload.single("image"), uploadFileToCloudinary);

module.exports = router;
