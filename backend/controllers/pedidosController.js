const connection = require("../config/db");

exports.getAllPedidos = (req, res) => {
  connection.query("SELECT * FROM pedidos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getPedidosById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM pedidos WHERE ID_Pedido = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send("Pedido no encontrado");
      res.json(results[0]);
    }
  );
};

exports.getPedidosByUserAndState = (req, res) => {
  const { id } = req.params; // ID del usuario
  const { estado } = req.query; // Estado del pedido pasado como query param

  // Validar que el estado sea válido
  const estadosValidos = [
    "Entregado",
    "Cancelado",
    "En Proceso",
    "Pendiente",
    "En Camino",
  ];
  if (!estado || !estadosValidos.includes(estado)) {
    return res
      .status(400)
      .json({ error: "El estado proporcionado no es válido." });
  }

  // Determinar los estados a incluir en la consulta
  let estadosConsulta = [];
  if (estado === "Entregado" || estado === "Cancelado") {
    estadosConsulta = ["Entregado", "Cancelado"];
  } else if (["En Proceso", "Pendiente", "En Camino"].includes(estado)) {
    estadosConsulta = ["En Proceso", "Pendiente", "En Camino"];
  }

  // Construir la consulta
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
    WHERE pedidos.ID_Usuario = ? AND pedidos.Estado_Pedido IN (?)
  `;

  connection.query(query, [id, estadosConsulta], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(404).json({
        message: "No se encontraron pedidos con los estados especificados.",
      });
    }
    res.json(results);
  });
};
exports.getPedidosByState = (req, res) => {
  const Estado_Pedido = req.query.estado;
  if (!Estado_Pedido) {
    return res.status(400).json({ error: "El parámetro estado es requerido." });
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
    if (results.length === 0)
      return res.status(404).send("No se encontraron pedidos con este estado");
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
    if (pedidos.length === 0)
      return res
        .status(404)
        .send("No se encontraron pedidos para el establecimiento especificado");

    // Obtener los IDs de los productos en los pedidos
    const productIds = pedidos.flatMap((pedido) =>
      JSON.parse(pedido.productos).map((producto) => producto.sku)
    );

    console.log("Product IDs:", productIds);

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

      console.log("Productos:", productos);

      // Crear un mapa de productos con sus imágenes
      const productosMap = productos.reduce((map, producto) => {
        map[producto.ID_Producto] = producto.Foto;
        return map;
      }, {});

      console.log("Productos Map:", productosMap);

      // Añadir las imágenes de los productos a los pedidos
      const pedidosConImagenes = pedidos.map((pedido) => {
        const productos = JSON.parse(pedido.productos).map((producto) => {
          return {
            ...producto,
            image_url: productosMap[producto.sku] || null,
          };
        });

        return {
          ...pedido,
          productos: JSON.stringify(productos),
        };
      });

      res.json(pedidosConImagenes);
    });
  });
};

// Obtener pedidos por tienda y estado
exports.getPedidosByStateShop = (req, res) => {
  const { id } = req.params;
  const Estado_Pedido = req.query.estado;

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
    WHERE pedidos.ID_Establecimiento = ? AND pedidos.Estado_Pedido = ?
  `;

  if (Estado_Pedido === undefined || Estado_Pedido === null) {
    return res.status(400).json({ error: "El parámetro estado es requerido." });
  }

  if (
    Estado_Pedido !== "Pendiente" &&
    Estado_Pedido !== "En proceso" &&
    Estado_Pedido !== "En camino" &&
    Estado_Pedido !== "Entregado" &&
    Estado_Pedido !== "Cancelado"
  ) {
    return res.status(400).json({ error: "El estado no es válido." });
  }
  connection.query(queryPedidos, [id, Estado_Pedido], (err, pedidos) => {
    console.log(Estado_Pedido);
    if (err) return res.status(500).send(err);
    if (pedidos.length === 0) {
      return res.status(200).json([]); // Devuelve un arreglo vacío
    }

    // Obtener los IDs de los productos en los pedidos
    const productIds = pedidos.flatMap((pedido) =>
      JSON.parse(pedido.productos).map((producto) => producto.sku)
    );

    // console.log('Product IDs:', productIds);

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

      // console.log('Productos:', productos);

      // Crear un mapa de productos con sus imágenes
      const productosMap = productos.reduce((map, producto) => {
        map[producto.ID_Producto] = producto.Foto;
        return map;
      }, {});

      // console.log('Productos Map:', productosMap);

      // Añadir las imágenes de los productos a los pedidos
      const pedidosConImagenes = pedidos.map((pedido) => {
        const productos = JSON.parse(pedido.productos).map((producto) => {
          return {
            ...producto,
            image_url: productosMap[producto.sku] || null,
          };
        });

        return {
          ...pedido,
          productos: JSON.stringify(productos),
        };
      });

      res.json(pedidosConImagenes);
    });
  });
};

