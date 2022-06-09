class Game {
    constructor(playersName = ['player 1']) {

        this.player = new Character('assets/model/Pete/Boxing.fbx', ['Punching', 'Forward', 'Backward', 'Kick'], 1, 'assets/model/Pete/anims', playersName[0]);
        // this.player2 = new Character('assets/model/Pete/Boxing.fbx', ['Punching', 'Forward', 'Backward', 'Kick'], 2, 'assets/model/Pete/anims');
        // this.player2 = new Character('assets/model/Pete/Boxing.fbx', [], 2);


        this.conatiner;
        //player
        // this.player = {}; 
        //animations
        // this.anims = [];
        this.stats;
        //controller class ?
        this.camera;
        this.scene;
        this.renderer;

        this.time = 6000;

        document.body.append(this.UI());

        this.container = document.createElement("div");
        this.container.style.height = '100%';
        document.body.appendChild(this.container);


        const game = this;
        //ANIM
        //assets path

        this.clock = new THREE.Clock();

        this.init();

        window.onError = function (error) {
            console.error(JSON.stringify(error));
        }

    }

    init() {

        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
        //this.camera.position.set(0, 100, 100 );
        this.camera.position.set(0, 100, 250);

        this.scene = new THREE.Scene();
        // this.scene.background= new THREE.Color(0xa0a0a0);
        // this.scene.fog = new THREE.Fog(0xa0a0a0, 700, 1800);

        let light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 200, 0);
        this.scene.add(light);

        light = new THREE.DirectionalLight(0x000000);
        light.position.set(0, 200, 150);
        light.castShadow = true;
        light.shadow.camera.top = 180;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = -120;
        light.shadow.camera.right = 120;
        this.scene.add(light);

        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(4000, 4000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.reciveShadow = true;
        this.scene.add(mesh);

        var grid = new THREE.GridHelper(4000, 40, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.tranparent = true;
        this.scene.add(grid);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.append(this.renderer.domElement);

        const game = this;

        game.skybox();
        game.scenario();


        this.player.load(this.scene);
        // this.player2.load(this.scene);
        this.player.setColiderbox(this.scene);
        // this.player2.setColiderbox(this.scene);

        this.sphere = new Speed(new THREE.Vector3(0, 0, 0), this.scene);
        // this.scene.add(this.sphere.getObject());

        game.animate();

    }

    UI() {
        const container = document.createElement("div");
        container.className = 'container-expand-lg';

        const row = document.createElement('div');
        row.className = 'fixed-top row m-4';

        // row.append(this.player.Player_UI('player1' ,100));

        /* COUNTER BANNER */
        const counter = document.createElement('div');
        counter.className = 'col-4 justify-content-center';
        const numbers = document.createElement('div');
        numbers.className = 'fs-bold fs-1 text-center';
        numbers.textContent = '00';
        numbers.id = 'timer';

        /* POWER UPS CONTAINER */
        const powerups = document.createElement('div');
        powerups.className = 'row fixed-bottom m-4';

        powerups.append(this.player.PowerUps_UI());

        counter.append(numbers);

        row.append(this.player.Player_UI('player1', 100), counter);

        // row.append(this.player2.Player_UI('player2' ,100));

        container.append(row, powerups);

        // document.body.append(container);
        return container;
    }

    scenario(){
        const geometry = new THREE.BoxGeometry(1000, 400, 100);
        const material = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('assets/img/scenarios/scene1.jpg')});

        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(0, 110, -100);

        this.scene.add(wall);
    }

    skybox() {

        const game = this;

        const materialArray = [];

        let texture_ft = new THREE.TextureLoader().load('assets/img/day_sky_box/dust_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load('assets/img/day_sky_box/dust_bk.jpg');
        let texture_up = new THREE.TextureLoader().load('assets/img/day_sky_box/dust_up.jpg');
        let texture_dn = new THREE.TextureLoader().load('assets/img/day_sky_box/dust_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load('assets/img/day_sky_box/dust_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load('assets/img/day_sky_box/dust_lf.jpg');

        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

        let geometry = new THREE.BoxGeometry(1500, 1500, 1500);
        let skybox = new THREE.Mesh(geometry, materialArray);

        skybox.position.set(0, 100, 0);

        for (let i = 0; i < 6; i++)
            materialArray[i].side = THREE.BackSide;

        game.scene.add(skybox);

    }

    animate() {
        const game = this;
        const dt = this.clock.getDelta();

        requestAnimationFrame(function () { game.animate(); });

        game.player.update(dt, game.scene, this.sphere);
        game.player.puncing('');
        game.player.forward(dt, [this.sphere.coliderbox], '');
        game.player.backward(dt);
        game.player.kick();

        this.sphere.anim(0.05, this.scene);
        if (this.sphere.taken == false) {
            //instanciar nuevo power up;
            //rand power up;
        }


        this.renderer.render(this.scene, this.camera);

    }

    updateTimer() {
        if (this.time > 0) {
            this.time -= 1;
            const timer = document.querySelector('#timer');
            timer.textContent = `${this.time / 100}s`;
            return true;
        }

        return false;
    }

    removeRage() {
        if (this.sphere.anim() == false) {
            this.scene.remove(this.sphere.getObject());
        }
    }
}