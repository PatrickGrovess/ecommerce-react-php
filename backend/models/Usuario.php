<?php
namespace Models;

class Usuario{
    private $db;

    public function __construct($conexion){
        $this->db = $conexion;
    }

    public function existeUsuario($email){
        $query = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $resultado = $stmt->get_result();
        return $resultado->num_rows > 0;
    }

    public function registrar($nombre, $email, $password){
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $nombre, $email, $passwordHash);

        return $stmt->execute();
    }

    public function obtenerPorEmail($email){
        $query = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $resultado = $stmt->get_result();


        return $resultado->fetch_assoc();

    }
}