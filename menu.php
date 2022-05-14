<?php
require_once 'libs/session.php';
require_once 'libs/db.php';
require_once 'models/usermodel.php';
$sess = new SessionController();
if($sess->session){
	$user = new User();
	$user->getUser($_SESSION['USER']);
	$res = array(
		'email' => $user->email,
		'nikname' => $user->nickname,
		'score' => $user->score,
		'session' => 'open'
	);

	echo json_encode($res);
}else {
	$res = array('session' => 'close');
	echo json_encode($res);
}
?>
