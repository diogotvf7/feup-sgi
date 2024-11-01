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
        
        this.init();
    }
    /**
     * initializes the floor object
     */
    init() {
        const texture = new THREE.TextureLoader().load("./texture/rug.png");
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;

        const planeSizeU = this.width;
        const planeSizeV = this.height;
        const planeUVRate = planeSizeV / planeSizeU;
        const planeTextureUVRate = 1100 / 992
        const planeTextureRepeatU = 1;
        const planeTextureRepeatV = planeTextureRepeatU * planeUVRate * planeTextureUVRate;
        texture.repeat.set(planeTextureRepeatU, planeTextureRepeatV);

        const material = new THREE.MeshPhongMaterial({ 
            color: this.diffuse,
            specular: this.specular,
            emissive: "#000000",
            shininess: this.shininess,
            side: THREE.FrontSide,
            map: texture,
            displacementMap: texture,
            displacementScale: .3,
        }); 
        const geometry = new THREE.PlaneGeometry(this.height, this.width, 50, 50);
        const floorMesh = new THREE.Mesh(geometry, material);
        floorMesh.receiveShadow = true;
        floorMesh.rotateX(- Math.PI / 2);

        this.add(floorMesh);    
    }   
    /**
     * draws the floor object
     */
    draw() {
        this.app.scene.add(this);
    }
}

export { Floor };
