const connection = require('../config/db');

// Obtener todas las calificaciones
exports.getAllCalificaciones = (req, res) => {
  connection.query('SELECT * FROM calificaciones', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Obtener la calificación promedio de una tienda
exports.getCalificacionPromedio = (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT AVG(Calificacion_Establecimiento) AS media_calificacion FROM calificaciones WHERE ID_Establecimiento = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);

      let mediaCalificacion = 0;
      if (results.length > 0 && results[0].media_calificacion !== null) {
        mediaCalificacion = Number(results[0].media_calificacion).toFixed(2);
      }

      res.json({ media_calificacion: mediaCalificacion });
    }
  );
};
