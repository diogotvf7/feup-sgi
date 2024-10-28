import * as THREE from 'three';

class Suitcase extends THREE.Object3D {
    constructor(app) {
        super();
        this.app = app
        this.material = new THREE.MeshStandardMaterial({ color: "#202020", roughness : 0 }); 

        this.build();
    }

    build() {
        this.suitcase = new THREE.Group() 
        const half = this.buildHalfSuitcase()
        const half_ = this.buildHalfSuitcase()

        half.rotateX(THREE.MathUtils.degToRad(240))
        half.position.set(0, 1.8, 1)
        this.suitcase.add(half)
        this.suitcase.add(half_)

        this.suitcase.rotateY(-Math.PI / 2)
        this.suitcase.scale.set(0.8,0.8,0.8)
        this.suitcase.position.set(10, 7, -7)
    }

    buildHalfSuitcase() {
        const halfsuitcase = new THREE.Group()
        const left = this.buildHalfSuitcaseSide(0.1, 0.7, 3)
        const right = this.buildHalfSuitcaseSide(0.1, 0.7, 3)
        right.position.set(4, 0 ,0)
        const back = this.buildHalfSuitcaseSide(4, 0.7, 0.1)
        back.position.set(2, 0, -1.5)
        const front = this.buildHalfSuitcaseSide(4,0.7, 0.1)
        front.position.set(2, 0, 1.5)
        const base = this.buildHalfSuitcaseSide(4, 0.1, 3)
        base.position.set(2, -0.35, 0)

        halfsuitcase.add(left)
        halfsuitcase.add(right)
        halfsuitcase.add(front)
        halfsuitcase.add(back)
        halfsuitcase.add(base)

        
        const innerMaterial = new THREE.MeshStandardMaterial({ color: "#e0cda8", roughness :0.4 });
        const innerLeft = this.buildHalfSuitcaseSide(0.05, 0.65, 2.9, innerMaterial)
        innerLeft.position.set(0.1, 0 , 0)
        const innerRight = this.buildHalfSuitcaseSide(0.05, 0.65, 2.9, innerMaterial)
        innerRight.position.set(3.9, 0, 0)
        const innerBack = this.buildHalfSuitcaseSide(3.9, 0.65, 0.05, innerMaterial)
        innerBack.position.set(2, 0, -1.45)
        const innerFront = this.buildHalfSuitcaseSide(3.9, 0.65, 0.05, innerMaterial)
        innerFront.position.set(2, 0, 1.45)
        const innerBase = this.buildHalfSuitcaseSide(3.9, 0.05, 2.9, innerMaterial)
        innerBase.position.set(2, -0.31, 0)

        halfsuitcase.add(innerLeft)
        halfsuitcase.add(innerRight)
        halfsuitcase.add(innerFront)
        halfsuitcase.add(innerBack)
        halfsuitcase.add(innerBase)

        return halfsuitcase
    }

    buildHalfSuitcaseSide(x, y, z, material = this.material) {
        const side = new THREE.BoxGeometry(x, y, z)
        const sideMesh = new THREE.Mesh(side, material)
        return sideMesh
    }

    draw() {
        this.app.scene.add(this.suitcase)
        const light = new THREE.PointLight(0xe8b63b, 125, 20); 
        light.position.set(10, 8, -5.5); 
        
        const lightHelper = new THREE.PointLightHelper(light, 0.5); 
        this.app.scene.add(light)
        this.app.scene.add(lightHelper)
    }
}

export {Suitcase};