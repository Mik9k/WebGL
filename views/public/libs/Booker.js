class Booker {
    constructor(scene) {

        this.scene = scene;

        this.player = {};
        this.animations = {};

        this.anims = ['Walking', 'Walking Backwards', 'Lead Jab', 'Roundhouse Kick'];

        this.model = `assets/character/meshes/ybot.fbx`;
        this.animPath = `assets/character/meshes/anims`;

        this.loaded = false;

        this.init();

    }

    init() {
        console.log('You Choose Booker As Fighter');
    }

    load(scene, pos = 0, rot = 0){
        const Booker = this;
        const  loader = new THREE.FBXLoader();
        loader.load(Booker.model, function(object){

            object.mixer = new THREE.AnimationMixer(object);
            Booker.player.mixer = object.mixer;
            Booker.player.root = object.mixer.getRoot();

            object.name = 'Booker';
            object.traverse( function ( child ) {
				if ( child.isMesh ) {
                    child.material.map = null;
					child.castShadow = true;
					child.receiveShadow = false;		
				}
			} );

            object.rotation.y = rot;
            object.translateZ(pos);
            scene.add(object);
			Booker.player.object = object;
            Booker.player.mixer.clipAction(object.animations[0]).play();
            Booker.animations.Idle = object.animations[0];

            Booker.loadNextAnim(loader);
        })
    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const Booker = this;
        loader.load(`assets/character/anims/${anim}.fbx` , function( object ) {
            Booker.animations[anim] = object.animations[0];
            if(Booker.anims.length > 0) {
                Booker.loadNextAnim(loader);
            }else{
                delete game.anims;
                Booker.action = "Idle";
                //Booker.animate();
                Booker.loaded = true;
            }
        });
    }

    set action(name){
		const action = this.player.mixer.clipAction( this.animations[name] );
        action.time = 0;
		this.player.mixer.stopAllAction();
		this.player.action = name;
		this.player.actionTime = Date.now();
        console.log(`Action Time: ${this.player.actionTime}`)
        this.player.actionName = name;
		
		action.fadeIn(0.5);	
		action.play();
	}
    
    get action(){
        if (this.player===undefined || this.player.actionName===undefined) return "";
        return this.player.actionName;
    }

    playerController(action){

        if(action === 'Walking' ){
            if(this.action !== 'Walking') this.action = 'Walking';
        }else if(action === 'Walking Backwards'){
            if(this.action != 'Walking Backwards') this.action = 'Walking Backwards';
        }else if(action === 'Lead Jab'){
            if(this.action != 'Lead Jab') this.action = 'Lead Jab';
        }else if(action == 'Roundhouse Kick'){
            if(this.action != 'Roundhouse Kick') this.action = 'Roundhouse Kick';
        }

    }

    forward(dt){
        if(this.action == 'Walking'){
            const elepsedTime = Date.now() - this.player.actionTime;
            if(elepsedTime > 1000){
                this.action = 'Idle';
                console.log(`Player Action: ${this.player.action}`)
            }else{
                //console.log(`Player Action: ${this.player.action}`)
                this.player.object.translateZ(dt * 80);
            }
            //console.log(`Elepsed Time: ${Date.now() - this.player.actionTime}`);
        }
    }

    backward(dt){
        if(this.action == 'Walking Backwards'){
            const elepsedTime = Date.now() - this.player.actionTime;
            if(elepsedTime > 900){
                this.action = "Idle";
                console.log(`Player Action: ${this.player.action}`);
            }else{
                this.player.object.translateZ(dt*-90);
            }
        }
    }

    punch(){
        if(this.action == 'Lead Jab'){
            const elepsedTime = Date.now() - this.player.actionTime;
            if(elepsedTime > 1600){
                this.action = "Idle";
                console.log(`Player Action: ${this.player.action}`);
            }
        }
    }

    kick(){
        if(this.action == 'Roundhouse Kick'){
            const elepsedTime = Date.now() - this.player.actionTime;
            if(elepsedTime > 1600){
                this.action = "Idle";
                console.log(`Player Action: ${this.player.action}`)
            }
        }
    }

    startAnim(dt) {
        if(this.player.mixer !== undefined) this.player.mixer.update(dt);
    }

}