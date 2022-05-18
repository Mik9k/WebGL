<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- GOOGL FONTS API -->
    	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">

    <title>FIGHTER JAM | MENU</title>
  </head>
  <body class="m-0 p-0">
	
	<div class="container-expand-lg bg-primary d-none">
		<div class="col-12">
			<div class="m-5 row">
				<h1 class="text-white text-center title">
					FIGHTER JAM
					<small> ANIMAL STYLE </small>
				</h1>
			</div>
			<div class="row">
				<h2 class="text-white text-center"> MENU MODE </h2>
			</div>
			<div id="menu">
				<div class="col-3">
				</div>
			</div>
		</div>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    	<script>
		
		$('document').ready(()=>{
			let session;
			$.ajax({
				url:'http://23.22.80.119/figterjam/menu.php',
				data: {},
				success: function(res){
						console.log(JSON.parse(res));
						document.querySelector('#loading').remove();
						document.querySelector('.container-expand-lg').classList.remove('d-none')
					}
				});

			const menu = document.querySelector('#menu');

		});	

		const loading = ()=>{

			const container = document.createElement('div');
			container.id = 'loading';
			container.className = 'container-expand-lg d-flex align-items-center vh-100';

			const spinnerContainer = document.createElement('div');
			spinnerContainer.className = 'spinner-border m-5 mx-auto';
			spinnerContainer.setAttribute('role', 'status');

			container.append(spinnerContainer);

			return container;

		}

		const ULNode = ()=>{
			const ul = document.createElemet('ul');
			ul.className = 'list-grup';

			return ul;	
		}

		const ItemNode = (item)=>{
			const li = document.createElement('li');
			li.className = 'modes-list fs-1 list-group-item';

			li.setAttribute('mode', item.node);

			const anchore = document.createElement('a');
			anchore.href = item.href;
			anchore.textContent = item.text;

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


		document.body.append(loading());
	</script>
  </body>
</html>

