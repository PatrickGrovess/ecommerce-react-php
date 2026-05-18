<?php

namespace Config;

use mysqli;

class db{
    public static function conectar(){
        $db = new mysqli("localhost", "root", "patrickf1m2p3", "e_commer_mvc_php_reactjs");

        if ($db->connect_error) {
            die("Error de conexión: " . $db->connect_error);
        }

        $db->set_charset("utf8");

        return $db;
    }
}