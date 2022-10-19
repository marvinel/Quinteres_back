var cloudinary = require("cloudinary").v2;

//var {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} = require('./config');

cloudinary.config({
  cloud_name: "dh8qfzqgr",
  api_key: "358891884293293",
  api_secret: "ERPPAvj6mbDb8YWEG-M25o9NQzI",
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
