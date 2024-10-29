const connection = require('../config/db');

exports.getFavoriteShops = (req, res) =>{
    connection.query('SELECT * FROM favoritas_tiendas', (err, results) => {
      if (err) return res.status(500).send(err);
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
    if (results.length === 0) return res.status(404).send('No se encontraron Tiendas favoritas para el usuario especificado');
    res.json(results);
  });
};

// controllers/favoriteshopsController.js
exports.addFavoriteShop = (req, res) => {
  const { ID_Usuario, ID_Establecimiento } = req.body;

  // Verifica si la tienda ya existe en favoritos
  const checkQuery = `SELECT * FROM favoritas_tiendas WHERE ID_Usuario = ? AND ID_Establecimiento = ?`;
  connection.query(checkQuery, [ID_Usuario, ID_Establecimiento], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error interno del servidor' }); // Manejo de error

    // Si ya existe, devolver un código de conflicto (409)
    if (results.length > 0) {
      return res.status(409).json({ message: 'La tienda ya está en favoritos' });
    }

    // Si no existe, insertar la nueva tienda favorita
    const insertQuery = `INSERT INTO favoritas_tiendas (ID_Usuario, ID_Establecimiento) VALUES (?, ?)`;
    connection.query(insertQuery, [ID_Usuario, ID_Establecimiento], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al insertar en la base de datos' }); // Manejo de error

      // Responder con éxito al cliente
      return res.status(201).json({ message: 'Tienda añadida a favoritos' }); // Asegúrate de devolver un JSON
    });
  });
};


exports.removeFavoriteShop = (req, res) => {
  const { ID_Usuario, ID_Establecimiento } = req.body;

  // Consulta para verificar si existe la tienda favorita para el usuario
  const checkQuery = `
    SELECT * FROM favoritas_tiendas 
    WHERE ID_Usuario = ? AND ID_Establecimiento = ?
  `;

  connection.query(checkQuery, [ID_Usuario, ID_Establecimiento], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos', error: err });
    }

    // Si no existe, devolver un mensaje
    if (results.length === 0) {
      return res.status(404).json({ message: 'La tienda no está en favoritos para este usuario.' });
    }

    // Si existe, proceder a la eliminación
    const deleteQuery = `
      DELETE FROM favoritas_tiendas 
      WHERE ID_Usuario = ? AND ID_Establecimiento = ?
    `;

    connection.query(deleteQuery, [ID_Usuario, ID_Establecimiento], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al eliminar de la base de datos', error: err });
      }
      res.status(200).json({ message: 'Tienda eliminada de favoritos correctamente' });
    });
  });
};



// controllers/favoriteShopsController.js
exports.checkFavoriteShop = (req, res) => {
  const { ID_Usuario, ID_Establecimiento } = req.query;
  console.log(ID_Usuario, ID_Establecimiento);
  // Consulta para verificar si existe la tienda favorita para el usuario
  const checkQuery = `
    SELECT * FROM favoritas_tiendas 
    WHERE ID_Usuario = ? AND ID_Establecimiento = ?
  `;

  connection.query(checkQuery, [ID_Usuario, ID_Establecimiento], (err, results) => {
    if (err) return res.status(500).send(err);

    // Si existe, devolver true; si no, false
    if (results.length > 0) {
      return res.json({ isFavorite: true });
    } else {
      return res.json({ isFavorite: false });
    }
  });
};


