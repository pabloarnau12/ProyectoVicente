const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const getStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
};

const upload = (folder) => {
  const storage = getStorage(folder);
  return multer({ storage });
};

module.exports = upload;
