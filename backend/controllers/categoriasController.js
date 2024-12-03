const connection = require('../config/db');

exports.getAllCategoriasEstablecimientos = (req, res) => {
    connection.query('SELECT * FROM Categorias_establecimientos', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  };