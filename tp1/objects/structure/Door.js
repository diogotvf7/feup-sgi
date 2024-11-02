import * as THREE from 'three';


/**
 * @class Door
 * @extends THREE.Object3D
 * @description This class creates a door with a realistic texture and a handle.
 * @param {App} app - The app object.
 * @param {THREE.Vector3} translate - The translation vector of the door.
 * @param {number} rotate - The rotation angle of the door.
 */
class Door extends THREE.Object3D {
    constructor(app, translate, rotate) {
        super();
        this.app = app;
        this.translate = translate;
        this.rotate = rotate;
        
        const doorTexture = 
        this.doorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xe0cda8, 
            emissive: "#000000",
            map: new THREE.TextureLoader().load('./texture/door.png')
        }); 
        this.handleMaterial = new THREE.MeshPhysicalMaterial({ color: 0x8B4513 , roughness: 0, metalness: 0.5, iridescence: 0.6});

        this.build();
    }

    createRectangle(width, height, depth) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        return geometry;
    }

    build() {
        const doorWidth = 1;
        const doorHeight = 2;
        const doorDepth = .05;
        this.door = new THREE.Group()

        const doorGeometry = this.createRectangle(doorWidth, doorHeight, doorDepth);
        const doorMesh = new THREE.Mesh(doorGeometry, this.doorMaterial);
        doorMesh.position.set(0, doorHeight / 2, 0);
        this.door.add(doorMesh);

        const frameThickness = .05;
        const frameGeometry = this.createRectangle(doorWidth + frameThickness * 2, doorHeight + frameThickness * 2, frameThickness);
        const frameMesh = new THREE.Mesh(frameGeometry, this.doorMaterial);
        frameMesh.position.set(0, (doorHeight + frameThickness) / 2, -frameThickness / 2);
        this.door.add(frameMesh);

        const handleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const handleMesh = new THREE.Mesh(handleGeometry, this.handleMaterial);
        handleMesh.position.set(-doorWidth / 4, doorHeight / 2, 0.06); 
        this.door.add(handleMesh);
    
        this.door.scale.set(6,6,4.5)
        this.door.position.set(this.translate.x, this.translate.y, this.translate.z)
        this.door.rotateY(this.rotate)
    }

    draw() {
        this.app.scene.add(this.door);
    }
}

export {Door}