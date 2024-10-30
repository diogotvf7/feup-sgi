import * as THREE from "three";


class Spiral extends THREE.Object3D {

    constructor(app, position, rotation, radius = 0.5, turns = 5, segments = 64, height = 3, thickness = 0.05) {
        super();
        this.app = app;
        this.spiralPosition = position;
        this.spiralRotation = rotation;
        this.radius = radius;
        this.turns = turns;
        this.segments = segments;
        this.height = height;
        this.thickness = thickness;
        this.material = new THREE.MeshPhysicalMaterial({ color: 0x56fae1 , roughness: 0, metalness: 0.5, iridescence: 0.6});


        this.build();
    }

    build() {
        this.spiral = new THREE.Group()
        this.spiral.add(this.buildSpiral()); 
        this.spiral.add(this.buildBases(new THREE.Vector3(0.5, 0, 0), new THREE.Vector3(THREE.MathUtils.degToRad(-8), THREE.MathUtils.degToRad(173), 0)));
        this.spiral.add(this.buildBases(new THREE.Vector3(0.5, 2, 0), new THREE.Vector3(THREE.MathUtils.degToRad(-7), THREE.MathUtils.degToRad(8), 0)));
        this.spiral.rotation.set(this.spiralRotation.x, this.spiralRotation.y, this.spiralRotation.z);
        this.spiral.position.set(this.spiralPosition.x, this.spiralPosition.y, this.spiralPosition.z);
        this.spiral.scale.set(0.5, 0.5, 0.5);
    }

    buildSpiral() {
        const points = [];
        for (let i = 0; i <= this.segments; i++) {
            const t = i / this.segments;
            const angle = 2 * Math.PI * this.turns * t;
            const x = this.radius * Math.cos(angle);
            const y = this.height * t;
            const z = this.radius * Math.sin(angle);
            points.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, this.segments, this.thickness, 8, false);
        const spiral = new THREE.Mesh(geometry, this.material);
        return spiral;
    }

    buildBases(basePosition, rotation) {
        let baseGeometry = new THREE.CircleGeometry(this.thickness, 128);
        let base = new THREE.Mesh(baseGeometry, this.material);
        base.position.set(basePosition.x, basePosition.y, basePosition.z);
        base.rotation.set(rotation.x, rotation.y, rotation.z);
        return base;
    }

    draw() {
        this.app.scene.add(this.spiral);
    }

}

export { Spiral };
