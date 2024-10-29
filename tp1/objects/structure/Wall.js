import * as THREE from 'three'

class Wall extends THREE.Object3D {
    constructor(app, width, height, diffuse, windows, addBulletHoles = false) {
        super();
        this.app = app;
        this.width = width;
        this.height = height;        
        this.diffuse = diffuse;
        this.windows = windows;

        console.log('\nwidth', width, '\nheight', height, '\ndiffuse', diffuse, '\nwindows', windows, '\naddBulletHoles', addBulletHoles);

        this.wall_material = new THREE.MeshPhongMaterial({ 
            color: diffuse,
            specular: "#000000",
            shininess: 0,
            side: THREE.FrontSide
        }); 
        
        this.init();
    }

    init() {
        this.buildWall()

        this.wall = new THREE.Group();
        this.meshes.forEach(mesh => {
            this.wall.add(mesh)
        })

        this.wall.receiveShadow = true;
        this.wall.castShadow = true;

        this.wall.position.set(0, this.height / 2, 0)
    }

    buildWall() {       
        const breakpoints = [0]
        this.windows.forEach(window => {
            breakpoints.push(window.x)
            breakpoints.push(window.x + window.width)
        })
        breakpoints.push(this.width)

        let i = 0
        let isWall = true
        this.meshes = []
        while (i < breakpoints.length - 1) {
            const start = breakpoints[i]
            const end = breakpoints[i + 1]
            const width = end - start

            if (isWall) {
                console.log('normal mesh: ', start, ' - ', end);
                const geometry = new THREE.PlaneGeometry(width, this.height)
                const mesh = new THREE.Mesh(geometry, this.wall_material)
                mesh.position.x += start + width / 2
                this.meshes.push(mesh)
            } else {
                console.log('skip mesh: ', start, ' - ', end);
            }

            isWall = !isWall
            i++
        }


        if (this.addBulletHoles)
            this.addBulletHoles();
    }

    addBulletHoles() {
        const bulletHoleGeometry = new THREE.CircleGeometry(0.1, 8, 8); 
    
        const cakeTexture = new THREE.TextureLoader().load("./texture/bullethole.png");
        
        const bulletHoleMaterial = new THREE.MeshPhongMaterial({
            map: cakeTexture,
            transparent: true
        }); 
    
        const bulletHolePositions = [
            { x: -22.4, y: 8, z: 0.5 },
            { x: -22.4, y: 10, z: -3 },
            { x: -22.4, y: 12, z: 1 },
            { x: -22.4, y: 10.5, z: 0 },
            { x: -22.4, y: 9, z: -1 },
        ];
    
        bulletHolePositions.forEach(pos => {
            const bulletHoleMesh = new THREE.Mesh(bulletHoleGeometry, bulletHoleMaterial);
            bulletHoleMesh.position.set(pos.x, pos.y, pos.z);
            bulletHoleMesh.scale.set(4,4,4)
            bulletHoleMesh.rotateY(Math.PI / 2)
            this.add(bulletHoleMesh);
        });
    }
    
    draw() {
        this.app.scene.add(this.wall)
    }
}

export { Wall }
