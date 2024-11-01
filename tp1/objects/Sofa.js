import * as THREE from 'three';


class Sofa extends THREE.Object3D {
    constructor(app) {
        super();
        this.app = app;
        this.planeTexture = new THREE.TextureLoader().load("./texture/sofa.jpg");
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;
        this.sofaMaterial = new THREE.MeshStandardMaterial({ map: this.planeTexture }); 
        this.build();
    }

    createRoundedBox(width, height, depth, radius, smoothness) {
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const radiusEps = radius - eps;

        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: depth - radius * 2,
            bevelEnabled: true,
            bevelSegments: smoothness * 2,
            steps: 1,
            bevelSize: radiusEps,
            bevelThickness: radius
        });

        geometry.center();
        return geometry;
    }

    build() {
        this.sofa = new THREE.Group();

        // Seat
        const seat = this.createRoundedBox(2, 0.5, 1, 0.1, 8)
        const seatMesh = new THREE.Mesh(seat, this.sofaMaterial)
        seatMesh.position.set(0, 0.3, 0)
        seatMesh.castShadow = true
        seatMesh.receiveShadow = true
        this.sofa.add(seatMesh)

        // Backrest
        const backrest = this.createRoundedBox(2, 0.6, 0.2, 0.1, 8);
        const backrestMesh = new THREE.Mesh(backrest, this.sofaMaterial);
        backrestMesh.position.set(0, 0.7, -0.4);
        backrestMesh.rotateX(THREE.MathUtils.degToRad(-10))
        backrestMesh.castShadow = true;
        backrestMesh.receiveShadow = true;
        this.sofa.add(backrestMesh);

        //Armrests
        const armrest_geometry = this.createRoundedBox(1, 0.65, 0.2, 0.05, 8)
        const left_armrestMesh = new THREE.Mesh(armrest_geometry, this.sofaMaterial)
        left_armrestMesh.position.set(-1.05, 0.4, 0)
        left_armrestMesh.rotateY(Math.PI / 2)
        left_armrestMesh.castShadow = true
        left_armrestMesh.receiveShadow = true
        this.sofa.add(left_armrestMesh)

        const right_armrestMesh = new THREE.Mesh(armrest_geometry, this.sofaMaterial)
        right_armrestMesh.position.set(1.05, 0.4, 0)
        right_armrestMesh.rotateY(Math.PI / 2)
        right_armrestMesh.castShadow = true
        right_armrestMesh.receiveShadow = true
        this.sofa.add(right_armrestMesh)

        this.sofa.scale.set(5,5,5)
        this.sofa.rotateY(Math.PI)
        this.sofa.position.set(-8,0,10)
    }

    draw() {
        this.app.scene.add(this.sofa)
    }
}

export { Sofa }