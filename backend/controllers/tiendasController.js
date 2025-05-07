const connection = require("../config/db");

exports.getAllTiendas = (req, res) => {
  const query = `
    SELECT 
      establecimientos.*, 
      categorias_establecimientos.Nombre AS Categoria
    FROM 
      establecimientos
    LEFT JOIN 
      categorias_establecimientos
    ON 
      establecimientos.Categoria = categorias_establecimientos.ID_Categoria
  `;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results);
  });
};

exports.getTiendasByPage = (req, res) => {
  const { page, limit } = req.params;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    return res.status(400).json({
      error: "Los parámetros page y limit deben ser números positivos.",
    });
  }
  const offset = (pageNumber - 1) * limitNumber;

  const query = `
    SELECT 
      establecimientos.*, 
      categorias_establecimientos.Nombre AS Categoria
    FROM 
      establecimientos
    LEFT JOIN 
      categorias_establecimientos
    ON 
      establecimientos.Categoria = categorias_establecimientos.ID_Categoria
    LIMIT ? OFFSET ?;
  `;

  connection.query(query, [limitNumber, offset], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getTiendaById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      establecimientos.*, 
      categorias_establecimientos.Nombre AS Categoria
    FROM 
      establecimientos
    LEFT JOIN 
      categorias_establecimientos
    ON 
      establecimientos.Categoria = categorias_establecimientos.ID_Categoria
    WHERE 
      establecimientos.ID_Establecimiento = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0)
      return res.status(404).send("Tienda no encontrada");

    const tienda = results[0];

    res.json(tienda);
  });
};

exports.getProductosByTienda = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM productos WHERE ID_Establecimiento = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

exports.getProductoByTiendaAndProductoId = (req, res) => {
  const { id, idProducto } = req.params;
  connection.query(
    "SELECT * FROM productos WHERE ID_Establecimiento = ? AND ID_Producto = ?",
    [id, idProducto],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res
          .status(404)
          .send("No se encontró el producto especificado para la tienda dada");
      res.json(results[0]);
    }
  );
};

exports.getTiendasByCalificacion = (req, res) => {
  const limit = +req.params.limit;

  const query =
    "SELECT * FROM establecimientos ORDER BY Calificacion_Promedio DESC LIMIT ? ";
  connection.query(query, [limit], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!limit)
      return res
        .status(404)
        .send("Debes introucir cuantas tiendas quieres mostrar");
    if (results.length === 0)
      return res.status(404).send("Error al cargar tiendas mejor valoradas");
    res.json(results);
  });
};

exports.getTiendaByAdmin = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      establecimientos.*, 
      categorias_establecimientos.Nombre AS Categoria
    FROM 
      establecimientos
    LEFT JOIN 
      categorias_establecimientos
    ON 
      establecimientos.Categoria = categorias_establecimientos.ID_Categoria
    WHERE 
      establecimientos.ID_Usuario = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0)
      return res.status(404).send("Tienda no encontrada");

    const tienda = results[0];

    res.json(tienda);
  });
};
