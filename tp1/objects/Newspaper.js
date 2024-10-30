import * as THREE from 'three'

class Newspaper extends THREE.Object3D {
    constructor(app, height, surface) {
        super();
        this.app = app;
        this.height = height
        this.width = height * 8 / 12

        this.front = new THREE.TextureLoader().load("./texture/nyt.png");
        this.back = new THREE.TextureLoader().load("./texture/nyt-back.png");

        this.init();
    }

    init() {
        this.buildFrontPage()
        this.buildBackPage()
        
        this.newspaper = new THREE.Group();
        this.newspaper.add(this.front_page);
        this.newspaper.add(this.back_page);
    }   

    buildFrontPage() {
        this.geometry = new THREE.PlaneGeometry(this.width, this.height, 10, 10);
        this.front_page = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { map: this.front } ) );
        

        const positionAttribute = this.geometry.getAttribute( 'position' );

        const vertex = new THREE.Vector3();

        for ( let i = 0; i < positionAttribute.count; i ++ ) {

            vertex.fromBufferAttribute( positionAttribute, i ); // read vertex
            
            // console.log(vertex);
            
            // do something with vertex

            // positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z ); // write coordinates back
        }
    }

    buildBackPage() {
        this.geometry = new THREE.PlaneGeometry(this.width, this.height, 10, 10);
        this.back_page = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { map: this.back } ) );

        this.back_page.rotateY(Math.PI)
    }

    draw() {
        this.app.scene.add(this.newspaper)
    }
}

export { Newspaper }
