import * as THREE from 'three';

class Plate extends THREE.Object3D {
    
    
    constructor(app, radiusTop, radiusBottom, height, position){
        super();
        this.app = app;
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;
        this.height = height;
        this.platePosition = position;
        this.init();
    }

    init(){
        let geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, 30);
        let material = new THREE.MeshStandardMaterial({
            color: 0xc4c4c4, 
            metalness: 0.6,  
            roughness: 0.2,  
        });
        this.plate = new THREE.Mesh(geometry, material);
        this.plate.position.set(this.platePosition.x, this.platePosition.y, this.platePosition.z);
    }


    draw(){
        this.app.scene.add(this.plate);
    }

}

export { Plate };