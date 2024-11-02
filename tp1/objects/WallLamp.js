import * as THREE from 'three';
import { BezierCurve } from '../helpers/deCasteljau.js'

/**
 * @class WallLamp
 * @extends THREE.Object3D
 * @description This class creates a wall lamp with two bulbs. The lights can be turned on and off by clicking on the light switch.
 * @param {App} app - The app object.
 * @param {THREE.Vector3} translate - The position of the wall lamp.
 * @param {number} rotate - The rotation of the wall lamp.
 */
class WallLamp extends THREE.Object3D {
    constructor(app, translate, rotate) {
        super();
        this.app = app;
        this.translate = translate;
        this.rotate = rotate;
        
        this.lights = []

        this.lampMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./texture/iron.jpg')
        })

        this.bulbMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFBF00,
            transparent: true,
            opacity: 0.6,
            reflectivity: 0.1,
        })

        this.build();
    }

    build() {
        this.lamp = new THREE.Group()

        const support_geometry = new THREE.ConeGeometry(.5, 2, 3)

        const support = new THREE.Mesh(support_geometry, this.lampMaterial)
        support.rotateX(Math.PI / 18)
        support.rotateZ(Math.PI)
        support.position.set(0, 1, .2)
        support.castShadow = true
        support.receiveShadow = true
        this.lamp.add(support)

        const curve = new BezierCurve([
            new THREE.Vector3(1.5,0,0),
            new THREE.Vector3(1.5,.5,0),
            new THREE.Vector3(0,.5,0),
            new THREE.Vector3(0,0,0),
        ])
        const tube_geometry = new THREE.TubeGeometry(curve, 64, 0.1, 8, false)
        const tube = new THREE.Mesh(tube_geometry, this.lampMaterial)
        tube.position.set(-.75, 1.5, .5)
        tube.rotateX(- 3 * Math.PI / 4)
        this.lamp.add(tube)

        const bulb_geometry = new THREE.CapsuleGeometry(.15, .3, 5, 10)

        const left_bulb = new THREE.Mesh(bulb_geometry, this.bulbMaterial)
        left_bulb.position.set(-.75, 1.65, .65)
        left_bulb.rotateX(- 3 * Math.PI / 4)
        this.lamp.add(left_bulb)

        const right_bulb = new THREE.Mesh(bulb_geometry, this.bulbMaterial)
        right_bulb.position.set(.75, 1.65, .65)
        right_bulb.rotateX(- 3 * Math.PI / 4)
        this.lamp.add(right_bulb)

        const left_light = new THREE.PointLight(0xFFBF00, 10, 20, 1)
        left_light.position.set(-.75, 1.65, .65)
        left_light.castShadow = true
        this.lamp.add(left_light)
        this.lights.push(left_light)

        const pointLightHelper = new THREE.PointLightHelper(left_light, .1)
        this.app.scene.add(pointLightHelper)

        const right_light = new THREE.PointLight(0xFFBF00, 10, 20, 1)
        right_light.position.set(.75, 1.65, .65)
        right_light.castShadow = true
        this.lamp.add(right_light)
        this.lights.push(right_light)

        const pointLightHelper2 = new THREE.PointLightHelper(right_light, .1)
        this.app.scene.add(pointLightHelper2)

        this.lamp.position.set(this.translate.x, this.translate.y, this.translate.z)
        this.lamp.rotateY(this.rotate)
    }

    draw() {
        this.app.scene.add(this.lamp);
    }
}

export {WallLamp}