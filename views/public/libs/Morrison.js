class Morrison {
    constructor({health, name}) {

        this.ui = {
            health,
            name,
            percent: 0
        }

        this.scene;

        this.damagePercentage = 1;

        this.player = {};
        this.animations = {};

        this.isPunching= false;
        this.attack = false;

        this.health = 0;

        this.anims = ['Walking', 'Walking Backwards', 'Punching', 'Mma Kick'];

        this.model = `assets/character/Morrison/Mesh/Morrison.fbx`;
        this.animPath = `assets/character/Morrison/Anims`;

        this.loaded = false;

        this.raycaster = new THREE.Raycaster();

        //CHARACTER BOX COLIDER
        this.box;
        this.frontBlock = false;

    }

    initBox(scene) {
        console.log('You Choose Morrison As Fighter');
        //CREATE BOX 
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });
        this.box = new THREE.Mesh(geometry, material);
        this.box.object.name = 'Morrison Colider Box'
        console.log(this.box);
    }

    load(scene, pos = 0, rot = 0) {
        const Morrison = this;
        const loader = new THREE.FBXLoader();
        loader.load(Morrison.model, function (object) {

            object.mixer = new THREE.AnimationMixer(object);
            Morrison.player.mixer = object.mixer;
            Morrison.player.root = object.mixer.getRoot();

            object.name = 'Morrison';
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = null;
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            });

            object.rotation.y = rot;
            object.translateZ(pos);
            scene.add(object);

            Morrison.player.object = object;
            Morrison.player.mixer.clipAction(object.animations[0]).play();
            Morrison.animations.Idle = object.animations[0];

            //INIT UI PLAYER
            Morrison.ui.name.textContent = 'Morrison Wesk';
            Morrison.ui.health.className += ' w-0'

            Morrison.loadNextAnim(loader);
        })
    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const Morrison = this;
        loader.load(`assets/character/Morrison/Anims/${anim}.fbx`, function (object) {
            Morrison.animations[anim] = object.animations[0];
            if (Morrison.anims.length > 0) {
                Morrison.loadNextAnim(loader);
            } else {
                delete game.anims;
                Morrison.action = "Idle";
                //Morrison.animate();

                //SET CHARACTER BOX COLIDER POSITION TO
                //CREATE BOX 
                /* const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });

                this.box = new THREE.Mesh(geometry, material); *//* 
                const pos = Morrison.player.object.position.clone();
                Morrison.box.position.set(pos.x, (pos.y + 100), pos.z); */
                //scene.add(Morrison.box);
                Morrison.loaded = true;
            }
        });
    }

    initColiderBox(scene, pos = new THREE.Vector3(0, 0, 0),) {

        const Morrison = this;

        const geometry = new THREE.BoxGeometry(100, 200, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });

        Morrison.box = new THREE.Mesh(geometry, material);

        this.box.name = 'Morrison Colider Box';

        Morrison.box.position.set(pos.x, (pos.y + 100), pos.z);
        scene.add(Morrison.box);

    }

    fightCollision(objects = [], enemysName) {

        let pos = this.player.object.position.clone();
        pos.y += 60;
        this.raycaster.set(pos, new THREE.Vector3(-1, 0, 0));

        let coliders = this.raycaster.intersectObjects(objects, true);

        if(coliders.length > 0){
            coliders.find(colider => {
                if(colider.object.name === enemysName){
                    if(colider.distance <= 25){
                        console.log('is colliding');
                        this.frontBlock = true;
                    }else{
                        this.frontBlock = false;
                    }
                }
            })
        }

    }

    set action(name) {
        const action = this.player.mixer.clipAction(this.animations[name]);
        action.time = 0;
        this.player.mixer.stopAllAction();
        this.player.action = name;
        this.player.actionTime = Date.now();
        console.log(`Action Time: ${this.player.actionTime}`)
        this.player.actionName = name;

        action.fadeIn(0.5);
        action.play();
    }

    get action() {
        if (this.player === undefined || this.player.actionName === undefined) return "";
        return this.player.actionName;
    }

    playerController(action) {

        if (action === 'Walking') {
            if (this.action !== 'Walking') this.action = 'Walking';
        } else if (action === 'Walking Backwards') {
            if (this.action != 'Walking Backwards') this.action = 'Walking Backwards';
        } else if (action === 'Lead Jab') {
            if (this.action != 'Punching') this.action = 'Punching';
        } else if (action == 'Roundhouse Kick') {
            if (this.action != 'Mma Kick') this.action = 'Mma Kick';
        }else if (action == 'Hit') {
            if (this.action != 'Stomach Hit') this.action = 'Stomach Hit';
        }

    }

    isColiding(objects){
        let raycaster = new THREE.Raycaster();
        const pos = this.player.object.position.clone();
        
        raycaster.set(pos, new THREE.Vector3(0, 0, 1));
        let coliders = raycaster.intersectObjects(objects, true);

        if(coliders.length > 0){
            console.log(coliders);
        }
    }

    forward(dt, {objects, enemy}) {
        
        const pos = this.player.object.position.clone();
        this.box.position.set(pos.x, pos.y + 100, pos.z);

        this.fightCollision(objects, enemy);

        if (this.action == 'Walking') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1000) {
                this.action = 'Idle';
                console.log(`Player Action: ${this.player.action}`)
            } else {
                //console.log(`Player Action: ${this.player.action}`)
                if(!this.frontBlock)
                    this.player.object.translateZ(dt * 80);

            }
            //console.log(`Elepsed Time: ${Date.now() - this.player.actionTime}`);
        }


    }

    backward(dt) {
        if (this.action == 'Walking Backwards') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 900) {
                this.action = "Idle";
                console.log(`Player Action: ${this.player.action}`);
            } else {
                this.player.object.translateZ(dt * -90);
            }
        }
    }

    punch({ objects, enemy }) {

        let damage = false;

        if (this.action == 'Punching') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1000) {
                this.action = "Idle";
                damage = false;
                //console.log(`Player Action: ${this.player.action}`);
            } else {
                let pos = this.player.object.position.clone();
                pos.y += 60;
                let raycaster = new THREE.Raycaster();
                raycaster.set(pos, new THREE.Vector3(-1, 0, 0));
                let coliders = raycaster.intersectObjects(objects, true);

                if(coliders.length > 0){
                    coliders.find(colider => {
                        if(colider.object.name === enemy){
                            if(colider.distance < 100){
                                damage = true;
                            }
                        }
                    })
                }
            }
        }

        return damage;
    }

    kick({ objects, enemy}) {

        let damage = false;

        if (this.action == 'Mma Kick') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1600) {
                this.action = "Idle";
                damage = false;
            }else{
                let pos = this.player.object.position.clone();
                pos.y += 60;
                let raycaster = new THREE.Raycaster();
                raycaster.set(pos, new THREE.Vector3(-1, 0, 0));
                let coliders = raycaster.intersectObjects(objects, true);

                if(coliders.length > 0){
                    coliders.find(colider => {
                        if(colider.object.name === enemy){
                            if(colider.distance < 60){
                                damage = true;
                            }
                        }
                    })
                }
            }
        }

        return damage;
    }

    hit(){

        if(this.action == 'Stomach Hit'){
            const elepsedTime = Date.now() - this.player.actionTime;
            if(elepsedTime > 1600){
                this.action = 'Idle';
                this.damage(1);
            }
        }

    }

    startAnim(dt) {
        if (this.player.mixer !== undefined) this.player.mixer.update(dt);
    }

    damage(percent){

        this.health += 1;

        if(this.health <= 1){
            this.ui.percent += percent * 25;
            this.ui.health.className = `progress-bar bg-light w-${this.ui.percent}`;
        }else if(this.health > 50){
            this.health = 0;
        }
    }

}