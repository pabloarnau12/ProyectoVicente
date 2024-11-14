const connection = require('../config/db');

// Obtener todas las tiendas
exports.getAllTiendas = (req, res) => {
  connection.query('SELECT * FROM establecimientos', (err, results) => {
    if (err) return res.status(500).send(err);

    // URL de la foto base
    const defaultPhoto = 'https://via.placeholder.com/300x200.png?text=No+Image+Available'; // Aquí puedes poner la URL de la foto base

    // Recorremos los resultados y asignamos la foto base si está vacía
    results.forEach(tienda => {
      if (!tienda.foto || tienda.foto.trim() === '') {
        tienda.foto = defaultPhoto; // Asignamos la foto base
        console.log("NO TIENE FOTO");
      }
    });

    // Enviamos los resultados con la foto adecuada
    res.json(results);
  });
};


// Obtener una tienda por ID
exports.getTiendaById = (req, res) => {
  const { id } = req.params;
  
  // Consulta para obtener el establecimiento por ID
  connection.query('SELECT * FROM establecimientos WHERE ID_Establecimiento = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    
    // Si no se encuentra la tienda
    if (results.length === 0) return res.status(404).send('Tienda no encontrada');
    
    // URL de la foto base
    const defaultPhoto = 'https://via.placeholder.com/300x200.png?text=No+Image+Available'; // Foto predeterminada

    // Verificar si la foto está vacía y asignar la foto base
    const tienda = results[0]; // Solo hay un resultado, ya que estamos buscando por ID
    if (!tienda.foto || tienda.foto.trim() === '') {
      tienda.foto = defaultPhoto; // Asignar la foto base
      console.log("No hay foto");
    }

    // Enviar el resultado con la foto actualizada
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
