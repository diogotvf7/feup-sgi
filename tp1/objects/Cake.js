import * as THREE from 'three';


class Cake extends THREE.Object3D {

    constructor(app, radius, height){
        super()
        this.app = app
        this.radius = radius
        this.height = height
        this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} ) 

        const cakeTexture = new THREE.TextureLoader().load('./texture/cake.jpg');
        const coverCakeTexture = new THREE.TextureLoader().load('./texture/cover.jpg');

        this.cakeMaterial = new THREE.MeshStandardMaterial({
            map: cakeTexture,
            //roughness: 1,        
            //metalness: 0, 
        })
        this.coverCakeMaterial = new THREE.MeshStandardMaterial({
            map: coverCakeTexture,
            //roughness: 1,        
            //metalness: 0, 
        })
        


        this.init()
    }

    init(){
        this.buildCake()
    }

    buildCake(){
        const geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 32, 1, false, 0, (17/20) * 2 * Math.PI)
        this.cake = new THREE.Mesh( geometry, this.coverCakeMaterial )

        const insideCakeGeometry1 = new THREE.PlaneGeometry(this.radius, this.height)
        const insideCakeGeometry2 = new THREE.PlaneGeometry(this.radius * 2, this.height)

        this.insideCake1 = new THREE.Mesh(insideCakeGeometry1, this.cakeMaterial)
        this.insideCake2 = new THREE.Mesh(insideCakeGeometry2, this.cakeMaterial)

        this.insideCake1.rotation.y = -(Math.PI / 2)
        this.insideCake1.position.z = 1

        this.insideCake2.rotation.y = Math.PI / 2 - ((3/20) * 2 * Math.PI)


        this.app.scene.add(this.insideCake2)
        this.app.scene.add(this.cake)
        this.app.scene.add(this.insideCake1)
    }

    draw() {
        this.app.scene.add(this);

    }

}

export { Cake };
