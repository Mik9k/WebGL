<?php
class Controller{
    public function __construct(){
        $this->view = new View();
    }

    public function loadModel($model){
        $url = 'models/'.$model.'model.php';

        if(file_exists($url)){
            require_once $url;

            $modelname = $mode.'Model';
            $this->model = new $modelName();
        }
    }

    public function e_POST($params){
        foreach($params as $param){
            if(!isset($_POST[$param])){
                error_log('EPOST: PARAM '.$param.' DOESNT EXISTS');
                return false;
            }
        }

        return true;
    }

    public function e_GET($params){
        foreach($params as $param){
            if(!isset($_GET[$param])){
                error_log('EPOST: PARAM '.$param.' DOESNT EXISTS');
                return false;
            }
        }

        return true;
    }

    public function g_POST($param){
        return $_POST[$param];
    }

    public function g_GET($param){
        return $_GET[$param];
    }
}
?>