const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Registro de usuario
exports.register = (req, res) => {
  const { nombre, apellidos, email, telefono, password } = req.body;
  if (!nombre || !apellidos || !email || !telefono || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error al crear el hash de la contraseña' });

    connection.query(
      'INSERT INTO usuarios (Nombre, Apellidos, Email, Telefono, Contraseña) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellidos, email, telefono, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      }
    );
  });
};

// Login de usuario
exports.login = (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM usuarios WHERE Email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al buscar el usuario' });

    if (results.length === 0) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

    const user = results[0];
    bcrypt.compare(password, user.Contraseña, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error al comparar contraseñas' });

      if (!isMatch) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

      const token = jwt.sign({ id: user.ID_Usuario, email: user.Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};
