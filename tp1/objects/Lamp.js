import * as THREE from 'three'

/**
 * @class Lamp
 * @extends THREE.Object3D
 * @description This class creates a vertical lamp with a light source that can be adjusted in intensity through the GUI.
 * @param {App} app - The app object.
 * @param {number} height - The height of the lamp.
 * @param {string} color - The color of the lamp.
 * @param {THREE.Vector3} position - The position of the lamp.
 * @param {THREE.Vector3} rotation - The rotation of the lamp.
 */
class Lamp extends THREE.Object3D {
    constructor(app, height, color, position) {
        super();
        this.app = app;

        this.height = height;
        this.color = color;
        this.tablePosition = position
        
        this.init();
    }

    init() {
        this.lamp = new THREE.Group();

        this.buildLampshade()
        this.buildArm()
        this.buildBase()
        this.buildLight()

        this.lamp.position.set(this.tablePosition.x, this.tablePosition.y, this.tablePosition.z)
    }   

    buildLampshade() {
        const material = new THREE.MeshLambertMaterial({
            color: this.color,
            emissive: this.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .9,
            reflectivity: 0.5,
            map: new THREE.TextureLoader().load("./texture/curtain.png"),          
        });

        const geometry = new THREE.CylinderGeometry(1, 1, 2, 32, 1, true)
        const lampshade = new THREE.Mesh(geometry, material)

        lampshade.translateY(this.height + .5)

        this.lamp.add(lampshade)
    }

    buildBase() {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xd3d3d3,
            specular: 0xffffff,
            emissive: 0x000000,
            reflectivity: 0.6,
            shininess: 200,
        });

        const geometry = new THREE.CylinderGeometry(1, 1.5, .5, 32)
        const base = new THREE.Mesh(geometry, material)
        base.translateY(0.25)

        this.lamp.add(base)
    }

    buildArm() {
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xd3d3d3,
            specular: 0xffffff,
            emissive: 0x000000,
            reflectivity: 0.6,
            shininess: 200,
        });

        const geometry = new THREE.CylinderGeometry(.2, .2, this.height, 32)
        const arm = new THREE.Mesh(geometry, material)
        arm.translateY(this.height / 2)

        this.lamp.add(arm)
    }
    
    buildLight() {
        const light = new THREE.PointLight(0xffb900, 1, 100)
        light.position.set(0, this.height + 1, 0)
        light.castShadow = true
        this.lamp.add(light)
    }

    draw() {
        this.app.scene.add(this.lamp)
    }
}

export { Lamp }
