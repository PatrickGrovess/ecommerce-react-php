<?php
// 1. Encabezados de CORS y Respuesta
// 1. Permitir el origen de tu frontend en React
header("Access-Control-Allow-Origin: http://localhost:5173");

// 2. Permitir los métodos HTTP que vas a usar (incluido DELETE y OPTIONS)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// 3. Permitir los encabezados como Content-Type (necesario para JSON)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. El truco maestro: Responder con éxito al "Preflight" (OPTIONS) inmediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';

// ... encabezados y requires ...

use Controllers\ProductoController;
use Controllers\LoginController; // Solo uno es necesario
use MVC\Router;

$router = new Router();

// Ahora usamos la clase directa
$router->post("/api/registro", [LoginController::class, "crearCuenta"]);

$router->get("/api/prueba", [ProductoController::class, "index"]);
$router->post("/api/prueba/crear", [ProductoController::class, "crear"]);

// Ejemplo de cómo decirle al enrutador que acepte un ID dinámico (\d+ significa números)
$router->delete('/api/prueba', [ProductoController::class, 'eliminar']);


$router->post("/api/login", [LoginController::class, "login"]);


$router->comprobarRutas();
