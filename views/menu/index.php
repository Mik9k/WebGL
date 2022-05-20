<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- CSS BOOTSTRAP -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

	<!-- CSS INDEX -->
	<link rel="stylesheet" href="<?php echo '../../assets/css/index.css' ?>">

	<!-- GOOGLE FONTS API -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">

	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
		integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<title>FIGHTER JAM | ANIMAL STYLE
	</title>
</head>
<body>
	<!-- SPINNER LOAD -->
	<div id="spinner" class="container vh-100 d-flex justify-content-center">
		<div class="spinner-border my-auto h1 text-light" style="width: 10rem; height: 10rem;" role="status">
		</div>
	</div>

	<!-- MENU CONTAINER -->
	<div id="menu" class="container">
		<div class="row">
			<div class="col">
				<h1 class="text-white text-center title">
					FIGHTER JAM
					<small>ANIMAL STYLE</small>
				</h1>
				<div class="row">
					<h2 class="text-white text-center">MENU MODE</h2>
				</div>
				<div class="row">
					<div id="menu-container" class="m-5 col-3">
						<!-- MENU ITEMS -->
					</div>
					<div id="description" class="col-6 d-flex">
						<p class="h3 my-auto"></p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- SIGN IN -->
	<div class="modal fade" id="signin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Sign in</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="<?php echo constant('base_url'); ?>/menu/signin" method="POST">
						<div class="mb-3 row">
							<label for="l-email" type="email" class="col-sm-2 col-form-label">Email</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="s-email" name="s-email">
							</div>
						</div>
						<div class="mb-3 row">
							<label for="l-pwd" class="col-sm-2 col-form-label">Password</label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="s-pwd" name="s-pwd">
							</div>
						</div>
						<div class="mb-3 row">
							<label for="l-pwd" class="col-sm-2 col-form-label">Nickname</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="s-nickname" name="s-nickname">
							</div>
						</div>
						<div class="mb-3 row">
							<input type="submit" class="btn btn-primary"value="Sign in">
						</div>
					</form>
				</div>
				<div csass="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- LOG IN -->
	<div class="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Login</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="<?php echo constant('base_url') ?>/menu/login" method="POST">
						<div class="mb-3 row">
							<label for="l-email" type="email" class="col-sm-2 col-form-label">Email</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="l-email" name="l-email">
							</div>
						</div>
						<div class="mb-3 row">
							<label for="l-pwd" class="col-sm-2 col-form-label">Password</label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="l-pwd" name="l-pwd">
							</div>
						</div>
						<div class="mb-3 row">
							<input type="submit" class="btn btn-primary" value="Login">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- SETTINGS -->
	<div class="modal fade" id="settings" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Settings</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row">
						<h3 class="btn btn-primary" data-bs-toggle="collapse" href="#reprodlist" role="button" aria-expanded="false" aria-controls="collapseExample">
							Change Music</h3>
					</div>
					<div class="row">
						<ul id="reprodlist" class="collapse list-group" id="collapseExample">
						</ul>
					</div>
					<div class="row">
						<div id="mediaplayer" class="col justify-content-center d-flex rounded-pill bg-info p-3">
							<h6 class="text-center">Whatcher-DR DREE 2001</h6>
							<audio controls autoplay>
								<source src="">
							</audio>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<!-- JS BOOTSTRAP -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<!-- INDEX JS -->
	<script src="<?php echo '../../assets/js/index.js' ?>"></script>
</body>
</html>
<!-- <!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">

	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
		integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

		<link rel="stylesheet" href="<?php echo 'http://23.22.80.119/figterjam/assets/css/index.css' ?>">
	<title>Fighter Jam | Animal Style</title>

</head>

<body>
	<!-- SPINNER LOAD -
	<div class="container vh-100 d-flex justify-content-center">
		<div class="spinner-border my-auto h1 text-light" style="width: 10rem; height: 10rem;" role="status">
		</div>
	</div>
	<div class="container-expand-lg d-none">
		<div class="col-12">
			<div class="m-5 row">
				<h1 class="text-white text-center title">
					FIGHTER JAM
					<small>ANIMAL STYLE</small>
				</h1>
			</div>
			<div class="row">
				<h2 class="text-white text-center">MENU MODE</h2>
			</div>
			<div id="menu" data-user="<?php //echo $user != null ? $user->serializeJSON() : ""; ?>" class="m-5 row">
				<div class="col-3">
					<!-- ITEMS RENDERED BY JAVASCRIPT --
				</div>
				<div id="character" class="col-9">
					<div class="col-bg-primary">
						<div class="row">
							<p class="fs-3 fw-bold text-center">
							</p>
						</div>
						<div class="row" id="preview">
							<!-- GAME MODE IMAGE PREVIEW -->
							<!-- Button trigger modal --
							<button type="button" style="font-family: 'Shadows Into Light', cursive" class="text-white fs-bold fs-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
								LOGIN
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- Modal --
	<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					...
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Understood</button>
				</div>
			</div>
		</div>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<!-- <script src="../libs/three.min.js"></script> -->
	<!-- <script src="../libs/three.min.js"></script>
	<script src="../libs/FBXLoader.js"></script>
	<script src="../libs/game.js"></script>
	<script src="../libs/inflate.min.js"></script>
	<script src="../libs/game.js"></script> --
<script src="<?php //echo 'http://23.22.80.119/figterjam/assets/js/index.js' ?>"></script>

<script>
	const menuContainer = document.querySelector('#menu > div.col-3');
	const menu = document.querySelector('#menu');
	//RENDER LIST ITEMS BY MODULES
	const ULNode =  () =>{
		const ul = document.createElement('ul');
		ul.className = 'list-group';

		return ul;
	}

	const ItemsNodes = (item)=>{
		const li = document.createElement('li');
		li.className = 'modes-list fs-1 list-group-item'; 

		//SET ATRIBUTES
		li.setAttribute('mode', item.mode);

		//SET ANCHORE CONTENT
		const anchore = document.createElement('a');
		anchore.href = item.href;
		anchore.textContent = item.text;

		//APPEND
		li.append(anchore);

		return li;

	}
	
	const modes = [
		{
			mode: 'arcade',
			href: 'arcade.html',
			text: 'ARCADE MODE'
		},
		{ 
			mode: 'versus',
			href: '#',
			text: 'VERSUS MODE'
		},
		{ 
			mode: 'traning',
			href: '#',
			text: 'TRANING MODE'
		},
		{ 
			mode: 'settings',
			href: '#',
			text: 'SETTINGS'
		},
		{ 
			mode: 'session',
			href: '#',
			text: 'LOGIN'
		},
		{ 
			mode: 'start',
			href: '#',
			text: 'SIGN IN' 
		}

	];

	$.ajax({
		URL: 'http://22.23.80.119/figterjam/menu.php',
		type: 'GET',
		success: function(res){
			console.log(JSON.parse(res));
		}
	})

</script>

</body>

</html> -->
