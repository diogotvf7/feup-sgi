import * as THREE from 'three'

class Walls extends THREE.Object3D {
    constructor(app, floor, height, diffuse) {
        super();
        this.app = app;
        this.floor = floor;

        this.height = height;
        this.width = this.floor.width;
        this.depth = 1;

        this.diffuse = diffuse;

        this.wall_material = new THREE.MeshPhongMaterial({ 
            color: diffuse,
            specular: "#000000",
            shininess: 0,
            side: THREE.BackSide
        }); 
        
        this.init();
    }

    init() {
        this.buildWalls()

        this.add(this.front_mesh)
        this.add(this.left_mesh)
        this.add(this.back_mesh)
        this.add(this.right_mesh)
    }   

    buildWalls() {
        this.main_geometry = new THREE.PlaneGeometry(this.floor.width, this.height)
        this.cross_geometry = new THREE.PlaneGeometry(this.floor.height, this.height)

        // front wall
        this.front_mesh = new THREE.Mesh(this.main_geometry, this.wall_material)
        this.front_mesh.position.x = this.floor.height / 2
        this.front_mesh.position.y = this.height / 2
        this.front_mesh.rotateY(Math.PI / 2)

        this.addBulletHoles();


        // left wall
        this.left_mesh = new THREE.Mesh(this.cross_geometry, this.wall_material)
        this.left_mesh.position.y = this.height / 2
        this.left_mesh.position.z = this.floor.width / 2

        // back wall
        this.back_mesh = new THREE.Mesh(this.main_geometry, this.wall_material)
        this.back_mesh.position.x = - this.floor.height / 2
        this.back_mesh.position.y = this.height / 2
        this.back_mesh.rotateY(- Math.PI / 2)

        // right wall
        this.right_mesh = new THREE.Mesh(this.cross_geometry, this.wall_material)
        this.right_mesh.position.y = this.height / 2
        this.right_mesh.position.z = - this.floor.width / 2
        this.right_mesh.rotateY(Math.PI)
    }

    addBulletHoles() {
        const bulletHoleGeometry = new THREE.CircleGeometry(0.1, 8, 8); 
        const cakeTexture = new THREE.TextureLoader().load("./texture/bullethole.jpg");

        const bulletHoleMaterial = new THREE.MeshPhongMaterial({ map: cakeTexture }); 

        const bulletHolePositions = [
            { x: -22.4, y: 1, z: 0.5 },
            { x: -22.4, y: 5, z: -5 },
            { x: -22.4, y: 3, z: 5 },
        ];

        bulletHolePositions.forEach(pos => {
            const bulletHoleMesh = new THREE.Mesh(bulletHoleGeometry, bulletHoleMaterial);
            bulletHoleMesh.position.set(pos.x, pos.y, pos.z);
            bulletHoleMesh.scale.set(2,2,2)
            bulletHoleMesh.rotateY(Math.PI / 2)
            this.add(bulletHoleMesh);
        });
    }

    draw() {
        this.app.scene.add(this)
    }
}

export { Walls }
