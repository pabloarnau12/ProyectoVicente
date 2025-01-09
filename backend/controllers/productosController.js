const connection = require('../config/db');

// Obtener todos los productos
exports.getAllProductos = (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Obtener un producto por ID
exports.getProductoById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE ID_Producto = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Producto no encontrado');
    res.json(results[0]);
  });
};

// Obtener productos de una tienda
exports.getProductosByTienda = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE ID_Establecimiento = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.deleteProductoByID = (req, res) => {
  const { ID_Producto, ID_Establecimiento } = req.params;
  connection.query('DELETE FROM productos WHERE ID_Producto = ? AND ID_Establecimiento = ?', [ID_Producto, ID_Establecimiento], (err, results) => {
    console.log(ID_Producto, ID_Establecimiento);
    if (err) return res.status(500).send(err);
    res.json(results)
  });
}
