<?php

namespace Models;

use Config\db;

class Producto
{
    public static function all()
    {
        $db = db::conectar();
        $query = "SELECT * FROM productos";
        $resultado = $db->query($query);

        $productos = [];
        while ($fila = $resultado->fetch_assoc()) {
            $productos[] = $fila;
        }

        return $productos;
    }

    public static function guardar($datos)
    {
        $db = db::conectar();
        $query = "INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES (?, ?, ?, ?)";

        $stmt = $db->prepare($query);

        // LINTERNA: Si $stmt es falso, hay un error en el SQL
        if (!$stmt) {
            echo json_encode(["error_sql" => $db->error, "query" => $query]);
            exit; // Detenemos todo para ver el error en Thunder Client
        }

        $stmt->bind_param(
            'sdss',
            $datos['nombre'],
            $datos['precio'],
            $datos['descripcion'],
            $datos['imagen']
        );

        return $stmt->execute();
    }
}
