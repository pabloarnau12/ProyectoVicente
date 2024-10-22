const connection = require('../config/db');

// Obtener el perfil del usuario autenticado
exports.getPerfil = (req, res) => {
  const { id } = req.user;  // `req.user` es el resultado de la validación del token JWT

  connection.query('SELECT * FROM usuarios WHERE ID_Usuario = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener el perfil' });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};
