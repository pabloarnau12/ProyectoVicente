const connection = require('../config/db');

// Obtener todas las calificaciones
exports.getAllCalificacionesEstablecimientos = (req, res) => {
  connection.query('SELECT * FROM calificaciones_establecimientos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getAllCalificacionesEstablecimientosbyID = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      c.*,
      u.Nombre AS Usuario_Nombre,
      u.profile_picture AS Usuario_Foto
    FROM 
      calificaciones_establecimientos c
    INNER JOIN 
      usuarios u 
    ON 
      c.ID_Usuario = u.ID_Usuario
    WHERE 
      c.ID_Establecimiento = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};


// Obtener la calificación promedio de una tienda
exports.getCalificacionPromedioEstablecimientos = (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT AVG(Calificacion_Establecimiento) AS media_calificacion FROM calificaciones_establecimientos WHERE ID_Establecimiento = ?',
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
