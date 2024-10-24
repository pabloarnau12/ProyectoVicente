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
// const perfilRoutes = require('./routes/perfilRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/tiendas', tiendasRoutes);
app.use('/api/calificaciones', calificacionesRoutes);
// app.use('/api/perfil', perfilRoutes);  // Protegida por JWT

// Servidor
const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
