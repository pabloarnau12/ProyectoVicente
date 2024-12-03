const connection = require('../config/db');

// Obtener todas las tiendas
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

    // URL de la foto base
    const defaultPhoto = 'https://via.placeholder.com/300x200.png?text=No+Image+Available'; 

    // Recorremos los resultados y asignamos la foto base si está vacía
    results.forEach(tienda => {
      if (!tienda.foto || tienda.foto.trim() === '') {
        tienda.foto = defaultPhoto; // Asignamos la foto base
      }
    });

    // Enviamos los resultados con la foto adecuada y el nombre de la categoría
    res.json(results);
  });
};



// Obtener una tienda por ID
exports.getTiendaById = (req, res) => {
  const { id } = req.params;
  
  // Consulta para obtener el establecimiento con su categoría por ID
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

    // Si no se encuentra la tienda
    if (results.length === 0) return res.status(404).send('Tienda no encontrada');
    
    // URL de la foto base
    const defaultPhoto = 'https://via.placeholder.com/300x200.png?text=No+Image+Available';

    // Obtenemos la tienda
    const tienda = results[0];

    // Verificamos si la foto está vacía y asignamos la foto base
    if (!tienda.foto || tienda.foto.trim() === '') {
      tienda.foto = defaultPhoto; // Asignamos la foto base
      console.log("No hay foto");
    }

    // Enviamos el resultado con la foto y el nombre de la categoría
    res.json(tienda);
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
