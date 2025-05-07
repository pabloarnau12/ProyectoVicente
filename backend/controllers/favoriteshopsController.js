const connection = require("../config/db");

exports.getFavoriteShops = (req, res) => {
  connection.query("SELECT * FROM favoritas_tiendas", (err, results) => {
    if (err) return res.status(500).send(err);

    const defaultPhoto =
      "https://via.placeholder.com/300x200.png?text=No+Image+Available";

    results.forEach((tienda) => {
      if (!tienda.foto || tienda.foto.trim() === "") {
        tienda.foto = defaultPhoto;
      }
    });

    res.json(results);
  });
};

exports.getFavoriteShopsbyUser = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT e.* 
    FROM favoritas_tiendas ft
    JOIN Establecimientos e ON ft.ID_Establecimiento = e.ID_Establecimiento
    WHERE ft.ID_Usuario = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);

    const defaultPhoto =
      "https://via.placeholder.com/300x200.png?text=No+Image+Available";

    results.forEach((tienda) => {
      if (!tienda.foto || tienda.foto.trim() === "") {
        tienda.foto = defaultPhoto;
      }
    });

    if (results.length === 0)
      return res
        .status(404)
        .send(
          "No se encontraron Tiendas favoritas para el usuario especificado"
        );
    res.json(results);
  });
};

exports.addFavoriteShop = (req, res) => {
  const { ID_Usuario, ID_Establecimiento } = req.body;

  const checkQuery = `SELECT * FROM favoritas_tiendas WHERE ID_Usuario = ? AND ID_Establecimiento = ?`;
  connection.query(
    checkQuery,
    [ID_Usuario, ID_Establecimiento],
    (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error interno del servidor" });

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "La tienda ya está en favoritos" });
      }

      const insertQuery = `INSERT INTO favoritas_tiendas (ID_Usuario, ID_Establecimiento) VALUES (?, ?)`;
      connection.query(
        insertQuery,
        [ID_Usuario, ID_Establecimiento],
        (err, results) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Error al insertar en la base de datos" });

          return res
            .status(201)
            .json({ message: "Tienda añadida a favoritos" });
        }
      );
    }
  );
};

exports.removeFavoriteShop = (req, res) => {
  const { ID_Usuario, ID_Establecimiento } = req.body;

  const checkQuery = `
    SELECT * FROM favoritas_tiendas 
    WHERE ID_Usuario = ? AND ID_Establecimiento = ?
  `;

  connection.query(
    checkQuery,
    [ID_Usuario, ID_Establecimiento],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error en la base de datos", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "La tienda no está en favoritos para este usuario.",
        });
      }

      const deleteQuery = `
      DELETE FROM favoritas_tiendas 
      WHERE ID_Usuario = ? AND ID_Establecimiento = ?
    `;

      connection.query(
        deleteQuery,
        [ID_Usuario, ID_Establecimiento],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error al eliminar de la base de datos",
              error: err,
            });
          }
          res
            .status(200)
            .json({ message: "Tienda eliminada de favoritos correctamente" });
        }
      );
    }
  );
};

exports.checkFavoriteShop = (req, res) => {
  const { ID_Usuario, ID_Establecimiento } = req.query;
  const checkQuery = `
    SELECT * FROM favoritas_tiendas 
    WHERE ID_Usuario = ? AND ID_Establecimiento = ?
  `;

  connection.query(
    checkQuery,
    [ID_Usuario, ID_Establecimiento],
    (err, results) => {
      if (err) return res.status(500).send(err);

      if (results.length > 0) {
        return res.json({ isFavorite: true });
      } else {
        return res.json({ isFavorite: false });
      }
    }
  );
};
