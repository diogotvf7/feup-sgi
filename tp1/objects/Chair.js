import * as THREE from 'three'


class Chair extends THREE.Object3D {
    constructor(app){
        super()
        this.app = app
        this.material = new THREE.MeshStandardMaterial({ 
            color: 0xe0cda8, 
            roughness: 0.5 
        }); 
        this.legMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513,
            roughness: 0.7 
        });
                this.build()
    }
    build(){
        this.chair = new THREE.Group()

        var geometry = new THREE.CylinderGeometry( 0.8 / Math.sqrt( 2 ), 1 / Math.sqrt( 2 ), 1, 4, 1 );
        geometry.rotateY( Math.PI / 4 );
        var chairBack = new THREE.Mesh(geometry, this.material)
        chairBack.position.set(0,3,0)
        chairBack.scale.set(2, 3, 0.2)


        var baseGeometry = new THREE.BoxGeometry(2,0.2,2)
        var chairBase = new THREE.Mesh(baseGeometry, this.material)
        chairBase.position.set(0, 1.5, 0.9)
        
        this.chair.add(chairBack)
        this.chair.add(chairBase)

        this.chair.position.set(0,0,0)

        const legGeometry = new THREE.CylinderGeometry(0.13, 0.1, 1.4, 8); 
        const legMaterial = this.material;

        const legPositions = [
            { x: -0.8, y: 0.7, z: 1.7 }, 
            { x: 0.8, y: 0.7, z: 1.7 },  
            { x: -0.8, y: 0.7, z: 0.2 },
            { x: 0.8, y: 0.7, z: 0.2 }   
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, this.legMaterial);
            leg.position.set(pos.x, pos.y, pos.z);
            this.chair.add(leg);
        });
        this.chair.scale.set(1.2, 1.2, 1.2)
        this.chair.position.set(0,0,-7)
        this.chair.rotateY(THREE.MathUtils.degToRad(-40))

    }

    draw(){
        this.app.scene.add(this.chair)
    }
}

export { Chair }