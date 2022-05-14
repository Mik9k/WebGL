<?php
	class Database{
		private $servername = 'localhost';
		private $username =  'root';
		private $pwd = 'quienSoy?Miguel9k!';
		private $dbname = 'FIGHTER_JAM';

		public $connection;

		public function __construct(){
		}

		public function connect(){
			$this->connection = mysqli_connect(
				$this->servername,
				$this->username,
				$this->pwd,
				$this->dbname
			);

			 if(!$this->connection){
				die("Connection failed: ".mysqli_connect_error());	
			 }

			echo "Connected successfully";
		}

		public function query($query){
			$result = mysqli_query($this->connection, $query);
			if($result){
				echo "New record created successfully";
			}else{
				echo "Error: ".$query."<br>".mysqli_error($this->connection);	
			}

			mysqli_close($this->connection);

			return $result;
		}

	}

	/*$servername = 'localhost';
	$username = 'root';
	$pwd = 'quienSoy?Miguel9k!';
	$dbname = 'FIGHTER_JAM'; 

	$conn = mysqli_connect($servername, $username, $pwd, $dbname);

	if(!$conn){
		die('Connection Failed: '.mysqli_connect_error());
	}

	$sql = 'select * from USERS'; 

	$res = mysqli_query($conn, $sql);
	
	if(mysqli_num_rows($res) > 0){
		while($row = mysqli_fetch_assoc($res)){
			echo 'email: '.$row['EMAIL'].' nickname: '.$row['NICKNAME']."<br>";
		}
		echo 'New record created successfully';

		
	}else{
		echo 'Err: '.$sql.'<br>'.mysqli_error($conn);
	}*/
?>
