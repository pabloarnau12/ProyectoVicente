-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2024 a las 23:56:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `glovopueblos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `ID_Calificacion` int(11) NOT NULL,
  `ID_Pedido` int(11) NOT NULL,
  `Calificacion_Establecimiento` int(11) DEFAULT NULL,
  `Calificacion_Repartidor` int(11) DEFAULT NULL,
  `Comentario` text DEFAULT NULL,
  `ID_Establecimiento` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`ID_Calificacion`, `ID_Pedido`, `Calificacion_Establecimiento`, `Calificacion_Repartidor`, `Comentario`, `ID_Establecimiento`) VALUES
(1, 1, 10, 4, 'Excelente comida y buen servicio', 1),
(2, 2, 8, 5, 'Entrega rápida y producto en buen estado', 1),
(3, 3, 6, 6, 'mu guapo mucha gracias', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
  `ID_Establecimiento` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Horario_Apertura` time NOT NULL,
  `Horario_Cierre` time NOT NULL,
  `Calificacion_Promedio` decimal(3,2) DEFAULT 0.00,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`ID_Establecimiento`, `Nombre`, `Tipo`, `Direccion`, `Telefono`, `Horario_Apertura`, `Horario_Cierre`, `Calificacion_Promedio`, `foto`) VALUES
