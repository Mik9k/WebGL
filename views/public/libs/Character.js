class Character{
    constructor(scene, anims = [], model, animpath, side = 0, name){
        this.scene = scene;

        this.name = name;

        this.ui = {/* 
            health,
            name, */
            percent: 100/* ,
            rage,
            healup,
            speed */
        }

        this.damagePercentage = 1;
        this.speed = 80;

        this.frontBlock = false;
        this.isPunching= false;
        this.attack = false;

        this.player = {};
        this.animations = {};

        this.anims = anims;
        this.model = model;
        this.animPath = animpath;
        this.side = side

        this.raycaster = new THREE.Raycaster();

        this.loaded = false;

        //BOX COLIDER
        this.box;
    }

    initColiderBox(scene, pos = new THREE.Vector3(0, 0, 0),) {

        const character = this;

        const geometry = new THREE.BoxGeometry(100, 200, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });

        character.box = new THREE.Mesh(geometry, material);

        this.box.name = 'Jaden Colider Box'

        character.box.position.set(pos.x, (pos.y + 100), pos.z);
        scene.add(character.box);

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
        const character = this;
        const loader = new THREE.FBXLoader();
        loader.load(character.model, function (object) {

            object.mixer = new THREE.AnimationMixer(object);
            character.player.mixer = object.mixer;
            character.player.root = object.mixer.getRoot();

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
            character.player.object = object;
            character.player.mixer.clipAction(object.animations[0]).play();
            character.animations.Idle = object.animations[0];

            //INIT UI PLAYER
            const name = document.querySelector(`#character-${character.side}`);
            const health = document.querySelector(`#character-${character.side}-h`);
            name.textContent = character.name;

            character.loadNextAnim(loader);
        })
    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const character = this;
        loader.load(`assets/character/anims/${anim}.fbx`, function (object) {
            character.animations[anim] = object.animations[0];
            if (character.anims.length > 0) {
                character.loadNextAnim(loader);
            } else {
                delete game.anims;
                character.action = "Idle";
                //character.animate();
                character.loaded = true;
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

    isColiding(objects){
        let raycaster = new THREE.Raycaster();
        const pos = this.player.object.position.clone();
        
        raycaster.set(pos, new THREE.Vector3(0, 0, 1));
        let coliders = raycaster.intersectObjects(objects, true);

        if(coliders.length > 0){
            console.log(coliders);
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
            document.querySelector(`#character-${this.side}h`).className = `progress-bar bg-danger w-${this.ui.percent}`;
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
                // alert('Power up health taken by player 1');
                scene.remove(pu.getObject());
                this.ui.percent += 25;
                document.querySelector(`#character-${this.side}h`).className = `progress-bar bg-danger w-${this.ui.percent}`;
                this.ui.healup.className = 'd-inline';
                return true //POWER UP TAKEN;
            }

            return false; //NOT TAKEN
        }
    }

    speedPU(pu, scene){
        if(pu != null){
            if(this.player.object.position.x >= -20 && this.player.object.position.x <= 20){
                // alert("Power up speed taken by player 1");
                scene.remove(pu.getObject());
                this.speed += 20;
                this.ui.speed.className = 'd-inline';
                return true; //POWER UP TAKEN;
            }

            return false; //NOT TAKEN
        }
    }
}