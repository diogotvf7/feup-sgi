import * as THREE from 'three';

class Floor extends THREE.Object3D {
    constructor(app, width, height, diffuse, specular, shininess) {
        super();
        this.app = app;
        this.width = width;        
        this.height = height;
        this.depth = 1;

        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;

        this.floorMaterial = new THREE.MeshPhongMaterial({ 
            color: diffuse,
            specular: specular,
            emissive: "#000000",
            shininess: shininess
        }); 
        
        this.init();
    }
    /**
     * builds the floor mesh with material
     */
    buildFloor() {
        this.geometry = new THREE.BoxGeometry(this.height, this.depth, this.width);
        this.floorMesh = new THREE.Mesh(this.geometry, this.floorMaterial);

        this.floorMesh.position.y = - this.depth / 2;
    }
    /**
     * initializes the floor object
     */
    init() {
        this.buildFloor();

        this.add(this.floorMesh);    
    }   
    /**
     * draws the floor object
     */
    draw() {
        this.app.scene.add(this);
    }
}

export { Floor };
