const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const productosRoutes = require("./routes/productosRoutes");
const tiendasRoutes = require("./routes/tiendasRoutes");
const calificacionesRoutes = require("./routes/calificacionesRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");
const favoriteShopsRoutes = require("./routes/favoriteshopsRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const promocionesRoutes = require("./routes/promocionesRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/tiendas", tiendasRoutes);
app.use("/api/calificaciones", calificacionesRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/favorite_shops", favoriteShopsRoutes);
app.use("/api/upload", cloudinaryRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/promociones", promocionesRoutes);

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
