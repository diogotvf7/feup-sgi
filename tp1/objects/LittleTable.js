import * as THREE from 'three'
import { BezierCurve } from '../helpers/deCasteljau.js'

/**
 * @class LittleTable
 * @extends THREE.Object3D
 * @description This class creates a small transparent table.
 * @param {App} app - The app object.
 * @param {THREE.Vector3} position - The position of the table.
 */
class LittleTable extends THREE.Object3D {
    constructor(app, position) {
        super();
        this.app = app;

        this.tablePosition = position
        
        this.init();
    }

    init() {
        this.table = new THREE.Group();

        this.buildLegs()
        this.buildTop()

        
        this.table.position.set(this.tablePosition.x, this.tablePosition.y, this.tablePosition.z)
        this.table.scale.set(1.5, 1.2, 1.5)
    }   

    buildTop() {
        const material = new THREE.MeshLambertMaterial({
            color: "#CE880B",
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            reflectivity: 0.5,
            map: new THREE.TextureLoader().load("./texture/glossy.jpg"),          
        });

        const geometry = new THREE.BoxGeometry(3, 3, 0.3)
        const top = new THREE.Mesh(geometry, material)
        top.translateX(2.7/2)
        top.translateY(2)
        top.translateZ(2.7/2)
        top.rotateX(Math.PI / 2)


        this.table.add(top)
    }

    buildLegs() {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xd3d3d3,
            specular: 0xffffff,
            emissive: 0x000000,
            reflectivity: 0.6,
            shininess: 200,
        });
        
        const curve = new BezierCurve([
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,1,0),
            new THREE.Vector3(-1,2,0),
            new THREE.Vector3(2,2,0),
        ])
        const geometry = new THREE.TubeGeometry(curve, 64, 0.1, 8, false)

        const tl = new THREE.Mesh(geometry, material)
        tl.translateZ(2.7)
        tl.rotateY(Math.PI / 4)

        const tr = new THREE.Mesh(geometry, material)
        tr.translateX(2.7)
        tr.translateZ(2.7)
        tr.rotateY(3 * Math.PI / 4)

        const bl = new THREE.Mesh(geometry, material)
        bl.translateX(2.7)
        bl.rotateY(5 * Math.PI / 4)

        const br = new THREE.Mesh(geometry, material)
        br.rotateY(7 * Math.PI / 4)


        this.table.add(tl, tr, bl, br)
    }
    
    draw() {
        this.app.scene.add(this.table)
    }
}

export { LittleTable }
