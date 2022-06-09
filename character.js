
const RIGTH_VALUE = -150;
const RIGHT_ANGLE = 90;
const ASSETS_PATH = 'assets/model'


class Character {
    constructor(model, animations = [], playerID = 1, animsPath, name) {
        this.model = model;
        this.anims = animations;
        this.loaded = false;
        this.player = {};
        this.animations = {};
        this.playerid = playerID;
        this.pos;
        this.angle;
        this.animsPath = animsPath;

        this.name = name;

        this.speed = 80;
        this.coliderboxLoader = false;
        this.coliderbox;
        this.keys = [];

        this.raycaster = new THREE.Raycaster();
        this.colition = false;

        this.attack = false;
        this.damage = 25;
        this.life = this.playerid === 1 ? 100 : 0;
        this.alive = true;

        this.rage_slot = false;
        this.health_slot = false;
        this.speed_slot = false;

        this.score = 0;

        this.setController();
    }

    load(scene) {
        const character = this;
        const loader = new THREE.FBXLoader();



        loader.load(this.model, function (object) {
            object.mixer = new THREE.AnimationMixer(object);
            character.player.mixer = object.mixer;
            character.player.root = object.mixer.getRoot();

            object.name = `Player ${character.playerid}`;

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.reciveShadow = false;
                }
            });

            if (character.playerid == 1) {
                character.pos = new THREE.Vector3(RIGTH_VALUE, 0, 0);
                character.angle = THREE.Math.degToRad(RIGHT_ANGLE);
            } else {
                character.pos = new THREE.Vector3(-(RIGTH_VALUE), 0, 0);
                character.angle = THREE.Math.degToRad(-(RIGHT_ANGLE));
            }

            object.position.set(character.pos.x, character.pos.y, character.pos.z);
            object.rotateY(character.angle);
            scene.add(object);

            character.player.object = object;
            character.player.mixer.clipAction(object.animations[0]).play();
            character.animations.Idle = object.animations[0];

