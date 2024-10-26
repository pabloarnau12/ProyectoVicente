const connection = require('../config/db');

exports.getFavoriteShops = (req, res) =>{
    connection.query('SELECT * FROM favoritas_tiendas', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  };
