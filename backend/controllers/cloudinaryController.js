const cloudinary = require('cloudinary').v2;
const connection = require('../config/db'); 
exports.uploadImage = (req, res) => {
  const file = req.file; // La imagen cargada
  const id = req.user.id; // ID del usuario (opcional, si lo necesitas para la lógica)
  const customName = req.body.customName || `user_${ id }`; // Nombre personalizado

  if (!file) {
    return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
  }

  if (id) {
    cloudinary.uploader.destroy(id, (err) => {
      if (err) {
        console.error('Error al eliminar la imagen anterior:', err);
      } else {
        console.log('Imagen anterior eliminada correctamente');
      }
    });
  }


  cloudinary.uploader.upload(
    file.path,
    {
      folder: 'profile_pictures',
      public_id: customName, // Nombre personalizado
    },
    (err, result) => {
      if (err) {
        console.error('Error al subir la imagen a Cloudinary:', err);
        return res.status(500).json({ message: 'Error al subir la imagen' });
      }

      // Aquí puedes actualizar la base de datos con la URL de la imagen
      const imageUrl = result.secure_url;
      const query = `
        UPDATE usuarios SET profile_picture = ? WHERE ID_Usuario = ?
      `;

      connection.query(query, [imageUrl, id], (dbErr, dbResults) => {
        if (dbErr) {
          console.error('Error al actualizar la base de datos:', dbErr);
          return res.status(500).json({ message: 'Error al actualizar el perfil' });
        }

        res.status(200).json({
          message: 'Imagen subida con éxito',
          url: imageUrl,
        });
      });
    }
  );
};