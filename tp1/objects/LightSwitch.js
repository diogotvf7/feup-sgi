import * as THREE from 'three'

/**
 * @class LightSwitch
 * @extends THREE.Object3D
 * @description This class creates a clickable light switch that turns on and off the wall lamps. The switch actually rotates to simulate the action of turning on and off the lights and produces a sound.
 * @param {App} app - The app object.
 * @param {THREE.Vector3} translate - The position of the light switch.
 * @param {number} rotate - The rotation of the light switch.
 */
class LightSwitch extends THREE.Object3D {
    constructor(app, translate, rotate) {
        super();
        this.app = app;

        this.translate = translate
        this.rotate = rotate

        this.on = false

        this.init();
    }

    init() {
        this.light_switch = new THREE.Group()

        const box_material = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0xdbdbdb, emissiveIntensity: 0.5 })
        const interruptor_material = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0x999999, emissiveIntensity: 0.5 })

        const box_geometry = new THREE.BoxGeometry(.5, 1, 0.1)
        const box = new THREE.Mesh(box_geometry, box_material)

        const interruptor_geometry = new THREE.BoxGeometry(.1, .5, .1)
        this.interruptor = new THREE.Mesh(interruptor_geometry, interruptor_material)
        this.interruptor.position.set(0, 0, 0.05)
        this.interruptor.rotateX(Math.PI / 4)        

        this.light_switch.add(box)
        this.light_switch.add(this.interruptor)

        this.light_switch.position.set(this.translate.x, this.translate.y, this.translate.z)
        this.light_switch.rotateY(this.rotate)
    }   

    /**
     * @method updateLightSwitch
     * @description This method updates the light switch by rotating the interruptor and playing a sound.
     */
    updateLightSwitch() {
        if (this.on) {
            const off = new Audio('./sounds/light-switch-off.mp3');
            off.play();

            this.interruptor.rotateX(Math.PI / 2)
        }
        else {
            const on = new Audio('./sounds/light-switch-on.mp3');
            on.play();

            this.interruptor.rotateX(- Math.PI / 2)
        }
    }
    
    draw() {
        this.app.scene.add(this.light_switch)
    }
}

export { LightSwitch }
