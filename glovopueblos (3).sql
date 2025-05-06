-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2025 a las 12:59:44
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
-- Estructura de tabla para la tabla `calificaciones_establecimientos`
--

CREATE TABLE `calificaciones_establecimientos` (
  `ID_Calificacion` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Calificacion_Establecimiento` int(11) NOT NULL,
  `Comentario` text NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `Fecha_Calificacion` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones_establecimientos`
--

INSERT INTO `calificaciones_establecimientos` (`ID_Calificacion`, `ID_Usuario`, `Calificacion_Establecimiento`, `Comentario`, `ID_Establecimiento`, `Fecha_Calificacion`) VALUES
(14, 6, 5, 'Cada vez este bar me gusta mas', 1, '2024-12-10'),
(15, 6, 1, 'no me gusta nada este restaurante', 1, '2024-12-10'),
(16, 6, 1, 'no me gusta nada este restaurante', 1, '2024-12-10'),
(17, 6, 1, 'no me gusta nada este restaurante', 1, '2024-12-10'),
(18, 6, 4, 'es broma si me gusta', 1, '2024-12-10'),
(19, 6, 3, 'esta es una de mis tiendas favoritas, me encanta todo lo que hacen, es una farmacia 10/10', 2, '2024-12-11'),
(20, 6, 4, 'asdf', 2, '2024-12-11'),
(21, 6, 4, 'bien', 2, '2024-12-11'),
(22, 6, 5, 'una pelu que te deja el pelo melo melo', 5, '2024-12-23'),
(23, 6, 5, 'la vrd que esta peluqueria me flipa la pipa', 5, '2024-12-23'),
(24, 19, 4, 'Muy bien este restaurante', 1, '2024-12-24'),
(25, 6, 3, 'No está mal', 6, '2024-12-25'),
(26, 6, 1, 'mal servicio', 8, '2024-12-26'),
(27, 6, 2, 'medio medio', 13, '2024-12-26'),
(28, 6, 4, 'este restaurante está bastante bien', 28, '2024-12-26'),
(29, 6, 5, 'El mejor restaurante al que he asistido', 29, '2024-12-26'),
(30, 6, 4, 'muy bien', 25, '2024-12-26'),
(31, 23, 4, 'MUY BUENO', 1, '2025-01-22'),
(32, 6, 3, 'i dont like this restaurant\n', 1, '2025-01-28'),
(35, 24, 4, 'Que experiencia más buena!', 1, '2025-04-23'),
(37, 6, 4, 'todo bien', 1, '2025-04-29'),
(39, 24, 4, 'todo bien', 5, '2025-05-01');

--
-- Disparadores `calificaciones_establecimientos`
--
DELIMITER $$
CREATE TRIGGER `actualizar_media_establecimiento` AFTER INSERT ON `calificaciones_establecimientos` FOR EACH ROW BEGIN
    UPDATE establecimientos
    SET Calificacion_Promedio = (
        SELECT AVG(Calificacion_Establecimiento)
        FROM calificaciones_establecimientos
        WHERE ID_Establecimiento = NEW.ID_Establecimiento
    )
    WHERE ID_Establecimiento = NEW.Id_Establecimiento;
END
$$
DELIMITER ;

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
  `Categoria` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Descripcion` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`ID_Establecimiento`, `Nombre`, `Direccion`, `Telefono`, `Horario_Apertura`, `Horario_Cierre`, `Calificacion_Promedio`, `foto`, `Categoria`, `ID_Usuario`, `Descripcion`) VALUES
(1, 'La Tasca del Pueblo', 'Calle del Sol 3, Pueblo A', '123987456', '12:10:00', '21:09:00', 3.25, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746097576/shops/shop_1.jpg', 1, 6, 'Esta es una descripcion de prueba para este tienda, estoy haciendolo para comprobar si el metodo de editar descripcion dentro de el perfil de admin sirve, si no sirve es una liada la verdad, espero que no me de error'),
(2, 'Farmacia San Juan', 'Avenida Libertad 7, Pueblo B', '456321789', '09:00:00', '20:00:00', 4.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526155/62be7acf-ddab-4f6f-9b7c-8ffec43ab87e.png', 3, NULL, ''),
(3, 'Supermercado El Ahorro', 'Plaza Mayor 2, Pueblo C', '789654123', '11:00:00', '21:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526227/02b38614-ae44-4f06-b75d-8c40706a7d2f.png', 1, NULL, ''),
(4, 'Abordo Maria', 'Avenida Castilla, 7 puerta 3', '654987321', '08:00:00', '22:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526574/5a2e6c49-9745-4311-b2a2-b1a5a4e2c40a.png', 24, 23, 'esta tienda no tenia descripcion asi que yo creo que es hora de añadirle una no crees?'),
(5, 'Tienda de prubea', 'Calle de prueba, 6', '647539322', '08:00:00', '22:00:00', 4.67, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526619/efbba9cd-77dd-4aaa-8173-dc7bd18069bc.png', 13, NULL, ''),
(6, 'Cafetería El Descanso', 'Calle Olmo 14, Pueblo D', '659871234', '08:00:00', '23:00:00', 3.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526668/76a80b0f-b2fe-4247-8400-ded582d6f579.png', 5, NULL, ''),
(7, 'Panadería La Espiga', 'Calle Mayor 10, Pueblo E', '658741236', '06:00:00', '14:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526710/c58c8849-e908-4924-821b-9ff2be3595dd.png', 4, NULL, ''),
(8, 'Restaurante La Brasa', 'Calle Real 7, Pueblo F', '657843921', '12:00:00', '23:00:00', 1.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526733/91501391-09c6-4b8b-835a-329c92992967.png', 2, NULL, ''),
(9, 'Librería Central', 'Calle de los libros 25, Pueblo G', '652987412', '09:00:00', '19:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526761/93a494d4-fdcd-484d-80e5-6fc0c535abef.png', 7, NULL, ''),
(10, 'Gimnasio Fitness Plus', 'Avenida Deportes 3, Pueblo H', '632987451', '06:00:00', '22:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526800/26f0b7fe-9611-47cc-b4dd-f45f2d03102a.png', 10, NULL, ''),
(11, 'Centro Médico Salus', 'Calle Salud 11, Pueblo I', '642157894', '08:00:00', '18:00:00', 0.00, '', 19, NULL, ''),
(12, 'Clínica Dental Sorriso', 'Plaza Sonrisa 5, Pueblo J', '651237894', '09:00:00', '19:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526855/19102a3e-d7ab-4598-a38b-7a695b0f8bca.png', 19, NULL, ''),
(13, 'Taller Mecánico Turbo', 'Calle Motor 12, Pueblo K', '652987412', '08:00:00', '18:00:00', 2.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526994/f41445e6-edf3-4a43-b8b0-11856f4027f3.png', 2, NULL, ''),
(14, 'Bar Los Amigos', 'Calle Amistad 8, Pueblo L', '653214785', '12:00:00', '00:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527024/a1199eaa-c0a3-465e-8bb7-bd29a0a31c22.png', 12, NULL, ''),
(15, 'Floristería Las Rosas', 'Calle Jardín 2, Pueblo M', '621478965', '09:00:00', '19:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527063/a72e874d-23d2-49fb-ba25-db7975518244.png', 6, NULL, ''),
(16, 'Pizzería Bella Napoli', 'Calle Italia 3, Pueblo N', '654123789', '13:00:00', '23:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527125/c5a70a6e-f96f-43b3-8bea-938e5a4d79bf.png', 14, NULL, ''),
(17, 'Supermercado Central', 'Calle Comercio 9, Pueblo O', '678953214', '08:00:00', '22:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527143/fb81518e-ae37-4ea9-a386-3b13956233ed.png', 1, NULL, ''),
(18, 'Heladería La Crema', 'Plaza Fría 4, Pueblo P', '657483219', '11:00:00', '23:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527166/66fd7741-94c6-48c0-88b3-6a15b8059aae.png', 4, NULL, ''),
(19, 'Papelería El Escriba', 'Calle Tinta 7, Pueblo Q', '629783412', '09:00:00', '18:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527187/4a690878-915d-4bec-8c09-7bce9119ef85.png', 19, NULL, ''),
(20, 'Zapatería Paso Firme', 'Calle Calzado 16, Pueblo R', '651298734', '10:00:00', '20:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527207/a3e4fe91-ea57-4777-a3e9-1775e80713b6.png', 16, NULL, ''),
(21, 'Boutique Chic', 'Avenida Moda 10, Pueblo S', '653147892', '10:00:00', '20:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527230/b20e9413-3d11-4ce6-a2ca-bb7df687bdc8.png', 18, NULL, ''),
(22, 'Frutería El Huerto', 'Calle Fruta 14, Pueblo T', '654871235', '07:00:00', '14:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527256/9bab0f76-9eac-4ee0-996c-b162d8f87b32.png', 14, NULL, ''),
(23, 'Restaurante El Sabor', 'Calle Sabor 21, Pueblo U', '657894213', '13:00:00', '23:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527282/2fee5337-ef3d-4824-8f0d-c80e1754af9f.png', 4, NULL, ''),
(24, 'Librería Letras', 'Avenida Palabras 13, Pueblo V', '621478965', '10:00:00', '18:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527307/61f3a6f6-3c6a-42d3-a4ee-ba310df6ae73.png', 21, NULL, ''),
(25, 'Barbería El Corte', 'Calle Afeitado 6, Pueblo W', '629783412', '09:00:00', '20:00:00', 4.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527332/b6a04a5f-172e-4dd0-9a34-6399d9e347a7.png', 20, NULL, ''),
(26, 'Carnicería El Bistec', 'Calle Carne 3, Pueblo X', '623478951', '09:00:00', '14:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527361/c986f4e4-0622-4b49-8b80-298850e702bc.png', 17, NULL, ''),
(27, 'Tienda de Electrónica TecnoPlus', 'Avenida Tecnología 18, Pueblo Y', '634789125', '10:00:00', '21:00:00', 0.00, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527388/91d66954-a21f-4f96-83fd-e4af91cf332b.png', 18, NULL, ''),
(28, 'Lavandería Rápido Limpio', 'Calle Lavado 12, Pueblo Z', '647298531', '07:00:00', '21:00:00', 4.00, '', 2, NULL, ''),
(29, 'Cafetería La Taza', 'Plaza Central 9, Pueblo A1', '612478952', '08:00:00', '23:00:00', 5.00, '', 2, NULL, ''),
(30, 'Farmacia Salud Viva', 'Avenida Medicina 2, Pueblo B1', '623147895', '08:00:00', '20:00:00', 0.00, '', 18, NULL, ''),
(31, 'Ferretería La Llave', 'Calle Herramientas 17, Pueblo C1', '631478962', '09:00:00', '19:00:00', 0.00, '', 1, NULL, ''),
(32, 'Peluquería Estilo', 'Calle Corte 11, Pueblo D1', '653789124', '09:00:00', '20:00:00', 0.00, '', 1, NULL, ''),
(33, 'Centro Estético Belleza Total', 'Avenida Belleza 8, Pueblo E1', '624789513', '10:00:00', '21:00:00', 0.00, '', 22, NULL, ''),
(34, 'Auto Lavado Express', 'Calle Vehículo 15, Pueblo F1', '621478596', '08:00:00', '20:00:00', 0.00, '', 3, NULL, ''),
(35, 'Mercado Local', 'Calle Comercio 20, Pueblo G1', '623478596', '07:00:00', '15:00:00', 0.00, '', 21, NULL, ''),
(36, 'Tienda de Mascotas Peludos', 'Calle Animal 22, Pueblo H1', '622478596', '10:00:00', '19:00:00', 0.00, '', 20, NULL, ''),
(37, 'Joyería Brillo', 'Calle Oro 8, Pueblo I1', '634789521', '10:00:00', '20:00:00', 0.00, '', 23, NULL, ''),
(38, 'Óptica Visión Clara', 'Avenida Ojos 4, Pueblo J1', '612478596', '09:00:00', '18:00:00', 2.00, '', 5, NULL, '');

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
(82, 18, 9, '2024-11-20 17:22:35'),
(84, 18, 1, '2024-11-21 12:30:44'),
(96, 23, 1, '2025-01-22 15:43:47'),
(100, 25, 1, '2025-01-28 14:11:52'),
(101, 26, 1, '2025-02-18 13:16:19'),
(104, 28, 1, '2025-04-29 18:03:31'),
(106, 24, 1, '2025-04-29 18:35:02'),
(107, 24, 3, '2025-04-29 18:35:06'),
(109, 24, 4, '2025-04-29 18:39:58'),
(110, 6, 2, '2025-05-01 13:19:25');

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
  `Direccion` varchar(255) NOT NULL,
  `ID_Repartidor` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`ID_Pedido`, `ID_Usuario`, `ID_Establecimiento`, `Fecha_Hora_Pedido`, `Estado_Pedido`, `Total`, `productos`, `payment_id`, `Direccion`, `ID_Repartidor`) VALUES
(5, 18, 1, '2024-11-26 21:27:51', 'En proceso', 20.99, '[{\"name\":\"Tortilla española\",\"sku\":\"2\",\"price\":\"8.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2,\"image_url\":\"\"},{\"name\":\"Paracetamol\",\"sku\":\"3\",\"price\":\"3.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1,\"image_url\":\"\"}]', 'PAYID-M5DD2RQ1M9752336B916191E', '', NULL),
(15, 25, 1, '2025-01-28 14:10:43', 'Entregado', 45.50, '[{\"name\":\"agua\",\"sku\":\"54\",\"price\":\"3.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":13}]', 'PAYID-M6MOKTY89B9467086752111L', 'Cheste', 18),
(16, 26, 1, '2025-02-18 12:17:59', 'Entregado', 31.50, '[{\"name\":\"agua\",\"sku\":\"54\",\"price\":\"3.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":9}]', 'PAYID-M62HUPY1F830241104627634', 'calle la loma', 18),
(17, 27, 4, '2025-02-19 11:35:21', 'Entregado', 9.90, '[{\"name\":\"Zumo de Naranja Natural\",\"sku\":\"10\",\"price\":\"3.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"agua\",\"sku\":\"55\",\"price\":\"2.90\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1}]', 'PAYID-M624DUI0BP29242MX821923M', 'carrer de xiva', 18),
(18, 18, 1, '2025-04-15 09:32:20', 'Entregado', 24.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-M77COPA0GM16393UR800684D', 'casablanca', 18),
(19, 18, 1, '2025-04-15 09:32:40', 'Entregado', 24.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-M77CPMA97C03528L8248304T', 'casablanca', 18),
(20, 18, 1, '2025-04-15 09:32:55', 'Entregado', 48.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":4}]', 'PAYID-M77CPQA3W9649189T5076027', 'casablanca', 18),
(21, 18, 1, '2025-04-15 09:38:22', 'Entregado', 48.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":4}]', 'PAYID-M77CSBY7JU55608M96651714', 'casablanca', 18),
(22, 18, 1, '2025-04-15 09:43:45', 'Entregado', 48.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":4}]', 'PAYID-M77CUSY3XU48193UD722835C', 'casablanca', 18),
(23, 24, 3, '2025-04-23 12:57:13', 'Entregado', 69.90, '[{\"name\":\"Chorizos \",\"sku\":\"4\",\"price\":\"6.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":10}]', 'PAYID-NAEOHAI2TD99573WN321321K', 'hola', 18),
(24, 24, 3, '2025-04-23 13:05:20', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEOLBQ9MX84308JM5415330', 'hola', 18),
(25, 24, 3, '2025-04-23 13:06:35', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEOLUY0N059848P9525172E', 'hola', 18),
(26, 24, 3, '2025-04-23 13:07:55', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEOMJA99J716152X1809723', 'hola', 18),
(27, 24, 3, '2025-04-23 13:09:07', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEOM3A48K12822H90923034', 'hola', 18),
(28, 24, 3, '2025-04-23 13:11:06', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEONYY6AV14208KN7945427', 'hola', 18),
(29, 24, 3, '2025-04-23 13:18:28', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEORHQ14325079L2470210T', 'hola', 18),
(30, 24, 3, '2025-04-23 13:20:23', 'Entregado', 27.97, '[{\"name\":\"Pan de Pueblo\",\"sku\":\"8\",\"price\":\"2.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"Aceite de Oliva Virgen Extra\",\"sku\":\"9\",\"price\":\"7.99\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAEOSEA19762034EP8868155', 'hola', 18),
(31, 18, 1, '2025-04-23 13:56:20', 'Entregado', 12.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1}]', 'PAYID-NAEPC4A1GD551962M125033M', 'casablanca', 18),
(32, 24, 4, '2025-04-23 14:00:11', 'Entregado', 12.80, '[{\"name\":\"Zumo de Naranja Natural\",\"sku\":\"10\",\"price\":\"3.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"agua\",\"sku\":\"55\",\"price\":\"2.90\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAEPEYQ9UG295188D247835L', 'hola', 18),
(33, 18, 4, '2025-04-23 15:07:31', 'Entregado', 7.00, '[{\"name\":\"Zumo de Naranja Natural\",\"sku\":\"10\",\"price\":\"3.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAEQEGI0FD31551P4483881T', 'casablanca', 18),
(34, 24, 4, '2025-04-24 14:59:34', 'Entregado', 7.00, '[{\"name\":\"Zumo de Naranja Natural\",\"sku\":\"10\",\"price\":\"3.50\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAFFDOY3G793149YP956970D', 'hola', 18),
(35, 24, 1, '2025-04-24 15:05:49', 'Entregado', 36.00, '[{\"name\":\"persona\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAFFGPA7WS51907UH473342P', 'hola', 18),
(36, 6, 1, '2025-04-25 09:13:30', 'Entregado', 12.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1}]', 'PAYID-NAFVEHI2DP00268P5262605H', 'C/ Enrique Tierno Galvan Cheste', 18),
(37, 6, 1, '2025-04-25 09:13:58', 'Entregado', 12.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1}]', 'PAYID-NAFVETQ5KT51090MP113243R', 'C/ Enrique Tierno Galvan Cheste', 18),
(38, 6, 1, '2025-04-25 11:18:26', 'Entregado', 80.00, '[{\"name\":\"PruebaAvioneta\",\"sku\":\"59\",\"price\":\"40.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAFW66I84R11657BP243305E', 'C/ Enrique Tierno Galvan Cheste', 18),
(39, 6, 1, '2025-04-25 11:24:02', 'Entregado', 40.00, '[{\"name\":\"PruebaAvioneta\",\"sku\":\"59\",\"price\":\"40.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1}]', 'PAYID-NAFXBSA4HX298879V741045T', 'C/ Enrique Tierno Galvan Cheste', 18),
(40, 24, 1, '2025-04-25 11:26:21', 'Entregado', 132.00, '[{\"name\":\"PruebaAvioneta\",\"sku\":\"59\",\"price\":\"40.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3},{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":1}]', 'PAYID-NAFXCVA4XY95330X0276774U', 'hola', 18),
(41, 28, 1, '2025-04-29 16:04:20', 'Entregado', 24.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAIPQZI6EC476409W520470K', 'cheste', 18),
(42, 18, 1, '2025-04-30 14:02:36', 'En proceso', 104.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"PruebaAvioneta\",\"sku\":\"59\",\"price\":\"40.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAJC2YA3X4381240S5508206', 'casablanca', 18),
(43, 24, 1, '2025-04-30 14:03:26', 'Pendiente', 144.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"PruebaAvioneta\",\"sku\":\"59\",\"price\":\"40.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAJC3GQ96S32174TU152482A', 'hola', NULL),
(44, 24, 1, '2025-04-30 14:37:27', 'Entregado', 104.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2},{\"name\":\"PruebaAvioneta\",\"sku\":\"59\",\"price\":\"40.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAJDLDI3T403399N9385074V', 'aa', 18),
(45, 6, 1, '2025-05-01 11:21:15', 'Pendiente', 24.00, '[{\"name\":\"personaacaa\",\"sku\":\"58\",\"price\":\"12.00\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":2}]', 'PAYID-NAJVSBA9XF95674MR2952117', 'C/ Enrique Tierno Galvan Cheste', NULL),
(46, 24, 4, '2025-05-06 10:40:00', 'Pendiente', 7.41, '[{\"name\":\"agua\",\"sku\":\"55\",\"price\":\"2.47\",\"currency\":\"EUR\",\"tax\":\"0.00\",\"quantity\":3}]', 'PAYID-NAM6NMQ2NG907072A153684F', 'aa', NULL);

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
  `Tipo` varchar(255) NOT NULL,
  `Precio_Promocion` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID_Producto`, `ID_Establecimiento`, `Nombre`, `Descripcion`, `Precio`, `Disponibilidad`, `Foto`, `Tipo`, `Precio_Promocion`) VALUES
