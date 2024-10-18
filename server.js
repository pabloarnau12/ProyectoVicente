const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('console');

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
  database: 'glovopueblos' // Cambia esto según tu base de datos
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Rutas de la API
app.get('/api/productos/', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get('/api/tiendas/', (req, res) => {
  connection.query('SELECT * FROM establecimientos', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE ID_Producto = ?', [id], (err, results) => {
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


app.get('/api/tiendas/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM establecimientos WHERE ID_Establecimiento = ?', [id], (err, results) => {
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


app.get('/api/tiendas/:id/productos', (req, res) => { 
  const { id } = req.params;

  // Cambiamos la consulta para obtener los productos de la tienda
  connection.query('SELECT * FROM productos WHERE ID_Establecimiento = ?', [id], (err, results) => {
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

app.get('/api/tiendas/:id/productos/:idProducto', (req, res) => { 
  const { id, idProducto } = req.params;

  // Consulta modificada para obtener un producto específico de una tienda específica
  connection.query(
    'SELECT * FROM productos WHERE ID_Establecimiento = ? AND ID_Producto = ?', 
    [id, idProducto], 
    (err, results) => {
      if (err) {
        res.status(500).send('Error en la consulta: ' + err.message);
        return;
      }
      if (results.length === 0) {
        res.status(404).send('No se encontró el producto especificado para la tienda dada');
        return;
      }
      res.json(results[0]); // Devolvemos el producto encontrado
    }
  );
});


app.get('/api/calificaciones/', (req, res) => {
  connection.query('SELECT * FROM calificaciones', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});



// app.get('/api/calificaciones/:id', (req, res) => { 
//   const { id } = req.params;
//   connection.query('SELECT * FROM calificaciones WHERE ID_Establecimiento = ?', [id], (err, results) => {
//       if (err) {
//         res.status(500).send('Error en la consulta: ' + err.message);
//         return;
//       }

//       res.json(results); // Devolvemos las calificaciones encontradas
//     }
//   );
// });



app.get('/api/calificaciones/:id', (req, res) => { 
  const { id } = req.params;
  connection.query(
    'SELECT AVG(Calificacion_Establecimiento) AS media_calificacion FROM calificaciones WHERE ID_Establecimiento = ?', 
    [id], 
    (err, results) => {
      if (err) {
        res.status(500).send('Error en la consulta: ' + err.message);
        return;
      }

      let mediaCalificacion = 0;
      if (results.length > 0 && results[0].media_calificacion !== null) {
        // Convertimos a número si no lo es ya y redondeamos a 2 decimales
        mediaCalificacion = Number(results[0].media_calificacion);
        if (!isNaN(mediaCalificacion)) {
          mediaCalificacion = mediaCalificacion.toFixed(2);
        } else {
          mediaCalificacion = 0; // Si no es un número, lo establecemos a 0
        }
      }

      res.json({ media_calificacion: mediaCalificacion });
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});











// Ruta de registro
app.post('/api/registro', (req, res) => {
  const { nombre, apellidos, email, telefono, password } = req.body;
  
  if (!nombre || !apellidos || !email || !telefono || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Hash de la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el hash de la contraseña' });
    }

    // Insertar el nuevo usuario en la base de datos
    connection.query(
      'INSERT INTO usuarios (Nombre, Apellidos, Email, Telefono, Contraseña) VALUES (?, ?, ?, ?, ?)',
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
  console.log('Intento de login para:', email);

  if (!email || !password) {
    console.log('Email o contraseña faltantes');
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  // Buscar al usuario en la base de datos
  connection.query('SELECT * FROM usuarios WHERE Email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ message: 'Error al buscar el usuario' });
    }
    
    if (results.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = results[0];
    console.log('Usuario encontrado:', user.ID_Usuario);

    // Comparar la contraseña proporcionada con la almacenada
    bcrypt.compare(password, user.Contraseña, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ message: 'Error al comparar contraseñas' });
      }
      
      if (!isMatch) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }

      console.log('Login exitoso para el usuario:', user.ID_Usuario);

      // Crear un token JWT
      const token = jwt.sign({ id: user.ID_Usuario, email: user.Email }, 'tu_clave_secreta', { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

// Ruta protegida para obtener el perfil del usuario
app.get('/api/perfil/', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
 
  console.log(token);
  jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    console.log('Token decodificado:', decoded);
    connection.query('SELECT * FROM usuarios WHERE ID_Usuario = ?', [decoded.id], (err, results) => {
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
