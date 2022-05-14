<?php
require_once 'libs/session.php';
require_once 'libs/db.php';
require_once 'models/usermodel.php';

$sess = new SessionController();

if($sess->session){
	$res = array('session' => 'open');
	echo json_encode($res);
}else{
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		$user = new User();
		$user->register(
			$_POST['email'],
			$_POST['nickname'],
			$_POST['pwd']
		);

		$_SESSION['USER'] = $_POST['email'];

		$res = array('session' => 'open');
		echo json_encode($res);		

	}
}

?>
