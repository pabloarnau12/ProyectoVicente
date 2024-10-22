const connection = require('../config/db');

// Obtener todas las tiendas
exports.getAllTiendas = (req, res) => {
  connection.query('SELECT * FROM establecimientos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Obtener una tienda por ID
exports.getTiendaById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM establecimientos WHERE ID_Establecimiento = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Tienda no encontrada');
    res.json(results[0]);
  });
};

// Obtener productos de una tienda específica
exports.getProductosByTienda = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE ID_Establecimiento = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('No se encontraron productos para la tienda especificada');
    res.json(results);
  });
};

// Obtener un producto específico de una tienda específica
exports.getProductoByTiendaAndProductoId = (req, res) => {
  const { id, idProducto } = req.params;
  connection.query(
    'SELECT * FROM productos WHERE ID_Establecimiento = ? AND ID_Producto = ?',
    [id, idProducto],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('No se encontró el producto especificado para la tienda dada');
      res.json(results[0]);
    }
  );
};
