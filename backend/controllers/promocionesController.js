const connection = require('../config/db');

// Añadir una nueva promoción
exports.addPromotion = (req, res) => {
  const { ID_Producto, ID_Establecimiento,titulo, descripcion, descuento, fechaInicio, fechaFin, tipoPromocion, codigoPromocion, condiciones } = req.body;
  const query = 'INSERT INTO promociones (ID_Producto, ID_Establecimiento ,titulo, descripcion, descuento, fechaInicio, fechaFin, tipoPromocion, codigoPromocion, condiciones) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [ID_Producto, ID_Establecimiento ,titulo, descripcion, descuento, fechaInicio, fechaFin, tipoPromocion, codigoPromocion, condiciones], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Promoción añadida con éxito', promocionID: results.insertId });
  });
};

exports.deletePromotion = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM promociones WHERE ID_Promocion = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) return res.status(404).json({ message: 'Promoción no encontrada' });
      res.status(200).json({ message: 'Promoción eliminada con éxito' });
    });
  };

  exports.getPromotionsByShop = (req, res) => {
    const { id } = req.params;
  
    const query = 'SELECT * FROM promociones WHERE ID_Establecimiento = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(results);
    });
  };

// Otros métodos del controlador...