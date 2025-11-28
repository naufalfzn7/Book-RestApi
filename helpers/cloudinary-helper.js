const cloudinary = require("../configs/cloudinary");

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);

    return {
      url: result.secure_url,
      id: result.public_id,
    };
  } catch (error) {
    console.log(error);
    throw new Error("FAILED TO UPLOAD TO CLOUDINARY");
  }
};

module.exports = uploadToCloudinary;
