import * as THREE from 'three';


class Door extends THREE.Object3D {
    constructor(app) {
        super();
        this.app = app;
        this.doorMaterial = new THREE.MeshStandardMaterial({ color: 0xe0cda8 }); 
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
        const doorDepth = 0.1;
        this.door = new THREE.Group()

        const doorGeometry = this.createRectangle(doorWidth, doorHeight, doorDepth);
        const doorMesh = new THREE.Mesh(doorGeometry, this.doorMaterial);
        doorMesh.position.set(0, doorHeight / 2, 0);
        this.door.add(doorMesh);

        const frameThickness = 0.1;
        const frameGeometry = this.createRectangle(doorWidth + frameThickness * 2, doorHeight + frameThickness * 2, frameThickness);
        const frameMesh = new THREE.Mesh(frameGeometry, this.doorMaterial);
        frameMesh.position.set(0, (doorHeight + frameThickness) / 2, -frameThickness / 2);
        this.door.add(frameMesh);

        const handleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const handleMesh = new THREE.Mesh(handleGeometry, this.handleMaterial);
        handleMesh.position.set(-doorWidth / 2 + 0.1, doorHeight / 2 + 0.3, 0.06); 
        this.door.add(handleMesh);
    
        this.door.rotateY(Math.PI / 2)
        this.door.scale.set(5,5,4.5)
        this.door.position.set(-22.2, 0, -8)
    }

    draw() {
        this.app.scene.add(this.door);
    }
}

export {Door}