(1, 'La Tasca del Pueblo', 'Supermercado', 'Calle del Sol 3, Pueblo A', '123987456', '20:00:00', '22:00:00', 0.00, '\\assets\\images\\entrada (1).png'),
(2, 'Farmacia San Juan', 'Supermercado', 'Avenida Libertad 7, Pueblo B', '456321789', '09:00:00', '20:00:00', 0.00, '\\assets\\images\\img_productos\\laurel.png'),
(3, 'Supermercado El Ahorro', 'Supermercado', 'Plaza Mayor 2, Pueblo C', '789654123', '11:00:00', '21:00:00', 0.00, '\\assets\\images\\banner1.png'),
(4, 'Abordo Maria', 'Supermercado', 'Avenida Castilla, 7 puerta 3', '654987321', '08:00:00', '22:00:00', 0.00, '\\assets\\images\\banner1.png'),
(5, 'Joso bujarra', 'Supermercado', 'Calle mis huevikos, 19 gol', '647539322', '08:00:00', '22:00:00', 0.00, '\\assets\\images\\banner1.png'),
(6, 'Cafetería El Descanso', 'Cafetería', 'Calle Olmo 14, Pueblo D', '659871234', '08:00:00', '23:00:00', 0.00, ''),
(7, 'Panadería La Espiga', 'Panadería', 'Calle Mayor 10, Pueblo E', '658741236', '06:00:00', '14:00:00', 0.00, ''),
(8, 'Restaurante La Brasa', 'Restaurante', 'Calle Real 7, Pueblo F', '657843921', '12:00:00', '23:00:00', 0.00, ''),
(9, 'Librería Central', 'Librería', 'Calle de los libros 25, Pueblo G', '652987412', '09:00:00', '19:00:00', 0.00, ''),
(10, 'Gimnasio Fitness Plus', 'Gimnasio', 'Avenida Deportes 3, Pueblo H', '632987451', '06:00:00', '22:00:00', 0.00, ''),
(11, 'Centro Médico Salus', 'Centro Médico', 'Calle Salud 11, Pueblo I', '642157894', '08:00:00', '18:00:00', 0.00, ''),
(12, 'Clínica Dental Sorriso', 'Clínica Dental', 'Plaza Sonrisa 5, Pueblo J', '651237894', '09:00:00', '19:00:00', 0.00, ''),
(13, 'Taller Mecánico Turbo', 'Taller Mecánico', 'Calle Motor 12, Pueblo K', '652987412', '08:00:00', '18:00:00', 0.00, ''),
(14, 'Bar Los Amigos', 'Bar', 'Calle Amistad 8, Pueblo L', '653214785', '12:00:00', '00:00:00', 0.00, ''),
(15, 'Floristería Las Rosas', 'Floristería', 'Calle Jardín 2, Pueblo M', '621478965', '09:00:00', '19:00:00', 0.00, ''),
(16, 'Pizzería Bella Napoli', 'Restaurante', 'Calle Italia 3, Pueblo N', '654123789', '13:00:00', '23:00:00', 0.00, ''),
(17, 'Supermercado Central', 'Supermercado', 'Calle Comercio 9, Pueblo O', '678953214', '08:00:00', '22:00:00', 0.00, ''),
(18, 'Heladería La Crema', 'Heladería', 'Plaza Fría 4, Pueblo P', '657483219', '11:00:00', '23:00:00', 0.00, ''),
(19, 'Papelería El Escriba', 'Papelería', 'Calle Tinta 7, Pueblo Q', '629783412', '09:00:00', '18:00:00', 0.00, ''),
(20, 'Zapatería Paso Firme', 'Zapatería', 'Calle Calzado 16, Pueblo R', '651298734', '10:00:00', '20:00:00', 0.00, ''),
(21, 'Boutique Chic', 'Ropa', 'Avenida Moda 10, Pueblo S', '653147892', '10:00:00', '20:00:00', 0.00, ''),
(22, 'Frutería El Huerto', 'Frutería', 'Calle Fruta 14, Pueblo T', '654871235', '07:00:00', '14:00:00', 0.00, ''),
(23, 'Restaurante El Sabor', 'Restaurante', 'Calle Sabor 21, Pueblo U', '657894213', '13:00:00', '23:00:00', 0.00, ''),
(24, 'Librería Letras', 'Librería', 'Avenida Palabras 13, Pueblo V', '621478965', '10:00:00', '18:00:00', 0.00, ''),
(25, 'Barbería El Corte', 'Barbería', 'Calle Afeitado 6, Pueblo W', '629783412', '09:00:00', '20:00:00', 0.00, ''),
(26, 'Carnicería El Bistec', 'Carnicería', 'Calle Carne 3, Pueblo X', '623478951', '09:00:00', '14:00:00', 0.00, ''),
(27, 'Tienda de Electrónica TecnoPlus', 'Electrónica', 'Avenida Tecnología 18, Pueblo Y', '634789125', '10:00:00', '21:00:00', 0.00, ''),
(28, 'Lavandería Rápido Limpio', 'Lavandería', 'Calle Lavado 12, Pueblo Z', '647298531', '07:00:00', '21:00:00', 0.00, ''),
(29, 'Cafetería La Taza', 'Cafetería', 'Plaza Central 9, Pueblo A1', '612478952', '08:00:00', '23:00:00', 0.00, ''),
(30, 'Farmacia Salud Viva', 'Farmacia', 'Avenida Medicina 2, Pueblo B1', '623147895', '08:00:00', '20:00:00', 0.00, ''),
(31, 'Ferretería La Llave', 'Ferretería', 'Calle Herramientas 17, Pueblo C1', '631478962', '09:00:00', '19:00:00', 0.00, ''),
(32, 'Peluquería Estilo', 'Peluquería', 'Calle Corte 11, Pueblo D1', '653789124', '09:00:00', '20:00:00', 0.00, ''),
(33, 'Centro Estético Belleza Total', 'Centro Estético', 'Avenida Belleza 8, Pueblo E1', '624789513', '10:00:00', '21:00:00', 0.00, ''),
(34, 'Auto Lavado Express', 'Lavado de Coches', 'Calle Vehículo 15, Pueblo F1', '621478596', '08:00:00', '20:00:00', 0.00, ''),
(35, 'Mercado Local', 'Mercado', 'Calle Comercio 20, Pueblo G1', '623478596', '07:00:00', '15:00:00', 0.00, ''),
(36, 'Tienda de Mascotas Peludos', 'Mascotas', 'Calle Animal 22, Pueblo H1', '622478596', '10:00:00', '19:00:00', 0.00, ''),
(37, 'Joyería Brillo', 'Joyería', 'Calle Oro 8, Pueblo I1', '634789521', '10:00:00', '20:00:00', 0.00, ''),
(38, 'Óptica Visión Clara', 'Óptica', 'Avenida Ojos 4, Pueblo J1', '612478596', '09:00:00', '18:00:00', 0.00, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritas_tiendas`
--

CREATE TABLE `favoritas_tiendas` (
  `ID_FavoritasTiendas` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `fecha_agregado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritas_tiendas`
--

INSERT INTO `favoritas_tiendas` (`ID_FavoritasTiendas`, `ID_Usuario`, `ID_Establecimiento`, `fecha_agregado`) VALUES
(72, 11, 10, '2024-11-15 18:07:13'),
(73, 11, 4, '2024-11-15 18:07:15'),
(79, 6, 4, '2024-11-19 23:51:09'),
(80, 6, 5, '2024-11-20 00:13:38'),
(81, 6, 2, '2024-11-20 00:26:28'),
(82, 18, 9, '2024-11-20 17:22:35'),
(84, 18, 1, '2024-11-21 12:30:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `ID_Pedido` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `Fecha_Hora_Pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estado_Pedido` enum('Pendiente','En proceso','En camino','Entregado','Cancelado') DEFAULT 'Pendiente',
  `Total` decimal(10,2) NOT NULL,
  `productos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productos`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`ID_Pedido`, `ID_Usuario`, `ID_Establecimiento`, `Fecha_Hora_Pedido`, `Estado_Pedido`, `Total`, `productos`) VALUES
(1, 6, 4, '2024-10-03 09:21:03', 'En proceso', 24.49, ''),
(2, 2, 16, '2024-10-03 09:21:03', 'Entregado', 3.99, ''),
(3, 6, 3, '2024-10-03 09:21:03', 'Pendiente', 35.75, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_productos`
--

CREATE TABLE `pedido_productos` (
  `ID` int(11) NOT NULL,
  `ID_Pedido` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `cantidad` tinyint(4) NOT NULL,
  `precio` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_productos`
--

INSERT INTO `pedido_productos` (`ID`, `ID_Pedido`, `ID_Producto`, `cantidad`, `precio`) VALUES
(1, 1, 1, 2, 3),
(2, 3, 5, 6, 6),
(3, 3, 25, 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ID_Producto` int(11) NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Disponibilidad` tinyint(1) DEFAULT 1,
  `Foto` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID_Producto`, `ID_Establecimiento`, `Nombre`, `Descripcion`, `Precio`, `Disponibilidad`, `Foto`, `Tipo`) VALUES
(1, 1, 'Paella', 'Paella valenciana tradicional', 15.99, 5, '\\assets\\images\\paella.png', 'guay'),
(2, 1, 'Tortilla española', 'Tortilla de patatas casera', 8.50, 12, '\\assets\\images\\tortillapatata.png', 'cbhuli'),
(3, 1, 'Paracetamol', 'Analgésico y antipirético', 3.99, 10, '\\assets\\images\\multivitaminico.jpg', 'asdf'),
(4, 3, 'Chorizos ', 'Chorizos de la granjaescula Mediterranea ficticia sistematica de estilo neutral in the night.', 6.99, 16, '\\assets\\images\\chorizos.png', 'hgfgh'),
(5, 1, 'Queso Manchego', 'Queso curado de oveja', 12.50, 8, '\\assets\\images\\queso_manchego.png', 'Lácteos'),
(6, 2, 'Ibuprofeno 600mg', 'Anti-inflamatorio de venta libre', 5.99, 20, '\\assets\\images\\ibuprofeno.png', 'Medicamento'),
(7, 2, 'Vitaminas C', 'Suplemento de Vitamina C 500mg', 9.50, 15, '\\assets\\images\\vitamina_c.png', 'Suplemento'),
(8, 3, 'Pan de Pueblo', 'Pan artesanal hecho a mano', 2.00, 25, '\\assets\\images\\pan_pueblo.png', 'Panadería'),
(9, 3, 'Aceite de Oliva Virgen Extra', 'Aceite de oliva de la mejor calidad', 7.99, 30, '\\assets\\images\\aceite_oliva.png', 'Aceites'),
(10, 4, 'Zumo de Naranja Natural', 'Zumo recién exprimido', 3.50, 18, '\\assets\\images\\zumo_naranja.png', 'Bebidas'),
(11, 5, 'Cerveza Artesanal', 'Cerveza local de malta', 2.99, 40, '\\assets\\images\\cerveza_artesanal.png', 'Bebidas'),
(12, 6, 'Café Americano', 'Café negro sin azúcar', 1.50, 60, '\\assets\\images\\cafe_americano.png', 'Bebidas'),
(13, 7, 'Baguette Integral', 'Pan integral crujiente', 1.25, 50, '\\assets\\images\\baguette_integral.png', 'Panadería'),
(14, 8, 'Pizza Margarita', 'Pizza clásica con tomate y queso', 9.99, 10, '\\assets\\images\\pizza_margarita.png', 'Comida rápida'),
(15, 9, 'Libro: El Quijote', 'Edición clásica de Don Quijote', 12.00, 15, '\\assets\\images\\el_quijote.png', 'Libros'),
(16, 9, 'Libro: 1984', 'Obra de George Orwell', 8.50, 20, '\\assets\\images\\1984.png', 'Libros'),
(17, 10, 'Protein Shake', 'Batido de proteínas para después del gimnasio', 4.99, 25, '\\assets\\images\\protein_shake.png', 'Suplementos'),
(18, 10, 'Barra Energética', 'Barra energética de chocolate y avena', 2.50, 35, '\\assets\\images\\barra_energetica.png', 'Snacks'),
(19, 11, 'Consulta General', 'Consulta médica general', 25.00, 0, '\\assets\\images\\consulta_general.png', 'Servicios Médicos'),
(20, 12, 'Limpieza Dental', 'Servicio de limpieza bucal profesional', 35.00, 0, '\\assets\\images\\limpieza_dental.png', 'Servicios'),
(21, 13, 'Cambio de Aceite', 'Servicio completo de cambio de aceite para coches', 45.00, 0, '\\assets\\images\\cambio_aceite.png', 'Servicios de Taller'),
(22, 14, 'Cerveza IPA', 'Cerveza artesanal IPA', 3.50, 50, '\\assets\\images\\ipa.png', 'Bebidas'),
(23, 15, 'Ramo de Rosas', 'Ramo de 12 rosas frescas', 15.00, 10, '\\assets\\images\\ramo_rosas.png', 'Flores'),
(24, 16, 'Pizza Hawaiana', 'Pizza con piña y jamón', 10.50, 8, '\\assets\\images\\pizza_hawaiana.png', 'Comida rápida'),
(25, 17, 'Leche Entera', 'Leche entera de vaca', 1.20, 100, '\\assets\\images\\leche.png', 'Lácteos'),
(26, 17, 'Arroz Integral', 'Arroz integral ecológico', 2.00, 45, '\\assets\\images\\arroz_integral.png', 'Cereales'),
(27, 18, 'Helado de Vainilla', 'Helado artesanal de vainilla', 3.75, 12, '\\assets\\images\\helado_vainilla.png', 'Postres'),
(28, 19, 'Bolígrafos Azules', 'Pack de 10 bolígrafos azules', 1.50, 30, '\\assets\\images\\boligrafos_azules.png', 'Papelería'),
(29, 19, 'Cuaderno A4', 'Cuaderno de 100 hojas tamaño A4', 3.00, 20, '\\assets\\images\\cuaderno.png', 'Papelería'),
(30, 20, 'Zapatos de Cuero', 'Zapatos de cuero marrón para hombre', 75.00, 5, '\\assets\\images\\zapatos_cuero.png', 'Calzado'),
(31, 21, 'Vestido de Verano', 'Vestido de verano floral', 40.00, 12, '\\assets\\images\\vestido_verano.png', 'Ropa'),
(32, 22, 'Manzanas Fuji', 'Manzanas frescas Fuji', 2.99, 60, '\\assets\\images\\manzanas_fuji.png', 'Frutas'),
(33, 23, 'Paella Mixta', 'Paella de mariscos y carne', 18.99, 8, '\\assets\\images\\paella_mixta.png', 'Comida'),
(34, 24, 'El Principito', 'Libro El Principito', 9.99, 25, '\\assets\\images\\principito.png', 'Libros'),
(35, 25, 'Corte de Cabello', 'Servicio de corte de cabello masculino', 15.00, 0, '\\assets\\images\\corte_cabello.png', 'Servicios'),
(36, 26, 'Costillas de Cerdo', 'Costillas de cerdo frescas', 8.99, 20, '\\assets\\images\\costillas.png', 'Carnes'),
(37, 27, 'Smartphone Android', 'Teléfono inteligente con Android', 299.00, 10, '\\assets\\images\\smartphone.png', 'Electrónica'),
(38, 28, 'Lavado Rápido', 'Lavado rápido para coches', 10.00, 0, '\\assets\\images\\lavado_rapido.png', 'Servicios'),
(39, 29, 'Café con Leche', 'Café con leche espumoso', 2.00, 50, '\\assets\\images\\cafe_leche.png', 'Bebidas'),
(40, 30, 'Termómetro Digital', 'Termómetro digital de precisión', 12.99, 15, '\\assets\\images\\termometro_digital.png', 'Equipos médicos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `ID_rol` tinyint(4) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID_rol`, `Nombre`, `Descripcion`) VALUES
(1, 'repartidores', 'Este rol es para los repartidores'),
(2, 'Admin', '[soi io]'),
(3, 'Usuarios', '[Cuenta para los usuarios]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Fecha_Registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_picture` varchar(255) NOT NULL,
  `vehiculo` varchar(255) DEFAULT NULL,
  `estado` enum('activo','ocupado','recogiendo pedido','en camino') DEFAULT NULL,
  `calificacion_promedio` tinyint(4) DEFAULT NULL,
  `ID_ROL` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_Usuario`, `Nombre`, `Apellidos`, `Email`, `Telefono`, `Direccion`, `Contraseña`, `Fecha_Registro`, `profile_picture`, `vehiculo`, `estado`, `calificacion_promedio`, `ID_ROL`) VALUES
(1, 'María', 'González', 'maria@email.com', '123456789', 'Calle Mayor 1, Pueblo A', 'contraseña_hash_1', '2024-10-03 09:20:06', '', 'bicicleta', 'activo', NULL, 1),
(2, 'Juan', 'Martínez', 'juan@email.com', '987654321', 'Plaza Central 5, Pueblo B', 'contraseña_hash_2', '2024-10-03 09:20:06', '', 'moto', 'ocupado', NULL, 1),
(3, 'Ana', 'López', 'ana@email.com', '456789123', 'Avenida Principal 10, Pueblo C', '$2b$10$SPfCyfzTAbgl7ux./DaaXuhSS3gSmi3io1flMmv3SZBlxZ9tFktQe', '2024-10-03 09:20:06', '0', NULL, NULL, NULL, NULL),
(5, 'Julen', 'alonso', '654', 'julenmj@gmail.c', '', '$2b$10$bWBnvotI5DHtieCfzQiEGui0/Kxp7h4pclhc69E1uwRchR31AQ9aK', '2024-10-08 11:27:09', '', NULL, NULL, NULL, NULL),
(6, 'admin', 'admin', 'admin@gmail.com', '83838', 'casa', '$2b$10$I5zJS09SxgY.l/AaHRyMdO2z6XjD9T8//an8RHz5uwFTZqeIWYuf.', '2024-10-08 11:40:57', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1732115190/profile_pictures/user_6.jpg', NULL, NULL, NULL, 3),
(11, 'Pablo', 'Arnau Lopez', 'pabloarlo00@gmail.com', '646836481', 'asdf', '$2b$10$xIeHT0pe.nHnKl6.0lm6UuempoL4PXThrob6o7tywpHa3CNg5Yp6q', '2024-10-29 13:15:13', '', NULL, NULL, NULL, NULL),
(12, 'prueba', 'foto perfil', 'pruebafoto@gmail.com', '6468348', '', '$2b$10$uotjzUkWWuR4qSiF8d5qOuB.Amlzub9rgVh5onP2ASll5RA1XqPhe', '2024-11-15 16:59:51', '', NULL, NULL, NULL, NULL),
(13, 'joso', 'loepz', 'joso@gmail.com', '645', '', '$2b$10$hoinzwVtn2mL90WpAgSpxuK./Dco5EjXPM3R82eJqri.sA/G3UVZq', '2024-11-15 18:31:46', '', NULL, NULL, NULL, NULL),
(14, 'pablo', 'garcia', 'pablo{{ 2*2 }}@gmail.com', '83838', '', '$2b$10$N/cOgO5BnBdBSlDVaLE.GOBMgnzLqKKv4SPUT3Q6dufZv.1hXQljO', '2024-11-16 12:59:50', '', NULL, NULL, NULL, NULL),
(15, '{{2*2 }}', '{{ 2 * 2 }}', '{{ 2*2 }}@gmail.com', '{{2 * 2}', 'asdfasdf', '$2b$10$VE3mjVixqe.dIOp1vwkXPuUhaL2UtI5.DqJkvR63nJdwSK7hNBvNC', '2024-11-16 13:02:53', '', NULL, NULL, NULL, NULL),
(16, 'pruebaloading', 'pruebaloading', 'loading@gmail.com', '1272', '', '$2b$10$xDojRbsjYIrdmcqpb9SfpOri1QQkVb6HSosId0d/Nnn9mEaH9iSYi', '2024-11-16 13:15:46', '', NULL, NULL, NULL, NULL),
(17, 'pruieba2', 'prueba2', 'prueba2@gmail.com', '1231', '', '$2b$10$806Gf5O.CbMVggDY567EGenGV7rucYMGXyz/VSx0gVPvA199THzUW', '2024-11-16 13:18:04', '', NULL, NULL, NULL, NULL),
(18, 'repartidor', 'repartidor', 'repartidor@gmail.com', '6', 'ocupado', '$2b$10$RTbZ2o0b0pdulftrYuUJEu5U25nZN4ra.8RZM/ZcHKDjbx4kUnNJq', '2024-11-20 14:45:24', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1732115433/profile_pictures/user_18.jpg', 'moto', 'recogiendo pedido', NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`ID_Calificacion`),
  ADD KEY `ID_Pedido` (`ID_Pedido`);

--
-- Indices de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD PRIMARY KEY (`ID_Establecimiento`);

--
-- Indices de la tabla `favoritas_tiendas`
--
ALTER TABLE `favoritas_tiendas`
  ADD PRIMARY KEY (`ID_FavoritasTiendas`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `ID_Establecimiento` (`ID_Establecimiento`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`ID_Pedido`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `ID_Establecimiento` (`ID_Establecimiento`);

--
-- Indices de la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Pedido` (`ID_Pedido`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Establecimiento` (`ID_Establecimiento`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `fk_roles` (`ID_ROL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `ID_Calificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `ID_Establecimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `favoritas_tiendas`
--
ALTER TABLE `favoritas_tiendas`
  MODIFY `ID_FavoritasTiendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID_Pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_rol` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedidos` (`ID_Pedido`);

--
-- Filtros para la tabla `favoritas_tiendas`
--
ALTER TABLE `favoritas_tiendas`
  ADD CONSTRAINT `favoritas_tiendas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  ADD CONSTRAINT `favoritas_tiendas_ibfk_2` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimientos` (`ID_Establecimiento`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimientos` (`ID_Establecimiento`);

--
-- Filtros para la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  ADD CONSTRAINT `pedido_productos_ibfk_1` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedidos` (`ID_Pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedido_productos_ibfk_2` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimientos` (`ID_Establecimiento`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_roles` FOREIGN KEY (`ID_ROL`) REFERENCES `roles` (`ID_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
