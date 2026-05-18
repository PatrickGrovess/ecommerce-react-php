<?php

namespace Controllers;

use Models\Usuario;
use Config\db;

class LoginController
{
    public static function crearCuenta()
    {
        $conexion = db::conectar();
        $usuarioModelo = new Usuario($conexion);
        $datos = json_decode(file_get_contents("php://input"), true);

        if (empty($datos['nombre']) || empty($datos['email']) || empty($datos['password'])) {
            echo json_encode(['error' => 'Todos los campos son obligatorios']);
            return;
        }

        if ($usuarioModelo->existeUsuario($datos['email'])) {
            echo json_encode(['error' => 'El email ya está registrado']);
            return;
        }
        $exito = $usuarioModelo->registrar($datos['nombre'], $datos['email'], $datos['password']);


        if ($exito) {
            echo json_encode(['message' => 'Cuenta creada exitosamente']);
        } else {
            echo json_encode(['error' => 'Error al crear la cuenta']);
        }
    }

    public static function login(){
        $conexion = db::conectar();
        $usuarioModelo = new Usuario($conexion);
        $datos = json_decode(file_get_contents("php://input"), true);

        if(empty($datos['email']) || empty($datos['password'])){
            echo json_encode(['error' => 'Email y contraseña son obligatorios']);
            return;
        }

        $usuario = $usuarioModelo->obtenerPorEmail($datos['email']);

        if ($usuario && password_verify($datos['password'], $usuario['password'])) {
            unset($usuario['password']);
            echo json_encode([
                "message" => "Login exitoso",
                "usuario" => $usuario
            ]);
        } else {
            echo json_encode(['error' => 'Email o contraseña incorrectos']);
        }
    }
}
