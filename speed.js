class Speed{
    constructor(position, scene){
        const geometry = new THREE.SphereGeometry(11, 9, 9, 0, 6, 0, 3);
        const material = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('assets/img/icons/speed.png')});

        this.sphere = new THREE.Mesh(geometry, material);
        this.sphere.position.set(position.x, position.y, position.z);

        this.time = Date.now();
        this.taken = false;

        scene.add(this.sphere);

        /* COLIDERBOX */
        const geo = new THREE.BoxGeometry(20, 200, 20);
        const mat = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });

        this.coliderbox = new THREE.Mesh(geo, mat);
        this.coliderbox.name = `speed`;
        this.coliderbox.material.transparent = true;
        this.coliderbox.material.opacity = 0.0;

        this.coliderbox.position.set(position.x, position.y + 60, position.z);

        scene.add(this.coliderbox);

        this.angle = 0;

    }

    getObject(){
        return this.sphere;
    }

    fall(){
        if(this.sphere.position.y > 0){
            this.sphere.position.y -= 2;
        }
    }

    anim(vel = 0.05, scene){

        const puLifetime = Date.now() - this.time;

        if( puLifetime < 50000){
            this.angle += vel;
            this.sphere.rotateY(THREE.Math.degToRad(this.angle));
            this.taken = true;
        }else{
            scene.remove(this.sphere);
            this.coliderbox.position.set(-500, 0, 0);
            this.taken = false;
        }

        return this.taken;

    }
}