            character.loadNextAnim(loader);
        })
    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const character = this;
        loader.load(`${character.animsPath}/${anim}.fbx`, function (object) {
            character.animations[anim] = object.animations[0];

            if (character.anims.length > 0) {
                character.loadNextAnim(loader);
            } else {
                delete character.anims;
                character.action = "Idle";
                charcater.loaded = true;
            }
        })
    }

    set action(name) {
        const action = this.player.mixer.clipAction(this.animations[name]);
        action.time = 0;
        this.player.mixer.stopAllAction();
        this.player.action = name;
        this.player.actionTime = Date.now();
        this.player.actionName = name;

        action.fadeIn(0.5);
        action.play();
    }

    get action() {
        if (this.player === undefined || this.player.actionName === undefined) return "";
        return this.player.actionName;
    }

    controller(action) {
        if (action) {
            if (this.action != 'Punching') this.action = 'Punching';
        }
    }

    setController() {
        const character = this;
        window.addEventListener('keydown', function (e) {
            if (character.playerid == 1) { character.controller_one(e); }
            else if (character.playerid == 2) character.controller_two(e)
        })

    }

    controller_one(action) {
        action = action.key.toUpperCase();

        if (action == 'F') {
            if (this.action !== 'Punching') this.action = 'Punching';
        } else if (action == 'D') {
            if (this.action !== 'Forward') this.action = 'Forward';
        } else if (action == 'A') {
            if (this.action !== 'Backward') this.action = 'Backward';
        } else if (action == 'R') {
            if (this.action !== 'Kick') this.action = 'Kick';
        }
    }

    controller_two(action) {
        action = action.key.toUpperCase();

        if (action == 'G') {
            if (this.action !== 'Punching') this.action = 'Punching';
        } else if (action == 'H') {
            if (this.action !== 'Forward') this.action = 'Forward';
        } else if (action == 'L') {
            if (this.action !== 'Backward') this.action = 'Backward';
        } else if (action == 'K') {
            if (this.action !== 'Kick') this.action = 'Kick';
        }
    }

    forward(dt, objects = [], name) {

        if (this.player.object !== undefined) {
            const pos = this.player.object.position.clone();
            this.coliderbox.position.set(pos.x, pos.y + 100, pos.z);
            this.isColiding(objects, name);
        }

        if (this.action == 'Forward') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1000) {
                this.action = 'Idle';
            } else {
                if (!this.colition)
                    this.player.object.translateZ(dt * this.speed);
            }
        }

    }

    backward(dt) {

        if (this.loaded) {
            const pos = this.player.object.position.clone();
            this.coliderbox.position.set(pos.x, pos.y + 100, pos.z);
        }

        if (this.action == 'Backward') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 900) {
                this.action = 'Idle';
            } else {
                this.player.object.translateZ(dt * (-(this.speed - 10)));
            }
        }
    }

    puncing(enemy = '') {
        if (this.action == 'Punching') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1600) {
                this.action = "Idle";
                this.attack = false;
            } else if (!this.attack) {
                this.attack = true;
                let pos = this.player.object.position.clone();
                pos.y += 60;
                let raycaster = new THREE.Raycaster();
                let rayside = this.playerid == 1 ? 1 : -1;
                raycaster.set(pos, new THREE.Vector3(rayside, 0, 0));
                let colider = raycaster.intersectObjects([enemy.coliderbox], true);

                if (colider.length > 0) {
                    colider.find(col => {
                        if (col.object.name == enemy.coliderbox.name) {
                            if (col.distance < 130) {
                                enemy.hit(this.damage);
                            }
                        }
                    })
                }
            }
        }
    }

    hit(damage) {
        const bar = document.querySelector(`#life-${this.playerid}`);
        if (this.playerid == 1) {
            this.life -= damage;
            if(this.life <= 0) {
                this.alive = false;
            }
        } else {
            this.life += damage;
            if(this.life > 100){
                this.alive = false;
            }
        }

        bar.className = `progress-bar ${this.playerid == 1 ? 'bg-danger' : 'bg-light'} w-${this.life}`;
    }

    kick() {
        if (this.action == 'Kick') {
            const elepsedTime = Date.now() - this.player.actionTime;
            if (elepsedTime > 1600) {
                this.action = 'Idle';
            } else {
                //KICK DAMAGE
            }
        }
    }

    update(dt, scene, powerup) {

        const character = this;

        if (character.player.mixer !== undefined) {
            character.player.mixer.update(dt);

            if (this.rage_slot == true) {
                scene.remove(powerup.getObject());
                powerup.coliderbox.position.set(-500, 0, 0);
                powerup.taken = false;
            }

            if (this.health_slot == true) {
                scene.remove(powerup.getObject());
                powerup.coliderbox.position.set(-500, 0, 0);
                powerup.taken = false;
            }

            if(this.speed_slot == true) {
                scene.remove(powerup.getObject());
                powerup.coliderbox.position.set(-500, 0, 0);
                powerup.taken = false;
            }

        }


    }

    setColiderbox(scene) {
        const geo = new THREE.BoxGeometry(100, 200, 100);
        const mat = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });

        this.coliderbox = new THREE.Mesh(geo, mat);
        this.coliderbox.name = `playerbox ${this.playerid}`;
        this.coliderbox.material.transparent = true;
        this.coliderbox.material.opacity = 0.0;


        const pos = this.playerid == 1 ? new THREE.Vector3(RIGTH_VALUE, 0, 0) : new THREE.Vector3(-(RIGTH_VALUE), 0, 0);

        this.coliderbox.position.set(pos.x, pos.y + 100, pos.z);
        scene.add(this.coliderbox);
    }

    isColiding(objects = [], name) {

        let pos = this.player.object.position.clone();
        pos.y += 60;
        const rayside = this.playerid == 1 ? 1 : -1;
        let raycaster = new THREE.Raycaster();
        raycaster.set(pos, new THREE.Vector3(rayside, 0, 0));

        const colisions = raycaster.intersectObjects(objects, true);

        let colide = false;

        if (colisions.length > 0) {
            colisions.find(colider => {
                if (colider.object.name === name) {
                    if (colider.distance <= 25) {
                        this.colition = true;
                    } else {
                        this.colition = false;
                    }
                } else if (colider.object.name === 'rage' && this.rage_slot == false) {
                    if (colider.distance < 20) {
                        this.damage = this.damage * 2;
                        const icon = document.querySelector(`#rage-${this.playerid}`);
                        icon.className = 'd-inline';
                        this.rage_slot = true;
                    }
                } else if (colider.object.name === 'health') {
                    if (colider.distance < 20) {
                        if (this.playerid == 1) {
                            if (this.life < 100) {
                                this.life += 12.5;

                                this.health_slot = true;

                            }
                        } else if (this.playerid == 2) {
                            if (this.life > 0) {
                                this.life -= 12.5;

                                this.health_slot = true;

                            }
                        }

                        const bar = document.querySelector(`#life-${this.playerid}`);
                        bar.className = `progress-bar ${this.playerid == 1 ? 'bg-danger' : 'bg-light'} w-${this.life}`;
                        const icon = document.querySelector(`#health-${this.playerid}`);
                        icon.className = 'd-inline';

                    }
                }else if(colider.object.name === 'speed'){
                    if(colider.distance < 25){
                        this.speed += 10;
                        const icon = document.querySelector(`#speed-${this.playerid}`);
                        icon.className = 'd-inline';
                        this.speed_slot = true;
                    }
                }
            })
        }

    }

    Player_UI(playername, lifePercent) {
        const container = document.createElement('div');
        container.className = 'col-4';

        const nameBanner = document.createElement('h1');
        nameBanner.className = `fw-bold mx-5 my-3 ${this.playerid == 1 ? 'text-start' : 'text-end'}`;
        nameBanner.textContent = this.name;


        const bar = document.createElement('div');
        bar.className = `progress ${this.playerid == 1 ? '' : 'bg-danger'}`;
        bar.style.height = '35px';

        const life = document.createElement('div');
        life.className = `progress-bar ${this.playerid == 1 ? 'bg-danger' : 'bg-light'} w-${this.life}`;
        life.id = `life-${this.playerid}`;
        life.setAttribute('role', 'progressbar');

        bar.append(life);

        container.append(nameBanner, bar);

        return container;

    }

    PowerUps_UI() {
        const container = document.createElement('div');
        container.className = 'col-6';

        const span = document.createElement('span');

        /* RAGE ICON */
        const rage = document.createElement('img');
        rage.className = 'd-none';
        rage.id = `rage-${this.playerid}`;
        rage.width = '64';
        rage.height = '64';
        rage.src = 'assets/img/icons/rage.png';

        /* HEALTH ICON */
        const health = document.createElement('img');
        health.className = 'd-none';
        health.id = `health-${this.playerid}`;
        health.height = '64';
        health.width = '64';
        health.src = 'assets/img/icons/health.png';

        /* SPEED ICON */
        const speed = document.createElement('img');
        speed.className = 'd-none';
        speed.id = `speed-${this.playerid}`;
        speed.height = '64';
        speed.width = '64';
        speed.src = 'assets/img/icons/speed.png';

        span.append(rage, health, speed);

        container.append(span);

        return container;

    }

}