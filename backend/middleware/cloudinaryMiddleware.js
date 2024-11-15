const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Archivo de configuración

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Extensiones permitidas
  },
});

const upload = multer({ storage });

// Añadir un log aquí para asegurar que req.file está siendo procesado por multer
upload.single('image'); // Asegúrate de que 'image' sea el nombre del campo en tu formulario de subida

module.exports = upload;
