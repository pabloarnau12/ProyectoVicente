const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Para cargar las variables de entorno

// Middleware
app.use(express.json());
app.use(cors());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const tiendasRoutes = require('./routes/tiendasRoutes');
const calificacionesRoutes = require('./routes/calificacionesRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/tiendas', tiendasRoutes); // Rutas para tiendas
app.use('/api/calificaciones', calificacionesRoutes); // Rutas para calificaciones

// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
