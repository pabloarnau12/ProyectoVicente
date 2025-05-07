const connection = require("../config/db");

exports.getAllCalificacionesEstablecimientos = (req, res) => {
  connection.query(
    "SELECT * FROM calificaciones_establecimientos",
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
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
    ORDER BY 
    c.Fecha_Calificacion DESC
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getCalificacionPromedioEstablecimientos = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT AVG(Calificacion_Establecimiento) AS media_calificacion FROM calificaciones_establecimientos WHERE ID_Establecimiento = ?",
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

exports.addComentarioEstablecimiento = (req, res) => {
  const {
    ID_Usuario,
    Calificacion_Establecimiento,
    Comentario,
    ID_Establecimiento,
  } = req.body;

  if (
    !ID_Usuario ||
    !Calificacion_Establecimiento ||
    !Comentario ||
    !ID_Establecimiento
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  if (
    isNaN(Calificacion_Establecimiento) ||
    Calificacion_Establecimiento < 1 ||
    Calificacion_Establecimiento > 5
  ) {
    return res
      .status(400)
      .json({ message: "La calificación debe estar entre 1 y 5" });
  }

  const query = `
    INSERT INTO calificaciones_establecimientos (ID_Usuario, Calificacion_Establecimiento, Comentario, ID_Establecimiento) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [ID_Usuario, Calificacion_Establecimiento, Comentario, ID_Establecimiento],
    (err, results) => {
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
        return res
          .status(500)
          .json({ message: "Error al insertar en la base de datos" });
      }

      return res
        .status(201)
        .json({ message: "Comentario agregado correctamente" });
    }
  );
};
