import * as THREE from 'three'

class Ceiling extends THREE.Object3D {
    constructor(app, floor, walls, diffuse) {
        super();
        this.app = app;
        this.floor = floor;
        this.walls = walls;

        this.width = this.floor.width;
        this.depth = 1;

        this.diffuse = diffuse;
        // this.specular = specular;
        // this.shininess = shininess;

        this.ceiling_material = new THREE.MeshPhongMaterial({ 
            color: diffuse,
            // specular: specular,
            emissive: "#000000",
            // shininess: shininess,
            side: THREE.BackSide
        }); 
        
        this.init();
    }

    init() {
        this.buildCeiling()

        // this.add(this.ceiling_moulding)
        this.add(this.ceiling_mesh)
    }   

    buildCeiling() {
        // this.ceiling_moulding = new THREE.CylinderGeometry(this.floor.width, this.height)
        this.ceiling_geometry = new THREE.PlaneGeometry(this.floor.height, this.floor.width)

        // 
        this.ceiling_mesh = new THREE.Mesh(this.ceiling_geometry, this.ceiling_material)
        this.ceiling_mesh.position.y = this.walls.height
        this.ceiling_mesh.rotateX(- Math.PI / 2)
    }

    draw() {
        this.app.scene.add(this)
    }
}

export { Ceiling }
