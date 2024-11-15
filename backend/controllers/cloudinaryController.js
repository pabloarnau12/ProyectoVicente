const cloudinary = require('../config/cloudinary'); // Tu configuración de Cloudinary
const connection = require('../config/db'); // Tu conexión a la base de datos

// Subir imagen y actualizar perfil con la URL de la imagen
exports.uploadImage = (req, res) => {
  const { id } = req.user; // El ID del usuario proviene del token JWT

  // Comprobar si se ha subido una imagen
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
  }

  // Obtener la URL de la imagen subida a Cloudinary
  const imageUrl = req.file.path; // Esta es la URL proporcionada por Cloudinary

  // Actualizar la tabla `profile_pictures` en la base de datos con la URL de la imagen
  connection.query(
    'UPDATE usuarios SET profile_picture = ? WHERE ID_Usuario = ?',
    [imageUrl, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al actualizar la imagen de perfil' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ message: 'Imagen de perfil actualizada con éxito', imageUrl });
    }
  );
};
