/* const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate(); */

class Game {
    constructor(ui) {

        this.time = 6000;//new Date();
        this.instancePU = 5500;

        this.damagePercentage = 1;

        this.objects = [];

        this.ui = ui;

        this.pu = {
            rage: null,
            health: null,
            speed: null
        }

        this.container;
        this.clock;
        this.camera;
        this.scene;
        this.renderer;
        this.player = new Jaden(0, {health:ui.healthp1, name:ui.p1name, rage:ui.rage1, healup: ui.healthpu1, speed:ui.speedp1});
        this.player2 = new Morrison({health:ui.healthp2, name:ui.p2name});
        this.key;
        this.raycaster;

        this.container = document.createElement('div');
        this.container.style.height = '100%';
        document.body.appendChild(this.container);

        const game = this;

        this.clock = new THREE.Clock();

        this.init();

        window.onError = function (error) {
            console.error(JSON.stringify(error));
        }

    }

    updateTimer(){
        if(this.time > 0){
            this.time -= 1;
            this.ui.timer.textContent = `${this.time / 100}s`;
            return true;
        }


        return false;
    }

    init() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(0, 150, 400);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

        let light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 200, 0);
        this.scene.add(light);

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = 180;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = -120;
        light.shadow.camera.right = 120;
        this.scene.add(light);

        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        //SPHERE POWER UP
        /* const pu = new Rage('#f02d1a', new THREE.Vector3(60, 100, 0));
        this.scene.add(pu.getObject());

        const health = new Health('#1aa9f0', new THREE.Vector3(-200, 100, 0));
        this.scene.add(health.getObject()); */

        var grid = new THREE.GridHelper(2000, 40, 0x000000, 0x000000);
        //grid.position.y = -100;
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);


        const game = this;
        game.player.load(game.scene, 0, THREE.Math.degToRad(90));
        game.player2.load(game.scene, -400, THREE.Math.degToRad(-90));
        game.player2.initColiderBox(game.scene);
        game.player.initColiderBox(game.scene);

        this.objects = [game.player2.box, game.player.box];
        
        
        /* 
        game.player2.initColiderBox(game.scene); */

        //let pos = game.player.player.object.position.clone();

        //PLAYER 2 COLIDDER BOX
        /* const geometry = new THREE.BoxGeometry(100, 200, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });
        this.box = new THREE.Mesh(geometry, material);
        //box.position.set(pos.x, pos.y, pos.z);
        this.scene.add(this.box); */

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();
        this.raycaster2 = new THREE.Raycaster();

        this.animate();


    }

    playerOneController(e) {
        let action = e.key.toUpperCase();

        if (action === "D") {
            this.player.playerController('Walking');
        } else if (action === "A") {
            this.player.playerController('Walking Backwards');
        } else if (action === "F") {
            this.player.playerController('Lead Jab');
        } else if (action == "R") {
            this.player.playerController('Roundhouse Kick');
        }
    }

    playerTwoController(e) {
        let action = e.key.toUpperCase();

        if (action === "H") {
            this.player2.playerController('Walking');
        } else if (action === "K") {
            this.player2.playerController('Walking Backwards');
        } else if (action === "G") {
            this.player2.playerController('Lead Jab');
        } else if (action == "Y") {
            this.player2.playerController('Roundhouse Kick');
        }
    }

    animate() {
        const game = this;
        const dt = this.clock.getDelta();
        
        
        requestAnimationFrame(function () { game.animate(); });
        if (game.player.loaded && game.player2.loaded) {
            
            /* if(game.time == game.instancePU){
                const power =  Math.floor((Math.random() * 100) + 1);
    
                if(power > 50){
                    game.pu = new Rage('#f02d1a', new THREE.Vector3(0, 450, 0))
                    game.scene.add(game.pu.getObject());
                    this.instancePU = 3000;
                }else{
                    game.pu = new Health('#1aa9f0', new THREE.Vector3(0, 100, 0));
                    game.scene.add(game.pu.getObject());
                    this.instancePU = 3000;
                }

                this.objects.push(game.pu.getObject());
    
            } */

            game.createRagePU(5500, 1000);
            game.createHealthPU(4500, 1000);
            game.createSpeedPU(3500, 1000);

            game.player.startAnim(dt);
            game.player2.startAnim(dt);


            game.player.forward(dt, { objects: this.objects, enemy: game.player2.box.name });
            game.player.backward(dt);
            if(game.player.punch({objects: this.objects, enemy: game.player2.box.name})){
                game.player2.damage(game.player.damagePercentage);
                /* const health = document.querySelector('#P2Health');
                health.textContent = game.player2.health; */
            }
            /* 
            if(game.player.isPunching){
                console.log('Is punching');
            } */
            if(game.player.kick({ objects: this.objects, enemy: game.player2.box.name})){
                game.player2.damage(game.player.damagePercentage * 2);
               /*  game.player2.damage(2);
                const health = document.querySelector('#P2Health');
                health.textContent = game.player2.health; */
            }

            //PLAYER 2 MOVMENT
            game.player2.forward(dt, {objects: this.objects, enemy: game.player.box.name });
            game.player2.backward(dt);
            if(game.player2.punch({objects: this.objects, enemy: game.player.box.name})){
                game.player.damage(game.player2.damagePercentage);
                /* game.player.damage(1);
                const health = document.querySelector('#P1Health');
                health.textContent = game.player.health; */
            }
            //game.player2.punch({objects, enemy: game.player2.box.name});
            /* if(game.player2.areaAttack && game.player2.isPunching){
                game.player.damage(10);
                const health = document.querySelector('#P1Health');
                health.textContent = game.player.health;
            } */
            if(game.player2.kick({objects: this.objects, enemy: game.player.box.name})){
                game.player.damage(game.player2.damagePercentage * 2);

                
                /*  game.player.damage(2);
                const health = document.querySelector('#P1Health');
                health.textContent = game.player.health; */
            }
            
            if(game.player.ui.percent <= 0){
                game.scene.remove(game.player.player.object);
                game.scene.remove(game.player.box);
                game.player.loaded = false;
            }

            if(game.player2.ui.percent >= 100){
                game.scene.remove(game.player2.player.object);
                game.scene.remove(game.player2.box);
                game.player2.loaded = false;
            }

            //const elepsedTime = Date.now() - this.time;
            if(!game.updateTimer()) return;
            if(game.pu.rage != null){

                /* if(game.player.player.object.position.x  >= -20 && game.player.player.object.position.x <= 20){
                    alert('Power up taken by player 1');
                    game.scene.remove(game.pu.getObject());
                    game.player.takeRage();
                    game.player.damage = 2;
                    game.pu = null;
                }else if(game.player2.player.object.position.x  >= -20 && game.player2.player.object.position.x <= 20){
                    alert('Power up taken by player 2');
                    game.scene.remove(game.pu.getObject());
                    game.pu = null;
                } */
                game.player.rage(game.pu.rage, game.scene);
                game.pu.rage.fall();
            }

            if(game.pu.health != null){
                let taken = game.player.healthPU(game.pu.health, game.scene);
                taken ? game.pu.health = null : game.pu.health.fall();
            }

            if(game.pu.speed != null){
                let taken = game.player.speedPU(game.pu.speed, game.scene);
                taken ? game.pu.speed = null : game.pu.speed.fall();
            }

        }


        this.key = '';

        this.renderer.render(this.scene, this.camera);

    }

    createRagePU(appear, disapear){
        const game = this;

        if(game.time == appear){
            game.pu.rage = new Rage('#f02d1a', new THREE.Vector3(0, 450, 0));
            game.scene.add(game.pu.rage.getObject());
        }else if(game.time < (appear - disapear) && game.pu.rage != null){
            game.scene.remove(game.pu.rage.getObject());
            game.pu.rage = null;
        }
        
    }

    createHealthPU(appear, disapear){
        const game = this;

        if(game.time == appear){
            game.pu.health = new Health('#1aa9f0', new THREE.Vector3(0, 450, 0));
            game.scene.add(game.pu.health.getObject());
        }else if(game.time < (appear - disapear) && game.pu.health != null){
            game.scene.remove(game.pu.health.getObject());
            game.pu.health = null;
        }
    }

    createSpeedPU(appear, disapear){
        const game = this;

        if(game.time == appear){
            game.pu.speed = new Speed('#7bf011', new THREE.Vector3(0, 450, 0));
            game.scene.add(game.pu.speed.getObject());
        }else if(game.time < (appear - disapear) && game.pu.speed != null){
            game.scene.remove(game.pu.speed.getObject());
            game.pu.speed = null;
        }
    }
    
}