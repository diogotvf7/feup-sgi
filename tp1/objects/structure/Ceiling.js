import * as THREE from 'three'

/**
 * @class Ceiling
 * @extends THREE.Object3D
 * @description This class creates a plane geometry to represent the ceiling of the room. It can only be seen from the inside of the room due to having the side property set to THREE.BackSide.
 * @param {App} app - The app object.
 * @param {Floor} floor - The floor object. Used to get the dimensions of the ceiling.
 * @param {number} height - The height of the ceiling.
 * @param {string} color - The color of the ceiling.
 */
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
        const ceiling_geometry = new THREE.PlaneGeometry(this.floor.height, this.floor.width)
        
        const ceiling_mesh = new THREE.Mesh(ceiling_geometry, this.ceiling_material)
        ceiling_mesh.position.y = this.height
        ceiling_mesh.rotateX(- Math.PI / 2)

        ceiling_mesh.receiveShadow = true  

        this.add(ceiling_mesh)
    }   

    draw() {
        this.app.scene.add(this)
    }
}

export { Ceiling }
