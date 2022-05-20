class Speed{
    constructor(color, position) {
        this.geometry = new THREE.SphereGeometry(11, 9, 9, 0, 6, 0, 3);
        this.material = new THREE.MeshBasicMaterial({color});

        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.sphere.position.set(position.x, position.y, position.z);
    }

    getObject(){
        return this.sphere;
    }

    fall(){
        if(this.sphere.position.y > 0)
            this.sphere.position.y -= 2;
    }
}