import * as THREE from 'three';

/**
 * @class Floor
 * @extends THREE.Object3D
 * @description This class creates a floor with a realistic texture. Besides usgin the texture, it also uses a displacement map to give a more realistic look.
 * @param {App} app - The app object.
 * @param {number} width - The width of the floor.
 * @param {number} height - The height of the floor.
 * @param {string} color - The color of the floor.
 */
class Floor extends THREE.Object3D {
    constructor(app, width, height, color) {
        super();
        this.app = app;
        this.width = width;        
        this.height = height;
        this.depth = 1;

        this.color = color;
        
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
            color: this.color,
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
