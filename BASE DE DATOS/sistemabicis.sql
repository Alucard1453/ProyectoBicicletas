-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2019 a las 05:11:43
-- Versión del servidor: 10.3.15-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemabicis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acceso`
--

CREATE TABLE `acceso` (
  `CLAVEACCESO` int(11) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `acceso`
--

INSERT INTO `acceso` (`CLAVEACCESO`, `DESCRIPCION`) VALUES
(1, 'Administración'),
(2, 'Lenguas'),
(3, 'Cultura Física'),
(4, 'DAE'),
(5, 'Servicio'),
(6, 'Biblioteca Central'),
(7, 'Contaduría'),
(8, 'Arquitectura'),
(9, 'Computación 14 Sur'),
(10, 'Computación 14 Sur - San Claudio'),
(11, 'Ingeniería Quimica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bicicleta`
--

CREATE TABLE `bicicleta` (
  `CLAVEBIC` int(11) NOT NULL,
  `CLAVEUSER` int(11) NOT NULL,
  `IDMARCA` int(11) NOT NULL,
  `ESTADO` varchar(50) NOT NULL,
  `TIPO` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `CLAVEBIC` int(11) NOT NULL,
  `AUTORIZAENT` int(11) DEFAULT NULL,
  `AUTORIZASAL` int(11) DEFAULT NULL,
  `FECHA` varchar(50) DEFAULT NULL,
  `HENTRADA` varchar(50) DEFAULT NULL,
  `ACCESOENT` int(11) DEFAULT NULL,
  `HSALIDA` varchar(50) DEFAULT NULL,
  `ACCESOSAL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `IDMARCA` int(11) NOT NULL,
  `NMARCA` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`IDMARCA`, `NMARCA`) VALUES
(1, 'Alubike'),
(2, 'Benotto'),
(3, 'Magistroni'),
(4, 'Mercurio'),
(5, 'Turbo'),
(6, 'Veloci'),
(7, 'CUBE Bikes'),
(8, 'BMC'),
(9, 'State Bicycle Co');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `CLAVETRAB` int(11) NOT NULL,
  `APATERNO` varchar(50) NOT NULL,
  `AMATERNO` varchar(50) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `CONTRASEÑA` varchar(50) NOT NULL,
  `FOTO` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `CLAVEUSER` int(11) NOT NULL,
  `APATERNO` varchar(50) NOT NULL,
  `AMATERNO` varchar(50) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `CONTRASEÑA` varchar(50) NOT NULL,
  `TIPO` varchar(50) NOT NULL,
  `ESTADO` varchar(50) NOT NULL,
  `FOTO` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acceso`
--
ALTER TABLE `acceso`
  ADD PRIMARY KEY (`CLAVEACCESO`);

--
-- Indices de la tabla `bicicleta`
--
ALTER TABLE `bicicleta`
  ADD PRIMARY KEY (`CLAVEBIC`),
  ADD KEY `CLAVEUSER` (`CLAVEUSER`),
  ADD KEY `IDMARCA` (`IDMARCA`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD KEY `CLAVEBIC` (`CLAVEBIC`),
  ADD KEY `AUTORIZAENT` (`AUTORIZAENT`),
  ADD KEY `AUTORIZASAL` (`AUTORIZASAL`),
  ADD KEY `ACCESOENT` (`ACCESOENT`),
  ADD KEY `ACCESOSAL` (`ACCESOSAL`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`IDMARCA`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`CLAVETRAB`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`CLAVEUSER`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acceso`
--
ALTER TABLE `acceso`
  MODIFY `CLAVEACCESO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `bicicleta`
--
ALTER TABLE `bicicleta`
  MODIFY `CLAVEBIC` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bicicleta`
--
ALTER TABLE `bicicleta`
  ADD CONSTRAINT `bicicleta_ibfk_1` FOREIGN KEY (`CLAVEUSER`) REFERENCES `usuario` (`CLAVEUSER`),
  ADD CONSTRAINT `bicicleta_ibfk_2` FOREIGN KEY (`IDMARCA`) REFERENCES `marca` (`IDMARCA`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`CLAVEBIC`) REFERENCES `bicicleta` (`CLAVEBIC`),
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`AUTORIZAENT`) REFERENCES `trabajador` (`CLAVETRAB`),
  ADD CONSTRAINT `historial_ibfk_3` FOREIGN KEY (`AUTORIZASAL`) REFERENCES `trabajador` (`CLAVETRAB`),
  ADD CONSTRAINT `historial_ibfk_4` FOREIGN KEY (`ACCESOENT`) REFERENCES `acceso` (`CLAVEACCESO`),
  ADD CONSTRAINT `historial_ibfk_5` FOREIGN KEY (`ACCESOSAL`) REFERENCES `acceso` (`CLAVEACCESO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
