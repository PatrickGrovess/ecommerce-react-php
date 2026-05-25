<?php
namespace MVC;

// echo "Router cargado";

class Router{
    
    public $getRoutes = [];
    public $postRoutes = [];

    public function get($url, $fn){
        $this->getRoutes[$url] = $fn;
    }

    public function post($url, $fn){
        $this->postRoutes[$url] = $fn;
    }

    public function delete($url, $fn){
        $this->postRoutes[$url] = $fn; // Usamos postRoutes para DELETE también
    }

    public function comprobarRutas(){
        $currentUrl = $_SERVER["PATH_INFO"] ?? "/";
        $method = $_SERVER["REQUEST_METHOD"];

        if($method === "GET"){
            $fn = $this->getRoutes[$currentUrl] ?? null;
        }else{
            $fn = $this->postRoutes[$currentUrl] ?? null;
        }

        if($fn){
            call_user_func($fn, $this);
        }
        else{
            header("HTTP/1.0 404 Not Found");
            echo json_encode(["error" => "Ruta no encontrada"]);
        }
    }
}



?>