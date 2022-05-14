<?php

class SessionController{


	public $session = false;

	public function __construct(){
		//start session
		session_start();

		if(!isset($_SESSION['USER'])){
			$this->session = false;
		}else{
			$this->session = true;
		}

	}
}

?>
