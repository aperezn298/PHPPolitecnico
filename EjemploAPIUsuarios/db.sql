-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tienda;

-- Usar la base de datos
USE tienda;

-- Crear la tabla usuarios si no existe
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    edad INT NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    fecha_registro DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunos usuarios de ejemplo si la tabla está vacía
INSERT INTO usuarios (nombre, email, edad, ciudad, fecha_registro)
SELECT * FROM (SELECT 'Juan Pérez', 'juan@example.com', 25, 'Bogota', NOW()) AS tmp
WHERE NOT EXISTS (SELECT email FROM usuarios WHERE email = 'juan@example.com');

INSERT INTO usuarios (nombre, email, edad, ciudad, fecha_registro)
SELECT * FROM (SELECT 'María López', 'maria@example.com', 30, 'Medellin', NOW()) AS tmp
WHERE NOT EXISTS (SELECT email FROM usuarios WHERE email = 'maria@example.com');

INSERT INTO usuarios (nombre, email, edad, ciudad, fecha_registro)
SELECT * FROM (SELECT 'Carlos Rodríguez', 'carlos@example.com', 28, 'Cali', NOW()) AS tmp
WHERE NOT EXISTS (SELECT email FROM usuarios WHERE email = 'carlos@example.com');

INSERT INTO usuarios (nombre, email, edad, ciudad, fecha_registro)
SELECT * FROM (SELECT 'Ana Gómez', 'ana@example.com', 22, 'Bucaramanga', NOW()) AS tmp
WHERE NOT EXISTS (SELECT email FROM usuarios WHERE email = 'ana@example.com');
