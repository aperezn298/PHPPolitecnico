<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    require_once 'UsuarioController.php';

    $method = $_SERVER['REQUEST_METHOD'];
    $path = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
    $resource = $path[0] ?? null;
    $id = $path[1] ?? null;

    switch ($method) {
        case 'GET':
            if ($resource === 'usuarios') {
                $id ? obtenerUsuario($id) : obtenerUsuarios();
            }
            break;

        case 'POST':
            if ($resource === 'usuarios') {
                $data = json_decode(file_get_contents("php://input"), true);
                crearUsuario($data);
            }
            break;

        case 'PUT':
            if ($resource === 'usuarios' && $id) {
                $data = json_decode(file_get_contents("php://input"), true);
                actualizarUsuario($id, $data);
            }
            break;

        case 'DELETE':
            if ($resource === 'usuarios' && $id) {
                eliminarUsuario($id);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
    }
?>