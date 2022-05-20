class Singlepalyer{
    constructor(){
        this.time = 6000;//new Date();
        this.instancePU = 5500;

        this.damagePercentage = 1;

        this.objects = [];

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
        this.player = new Character(0, ['Walking', 'Walking Backwards', 'Lead Jab', 'Roundhouse Kick'], `assets/character/Jaden/Mesh/ybot.fbx`, `assets/character/Jaden/Anims`, 0, 'Jaden Wesk');
        //this.player = new Jaden(0, {health:ui.healthp1, name:ui.p1name, rage:ui.rage1, healup: ui.healthpu1, speed:ui.speedp1});
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
    
    updateTimer(){
        if(this.time > 0){
            this.time -= 1;
            document.querySelector('#timer').textContent = `${this.time / 100}s`;
            return true;
        }


        return false;
    }

    init(){

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

        var grid = new THREE.GridHelper(2000, 40, 0x000000, 0x000000);
        //grid.position.y = -100;
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);

        const game = this;
        game.player.load(game.scene, 0, THREE.Math.degToRad(90));
        game.player.initColiderBox(game.scene);

        this.objects = [game.player.box/* , game.player.box */];

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();

        this.animate();

    }

    animate(){
        const game = this;
        const dt = this.clock.getDelta();

        requestAnimationFrame(function () { game.animate(); });
        
        if (game.player.loaded == true) {

            // POWER UPS GEN
            game.createRagePU(5500, 1000);
            game.createHealthPU(4500, 1000);
            game.createSpeedPU(3500, 1000);

            game.player.startAnim(dt);

            game.player.forward(dt, { objects: this.objects, enemy: ''/* game.player2.box.name */ });
            game.player.backward(dt);
            if(game.player.punch({objects: this.objects, enemy: ''/* game.player2.box.name */})){
                // game.player2.damage(game.player.damagePercentage);
                /* const health = document.querySelector('#P2Health');
                health.textContent = game.player2.health; */
            }
        }

        if(!game.updateTimer()) return;

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
            game.scene.remove(game.pu.speed.getDelta());
            game.pu.speed = null;
        }
    }

}