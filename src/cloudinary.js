var cloudinary = require("cloudinary").v2;

var {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} = require('./config');

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET ,
  secure: true,
});

module.exports = {
  uploadImage: async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
      folder: "Quinterest",
    });
  },
  deleteImage: async function deleteImage(public_id) {
    return await cloudinary.uploader.destroy(public_id);
  },
};
