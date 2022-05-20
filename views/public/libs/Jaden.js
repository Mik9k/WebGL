class Jaden {
    constructor(scene, {health, name, rage ,healup, speed}) {

        this.ui = {
            health,
            name,
            percent: 100,
            rage,
            healup,
            speed
        }

        this.scene = scene;

        this.damagePercentage = 1;
        this.speed = 80;


        this.frontBlock = false;
        this.isPunching= false;
        this.attack = false;

        this.player = {};
        this.animations = {};

        this.health = 0;


        this.anims = ['Walking', 'Walking Backwards', 'Lead Jab', 'Roundhouse Kick'];

        this.model = `assets/character/Jaden/Mesh/ybot.fbx`;
        this.animPath = `assets/character/Jaden/Anims`;

        this.colidders = [
            new THREE.Vector3(0, 0, 1), //FRONT VECTOR
            new THREE.Vector3(1, 0, 0), //RIGHT VECTOR
            new THREE.Vector3(0, 0, -1), //BACK VECTOR
            new THREE.Vector3(-1, 0, 0) //LEFT VECTOR
        ];

        this.raycaster = new THREE.Raycaster();

        this.loaded = false;

        //BOX COLIDER
        this.box;

    }

    initColiderBox(scene, pos = new THREE.Vector3(0, 0, 0),) {

        const Jaden = this;

        const geometry = new THREE.BoxGeometry(100, 200, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });

        Jaden.box = new THREE.Mesh(geometry, material);

        this.box.name = 'Jaden Colider Box'

        Jaden.box.position.set(pos.x, (pos.y + 100), pos.z);
        scene.add(Jaden.box);

    }

    fightCollision(objects = [], enemysName) {

        let pos = this.player.object.position.clone();
        pos.y += 60;
        this.raycaster.set(pos, new THREE.Vector3(1, 0, 0));

        let coliders = this.raycaster.intersectObjects(objects, true);

        if (coliders.length > 0) {
            coliders.find(colider => {
                if (colider.object.name === enemysName) {
                    if (colider.distance <= 25) {
                        console.log('is colliding');
                        this.frontBlock = true;
                    } else {
                        this.frontBlock = false;
                    }
                }
            })
        }

    }

    load(scene, pos = 0, rot = 0) {
        const Jaden = this;
        const loader = new THREE.FBXLoader();
        loader.load(Jaden.model, function (object) {

            object.mixer = new THREE.AnimationMixer(object);
            Jaden.player.mixer = object.mixer;
            Jaden.player.root = object.mixer.getRoot();

            object.name = 'jaden';
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
            Jaden.player.object = object;
            Jaden.player.mixer.clipAction(object.animations[0]).play();
            Jaden.animations.Idle = object.animations[0];

            //INIT UI PLAYER
            Jaden.ui.name.textContent = 'Jaden Huga';
            Jaden.ui.health.className += ' w-100'

            Jaden.loadNextAnim(loader);
        })
    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const Jaden = this;
        loader.load(`assets/character/anims/${anim}.fbx`, function (object) {
            Jaden.animations[anim] = object.animations[0];
            if (Jaden.anims.length > 0) {
                Jaden.loadNextAnim(loader);
            } else {
                delete game.anims;
                Jaden.action = "Idle";
                //Jaden.animate();
                Jaden.loaded = true;
            }
        });
    }

    set action(name) {
        const action = this.player.mixer.clipAction(this.animations[name]);
        action.time = 0;
        this.player.mixer.stopAllAction();
        this.player.action = name;
        this.player.actionTime = Date.now();
        //console.log(`Action Time: ${this.player.actionTime}`)
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
            if (this.action != 'Lead Jab') this.action = 'Lead Jab';
        } else if (action == 'Roundhouse Kick') {
            if (this.action != 'Roundhouse Kick') this.action = 'Roundhouse Kick';
        }

    }

    forward(dt, { objects, enemy }) {

        const pos = this.player.object.position.clone();
        this.box.position.set(pos.x, pos.y + 100, pos.z);

        this.fightCollision(objects, enemy);

        if (this.action == 'Walking') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1000) {
                this.action = 'Idle';
                //console.log(`Player Action: ${this.player.action}`)
            } else {
                //console.log(`Player Action: ${this.player.action}`)
                if (!this.frontBlock)
                    this.player.object.translateZ(dt * this.speed);
            }
            //console.log(`Elepsed Time: ${Date.now() - this.player.actionTime}`);
        }

    }

    backward(dt) {
        if (this.action == 'Walking Backwards') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 900) {
                this.action = "Idle";
                //console.log(`Player Action: ${this.player.action}`);
            } else {
                this.player.object.translateZ(dt * (-this.speed - 10));
            }
        }
    }

    punch({ objects, enemy }) {

        let damage = false;

        if (this.action == 'Lead Jab') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1600) {
                this.action = "Idle";
                damage = false;
                //console.log(`Player Action: ${this.player.action}`);
            } else {
                let pos = this.player.object.position.clone();
                pos.y += 60;
                let raycaster = new THREE.Raycaster();
                raycaster.set(pos, new THREE.Vector3(1, 0, 0));
                let coliders = raycaster.intersectObjects(objects, true);

                if(coliders.length > 0){
                    coliders.find(colider => {
                        if(colider.object.name === enemy){
                            if(colider.distance < 130){
                                damage = true;
                            }
                        }
                    })
                }
            }
        }

        return damage;
    }

    areaAttack({ objects, enemy }) {
        let pos = this.player.object.position.clone();
        pos.y += 60;
        this.raycaster.set(pos, new THREE.Vector3(1, 0, 0));

        let coliders = this.raycaster.intersectObjects(objects, true);

        if (coliders.length > 0) {
            coliders.find(colider => {
                if (colider.object.name === enemy) {
                    if (colider.distance <= 110) {
                        return true;
                    } else {
                        return false;
                    }
                }
            })
        }
    }

    kick({ objects, enemy}) {

        let damage = false;

        if (this.action == 'Roundhouse Kick') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1600) {
                this.action = "Idle";
                damage = false;
                //console.log(`Player Action: ${this.player.action}`)
            }else{
                let pos = this.player.object.position.clone();
                pos.y += 60;
                let raycaster = new THREE.Raycaster();
                raycaster.set(pos, new THREE.Vector3(1, 0, 0));
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

    startAnim(dt) {
        if (this.player.mixer !== undefined) this.player.mixer.update(dt);
    }

    damage(percent) {

        this.health += 1;

        if(this.health <= 1){
            this.ui.percent -= percent * 25;
            this.ui.health.className = `progress-bar bg-danger w-${this.ui.percent}`;
        }else if(this.health > 50){
            this.health = 0;
        }
    }

    rage(pu, scene){
        if(pu != null){
            if(this.player.object.position.x  >= -20 && this.player.object.position.x <= 20 && this.damagePercentage == 1){
                alert('Power up taken by player 1');
                scene.remove(pu.getObject());
                this.damagePercentage = 2;
                this.ui.rage.className = "d-inline";
            }
        }
    }

    healthPU(pu, scene){
        if(pu != null){
            if(this.player.object.position.x >= -20 && this.player.object.position.x <= 20){
                alert('Power up health taken by player 1');
                scene.remove(pu.getObject());
                this.ui.percent += 25;
                this.ui.health.className = `progress-bar bg-danger w-${this.ui.percent}`;
                this.ui.healup.className = 'd-inline';
                return true //POWER UP TAKEN;
            }

            return false; //NOT TAKEN
        }
    }

    speedPU(pu, scene){
        if(pu != null){
            if(this.player.object.position.x >= -20 && this.player.object.position.x <= 20){
                alert("Power up speed taken by player 1");
                scene.remove(pu.getObject());
                this.speed += 20;
                this.ui.speed.className = 'd-inline';
                return true; //POWER UP TAKEN;
            }

            return false; //NOT TAKEN
        }
    }

}