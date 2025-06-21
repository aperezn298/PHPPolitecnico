<?php
    // Establecer los parámetros de conexión a la base de datos
    $host = 'localhost'; // Servidor de la base de datos
    $db = 'tienda'; // Nombre de la base de datos
    $user = 'root'; // Usuario de la base de datos
    $pass = ''; // Contraseña del usuario de la base de datos
    $charset = 'utf8mb4'; // Conjunto de caracteres a utilizar
    
    // Crear el DSN (Data Source Name) para la conexión
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    // Opciones de conexión para PDO
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Modo de error de PDO
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Modo de recuperación por defecto
        PDO::ATTR_EMULATE_PREPARES   => false, // Desactivar la emulación de sentencias preparadas
        PDO::ATTR_PERSISTENT         => true, // Hacer la conexión persistente
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4', // Comando de inicialización para MySQL
        PDO::ATTR_STRINGIFY_FETCHES  => false, // No convertir los valores a cadenas al recuperarlos
    ];

    // Crear la Conexion con pdo
    try {
        // Crear una nueva instancia de PDO
        // Utilizando el DSN, usuario, contraseña y opciones definidas
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        // Si ocurre un error al conectar, lanzar una excepción con el mensaje de error
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
?>