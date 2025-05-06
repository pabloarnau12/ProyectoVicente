const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");

// Registro de usuario
exports.register = (req, res) => {
  const { nombre, apellidos, email, telefono, password } = req.body;
  const profile_picture =
    "https://res.cloudinary.com/dvrcoi13p/image/upload/v1733244931/profile_pictures/no-picture";
  if (!nombre || !apellidos || !email || !telefono || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error al crear el hash de la contraseña" });

    connection.query(
      "INSERT INTO usuarios (Nombre, Apellidos, Email, Telefono, Contraseña, profile_picture ,ID_ROL) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellidos, email, telefono, hashedPassword, profile_picture, 3],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error al registrar el usuario" });
        res.status(201).json({ message: "Usuario registrado con éxito" });
      }
    );
  });
};

// Login de usuario
exports.login = (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM usuarios WHERE Email = ?",
    [email],
    (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error al buscar el usuario" });

      if (results.length === 0)
        return res.status(401).json({
          success: false,
          message: "Email o contraseña incorrectos",
          errorcode: "INVALID_CREDENTIALS",
        });

      const user = results[0];
      bcrypt.compare(password, user.Contraseña, (err, isMatch) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error al comparar contraseñas" });

        if (!isMatch)
          return res.status(401).json({
            success: false,
            message: "Email o contraseña incorrectos",
            errorcode: "INVALID_CREDENTIALS",
          });

        // connection.query('SELECT ID_ROL FROM usuarios WHERE Email = ?', [email], (err, results) => {
        //   if (err) return res.status(500).json({ message: 'Error al buscar el usuario' });

        //   const ID_ROL = results[0];
        // })
        const token = jwt.sign(
          { id: user.ID_Usuario, email: user.Email, rol: user.ID_ROL },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ token });
      });
    }
  );
};

exports.getPerfil = (req, res) => {
  const { id } = req.user; // `req.user` es el resultado de la validación del token JWT

  connection.query(
    "SELECT * FROM usuarios WHERE ID_Usuario = ?",
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error al obtener el perfil" });
      if (results.length === 0)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(results[0]);
    }
  );
};

exports.updateProfile = (req, res) => {
  const { id } = req.user;
  const { Nombre, Apellidos } = req.body;

  if (!Nombre || !Apellidos) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const query = `
    UPDATE usuarios
    SET Nombre = ?, Apellidos = ?
    WHERE ID_Usuario = ?
  `;

  connection.query(query, [Nombre, Apellidos, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al actualizar el perfil" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Perfil actualizado correctamente" });
  });
};

exports.updateAddress = (req, res) => {
  const { id } = req.user;
  const { direccion } = req.body;

  if (!direccion) {
    return res
      .status(400)
      .json({ message: "Es necesario que introduzcas una dirección" });
  }

  const query = `
    UPDATE usuarios
    SET Direccion = ?
    WHERE ID_Usuario = ?
  `;

  connection.query(query, [direccion, id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al actualizar la dirección" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Dirección actualizada correctamente" });
  });
};

exports.updateStatus = (req, res) => {
  const { id } = req.user;
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ message: "Es necesario que introduzcas un estado" });
  }

  if (
    !["activo", "ocupado", "recogiendo pedido", "en camino"].includes(status)
  ) {
    return res.status(400).json({ message: "Estado no válido" });
  }

  const query = `
    UPDATE usuarios
    SET estado = ?
    WHERE ID_Usuario = ?
  `;

  connection.query(query, [status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al actualizar el estado" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "estado actualizado correctamente" });
  });
};

exports.updateHorario = (req, res) => {
  const { Horario_Apertura } = req.body;
  const { Horario_Cierre } = req.body;
  const { ID_Establecimiento } = req.body;
  if (!Horario_Apertura || !Horario_Cierre) {
    return res
      .status(400)
      .json({ message: "Es necesario que introduzcas un horario" });
  }

  const query = `
    UPDATE establecimientos
    SET Horario_Apertura = ? , Horario_Cierre = ?
    WHERE ID_Establecimiento = ?
  `;

  connection.query(
    query,
    [Horario_Apertura, Horario_Cierre, ID_Establecimiento],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el horario" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Establecimiento no encontrado" });
      }
      res.json({ message: "Horario actualizado correctamente" });
    }
  );
};
exports.updateDescription = (req, res) => {
  const { Descripcion, ID_Establecimiento } = req.body;

  if (!Descripcion) {
    return res
      .status(400)
      .json({ message: "Es necesario que introduzcas una Descripcion" });
  }

  const query = `
    UPDATE establecimientos
    SET Descripcion = ?
    WHERE ID_Establecimiento = ?
  `;

  connection.query(query, [Descripcion, ID_Establecimiento], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al actualizar la descripcion" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Establecimiento no encontrado" });
    }
    res.json({ message: "Descripcion actualizada correctamente" });
  });
};
