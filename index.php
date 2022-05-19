<!DOCTYPE html>
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
	<div class="container-expand-lg">
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
			<div id="menu" data-user="<?php echo $user != null ? $user->serializeJSON() : ""; ?>" class="m-5 row">
				<div class="col-3">
					<!-- ITEMS RENDERED BY JAVASCRIPT -->	
				</div>
				<div id="character" class="col-9">
					<div class="col-bg-primary">
						<div class="row">
							<p class="fs-3 fw-bold text-center">
							</p>
						</div>
						<div class="row" id="preview">
							<!-- GAME MODE IMAGE PREVIEW -->
							<!-- Button trigger modal -->
							<button type="button" style="font-family: 'Shadows Into Light', cursive" class="text-white fs-bold fs-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
								LOGIN
							</button>


						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- Modal -->
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
	<script src="../libs/three.min.js"></script>
	<!-- <script src="../libs/three.min.js"></script>
	<script src="../libs/FBXLoader.js"></script>
	<script src="../libs/game.js"></script>
	<script src="../libs/inflate.min.js"></script>
	<script src="../libs/game.js"></script> -->
<script src="<?php echo 'http://23.22.80.119/figterjam/assets/js/index.js' ?>"></script>

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

	if(menu.dataset.user != ''){
		modes.pop();
		document.querySelector('button').remove();
	}

	let ul = ULNode();
	const items = modes.map(ItemsNodes);

	ul.append(...items);
	menuContainer.append(ul);

</script>

</body>

</html>
