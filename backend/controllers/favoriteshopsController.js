const connection = require('../config/db');

exports.getFavoriteShops = (req, res) =>{
    connection.query('SELECT * FROM favoritas_tiendas', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  };

exports.getFavoriteShopsbyUser = (req, res) =>{
  const {id} = req.params;
  connection.query('SELECT * FROM favoritas_tiendas WHERE ID_Usuario = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('No se encontraron Tiendas favoritas para el usuario especificado');
    res.json(results);
  });
}