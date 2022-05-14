<?php
class User extends Database{
	public function __construct(){
		parent::__construct();
	}

	public $email;
	public $nickname;
	public $score;
	private $conn;

	public function registerUser($email, $nickname, $pwd){
		$this->connect();
		$this->query("INSERT INTO USERS(EMAIL, NICKNAME, PWD, INSERTED_DATE) VALUES('".$email."','".$nickname."','".$pwd."',sysdate())");

	}

	public function getUser($email){
		$this->connect();
		$user = $this->query("SELECT EMAIL, NICKNAME, SCORE FROM USERS WHERE EMAIL = '".$email."'");
		
		if( mysqli_num_rows($user) > 0 ){
			$row = mysqli_fetch_assoc($user);
			$this->email = $row["EMAIL"];
			$this->nickname = $row["NICKNAME"];
			$this->score = $row["SCORE"];
		}
	}

	public function getAll(){
		$this->connect();
		$res = $this->query("SELECT EMAIL, NICKNAME, SCORE FROM USERS");
		if( mysqli_num_rows($res) > 0 ){
			$users = [];
			while($row = mysqli_fetch_assoc($res)){
				$user = new User();
				$user->email = $row["EMAIL"];
				$user->nickname = $row["NICKNAME"];
				$user->score = $row["SCORE"];

				array_push($users, $user);
			}

			return $users;
		}
		
	}

	public function login($email, $pwd){
		$this->connect();
		$res = $this->query("SELECT EMAIL, NICKNAME, SCORE FROM USERS WHERE EMAIL = '".$email."' AND PWD = '".$pwd."'");
		if( mysqli_num_rows($res) > 0 ){
			$row = mysqli_fetch_assoc($res);
			$this->email = $row["EMAIL"];
			$this->nickname = $row["NICKNAME"];
			$this->score = $row["SCORE"];
		}
		
	}
			
}
?>
