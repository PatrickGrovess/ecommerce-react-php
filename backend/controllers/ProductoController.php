<?php


namespace Controllers;
use Models\Producto;

class ProductoController{
    public static function index(){
        $productos = Producto::all();
        header('Content-Type: application/json');
        echo json_encode($productos);
    }

    public static function crear(){
        $datos = json_decode(file_get_contents('php://input'), true);
        // echo json_encode(["Recibido" => $datos]); // <-- ESTO ES TU LINTERNAx
        
        if (empty($datos["nombre"]) || empty($datos["precio"]) || empty($datos["imagen"])) {
            echo json_encode(['error' => 'Nombre precio y imagen son obligatorios']);
            return;
        }

        $resultado = Producto::guardar($datos);

        if ($resultado) {
            echo json_encode(['success' => 'Producto creado exitosamente']);
        } else {
            echo json_encode(['error' => 'Error al crear el producto']);
        }

    }
}