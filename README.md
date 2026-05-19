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

Para que el sistema funcione correctamente, es obligatorio configurar las credenciales de la base de datos en el backend. Al explorar la carpeta del Backend, verás directorios como `models`, `controllers`, entre otros.

### 1. Configuración de la Base de Datos (PHP)
1. Crea una carpeta llamada `config` (en minúsculas) dentro de la raíz de la carpeta `backend`.
2. Dentro de `config`, crea un archivo llamado `db.php`.
3. Copia y pega el siguiente código en `db.php` y ajusta tus credenciales locales de MySQL:

```php
<?php

namespace Config;

use mysqli;

class db {
    public static function conectar() {
        $db = new mysqli("localhost", "Tu_Usuario", "Tu_Contraseña", "E_commer_MVC_PHP_ReactJS");

        if ($db->connect_error) {
            die("Error de conexión: " . $db->connect_error);
        }

        $db->set_charset("utf8");

        return $db;
    }
}


CREATE DATABASE E_commer_MVC_PHP_ReactJS;
USE E_commer_MVC_PHP_ReactJS;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    rol ENUM('admin', 'cliente') DEFAULT 'cliente'
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10,2),
    stock INT,
    imagen_url VARCHAR(255)
);

*Ejecuta el siguiente script en tu gestor de base de datos es para poder guardar los productos y usuarios registrados
