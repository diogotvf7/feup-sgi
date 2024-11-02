import * as THREE from 'three';

/**
 * @class Plate
 * @extends THREE.Object3D
 * @description This class creates a plate for the cake.
 * @param {App} app - The app object.
 * @param {number} radiusTop - The radius of the top of the plate.
 * @param {number} radiusBottom - The radius of the bottom of the plate.
 * @param {number} height - The height of the plate.
 * @param {THREE.Vector3} position - The position of the plate.
 */
class Plate extends THREE.Object3D {
    constructor(app, radiusTop, radiusBottom, height, position) {
        super();
        this.app = app;
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;
        this.height = height;
        this.platePosition = position;
        this.init();
    }

    init() {
        let geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, 30);
        let material = new THREE.MeshStandardMaterial({
            color: 0xc4c4c4, 
            metalness: 0.6,  
            roughness: 0.2,  
        });
        this.plate = new THREE.Mesh(geometry, material);

        this.plate.receiveShadow = true;
        this.plate.castShadow = true;

        this.plate.position.set(this.platePosition.x, this.platePosition.y, this.platePosition.z);
    }


    draw() {
        this.app.scene.add(this.plate);
    }

}

export { Plate };