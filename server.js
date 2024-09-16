const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

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


app.get('/api/tiendas/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM tiendas WHERE ID = ?', [id], (err, results) => {
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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
