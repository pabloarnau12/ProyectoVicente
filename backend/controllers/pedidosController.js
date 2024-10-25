const connection = require('../config/db');

exports.getAllPedidos = (req, res) => {
    connection.query('SELECT * FROM pedidos', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  };

exports.getPedidosById = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM pedidos WHERE ID_Pedido = ?', [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('Pedido no encontrado');
      res.json(results[0]);
    });
  };


exports.getPedidosByUser = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM pedidos WHERE ID_Usuario = ?', [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('No se encontraron pedidos para el usuario especificado');
      res.json(results);
    });
  };