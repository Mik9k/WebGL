<?php
class Menu extends SessionController{

    private $modes;

    public function __construct(){
        parent::__construct();

        $_SESSION['PLAYER'] = 'JHON@DOE';
    }

    public function render(){
        $this->view->render('menu/index');
    }

    public function getUser(){
        if($this->session){
           $player = new UserModel();
            
            if($this->getSession()){
                $player->getUser($_SESSION['PLAYER']);
                $this->getModes();
                echo json_encode((array(
                    'player' => $player->serialize(), 
                    'modes' => $this->modes
                )));
            }

            return;
        }
        $res = array('EMAIL' => 'none');
        echo json_encode($res);
        return;
    }

    private function getModes(){
        $json = file_get_contents('config/modeslist.json');
        $this->modes = json_decode($json, true);
    }

}
?>