const cloudinary = require("cloudinary").v2;
const connection = require("../config/db");
exports.uploadProfileImage = (req, res) => {
  const file = req.file; // La imagen cargada
  const id = req.user.id; // ID del usuario (opcional, si lo necesitas para la lógica)
  const customName = req.body.customName || `user_${id}`; // Nombre personalizado

  if (!file) {
    return res
      .status(400)
      .json({ message: "No se proporcionó ninguna imagen" });
  }

  if (id) {
    cloudinary.uploader.destroy(id, (err) => {
      if (err) {
        console.error("Error al eliminar la imagen anterior:", err);
      } else {
      }
    });
  }

  cloudinary.uploader.upload(
    file.path,
    {
      folder: "profile_pictures",
      public_id: customName, // Nombre personalizado
    },
    (err, result) => {
      if (err) {
        console.error("Error al subir la imagen a Cloudinary:", err);
        return res.status(500).json({ message: "Error al subir la imagen" });
      }

      // Aquí puedes actualizar la base de datos con la URL de la imagen
      const imageUrl = result.secure_url;
      const query = `
        UPDATE usuarios SET profile_picture = ? WHERE ID_Usuario = ?
      `;

      connection.query(query, [imageUrl, id], (dbErr, dbResults) => {
        if (dbErr) {
          console.error("Error al actualizar la base de datos:", dbErr);
          return res
            .status(500)
            .json({ message: "Error al actualizar el perfil" });
        }

        res.status(200).json({
          message: "Imagen subida con éxito",
        });
      });
    }
  );
};

exports.uploadProductImage = (req, res) => {
  const file = req.file; // La imagen cargada
  const ID_Producto = req.body.ID_Producto; // ID del producto (opcional, si lo necesitas para la lógica)
  const id = req.user.id; // ID del usuario (opcional, si lo necesitas para la lógica)
  const customName = req.body.customName || `product_${id}`; // Nombre personalizado

  if (!file) {
    return res
      .status(400)
      .json({ message: "No se proporcionó ninguna imagen" });
  }

  if (id) {
    cloudinary.uploader.destroy(id, (err) => {
      if (err) {
      } else {
      }
    });
  }

  cloudinary.uploader.upload(
    file.path,
    {
      folder: "products",
      public_id: customName, // Nombre personalizado
    },
    (err, result) => {
      if (err) {
        console.error("Error al subir la imagen a Cloudinary:", err);
        return res.status(500).json({ message: "Error al subir la imagen" });
      }

      // Aquí puedes actualizar la base de datos con la URL de la imagen
      const imageUrl = result.secure_url;
      const query = `
        UPDATE productos SET Foto = ? WHERE ID_Producto = ?
      `;

      connection.query(query, [imageUrl, ID_Producto], (dbErr, dbResults) => {
        if (dbErr) {
          console.error("Error al actualizar la base de datos:", dbErr);
          return res
            .status(500)
            .json({ message: "Error al actualizar el perfil" });
        }

        res.status(200).json({
          message: "Imagen subida con éxito",
          url: imageUrl,
        });
      });
    }
  );
};

exports.uploadShopImage = (req, res) => {
  const file = req.file; // La imagen cargada
  const ID_Establecimiento = req.body.ID_Establecimiento; // ID del establecimiento
  const customName = req.body.customName || `shop_${ID_Establecimiento}`; // Nombre personalizado

  if (!file) {
    return res
      .status(400)
      .json({ message: "No se proporcionó ninguna imagen" });
  }

  // Subir la imagen a Cloudinary
  cloudinary.uploader.upload(
    file.path,
    {
      folder: "shops", // Carpeta en Cloudinary
      public_id: customName, // Nombre personalizado
    },
    (err, result) => {
      if (err) {
        console.error("Error al subir la imagen a Cloudinary:", err);
        return res.status(500).json({ message: "Error al subir la imagen" });
      }

      // URL de la imagen subida
      const imageUrl = result.secure_url;

      // Actualizar la base de datos con la URL de la imagen
      const query = `
        UPDATE establecimientos SET Foto = ? WHERE ID_Establecimiento = ?
      `;

      connection.query(
        query,
        [imageUrl, ID_Establecimiento],
        (dbErr, dbResults) => {
          if (dbErr) {
            console.error("Error al actualizar la base de datos:", dbErr);
            return res.status(500).json({
              message: "Error al actualizar la imagen del establecimiento",
            });
          }

          res.status(200).json({
            message: "Imagen del establecimiento subida con éxito",
            url: imageUrl,
          });
        }
      );
    }
  );
};
