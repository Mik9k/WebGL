<?php
class View{
    public function __construct(){

    }

    public function render($name, $data = []){
        $this->d = $data;

        require 'views/'.$name.'.php';
    }
}
?>