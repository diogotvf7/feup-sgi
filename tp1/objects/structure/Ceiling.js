import * as THREE from 'three'

class Ceiling extends THREE.Object3D {
    constructor(app, floor, height, color) {
        super();
        this.app = app;
        this.floor = floor;
        this.height = height;
        this.color = color;

        this.ceiling_material = new THREE.MeshPhongMaterial({ 
            color: color,
            // emissive: "#000000",
            side: THREE.BackSide
        }); 
        
        this.init();
    }

    init() {
        this.buildCeiling()

        this.add(this.ceiling_mesh)
    }   

    buildCeiling() {
        this.ceiling_geometry = new THREE.PlaneGeometry(this.floor.height, this.floor.width)
        
        this.ceiling_mesh = new THREE.Mesh(this.ceiling_geometry, this.ceiling_material)
        this.ceiling_mesh.position.y = this.height
        this.ceiling_mesh.rotateX(- Math.PI / 2)

        this.ceiling_mesh.receiveShadow = true        
        this.ceiling_mesh.castShadow = true;
    }

    draw() {
        this.app.scene.add(this)
    }
}

export { Ceiling }
