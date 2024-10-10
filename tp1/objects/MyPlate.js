import * as THREE from 'three';

class MyPlate extends THREE.Object3D {
    
    
    constructor(app, radiusTop, radiusBottom, height){
        super();
        this.app = app;
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;
        this.height = height;
        this.init();
    }

    init(){
        let geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, 30);
        let material = new THREE.MeshStandardMaterial({
            color: 0xc4c4c4, 
            metalness: 0.6,  
            roughness: 0.2,  
        });
        this.cylinder = new THREE.Mesh(geometry, material);
    }


    draw(){
        this.app.scene.add(this.cylinder);
    }

}

export { MyPlate };