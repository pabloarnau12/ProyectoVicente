-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 23:27:24
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
-- Estructura de tabla para la tabla `categorias_establecimientos`
--

CREATE TABLE `categorias_establecimientos` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_establecimientos`
--

INSERT INTO `categorias_establecimientos` (`ID_Categoria`, `Nombre`, `Descripcion`) VALUES
(1, 'Supermercado', 'Tiendas que venden alimentos, productos de higiene y artículos de consumo diario.'),
(2, 'Restaurante', 'Establecimientos donde se sirven comidas y bebidas para ser consumidas en el lugar.'),
(3, 'Farmacia', 'Tiendas que venden medicamentos, productos de salud y cuidado personal.'),
(4, 'Panadería', 'Tiendas especializadas en la venta de pan, pasteles, y otros productos de panadería.'),
(5, 'Carnicería', 'Tiendas que venden carne y productos cárnicos frescos.'),
(6, 'Ferretería', 'Tiendas que venden herramientas, materiales de construcción y artículos de mejoras para el hogar.'),
(7, 'Librería', 'Tiendas que venden libros, cuadernos, material escolar y de oficina.'),
(8, 'Bazar', 'Tiendas que venden artículos diversos, desde decoraciones hasta utensilios domésticos.'),
(9, 'Tienda de Ropa', 'Establecimientos que venden prendas de vestir y accesorios de moda.'),
(10, 'Tiendas de Electrónica', 'Tiendas que venden productos electrónicos como teléfonos, computadoras, cámaras, etc.'),
(11, 'Zapatería', 'Tiendas especializadas en la venta de calzado de todo tipo.'),
(12, 'Juguetería', 'Tiendas que venden juguetes para niños, juegos y productos de entretenimiento.'),
(13, 'Peluquería', 'Establecimientos dedicados al corte de cabello y servicios de estilismo personal.'),
(14, 'Barbería', 'Tiendas especializadas en cortes de cabello y afeitado para hombres.'),
(15, 'Vivero', 'Tiendas que venden plantas, flores y todo lo relacionado con la jardinería.'),
(16, 'Estética y Belleza', 'Tiendas que ofrecen productos cosméticos, de belleza y cuidado personal.'),
(17, 'Limpieza y Hogar', 'Tiendas que venden productos de limpieza y artículos para el hogar.'),
(18, 'Tienda de Muebles', 'Tiendas especializadas en la venta de muebles y decoración para el hogar.'),
(19, 'Papelería', 'Establecimientos que venden productos de papelería, material escolar y de oficina.'),
(20, 'Alimentos y Bebidas', 'Tiendas que venden productos alimenticios y bebidas para consumo inmediato.'),
(21, 'Automotriz', 'Tiendas que ofrecen repuestos, accesorios y servicios relacionados con vehículos.'),
(22, 'Mascotas', 'Establecimientos dedicados a la venta de productos para el cuidado y alimentación de mascotas.'),
(23, 'Tienda de Productos Locales', 'Tiendas que venden productos regionales, artesanías y souvenirs del área.'),
(24, 'Regalos y Souvenirs', 'Tiendas que ofrecen artículos para regalar o como recuerdos de la localidad.'),
(25, 'Tiendas de Deportes', 'Tiendas especializadas en artículos deportivos, ropa y accesorios para actividades al aire libre.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
  `ID_Establecimiento` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Horario_Apertura` time NOT NULL,
  `Horario_Cierre` time NOT NULL,
  `Calificacion_Promedio` decimal(3,2) DEFAULT 0.00,
  `foto` varchar(255) NOT NULL,
  `Categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`ID_Establecimiento`, `Nombre`, `Direccion`, `Telefono`, `Horario_Apertura`, `Horario_Cierre`, `Calificacion_Promedio`, `foto`, `Categoria`) VALUES
(1, 'La Tasca del Pueblo', 'Calle del Sol 3, Pueblo A', '123987456', '20:00:00', '22:00:00', 0.00, '\\assets\\images\\entrada (1).png', 1),
(2, 'Farmacia San Juan', 'Avenida Libertad 7, Pueblo B', '456321789', '09:00:00', '20:00:00', 0.00, '\\assets\\images\\img_productos\\laurel.png', 3),
(3, 'Supermercado El Ahorro', 'Plaza Mayor 2, Pueblo C', '789654123', '11:00:00', '21:00:00', 0.00, '\\assets\\images\\banner1.png', 1),
(4, 'Abordo Maria', 'Avenida Castilla, 7 puerta 3', '654987321', '08:00:00', '22:00:00', 0.00, '\\assets\\images\\banner1.png', 24),
(5, 'Joso bujarra', 'Calle mis huevikos, 19 gol', '647539322', '08:00:00', '22:00:00', 0.00, '\\assets\\images\\banner1.png', 13),
(6, 'Cafetería El Descanso', 'Calle Olmo 14, Pueblo D', '659871234', '08:00:00', '23:00:00', 0.00, '', 5),
(7, 'Panadería La Espiga', 'Calle Mayor 10, Pueblo E', '658741236', '06:00:00', '14:00:00', 0.00, '', 4),
(8, 'Restaurante La Brasa', 'Calle Real 7, Pueblo F', '657843921', '12:00:00', '23:00:00', 0.00, '', 2),
(9, 'Librería Central', 'Calle de los libros 25, Pueblo G', '652987412', '09:00:00', '19:00:00', 0.00, '', 7),
(10, 'Gimnasio Fitness Plus', 'Avenida Deportes 3, Pueblo H', '632987451', '06:00:00', '22:00:00', 0.00, '', 10),
(11, 'Centro Médico Salus', 'Calle Salud 11, Pueblo I', '642157894', '08:00:00', '18:00:00', 0.00, '', 19),
(12, 'Clínica Dental Sorriso', 'Plaza Sonrisa 5, Pueblo J', '651237894', '09:00:00', '19:00:00', 0.00, '', 19),
(13, 'Taller Mecánico Turbo', 'Calle Motor 12, Pueblo K', '652987412', '08:00:00', '18:00:00', 0.00, '', 2),
(14, 'Bar Los Amigos', 'Calle Amistad 8, Pueblo L', '653214785', '12:00:00', '00:00:00', 0.00, '', 12),
(15, 'Floristería Las Rosas', 'Calle Jardín 2, Pueblo M', '621478965', '09:00:00', '19:00:00', 0.00, '', 6),
(16, 'Pizzería Bella Napoli', 'Calle Italia 3, Pueblo N', '654123789', '13:00:00', '23:00:00', 0.00, '', 14),
(17, 'Supermercado Central', 'Calle Comercio 9, Pueblo O', '678953214', '08:00:00', '22:00:00', 0.00, '', 1),
(18, 'Heladería La Crema', 'Plaza Fría 4, Pueblo P', '657483219', '11:00:00', '23:00:00', 0.00, '', 4),
(19, 'Papelería El Escriba', 'Calle Tinta 7, Pueblo Q', '629783412', '09:00:00', '18:00:00', 0.00, '', 19),
(20, 'Zapatería Paso Firme', 'Calle Calzado 16, Pueblo R', '651298734', '10:00:00', '20:00:00', 0.00, '', 16),
(21, 'Boutique Chic', 'Avenida Moda 10, Pueblo S', '653147892', '10:00:00', '20:00:00', 0.00, '', 18),
(22, 'Frutería El Huerto', 'Calle Fruta 14, Pueblo T', '654871235', '07:00:00', '14:00:00', 0.00, '', 14),
(23, 'Restaurante El Sabor', 'Calle Sabor 21, Pueblo U', '657894213', '13:00:00', '23:00:00', 0.00, '', 4),
(24, 'Librería Letras', 'Avenida Palabras 13, Pueblo V', '621478965', '10:00:00', '18:00:00', 0.00, '', 21),
(25, 'Barbería El Corte', 'Calle Afeitado 6, Pueblo W', '629783412', '09:00:00', '20:00:00', 0.00, '', 20),
(26, 'Carnicería El Bistec', 'Calle Carne 3, Pueblo X', '623478951', '09:00:00', '14:00:00', 0.00, '', 17),
(27, 'Tienda de Electrónica TecnoPlus', 'Avenida Tecnología 18, Pueblo Y', '634789125', '10:00:00', '21:00:00', 0.00, '', 18),
(28, 'Lavandería Rápido Limpio', 'Calle Lavado 12, Pueblo Z', '647298531', '07:00:00', '21:00:00', 0.00, '', 2),
(29, 'Cafetería La Taza', 'Plaza Central 9, Pueblo A1', '612478952', '08:00:00', '23:00:00', 0.00, '', 2),
(30, 'Farmacia Salud Viva', 'Avenida Medicina 2, Pueblo B1', '623147895', '08:00:00', '20:00:00', 0.00, '', 18),
(31, 'Ferretería La Llave', 'Calle Herramientas 17, Pueblo C1', '631478962', '09:00:00', '19:00:00', 0.00, '', 1),
(32, 'Peluquería Estilo', 'Calle Corte 11, Pueblo D1', '653789124', '09:00:00', '20:00:00', 0.00, '', 1),
(33, 'Centro Estético Belleza Total', 'Avenida Belleza 8, Pueblo E1', '624789513', '10:00:00', '21:00:00', 0.00, '', 22),
(34, 'Auto Lavado Express', 'Calle Vehículo 15, Pueblo F1', '621478596', '08:00:00', '20:00:00', 0.00, '', 3),
(35, 'Mercado Local', 'Calle Comercio 20, Pueblo G1', '623478596', '07:00:00', '15:00:00', 0.00, '', 21),
(36, 'Tienda de Mascotas Peludos', 'Calle Animal 22, Pueblo H1', '622478596', '10:00:00', '19:00:00', 0.00, '', 20),
(37, 'Joyería Brillo', 'Calle Oro 8, Pueblo I1', '634789521', '10:00:00', '20:00:00', 0.00, '', 23),
(38, 'Óptica Visión Clara', 'Avenida Ojos 4, Pueblo J1', '612478596', '09:00:00', '18:00:00', 0.00, '', 5);

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
(82, 18, 9, '2024-11-20 17:22:35'),
(84, 18, 1, '2024-11-21 12:30:44'),
(90, 6, 5, '2024-12-03 18:07:53');

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
  `productos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productos`)),
  `payment_id` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`ID_Pedido`, `ID_Usuario`, `ID_Establecimiento`, `Fecha_Hora_Pedido`, `Estado_Pedido`, `Total`, `productos`, `payment_id`, `Direccion`) VALUES
(4, 6, 1, '2024-11-26 12:50:19', 'En proceso', 12.49, '[{\"name\":\"Tortilla española\",\"sku\":\"2\",\"price\":\"8.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1,\"image_url\":\"\"},{\"name\":\"Paracetamol\",\"sku\":\"3\",\"price\":\"3.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1,\"image_url\":\"\"}]', 'PAYID-M5C4IAY1BV72026Y69435416', ''),
(5, 18, 1, '2024-11-26 21:27:51', 'En proceso', 20.99, '[{\"name\":\"Tortilla española\",\"sku\":\"2\",\"price\":\"8.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2,\"image_url\":\"\"},{\"name\":\"Paracetamol\",\"sku\":\"3\",\"price\":\"3.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1,\"image_url\":\"\"}]', 'PAYID-M5DD2RQ1M9752336B916191E', ''),
(6, 6, 1, '2024-11-28 18:53:45', 'Pendiente', 12.49, '[{\"name\":\"Tortilla española\",\"sku\":\"2\",\"price\":\"8.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1,\"image_url\":\"\"},{\"name\":\"Paracetamol\",\"sku\":\"3\",\"price\":\"3.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1,\"image_url\":\"\"}]', 'PAYID-M5ELYKQ1J659179LC9388012', 'C/ Enrique Tierno Galvan Cheste, 7');

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
(6, 'admin', 'admin', 'admin@gmail.com', '83838', 'asdf', '$2b$10$I5zJS09SxgY.l/AaHRyMdO2z6XjD9T8//an8RHz5uwFTZqeIWYuf.', '2024-10-08 11:40:57', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1733244931/profile_pictures/user_6.jpg', NULL, NULL, NULL, 3),
(11, 'Pablo', 'Arnau Lopez', 'pabloarlo00@gmail.com', '646836481', 'asdf', '$2b$10$xIeHT0pe.nHnKl6.0lm6UuempoL4PXThrob6o7tywpHa3CNg5Yp6q', '2024-10-29 13:15:13', '', NULL, NULL, NULL, NULL),
(12, 'prueba', 'foto perfil', 'pruebafoto@gmail.com', '6468348', '', '$2b$10$uotjzUkWWuR4qSiF8d5qOuB.Amlzub9rgVh5onP2ASll5RA1XqPhe', '2024-11-15 16:59:51', '', NULL, NULL, NULL, NULL),
(13, 'joso', 'loepz', 'joso@gmail.com', '645', '', '$2b$10$hoinzwVtn2mL90WpAgSpxuK./Dco5EjXPM3R82eJqri.sA/G3UVZq', '2024-11-15 18:31:46', '', NULL, NULL, NULL, NULL),
(14, 'pablo', 'garcia', 'pablo{{ 2*2 }}@gmail.com', '83838', '', '$2b$10$N/cOgO5BnBdBSlDVaLE.GOBMgnzLqKKv4SPUT3Q6dufZv.1hXQljO', '2024-11-16 12:59:50', '', NULL, NULL, NULL, NULL),
(15, '{{2*2 }}', '{{ 2 * 2 }}', '{{ 2*2 }}@gmail.com', '{{2 * 2}', 'asdfasdf', '$2b$10$VE3mjVixqe.dIOp1vwkXPuUhaL2UtI5.DqJkvR63nJdwSK7hNBvNC', '2024-11-16 13:02:53', '', NULL, NULL, NULL, NULL),
(16, 'pruebaloading', 'pruebaloading', 'loading@gmail.com', '1272', '', '$2b$10$xDojRbsjYIrdmcqpb9SfpOri1QQkVb6HSosId0d/Nnn9mEaH9iSYi', '2024-11-16 13:15:46', '', NULL, NULL, NULL, NULL),
(17, 'pruieba2', 'prueba2', 'prueba2@gmail.com', '1231', '', '$2b$10$806Gf5O.CbMVggDY567EGenGV7rucYMGXyz/VSx0gVPvA199THzUW', '2024-11-16 13:18:04', '', NULL, NULL, NULL, NULL),
(18, 'repartidor', 'repartidor', 'repartidor@gmail.com', '6', 'ocupado', '$2b$10$RTbZ2o0b0pdulftrYuUJEu5U25nZN4ra.8RZM/ZcHKDjbx4kUnNJq', '2024-11-20 14:45:24', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1732115433/profile_pictures/user_18.jpg', 'moto', 'en camino', NULL, 1);

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
-- Indices de la tabla `categorias_establecimientos`
--
ALTER TABLE `categorias_establecimientos`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD PRIMARY KEY (`ID_Establecimiento`),
  ADD KEY `fk_categoria` (`Categoria`);

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
-- AUTO_INCREMENT de la tabla `categorias_establecimientos`
--
ALTER TABLE `categorias_establecimientos`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `ID_Establecimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `favoritas_tiendas`
--
ALTER TABLE `favoritas_tiendas`
  MODIFY `ID_FavoritasTiendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID_Pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Filtros para la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`Categoria`) REFERENCES `categorias_establecimientos` (`ID_Categoria`);

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
