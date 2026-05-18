<?php
// 1. Encabezados de CORS y Respuesta
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

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


$router->post("/api/login", [LoginController::class, "login"]);


$router->comprobarRutas();