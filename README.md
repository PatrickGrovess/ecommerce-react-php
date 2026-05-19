# E-commerce - Dashboard de Inventario

Sistema de gestión de inventario para E-commerce desarrollado con un enfoque profesional, separando el Frontend en React y el Backend en PHP estructurado.

---

## 🚀 Estado del Proyecto

### **Implementado**
* **Frontend (React):** Estructura base del Dashboard, componentes de la interfaz de usuario con Tailwind CSS y conexión inicial a la API.
* **Backend (PHP):** Arquitectura base, controladores iniciales y scripts de conexión.
* **Base de Datos (MySQL):** Diseño del esquema relacional para productos y categorías.

### **En Desarrollo / Pendiente**
* [ ] Módulo para eliminar productos del inventario (`feat/eliminar-producto`).
* [ ] Pasarela de pagos / Integraciones externas.
* [ ] Módulo de actualización del inventario (Poder cambiar precio, nombre, imagen o descripción previamente asignada).

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* **PHP** (Versión 8.0 o superior)
* **MySQL / MariaDB**
* **Node.js** & npm
* Un servidor local como **XAMPP**, **Laragon** o **Docker**

---

## ⚙️ Configuración del Entorno

Para que el sistema funcione correctamente, es obligatorio configurar las credenciales de la base de datos en el backend.

### 1. Backend (PHP)
Ve a la carpeta del servidor de backend y localiza los archivos ahi veras archivos como models, controllers etc. Lo que tienes que hacer es:
* Crear una carpeta dentro de la carpeta Backend llamada config (Minuscula)  
* dentro de la carpeta config crear un archivo llamado `db.php` y configura tus credenciales locales de MySQL:
* 
  ```php
  // Puedes usar este codigo de abajo db.php
  
  <?php

namespace Config;

use mysqli;

class db{
    public static function conectar(){
        $db = new mysqli("localhost", "Tu Usuario", "Tu Contraseña", "El nombre de la DB");

        if ($db->connect_error) {
            die("Error de conexión: " . $db->connect_error);
        }

        $db->set_charset("utf8");

        return $db;
    }
}

  * Tambien debes crear la db y las tablas en SQL para poder registrar productos y usuarios
create database E_commer_MVC_PHP_ReactJS;
use E_commer_MVC_PHP_ReactJS;

CREATE TABLE usuarios(
	id int auto_increment primary key,
    nombre varchar(100),
    email varchar(100) unique,
    password varchar(255),
    rol ENUM("admin", "cliente") default "cliente"
);

CREATE TABLE productos(
	id int auto_increment primary key,
    nombre varchar(100),
    descripcion TEXT,
    precio decimal(10,2),
    stock INT,
    imagen_url varchar(255)
);

* Eso es todo. Cuando crees un usuario desde la db haces un update al rol de la tabla usuario,
* por defecto se asigna cliente la cambias a admin y tendras acceso al panel admin
