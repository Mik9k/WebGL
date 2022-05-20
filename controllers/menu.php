<?php
class Menu extends SessionController{

    private $modes;
    private $tracks;

    public function __construct(){
        parent::__construct();
    }

    public function render(){
        $this->view->render('menu/index');
    }

    public function login(){
        if($this->e_POST(['l-email', 'l-pwd'])){
            $user = new UserModel();
            $user->login($this->g_POST('l-email'), $this->g_POST('l-pwd'));
            $this->initSession($this->g_POST('l-email'));
            header("location:".constant('base_url'));
            exit();
        }
    }

    public function signin(){
        if($this->e_POST(['s-email', 's-pwd'])){
            $user = new UserModel();
            $user->signin(
                $this->g_POST('s-email'),
                $this->g_POST('s-pwd'),
                $this->g_POST('s-nickname')
            );

            $this->initSession($this->g_POST('s-email'));
            header("location:".constant('base_url'));
            exit();
        }
    }

    public function getUser(){

        $this->getModes();
        $this->getTracks();
        $res = array('modes' => $this->modes, 'tracks' => $this->tracks);

        if($this->session){
           $player = new UserModel();
            
            if($this->getSession()){
                $player->getUser($_SESSION['PLAYER']);
                $res['player'] = $player->serialize();
            }else{
                $res['player'] = null;
            }

        }else{
            $res['player'] = null;
        }
        
        echo json_encode($res);
        return;
    }

    private function getModes(){
        $json = file_get_contents('config/modeslist.json');
        $this->modes = json_decode($json, true);
    }

    private function getTracks(){
        $json = file_get_contents('config/music.json');
        $this->tracks = json_decode($json, true);
    }

}
?>