<?php
class Game{
    private static $game = null;

    public static function Init_One(){
        if(Game::$game == null){
            Game::$game = new Game();
            return Game::$game;
        }

        return Game::$game;
    }

    private function __construct(){

        //GET AND SECCIONATE URL BY CONTROLLER/METHOD/PARAMS
        $url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : null;
        $url = trim($url, '/');
        $url = explode('/', $url);

        //IF DOESNT EXISTS A CONTROLLER
        if(empty($url[0])){
            $controllerFile = 'controllers/menu.php';
            $controller = new Menu();
            $controller->loadModel('menu');
            $controller->render();
            return false;
        }

        $fileController = 'controllers/'.$url[0].'.php';

        if(file_exists($fileController)){
            require_once $fileController;

            $controller = new $url[0];
            $controller->loadModel($url[0]);

            if(isset($url[1])){
                if(method_exists($controller, $url[1])){
                    $controller->{$url[1]}();
                }else{
                    echo 'Method Doesnt Exist';
                }
            }else{
                echo 'solo el conctronlador';
                //$controller->render();
            }
        }else{
            echo 'Method Doesnt Exist';
        }


    }
}
?>