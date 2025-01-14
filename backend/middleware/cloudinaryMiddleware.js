const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Archivo de configuración

// Crear una función para asignar la carpeta dependiendo del tipo de imagen
const getStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder, // Aquí le pasamos la carpeta dinámica
      allowed_formats: ['jpg', 'png', 'jpeg'], // Extensiones permitidas
    },
  });
};

// Middleware de carga que acepta el nombre de la carpeta dinámicamente
const upload = (folder) => {
  const storage = getStorage(folder);
  return multer({ storage });
};

module.exports = upload;
