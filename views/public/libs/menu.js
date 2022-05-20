class Menu{

    constructor(container, character, anims){
        this.container;
        this.player = {};
        this.stats;
        this.camera;
        this.scene;
        this.renderer;

        this.character = character;
        this.anims = anims;

        this.container = document.createElement('div');
        container.className = 'h-100';
        container.append(this.container);

        const game = this;

        this.init();

    }

    init(){

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
		this.camera.position.set(112, 100, 400);
        

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(33, 97, 185);

		this.scene.fog = new THREE.Fog( 0xa0a0a0, 700, 1800 );
        
        let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		light.position.set( 0, 200, 0 );
		this.scene.add( light );

        // ground
		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4000, 4000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		//mesh.position.y = -100;
		mesh.receiveShadow = true;
		this.scene.add( mesh );

		var grid = new THREE.GridHelper( 4000, 60, 0x000000, 0x000000 );
		//grid.position.y = -100;
		grid.material.opacity = 0.2;
		grid.material.transparent = true;
		this.scene.add( grid );

		// model
		const loader = new THREE.FBXLoader();
		const game = this;

        loader.load( game.character, function ( object ) {

			object.mixer = new THREE.AnimationMixer( object );
			game.player.mixer = object.mixer;
			game.player.root = object.mixer.getRoot();
			
			object.name = "Character";
					
			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = false;		
				}
			} );
            
			game.scene.add(object);
			game.player.object = object;
			game.player.mixer.clipAction(object.animations[0]).play();
            
            game.animate();
		} );
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.shadowMap.enabled = true;
		this.container.appendChild( this.renderer.domElement );

    }

    animate() {
		const game = this;
		const dt = this.clock.getDelta();
		
		requestAnimationFrame( function(){ game.animate(); } );
		
		if (this.player.mixer!==undefined) this.player.mixer.update(dt);
		
		this.renderer.render( this.scene, this.camera );

	}

}