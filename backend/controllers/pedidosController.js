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

  exports.getPedidosByState = (req, res) => {

    const Estado_Pedido = req.query.estado;
    if (!Estado_Pedido) {
      return res.status(400).json({ error: 'El parámetro estado es requerido.' });
    }
  
    const query = `
      SELECT 
        pedidos.*, 
        usuarios.Nombre, 
        usuarios.Apellidos, 
        usuarios.Telefono, 
        establecimientos.foto AS FotoEstablecimiento
      FROM pedidos 
      INNER JOIN usuarios 
        ON pedidos.ID_Usuario = usuarios.ID_Usuario
      INNER JOIN establecimientos 
        ON pedidos.ID_Establecimiento = establecimientos.ID_Establecimiento
      WHERE pedidos.Estado_Pedido = ?
    `;
  
    connection.query(query, [Estado_Pedido], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('No se encontraron pedidos con este estado');
      res.json(results);
    });
  
  };

  // Obtener pedidos por tienda y añadir imágenes de productos
exports.getPedidosbyShop = (req, res) => {
  const { id } = req.params;

  // Consulta para obtener los pedidos de la tienda
  const queryPedidos = `
    SELECT 
      pedidos.*, 
      usuarios.Nombre, 
      usuarios.Apellidos, 
      usuarios.Telefono, 
      establecimientos.foto AS FotoEstablecimiento
    FROM pedidos 
    INNER JOIN usuarios 
      ON pedidos.ID_Usuario = usuarios.ID_Usuario
    INNER JOIN establecimientos 
      ON pedidos.ID_Establecimiento = establecimientos.ID_Establecimiento
    WHERE pedidos.ID_Establecimiento = ?
  `;

  connection.query(queryPedidos, [id], (err, pedidos) => {
    if (err) return res.status(500).send(err);
    if (pedidos.length === 0) return res.status(404).send('No se encontraron pedidos para el establecimiento especificado');

    // Obtener los IDs de los productos en los pedidos
    const productIds = pedidos.flatMap(pedido => JSON.parse(pedido.productos).map(producto => producto.sku));

    console.log('Product IDs:', productIds);

    if (productIds.length === 0) {
      return res.json(pedidos);
    }

    // Consulta para obtener las imágenes de los productos
    const queryProductos = `
      SELECT ID_Producto, Foto 
      FROM productos 
      WHERE ID_Producto IN (?)
    `;

    connection.query(queryProductos, [productIds], (err, productos) => {
      if (err) return res.status(500).send(err);

      console.log('Productos:', productos);

      // Crear un mapa de productos con sus imágenes
      const productosMap = productos.reduce((map, producto) => {
        map[producto.ID_Producto] = producto.Foto;
        return map;
      }, {});

      console.log('Productos Map:', productosMap);

      // Añadir las imágenes de los productos a los pedidos
      const pedidosConImagenes = pedidos.map(pedido => {
        const productos = JSON.parse(pedido.productos).map(producto => {
          return {
            ...producto,
            image_url: productosMap[producto.sku] || null
          };
        });

        return {
          ...pedido,
          productos: JSON.stringify(productos)
        };
      });

      res.json(pedidosConImagenes);
    });
  });
};
  