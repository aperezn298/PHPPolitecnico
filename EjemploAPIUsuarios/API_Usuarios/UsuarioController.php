<?php
    require_once 'conexion.php';

    function obtenerUsuarios() {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM usuarios");
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($usuarios);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al obtener usuarios"]);
        }
    }

    function obtenerUsuario($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
            $stmt->execute([$id]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario) {
                echo json_encode($usuario);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Usuario no encontrado"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al obtener usuario"]);
        }
    }

    function crearUsuario($data) {
        global $pdo;

        // Validar campos requeridos
        if (!isset($data['nombre']) || !isset($data['email']) || !isset($data['edad']) || !isset($data['ciudad'])) {
            http_response_code(400);
            echo json_encode(["error" => "Todos los campos son obligatorios"]);
            return;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, edad, ciudad, fecha_registro) VALUES (?, ?, ?, ?, NOW())");
            $stmt->execute([$data['nombre'], $data['email'], $data['edad'], $data['ciudad']]);
            http_response_code(201);
            echo json_encode([
                "mensaje" => "Usuario creado",
                "id" => $pdo->lastInsertId()
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            if ($e->getCode() == 23000) { // Duplicado
                echo json_encode(["error" => "El email ya está registrado"]);
            } else {
                echo json_encode(["error" => "Error al crear usuario"]);
            }
        }
    }

    function actualizarUsuario($id, $data) {
        global $pdo;

        // Validar campos requeridos
        if (!isset($data['nombre']) || !isset($data['email']) || !isset($data['edad']) || !isset($data['ciudad'])) {
            http_response_code(400);
            echo json_encode(["error" => "Todos los campos son obligatorios"]);
            return;
        }

        try {
            $stmt = $pdo->prepare("UPDATE usuarios SET nombre = ?, email = ?, edad = ?, ciudad = ? WHERE id = ?");
            $stmt->execute([$data['nombre'], $data['email'], $data['edad'], $data['ciudad'], $id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Usuario actualizado"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Usuario no encontrado o sin cambios"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            if ($e->getCode() == 23000) {
                echo json_encode(["error" => "El email ya está registrado"]);
            } else {
                echo json_encode(["error" => "Error al actualizar usuario"]);
            }
        }
    }

    function eliminarUsuario($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Usuario eliminado"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Usuario no encontrado"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar usuario"]);
        }
    }
?>