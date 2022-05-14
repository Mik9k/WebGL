<?php
require_once 'libs/session.php';
require_once 'libs/db.php';
require_once 'models/usermodel.php';

$sess = new SessionController();

if($sess->session){
	$res = array('session'=>'open');
	echo json_encode($res);
}else{
	if($_SERVER["REQUEST_METHOD"] == "POST"){
	
		var_dump($_POST);
		$email = $_POST['email'];
		$pwd = $_POST['pwd'];

		$user = new User();
		$user->login($email, $pwd);

		$_SESSION['USER'] = $email;
	
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
