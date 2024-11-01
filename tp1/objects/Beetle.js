import * as THREE from 'three'

class Beetle extends THREE.Object3D {
    constructor(app, size, thickness, translate, rotate) {
        super();
        this.app = app
        this.size = size
        this.thickness = thickness
        this.translate = translate
        this.rotate = rotate

        this.material = new THREE.MeshPhongMaterial({ 
            color: "#6f8aa8",
            specular: "#b2b2b2",
            emissive: "#1a2a3a",
            reflectivity: .4,
            shininess: 100,
            side: THREE.DoubleSide
        }); 
        
        this.init();
    }

    init() {
        this.beetle = new THREE.Group()

        this.build()

        this.beetle.translateX(this.translate.x) 
        this.beetle.translateY(this.translate.y) 
        this.beetle.translateZ(this.translate.z)
        this.beetle.rotateY(this.rotate)
    }   

    build() {
        const luggage_geometry = new THREE.RingGeometry(this.size, this.size + this.thickness / 2, 25, 1, Math.PI / 2, Math.PI / 2);
        const luggage = new THREE.Mesh(luggage_geometry, this.material);
        this.beetle.add(luggage);

        const windshield_geometry = new THREE.RingGeometry(this.size / 2, this.size / 2 + this.thickness / 2, 25, 1, 0, Math.PI / 2);
        const windshield = new THREE.Mesh(windshield_geometry, this.material);
        windshield.translateY(this.size / 2);
        this.beetle.add(windshield);

        const hood_geometry = new THREE.RingGeometry(this.size / 2, this.size / 2 + this.thickness / 2, 25, 1, 0, Math.PI / 2);
        const hood = new THREE.Mesh(hood_geometry, this.material);
        hood.translateX(this.size / 2);
        this.beetle.add(hood);

        const back_wheel_geometry = new THREE.RingGeometry(this.size * 3 / 8, this.size * 3 / 8 + this.thickness * 3 / 8, 25, 1, 0, Math.PI);
        const back_wheel = new THREE.Mesh(back_wheel_geometry, this.material);
        back_wheel.translateX(- this.size + this.size * 3 / 8);
        this.beetle.add(back_wheel);

        const front_wheel_geometry = new THREE.RingGeometry(this.size * 3 / 8, this.size * 3 / 8 + this.thickness * 3 / 8, 25, 1, 0, Math.PI);
        const front_wheel = new THREE.Mesh(front_wheel_geometry, this.material);
        front_wheel.translateX(this.size - this.size * 3 / 8);
        this.beetle.add(front_wheel);
    }

    draw() {
        this.app.scene.add(this.beetle)
    }
}

export { Beetle }