exports.acceptOrder = (req, res) => {
  const { id } = req.params; // ID del pedido
  const { idRepartidor } = req.body; // ID del repartidor enviado en el cuerpo de la solicitud

  if (!idRepartidor) {
    return res
      .status(400)
      .json({ message: "El ID del repartidor es obligatorio." });
  }

  // Verificar si el pedido está disponible
  const queryCheck = `
    SELECT Estado_Pedido 
    FROM pedidos 
    WHERE ID_Pedido = ? AND Estado_Pedido = "Pendiente"
  `;
  connection.query(queryCheck, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "El pedido no está disponible o ya fue aceptado." });
    }

    // Actualizar el estado del pedido y asignarlo al repartidor
    const queryUpdate = `
      UPDATE pedidos
      SET Estado_Pedido = "En Proceso", ID_Repartidor = ?
      WHERE ID_Pedido = ?
    `;
    connection.query(queryUpdate, [idRepartidor, id], (err, updateResults) => {
      if (err) return res.status(500).send(err);
      if (updateResults.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "No se pudo asignar el pedido." });
      }

      res.status(200).json({ message: "Pedido aceptado con éxito." });
    });
  });
};

exports.finishOrder = (req, res) => {
  const { id } = req.params; // ID del pedido

  const query = `
    UPDATE pedidos
    SET Estado_Pedido = "Entregado"
    WHERE ID_Pedido = ? AND Estado_Pedido IN ("En Proceso", "En Camino")
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se pudo finalizar el pedido" });
    }

    res.status(200).json({ message: "Pedido entregado con éxito." });
  });
};

exports.getPedidoAsignado = (req, res) => {
  const { id } = req.params; // ID del repartidor autenticado

  const query = `
    SELECT 
      pedidos.*, 
      usuarios.Nombre AS NombreUsuario, 
      usuarios.Apellidos AS ApellidosUsuario, 
      usuarios.Telefono AS TelefonoUsuario, 
      establecimientos.Nombre AS NombreEstablecimiento, 
      establecimientos.Direccion AS DireccionEstablecimiento, 
      establecimientos.foto AS FotoEstablecimiento
    FROM pedidos 
    INNER JOIN usuarios 
      ON pedidos.ID_Usuario = usuarios.ID_Usuario
    INNER JOIN establecimientos 
      ON pedidos.ID_Establecimiento = establecimientos.ID_Establecimiento
    WHERE pedidos.ID_Repartidor = ? AND pedidos.Estado_Pedido IN ("En Proceso", "En Camino")
  `;

  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(404).json({ message: "No tienes un pedido asignado." });
    }

    // Procesar los productos como JSON
    try {
      const pedido = results[0];
      if (pedido.productos) {
        pedido.productos = JSON.parse(pedido.productos); // Convertir productos a JSON
      } else {
        console.log("El pedido no tiene productos.");
      }

      res.status(200).json(pedido); // Devolver el pedido con los productos procesados
    } catch (error) {
      console.error("Error al procesar los productos del pedido:", error);
      return res
        .status(500)
        .json({ message: "Error al procesar los productos del pedido." });
    }
  });
};

exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = [
    "Pendiente",
    "En Proceso",
    "En Camino",
    "Entregado",
    "Cancelado",
  ];
  if (!estadosValidos.includes(estado)) {
    return res
      .status(400)
      .json({ error: "El estado proporcionado no es válido." });
  }

  const query = `
    UPDATE pedidos
    SET Estado_Pedido = ?
    WHERE ID_Pedido = ?
  `;

  connection.query(query, [estado, id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se pudo actualizar el estado del pedido." });
    }
    res
      .status(200)
      .json({ message: "Estado del pedido actualizado con éxito." });
  });
};
