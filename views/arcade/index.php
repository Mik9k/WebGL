
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
    <title>Fighter Jam | Arcade</title>

    <style>
        h1{
            font-family:'Shadows Into Light', cursive;
        }

        #timer{
            font-family: 'Shadows Into Light', cursive;
        }
    </style>
</head>
<body>


    <div class="container-expand-lg">

    </div>

    <script src="<?php echo '../views/public/libs/three.min.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/FBXLoader.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Character.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Rage.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Health.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Speed.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/singleplayer.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/gameUI.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/inflate.min.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Jaden.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Morrison.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Booker.js' ?>"></script>


    <script>
        
        
        document.addEventListener("DOMContentLoaded", function () {
            const container = document.querySelector('.container-expand-lg');
            const ui = UI();
            const playerui = PlayerWidget(0);
            const playerui1 = PlayerWidget(1);
            const timer = Timer();
            ui.append(playerui, timer, playerui1);
            container.append(ui);

            
            const game = new Singlepalyer();
            window.game = game;

            window.addEventListener('keydown', function (e) {
                game.playerOneController(e);
                // game.playerTwoController(e);
            });
        })
    </script>

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
    <title>Fighter Jam | Animal Style</title>
    <style>
        body {
            margin: 0;
        }

        button {
            position: absolute;
            right: 20px;
            bottom: 20px;
        }

        button#P2Health {
            position: absolute;
            right: 10px;
            bottom: 500px;
            background-color: greenyellow;
        }

        button#P1Health {
            position: absolute;
            left: 10px;
            bottom: 500px;
            background-color: greenyellow;
        }
    </style>
</head>

<body>


    <div class="container-expand-lg">
        <div class="fixed-top row m-4" id="pui">
            <div class="col-4">
                <h1 style="font-family: 'Shadows Into Light', cursive;" id="p1name" class="fw-bold mx-5 my-3">
                    <small class="fs-6" style="font-family: 'Shadows Into Light', cursive;">プレーヤー1</small>
                </h1>
                <div class="progress" style="height: 35px;">
                    <div class="progress-bar bg-danger" id="healthp1" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>
            <div class="col-4 justify-content-center">
                <div style="font-family: 'Shadows Into Light', cursive;" id="timer" class="fs-bold p fs-1 text-center">
                    00
                </div>
            </div>
            <div class="col-4">
                <h1 style="font-family: 'Shadows Into Light', cursive;" id="p2name" class="fw-bold mx-5 my-3 text-end">
                    Morrison Wesk
                    <small class="fs-6" style="font-family: 'Shadows Into Light', cursive;">プレーヤー2</small>
                </h1>
                <div class="progress bg-danger" style="height: 35px;">
                    <div class="progress-bar bg-light" id="healthp2" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>

        <div class="row fixed-bottom m-4">
            <div class="col-6">
                <span>
                    <img src="assets/icons/watch.png" class="d-none" id="p1rage" width="64" height="64" alt="">
                    <img src="assets/icons/health-insurance.png" class="d-none" id="p1healthPU" width="64" height="64" alt="">
                    <img src="assets/icons/running.png" class="d-none" id="p1speedpu" width="64" height="64" alt="">
                </span>
            </div>
        </div>
    </div>
    </div>


    <<script src="<?php echo '../views/public/libs/three.min.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/FBXLoader.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/game.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/inflate.min.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Jaden.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Morrison.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Booker.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Rage.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Health.js' ?>"></script>
    <script src="<?php echo '../views/public/libs/Speed.js' ?>"></script>

    <script>

        //get health bar
        //get name and player

        document.addEventListener("DOMContentLoaded", function () {

            const UI = {
                healthp1: document.querySelector("#healthp1"),
                p1name: document.querySelector("#p1name"),
                healthp2: document.querySelector("#healthp2"),
                p2name: document.querySelector("#p2name"),
                timer: document.querySelector("#timer"),
                rage1: document.querySelector("#p1rage"),
                healthpu1: document.querySelector("#p1healthPU"),
                speedp1: document.querySelector("#p1speedpu")

            }

            const game = new Game(UI);
            window.game = game;


            //const UI = healthLife({name:'Jaden Huga', p: 'プレーヤー1', maxHP:2000, minHP: 0, currentHP:100}, false)

            //document.appendChild(UI);

            window.addEventListener('keydown', function (e) {
                game.playerOneController(e);
                game.playerTwoController(e);
            });
        })

        const healthContainer = () => {

            //COLUMN CONTAINER
            const container = document.createElement("div");
            container.className = 'col-4';

            return container;
        }

        const CHName = (name) => {

            //CHARACTER NAME
            const characterName = document.createElement("h1");
            characterName.style = "font-family: 'Shadows Into Light', cursive;";
            characterName.className = "fw-bold mx-5 my-3";
            characterName.textContent = name;

            return characterName;

        }

        const Player = (p = 'プレーヤー1') => {

            //PLAYER NUMBER
            const player = document.createElement("small");
            player.style = "font-family: 'Shadows Into Light', cursive;"
            player.className = "fs-6";
            player.textContent = p;

            return player;


        }

        const healthLife = ({ name, p, maxHP, minHP, currentHP }, fliped = false) => {

            //CONTAINER
            const container = healthContainer();

            const character = CHName(name);
            const player = Player(p);

            //PLAYER NAME AND NUMBER
            character.append(player);

            //APPEND TO CONTAINER
            container.append(character);

            //HEALTH CONTAINER
            const health = document.createElement("div");
            health.className = "progress";
            health.style = "height: 35px;";


            //HEALTH BAR AND HEALTH CONTAINER
            const bar = document.createElement("div");
            bar.className = `progress-bar ${!fliped ? 'bg-danger' : 'bg-light'} w-75`;
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-valuenow', currentHP);
            bar.setAttribute('aria-valuemin', minHP);
            bar.setAttribute('aria-valuemax', maxHP);

            health.append(bar);

            container.append(bar);

            return container;

        }




    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>

</body>

</html> -->