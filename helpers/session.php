<?php
class SessionController extends Controller{

    public $session = false;

    public function __construct(){
        parent::__construct();

        session_start();

        if(!isset($_SESSION['PLAYER'])){
            $this->session = false;
        }else{
            $this->session = true;
        }
        
        
    }

    public function getSession(){
        return isset($_SESSION['PLAYER']) ? $_SESSION['PLAYER'] : null;
    }

    public function initSession($email){
        $_SESSION['PLAYER'] = $email;
    }
}
?>