(4, 3, 'Chorizos ', 'Chorizos de la granjaescula Mediterranea ficticia sistematica de estilo neutral in the night.', 6.99, 16, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527828/16f3f873-b024-4b75-9525-912fad636105.png', 'hgfgh', NULL),
(6, 2, 'Ibuprofeno 600mg', 'Anti-inflamatorio de venta libre', 5.99, 20, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526320/e7b9a3da-e00c-4323-9f29-da0eee820c42.png', 'Medicamento', NULL),
(7, 2, 'Vitaminas C', 'Suplemento de Vitamina C 500mg', 9.50, 15, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746526346/cc9b5ff3-1f73-412f-b19d-4691d07059eb.png', 'Suplemento', NULL),
(8, 3, 'Pan de Pueblo', 'Pan artesanal hecho a mano', 2.00, 23, '\\assets\\images\\pan_pueblo.png', 'Panadería', NULL),
(9, 3, 'Aceite de Oliva Virgen Extra', 'Aceite de oliva de la mejor calidad', 7.99, 27, '\\assets\\images\\aceite_oliva.png', 'Aceites', NULL),
(10, 4, 'Zumo de Naranja Natural', 'Zumo recién exprimido', 3.50, 12, '\\assets\\images\\zumo_naranja.png', 'Bebidas', 1.75),
(11, 5, 'Cerveza Artesanal', 'Cerveza local de malta', 2.99, 40, '\\assets\\images\\cerveza_artesanal.png', 'Bebidas', NULL),
(12, 6, 'Café Americano', 'Café negro sin azúcar', 1.50, 60, '\\assets\\images\\cafe_americano.png', 'Bebidas', NULL),
(13, 7, 'Baguette Integral', 'Pan integral crujiente', 1.25, 50, '\\assets\\images\\baguette_integral.png', 'Panadería', NULL),
(14, 8, 'Pizza Margarita', 'Pizza clásica con tomate y queso', 9.99, 10, '\\assets\\images\\pizza_margarita.png', 'Comida rápida', NULL),
(15, 9, 'Libro: El Quijote', 'Edición clásica de Don Quijote', 12.00, 15, '\\assets\\images\\el_quijote.png', 'Libros', NULL),
(16, 9, 'Libro: 1984', 'Obra de George Orwell', 8.50, 20, '\\assets\\images\\1984.png', 'Libros', NULL),
(17, 10, 'Protein Shake', 'Batido de proteínas para después del gimnasio', 4.99, 25, '\\assets\\images\\protein_shake.png', 'Suplementos', NULL),
(18, 10, 'Barra Energética', 'Barra energética de chocolate y avena', 2.50, 35, '\\assets\\images\\barra_energetica.png', 'Snacks', NULL),
(19, 11, 'Consulta General', 'Consulta médica general', 25.00, 0, '\\assets\\images\\consulta_general.png', 'Servicios Médicos', NULL),
(20, 12, 'Limpieza Dental', 'Servicio de limpieza bucal profesional', 35.00, 0, '\\assets\\images\\limpieza_dental.png', 'Servicios', NULL),
(21, 13, 'Cambio de Aceite', 'Servicio completo de cambio de aceite para coches', 45.00, 0, '\\assets\\images\\cambio_aceite.png', 'Servicios de Taller', NULL),
(22, 14, 'Cerveza IPA', 'Cerveza artesanal IPA', 3.50, 50, '\\assets\\images\\ipa.png', 'Bebidas', NULL),
(23, 15, 'Ramo de Rosas', 'Ramo de 12 rosas frescas', 15.00, 10, '\\assets\\images\\ramo_rosas.png', 'Flores', NULL),
(24, 16, 'Pizza Hawaiana', 'Pizza con piña y jamón', 10.50, 8, '\\assets\\images\\pizza_hawaiana.png', 'Comida rápida', NULL),
(25, 17, 'Leche Entera', 'Leche entera de vaca', 1.20, 100, '\\assets\\images\\leche.png', 'Lácteos', NULL),
(26, 17, 'Arroz Integral', 'Arroz integral ecológico', 2.00, 45, '\\assets\\images\\arroz_integral.png', 'Cereales', NULL),
(27, 18, 'Helado de Vainilla', 'Helado artesanal de vainilla', 3.75, 12, '\\assets\\images\\helado_vainilla.png', 'Postres', NULL),
(28, 19, 'Bolígrafos Azules', 'Pack de 10 bolígrafos azules', 1.50, 30, '\\assets\\images\\boligrafos_azules.png', 'Papelería', NULL),
(29, 19, 'Cuaderno A4', 'Cuaderno de 100 hojas tamaño A4', 3.00, 20, '\\assets\\images\\cuaderno.png', 'Papelería', NULL),
(30, 20, 'Zapatos de Cuero', 'Zapatos de cuero marrón para hombre', 75.00, 5, '\\assets\\images\\zapatos_cuero.png', 'Calzado', NULL),
(31, 21, 'Vestido de Verano', 'Vestido de verano floral', 40.00, 12, '\\assets\\images\\vestido_verano.png', 'Ropa', NULL),
(32, 22, 'Manzanas Fuji', 'Manzanas frescas Fuji', 2.99, 60, '\\assets\\images\\manzanas_fuji.png', 'Frutas', NULL),
(33, 23, 'Paella Mixta', 'Paella de mariscos y carne', 18.99, 8, '\\assets\\images\\paella_mixta.png', 'Comida', NULL),
(34, 24, 'El Principito', 'Libro El Principito', 9.99, 25, '\\assets\\images\\principito.png', 'Libros', NULL),
(35, 25, 'Corte de Cabello', 'Servicio de corte de cabello masculino', 15.00, 0, '\\assets\\images\\corte_cabello.png', 'Servicios', NULL),
(36, 26, 'Costillas de Cerdo', 'Costillas de cerdo frescas', 8.99, 20, '\\assets\\images\\costillas.png', 'Carnes', NULL),
(37, 27, 'Smartphone Android', 'Teléfono inteligente con Android', 299.00, 10, '\\assets\\images\\smartphone.png', 'Electrónica', NULL),
(38, 28, 'Lavado Rápido', 'Lavado rápido para coches', 10.00, 0, '\\assets\\images\\lavado_rapido.png', 'Servicios', NULL),
(39, 29, 'Café con Leche', 'Café con leche espumoso', 2.00, 50, '\\assets\\images\\cafe_leche.png', 'Bebidas', NULL),
(40, 30, 'Termómetro Digital', 'Termómetro digital de precisión', 12.99, 15, '\\assets\\images\\termometro_digital.png', 'Equipos médicos', NULL),
(41, 15, '1', 'castañas', 0.00, 1, '10', '', NULL),
(42, 15, '1', 'castañas', 0.00, 1, '10', '', NULL),
(43, 15, '1', 'castañas', 0.00, 1, '10', '', NULL),
(55, 4, 'agua', 'agua mineral templada', 2.90, 15, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1737556745/products/agua_4.jpg', 'agua', 2.47),
(58, 1, 'persona', 'persona', 12.00, 20, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746024908/products/product_6.jpg', 'personaaa', NULL),
(59, 1, 'Prueba Producto', 'Prueba3', 50.00, 43, 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1745570578/products/product_6.png', 'broma', 40.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `ID_Promocion` int(11) NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `descuento` decimal(10,2) NOT NULL,
  `tipoPromocion` enum('porcentaje','cantidad') DEFAULT 'porcentaje',
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime NOT NULL,
  `estado` enum('activa','desactivada') DEFAULT 'activa',
  `codigoPromocion` varchar(50) DEFAULT NULL,
  `condiciones` text DEFAULT NULL,
  `creadoEn` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizadoEn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `promociones`
--

INSERT INTO `promociones` (`ID_Promocion`, `ID_Producto`, `ID_Establecimiento`, `titulo`, `descripcion`, `descuento`, `tipoPromocion`, `fechaInicio`, `fechaFin`, `estado`, `codigoPromocion`, `condiciones`, `creadoEn`, `actualizadoEn`) VALUES
(17, 55, 4, 'AGUA', 'DESCUENTO PARA AGUA POR LA EPOCA', 15.00, 'porcentaje', '2025-01-23 00:00:00', '2025-01-25 00:00:00', 'activa', 'HOLA', '', '2025-01-22 14:40:17', '2025-01-22 14:40:17'),
(20, 10, 4, 'promocion zumo de naranja', 'esta promocion es para el zumo de naranja', 50.00, 'porcentaje', '2025-01-22 15:53:20', '2025-01-26 00:00:00', 'activa', 'ZumoDeNaranja', 'esta prmocion es solo para pedir en local', '2025-01-22 14:53:20', '2025-01-22 14:53:20'),
(24, 59, 1, 'Promocion de Avioneta', 'Promocion por Prueba', 20.00, 'porcentaje', '2025-04-25 12:55:16', '2025-04-27 00:00:00', 'activa', '', 'ninguna', '2025-04-25 10:55:16', '2025-04-25 10:55:16');

--
-- Disparadores `promociones`
--
DELIMITER $$
CREATE TRIGGER `actualizar_precio_producto_porcentaje` AFTER INSERT ON `promociones` FOR EACH ROW BEGIN
    -- Calcula el nuevo precio con el descuento por porcentaje
    DECLARE nuevo_precio DECIMAL(10, 2);

    -- Solo se maneja el tipo de promoción 'Porcentaje'
    IF NEW.tipoPromocion = 'porcentaje' THEN
        SET nuevo_precio = (
            SELECT Precio
            FROM productos
            WHERE ID_Producto = NEW.ID_Producto
        ) * (1 - (NEW.descuento / 100));

        -- Actualiza el campo Precio_Promocion en la tabla productos con el nuevo precio calculado
        UPDATE productos
        SET Precio_Promocion = nuevo_precio
        WHERE ID_Producto = NEW.ID_Producto;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `reset_precio_promocion` AFTER UPDATE ON `promociones` FOR EACH ROW BEGIN
    -- Verifica si el estado de la promoción fue cambiado a "desactivada"
    IF NEW.estado = 'desactivada' THEN
        -- Actualiza el Precio_Promocion de la tabla productos a NULL cuando la promoción está desactivada
        UPDATE productos
        SET Precio_Promocion = NULL
        WHERE ID_Producto = NEW.ID_Producto;
    END IF;
END
$$
DELIMITER ;

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
(6, 'admin', 'admin', 'admin@gmail.com', '83838', 'C/ Enrique Tierno Galvan Cheste', '$2b$10$I5zJS09SxgY.l/AaHRyMdO2z6XjD9T8//an8RHz5uwFTZqeIWYuf.', '2024-10-08 11:40:57', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1736870660/profile_pictures/user_6.png', NULL, NULL, NULL, 2),
(11, 'Pablo', 'Arnau Lopez', 'pabloarlo00@gmail.com', '646836481', 'asdf', '$2b$10$xIeHT0pe.nHnKl6.0lm6UuempoL4PXThrob6o7tywpHa3CNg5Yp6q', '2024-10-29 13:15:13', '', NULL, NULL, NULL, NULL),
(12, 'prueba', 'foto perfil', 'pruebafoto@gmail.com', '6468348', '', '$2b$10$uotjzUkWWuR4qSiF8d5qOuB.Amlzub9rgVh5onP2ASll5RA1XqPhe', '2024-11-15 16:59:51', '', NULL, NULL, NULL, NULL),
(13, 'joso', 'loepz', 'joso@gmail.com', '645', '', '$2b$10$hoinzwVtn2mL90WpAgSpxuK./Dco5EjXPM3R82eJqri.sA/G3UVZq', '2024-11-15 18:31:46', '', NULL, NULL, NULL, NULL),
(14, 'pablo', 'garcia', 'pablo{{ 2*2 }}@gmail.com', '83838', '', '$2b$10$N/cOgO5BnBdBSlDVaLE.GOBMgnzLqKKv4SPUT3Q6dufZv.1hXQljO', '2024-11-16 12:59:50', '', NULL, NULL, NULL, NULL),
(15, '{{2*2 }}', '{{ 2 * 2 }}', '{{ 2*2 }}@gmail.com', '{{2 * 2}', 'asdfasdf', '$2b$10$VE3mjVixqe.dIOp1vwkXPuUhaL2UtI5.DqJkvR63nJdwSK7hNBvNC', '2024-11-16 13:02:53', '', NULL, NULL, NULL, NULL),
(16, 'pruebaloading', 'pruebaloading', 'loading@gmail.com', '1272', '', '$2b$10$xDojRbsjYIrdmcqpb9SfpOri1QQkVb6HSosId0d/Nnn9mEaH9iSYi', '2024-11-16 13:15:46', '', NULL, NULL, NULL, NULL),
(17, 'pruieba2', 'prueba2', 'prueba2@gmail.com', '1231', '', '$2b$10$806Gf5O.CbMVggDY567EGenGV7rucYMGXyz/VSx0gVPvA199THzUW', '2024-11-16 13:18:04', '', NULL, NULL, NULL, NULL),
(18, 'repartidor', 'repartidor', 'repartidor@gmail.com', '6', 'casablanca', '$2b$10$RTbZ2o0b0pdulftrYuUJEu5U25nZN4ra.8RZM/ZcHKDjbx4kUnNJq', '2024-11-20 14:45:24', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1732115433/profile_pictures/user_18.jpg', 'moto', 'ocupado', NULL, 1),
(19, 'Pablo', 'Fortea Garcia', 'pfortea01@gmail.com', '654981234', '', '$2b$10$AROTtmnV.Wwgh86IBDK6Q..57PM98prp6fRkmXqM8QTjmXFGeM6Cy', '2024-12-24 10:55:06', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1733244931/profile_pictures/no-picture', NULL, NULL, NULL, 3),
(22, 'pablo', 'arnau', 'pabloarlo@gmail.com', '646836481', 'C/chiva cheste 7', '$2b$10$oe.lHJvMEMZfzGJ.qQOsO.gO9pfTv.vV9g8RwkPCV/qxiV.ojj49S', '2025-01-18 13:36:31', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1733244931/profile_pictures/no-picture', NULL, NULL, NULL, 3),
(23, 'Abordo Maria', 'Abordo Maria', 'abordomaria@gmail.com', '65489721', 'calle nse que cheste', '$2b$10$I5zJS09SxgY.l/AaHRyMdO2z6XjD9T8//an8RHz5uwFTZqeIWYuf.', '2025-01-22 14:36:22', '', NULL, NULL, NULL, 2),
(24, 'username', 'username', 'user@gmail.com', 'user', 'aa', '$2b$10$4hPyshQQ.hI4pp4KB9PKRuNcVBfj5obrbRCeyWvld2Bt5UZQBNlFq', '2025-01-27 09:27:02', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1746527722/profile_pictures/user_24.webp', NULL, NULL, NULL, 3),
(25, 'usuario', 'usuario', 'usuario@gmail.com', '654987321', 'Cheste', '$2b$10$efKmzCGjA0GZwv6ZGUR/mu.9RzbcUkQGrjrLdGnxPB9QDJ3hUp7jy', '2025-01-28 13:07:30', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1738069891/profile_pictures/user_25.png', NULL, NULL, NULL, 3),
(26, 'brian', 'Torre', 'brian@gmail.com', '23423423', 'calle la loma', '$2b$10$G.NW2GBpxUur3t5daw6r0eaZP6iLhOzlBZFpKYl3rK70wxATN8Vby', '2025-02-18 12:15:55', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1739880990/profile_pictures/user_26.webp', NULL, NULL, NULL, 3),
(27, 'Santi', 'Pereza Manza', 'santiceman7@gmail.com', '654987321', 'carrer de xiva', '$2b$10$ZcdolHoY.084dJPjDQOOgOHrUIvdKzig8Tqnv5fOB5s7n1taBiyAm', '2025-02-19 11:29:15', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1739964609/profile_pictures/user_27.webp', NULL, NULL, NULL, 3),
(28, 'Pepe', 'Prueba', 'pepejuan@gmail.com', '654987321', 'buñol', '$2b$10$0Etq9IByZEChQoilBvjwAOvntoFO7ho/DvVZslBFdtv9g9noit1Mm', '2025-04-29 15:52:48', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1733244931/profile_pictures/no-picture', NULL, NULL, NULL, 3),
(29, 'pep', 'botella', 'pepe@pepe.com', '654987312', '', '$2b$10$QbHG6/JyUWcCNoWyVcY7/Ol.SZtX475YM0QOlHXr/.Yp98RcL3I4a', '2025-05-01 10:49:00', 'https://res.cloudinary.com/dvrcoi13p/image/upload/v1733244931/profile_pictures/no-picture', NULL, NULL, NULL, 3);

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
-- Indices de la tabla `calificaciones_establecimientos`
--
ALTER TABLE `calificaciones_establecimientos`
  ADD PRIMARY KEY (`ID_Calificacion`),
  ADD KEY `fk_id_usuario` (`ID_Usuario`),
  ADD KEY `fk_id_establecimiento` (`ID_Establecimiento`);

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
  ADD KEY `fk_categoria` (`Categoria`),
  ADD KEY `fk_establecimientos_usuarios` (`ID_Usuario`);

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
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`ID_Promocion`),
  ADD UNIQUE KEY `codigoPromocion` (`codigoPromocion`),
  ADD KEY `ID_Producto` (`ID_Producto`),
  ADD KEY `fk_promociones_establecimientos` (`ID_Establecimiento`);

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
  MODIFY `ID_Calificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `calificaciones_establecimientos`
--
ALTER TABLE `calificaciones_establecimientos`
  MODIFY `ID_Calificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `categorias_establecimientos`
--
ALTER TABLE `categorias_establecimientos`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `ID_Establecimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `favoritas_tiendas`
--
ALTER TABLE `favoritas_tiendas`
  MODIFY `ID_FavoritasTiendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID_Pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `ID_Promocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_rol` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`ID_Pedido`) REFERENCES `pedidos` (`ID_Pedido`);

--
-- Filtros para la tabla `calificaciones_establecimientos`
--
ALTER TABLE `calificaciones_establecimientos`
  ADD CONSTRAINT `fk_id_establecimiento` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimientos` (`ID_Establecimiento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`Categoria`) REFERENCES `categorias_establecimientos` (`ID_Categoria`),
  ADD CONSTRAINT `fk_establecimientos_usuarios` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

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
-- Filtros para la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD CONSTRAINT `fk_promociones_establecimientos` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimientos` (`ID_Establecimiento`) ON DELETE CASCADE,
  ADD CONSTRAINT `promociones_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `productos` (`ID_Producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_roles` FOREIGN KEY (`ID_ROL`) REFERENCES `roles` (`ID_rol`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `desactivar_promociones_expiradas` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-01-22 14:04:41' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE promociones
    SET estado = 'desactivada'
    WHERE fechaFin < CURRENT_DATE AND estado = 'activa';
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
