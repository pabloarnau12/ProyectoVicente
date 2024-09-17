const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON
app.use(cors()); // Para permitir solicitudes desde el frontend

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto según tu configuración
  database: 'reparto' // Cambia esto según tu base de datos
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Rutas de la API
app.get('/api/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get('/api/tiendas', (req, res) => {
  connection.query('SELECT * FROM tiendas', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE ID = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Producto no encontrado');
      return;
    }
    res.json(results[0]);
  });
});


app.get('/api/tiendas/:nombre', (req, res) => {
  const { nombre } = req.params;
  connection.query('SELECT * FROM tiendas WHERE nombre = ?', [nombre], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('tienda no encontrada');
      return;
    }
    res.json(results[0]);
  });
});


app.get('/api/tiendas/:nombre/productos', (req, res) => { 
  const { nombre } = req.params;

  // Cambiamos la consulta para obtener los productos de la tienda
  connection.query('SELECT * FROM productos WHERE tienda_nombre = ?', [nombre], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No se encontraron productos para la tienda especificada');
      return;
    }
    res.json(results); // Devolvemos todos los productos
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});









// Ruta de registro
app.post('/api/registro', (req, res) => {
  const { nombre, apellidos, telefono, email, password } = req.body;
  
  if (!nombre || !apellidos || !telefono || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Hash de la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el hash de la contraseña' });
    }

    // Insertar el nuevo usuario en la base de datos
    connection.query(
      'INSERT INTO usuarios (nombre, apellidos, telefono, email, password) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellidos, telefono, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      }
    );
  });
});

// Ruta de inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  // Buscar al usuario en la base de datos
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al buscar el usuario' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = results[0];

    // Comparar la contraseña proporcionada con la almacenada
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error al comparar contraseñas' });
      }
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }

      // Crear un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, 'tu_clave_secreta', { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

// Ruta protegida para obtener el perfil del usuario
app.get('/api/perfil', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    connection.query('SELECT * FROM usuarios WHERE id = ?', [decoded.id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener el perfil' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(results[0]);
    });
  });
});
