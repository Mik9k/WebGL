<?php
require_once 'libs/session.php';
require_once 'libs/db.php';
require_once 'models/usermodel.php';

$sess = new SessionController();

if($sess->session){
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		$user = new User();
		$user->getUser($_GET['email']);

		$res = array(
			'email' => $user->email,
			'nickname' => $user->nickname,
			'score' => $user->score,
			'session' => 'open'
		);

		echo json_encode($res);
	}
}
?>
