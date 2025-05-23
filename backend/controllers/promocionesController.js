const connection = require("../config/db");

exports.addPromotion = (req, res) => {
  const {
    ID_Producto,
    ID_Establecimiento,
    titulo,
    descripcion,
    descuento,
    fechaFin,
    tipoPromocion,
    codigoPromocion,
    condiciones,
  } = req.body;
  const fechaInicio = new Date();

  const query =
    "INSERT INTO promociones (ID_Producto, ID_Establecimiento ,titulo, descripcion, descuento, fechaInicio, fechaFin, tipoPromocion, codigoPromocion, condiciones) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      ID_Producto,
      ID_Establecimiento,
      titulo,
      descripcion,
      descuento,
      fechaInicio,
      fechaFin,
      tipoPromocion,
      codigoPromocion,
      condiciones,
    ],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({
        message: "Promoción añadida con éxito",
        promocionID: results.insertId,
      });
    }
  );
};

exports.deletePromotion = (req, res) => {
  const { id } = req.params;

  const getProductQuery =
    "SELECT ID_Producto FROM promociones WHERE ID_Promocion = ?";
  connection.query(getProductQuery, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(404).json({ message: "Promoción no encontrada" });

    const productId = results[0].ID_Producto;

    const deletePromotionQuery =
      "DELETE FROM promociones WHERE ID_Promocion = ?";
    connection.query(deletePromotionQuery, [id], (err, deleteResults) => {
      if (err) return res.status(500).send(err);
      if (deleteResults.affectedRows === 0)
        return res.status(404).json({ message: "Promoción no encontrada" });

      const updateProductQuery =
        "UPDATE productos SET Precio_Promocion = NULL WHERE ID_Producto = ?";
      connection.query(
        updateProductQuery,
        [productId],
        (err, updateResults) => {
          if (err) return res.status(500).send(err);

          res.status(200).json({
            message: "Promoción y Precio_Promocion eliminados con éxito",
          });
        }
      );
    });
  });
};

exports.getPromotionsByShop = (req, res) => {
  const { id } = req.params;

  const query =
    'SELECT * FROM promociones WHERE ID_Establecimiento = ? AND estado = "activa"';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.updatePromotionState = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const query = "UPDATE promociones SET estado = ? WHERE ID_Promocion = ?";
  connection.query(query, [estado, id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Promoción no encontrada" });
    res.status(200).json({ message: "Promoción desactivada con éxito" });
  });
};

exports.getActivePromotions = (req, res) => {
  const query = 'SELECT * FROM promociones WHERE estado = "activa"';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};
