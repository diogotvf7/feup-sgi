import * as THREE from "three";


class Counter extends THREE.Object3D{
    constructor(app, diffuse) {
        super()
        this.app = app
        this.wall_material = new THREE.MeshPhongMaterial({ 
            color: diffuse,
            specular: "#000000",
            shininess: 0,
        })

        this.balcony_material = new THREE.MeshPhysicalMaterial({ 
            color: 0xffffff,
        })
        this.build()
    }

    build() {
        this.counter = new THREE.Group()


        const base_geometry = new THREE.BoxGeometry( 14, 6, 2);
        const base = new THREE.Mesh( base_geometry, this.wall_material );
        base.position.set(0, 3, 0)

        const right_geometry = new THREE.BoxGeometry(1,9, 2)
        const right = new THREE.Mesh( right_geometry, this.wall_material)
        right.position.set(6.5, 10.5, 0)

        const left_geometry = new THREE.BoxGeometry(2.5, 9 , 2)
        const left = new THREE.Mesh( left_geometry, this.wall_material)
        left.position.set(-5.75, 10.5, 0)


        const balcony_geometry = new THREE.BoxGeometry(10.5, 0.6,3)
        const balcony = new THREE.Mesh( balcony_geometry, this.balcony_material)
        balcony.position.set(0.75, 6.3, 0)

        const balcony_geometry_left = new THREE.BoxGeometry(0.5, 9,2)
        const balcony_left = new THREE.Mesh( balcony_geometry_left, this.balcony_material)
        balcony_left.position.set(-4.25, 10.5, 0)

        this.counter.add(base)
        this.counter.add(right)
        this.counter.add(left)
        this.counter.add(balcony)
        this.counter.add(balcony_left)

        this.counter.rotateY(-Math.PI / 2)
        this.counter.position.set(10, 0, -5.5)
    }

    draw() {
        this.app.scene.add(this.counter)
    }
}

export {Counter}